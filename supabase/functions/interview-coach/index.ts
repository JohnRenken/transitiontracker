import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InterviewRequest {
  type: "generate_question" | "evaluate_answer" | "get_feedback";
  category?: string; // behavioral, situational, technical, sales
  role?: string;
  question?: string;
  answer?: string;
  questionNumber?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type, category, role, question, answer, questionNumber }: InterviewRequest = await req.json();

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "generate_question") {
      systemPrompt = `You are an experienced hiring manager conducting job interviews. You specialize in interviewing military veterans transitioning to civilian careers.

Generate realistic interview questions that veterans might face. Be specific and challenging but fair.

For behavioral questions, use the "Tell me about a time..." format.
For situational questions, present realistic workplace scenarios.
For sales questions, focus on sales-specific scenarios and metrics.

Only respond with the interview question itself, nothing else.`;

      userPrompt = `Generate a ${category || "behavioral"} interview question for a ${role || "general business"} position. This is question ${questionNumber || 1} of the interview.`;
    } 
    else if (type === "evaluate_answer") {
      systemPrompt = `You are an expert interview coach who helps military veterans succeed in civilian job interviews. 

Evaluate the candidate's answer using the STAR method (Situation, Task, Action, Result) criteria:
- Clarity: Was the answer clear and well-structured?
- Specificity: Did they provide concrete examples and metrics?
- Relevance: Did the answer address the question asked?
- Impact: Did they demonstrate measurable results?
- Military Translation: Did they effectively translate military experience to civilian terms?

Provide a score from 1-10 and specific, actionable feedback.

Format your response as JSON:
{
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "betterAnswer": "A suggested improved version of their answer",
  "tip": "One key tip for next time"
}`;

      userPrompt = `Interview Question: "${question}"

Candidate's Answer: "${answer}"

Evaluate this answer and provide feedback.`;
    }
    else if (type === "get_feedback") {
      systemPrompt = `You are an interview coach providing final feedback summary.`;
      userPrompt = `Provide brief overall interview feedback.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // For evaluate_answer, try to parse as JSON
    if (type === "evaluate_answer") {
      try {
        // Extract JSON from the response (handle markdown code blocks)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const evaluation = JSON.parse(jsonMatch[0]);
          return new Response(JSON.stringify(evaluation), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } catch (parseError) {
        console.error("Failed to parse evaluation JSON:", parseError);
      }
    }

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Interview coach error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

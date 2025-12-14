import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content, mos, targetRole, jobDescription } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "translate":
        systemPrompt = `You are an expert military-to-civilian resume translator. You've reviewed thousands of veteran resumes and understand exactly what civilian employers want to see.

Your job is to translate military jargon, acronyms, and experience into powerful civilian language that:
1. Uses action verbs (Led, Managed, Coordinated, Implemented, etc.)
2. Quantifies results whenever possible (%, $, numbers)
3. Highlights transferable skills
4. Removes all military acronyms and replaces with civilian equivalents
5. Focuses on outcomes and impact, not just duties

Common translations:
- Platoon/Squad Leader → Team Leader/Manager
- NCO → Supervisor/Manager
- Soldiers → Team members/Personnel
- PT → Physical fitness programs
- NCOER/OER → Performance evaluations
- FOB → Remote operating location
- Deployment → International assignment
- MOS → Occupational specialty
- TDY → Business travel
- PCS → Relocation`;

        userPrompt = `Translate this military experience bullet point into powerful civilian language. Return ONLY the translated bullet point, nothing else:

"${content}"`;
        break;

      case "suggest":
        systemPrompt = `You are an expert military resume writer who has helped thousands of veterans transition to civilian careers. Based on the MOS/rating provided, suggest high-impact achievement statements that would impress civilian employers.

Format each suggestion as a complete bullet point with:
- Strong action verb
- Specific accomplishment
- Quantified result when possible
- Relevant to civilian workplace`;

        userPrompt = `Generate 5 powerful resume bullet points for someone with MOS/Rating: ${mos || "military background"}${targetRole ? ` who is targeting a ${targetRole} role` : ""}.

Return as a numbered list of bullet points only.`;
        break;

      case "optimize":
        systemPrompt = `You are an ATS (Applicant Tracking System) optimization expert and recruiter who has reviewed thousands of resumes. Analyze the resume content against the job description and provide:

1. A match percentage (0-100)
2. Keywords found in resume that match the job
3. Critical missing keywords that should be added
4. Specific suggestions to improve the match

Be specific and actionable. Focus on keywords that ATS systems look for.`;

        userPrompt = `Analyze this resume content against the job description:

RESUME CONTENT:
${content}

JOB DESCRIPTION:
${jobDescription}

Provide analysis in JSON format:
{
  "matchScore": number,
  "foundKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["suggestion1", "suggestion2"]
}`;
        break;

      case "summary":
        systemPrompt = `You are an expert resume writer specializing in military-to-civilian transitions. Write a powerful professional summary that:

1. Leads with value, not rank
2. Highlights transferable skills
3. Uses civilian language only
4. Is 2-3 sentences max
5. Focuses on what the candidate brings to the employer`;

        userPrompt = `Write a professional summary for a veteran with this background:
${content}
${targetRole ? `Target role: ${targetRole}` : ""}

Return ONLY the summary paragraph, nothing else.`;
        break;

      default:
        throw new Error("Invalid type specified");
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
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service temporarily unavailable");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Resume AI error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

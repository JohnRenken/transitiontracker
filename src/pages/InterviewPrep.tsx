import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Lightbulb,
  Target,
  TrendingUp,
  MessageSquare,
  Loader2,
  ArrowRight,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Evaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
  tip: string;
}

interface SessionResult {
  question: string;
  answer: string;
  evaluation: Evaluation;
}

const INTERVIEW_CATEGORIES = [
  { value: 'behavioral', label: 'Behavioral', description: 'Tell me about a time...' },
  { value: 'situational', label: 'Situational', description: 'What would you do if...' },
  { value: 'sales', label: 'Sales-Specific', description: 'Sales scenarios & metrics' },
  { value: 'leadership', label: 'Leadership', description: 'Team & management questions' },
];

const ROLE_OPTIONS = [
  { value: 'sales', label: 'Sales / Account Executive' },
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'operations', label: 'Operations Manager' },
  { value: 'cyber', label: 'Cybersecurity Analyst' },
  { value: 'general', label: 'General Business' },
];

export default function InterviewPrep() {
  const [category, setCategory] = useState('behavioral');
  const [role, setRole] = useState('sales');
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);
  const [sessionActive, setSessionActive] = useState(false);

  const generateQuestion = async () => {
    setIsLoadingQuestion(true);
    setEvaluation(null);
    setAnswer('');

    try {
      const { data, error } = await supabase.functions.invoke('interview-coach', {
        body: {
          type: 'generate_question',
          category,
          role,
          questionNumber,
        },
      });

      if (error) throw error;
      
      setCurrentQuestion(data.content);
      setSessionActive(true);
    } catch (error) {
      console.error('Error generating question:', error);
      toast.error('Failed to generate question. Please try again.');
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!answer.trim() || !currentQuestion) {
      toast.error('Please provide an answer first');
      return;
    }

    setIsEvaluating(true);

    try {
      const { data, error } = await supabase.functions.invoke('interview-coach', {
        body: {
          type: 'evaluate_answer',
          question: currentQuestion,
          answer: answer.trim(),
        },
      });

      if (error) throw error;

      if (data.score) {
        setEvaluation(data);
        setSessionResults(prev => [...prev, {
          question: currentQuestion,
          answer: answer.trim(),
          evaluation: data,
        }]);
      } else {
        throw new Error('Invalid evaluation response');
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      toast.error('Failed to evaluate answer. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    setQuestionNumber(prev => prev + 1);
    generateQuestion();
  };

  const resetSession = () => {
    setCurrentQuestion(null);
    setAnswer('');
    setEvaluation(null);
    setQuestionNumber(1);
    setSessionResults([]);
    setSessionActive(false);
  };

  const averageScore = sessionResults.length > 0
    ? sessionResults.reduce((sum, r) => sum + r.evaluation.score, 0) / sessionResults.length
    : 0;

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold">Interview Prep</h1>
            <p className="text-muted-foreground">
              Practice with AI-powered mock interviews and get instant feedback
            </p>
          </div>

          <Tabs defaultValue="practice" className="space-y-6">
            <TabsList>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Practice Session
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Session History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="practice" className="space-y-6">
              {/* Session Stats */}
              {sessionActive && (
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{questionNumber}</div>
                      <p className="text-xs text-muted-foreground">Current Question</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{sessionResults.length}</div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Setup Panel */}
              {!sessionActive && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Configure Your Practice Session
                    </CardTitle>
                    <CardDescription>
                      Select the type of interview questions you want to practice
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Question Category</label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {INTERVIEW_CATEGORIES.map(cat => (
                              <SelectItem key={cat.value} value={cat.value}>
                                <div>
                                  <div className="font-medium">{cat.label}</div>
                                  <div className="text-xs text-muted-foreground">{cat.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Target Role</label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map(r => (
                              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={generateQuestion} size="lg" className="w-full" disabled={isLoadingQuestion}>
                      {isLoadingQuestion ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Start Practice Session
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Question & Answer Panel */}
              {currentQuestion && (
                <Card className="border-2 border-primary/20">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <Badge>Question {questionNumber}</Badge>
                      <Badge variant="outline">{INTERVIEW_CATEGORIES.find(c => c.value === category)?.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    {/* Interviewer Question */}
                    <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                      <p className="text-sm text-muted-foreground mb-1">Interviewer</p>
                      <p className="text-lg">{currentQuestion}</p>
                    </div>

                    {/* Answer Input */}
                    {!evaluation && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Answer</label>
                          <Textarea
                            placeholder="Type your answer here... Use the STAR method: Situation, Task, Action, Result"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={6}
                            className="resize-none"
                          />
                          <p className="text-xs text-muted-foreground">
                            Tip: Be specific, use metrics, and translate military experience to civilian terms.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            onClick={evaluateAnswer} 
                            className="flex-1"
                            disabled={!answer.trim() || isEvaluating}
                          >
                            {isEvaluating ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                            )}
                            Submit & Get Feedback
                          </Button>
                          <Button variant="outline" onClick={resetSession}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Evaluation Results */}
                    {evaluation && (
                      <div className="space-y-6">
                        {/* Score */}
                        <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Award className={cn(
                              "w-8 h-8",
                              evaluation.score >= 8 ? "text-green-500" :
                              evaluation.score >= 6 ? "text-yellow-500" : "text-red-500"
                            )} />
                          </div>
                          <div className="text-5xl font-bold">{evaluation.score}</div>
                          <div className="text-sm text-muted-foreground">out of 10</div>
                          <Progress 
                            value={evaluation.score * 10} 
                            className="h-2 mt-4 max-w-xs mx-auto"
                          />
                        </div>

                        {/* Strengths */}
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2 text-green-500">
                            <CheckCircle2 className="w-4 h-4" />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {evaluation.strengths.map((s, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-green-500">•</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Improvements */}
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2 text-yellow-500">
                            <XCircle className="w-4 h-4" />
                            Areas to Improve
                          </h4>
                          <ul className="space-y-1">
                            {evaluation.improvements.map((s, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Better Answer */}
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-green-500" />
                            Suggested Stronger Answer
                          </h4>
                          <p className="text-sm text-muted-foreground">{evaluation.betterAnswer}</p>
                        </div>

                        {/* Tip */}
                        <Alert className="border-primary/30 bg-primary/5">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <AlertDescription>
                            <strong>Pro Tip:</strong> {evaluation.tip}
                          </AlertDescription>
                        </Alert>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button onClick={nextQuestion} className="flex-1">
                            Next Question
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline" onClick={resetSession}>
                            End Session
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Session History */}
            <TabsContent value="history" className="space-y-4">
              {sessionResults.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold mb-2">No Practice Sessions Yet</h3>
                    <p className="text-sm text-muted-foreground">Complete some practice questions to see your history here.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
                    <CardContent className="py-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">Session Summary</h3>
                          <p className="text-sm text-muted-foreground">
                            {sessionResults.length} questions completed
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{averageScore.toFixed(1)}</div>
                          <p className="text-xs text-muted-foreground">Average Score</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {sessionResults.map((result, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge>Question {i + 1}</Badge>
                          <Badge variant={result.evaluation.score >= 7 ? "default" : "secondary"}>
                            Score: {result.evaluation.score}/10
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Question:</p>
                          <p className="text-sm">{result.question}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Your Answer:</p>
                          <p className="text-sm bg-muted/50 p-2 rounded">{result.answer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Key Feedback:</p>
                          <p className="text-sm text-primary">{result.evaluation.tip}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

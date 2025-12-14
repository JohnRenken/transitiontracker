import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { calculatePhase, getPhaseLabel, getPhaseRecommendation } from '@/lib/ets-calculator';
import { differenceInDays, format } from 'date-fns';
import { Calendar, CheckCircle2, Clock, Target, TrendingUp, ArrowRight, Flame } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();
  
  const etsDate = profile?.ets_date ? new Date(profile.ets_date) : null;
  const daysUntilETS = etsDate ? differenceInDays(etsDate, new Date()) : null;
  const currentPhase = etsDate ? calculatePhase(etsDate) : null;
  const phaseLabel = currentPhase ? getPhaseLabel(currentPhase) : 'Set your ETS date';
  const recommendation = currentPhase ? getPhaseRecommendation(currentPhase) : 'Start by setting your ETS date in the calculator.';

  const weeklyScore = 75;
  const streak = 7;
  const tasksCompleted = 12;
  const totalTasks = 20;

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!</h1>
          <p className="text-muted-foreground mt-1">Here's your transition status</p>
        </div>
        <Link to="/plan">
          <Button variant="hero" size="lg">
            Do the Next Task <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Days Until ETS</p>
                <p className="font-display text-4xl font-bold text-primary">{daysUntilETS ?? '—'}</p>
              </div>
              <Calendar className="w-10 h-10 text-primary/50" />
            </div>
            {etsDate && <p className="text-xs text-muted-foreground mt-2">{format(etsDate, 'MMM d, yyyy')}</p>}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Phase</p>
                <p className="font-display text-lg font-bold text-accent">{phaseLabel}</p>
              </div>
              <Target className="w-10 h-10 text-accent/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/20 to-success/5 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Score</p>
                <p className="font-display text-4xl font-bold text-success">{weeklyScore}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-success/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
                <p className="font-display text-4xl font-bold text-warning">{streak}</p>
              </div>
              <Flame className="w-10 h-10 text-warning/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Today's Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Phase Recommendation</p>
              <p className="font-medium">{recommendation}</p>
            </div>
            <div className="space-y-3">
              {['Update LinkedIn headline', 'Send 3 networking messages', 'Review job postings'].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="font-display text-5xl font-bold">{tasksCompleted}/{totalTasks}</p>
              <p className="text-sm text-muted-foreground">tasks completed</p>
            </div>
            <Progress value={(tasksCompleted / totalTasks) * 100} className="h-3" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link to="/calculator" className="block">
                <Button variant="outline" className="w-full">ETS Calculator</Button>
              </Link>
              <Link to="/sales" className="block">
                <Button variant="accent" className="w-full">Why Sales?</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Disclaimer: This platform provides general guidance only. Verify all information with your command, TAP counselor, and official sources.
      </p>
    </div>
  );
}

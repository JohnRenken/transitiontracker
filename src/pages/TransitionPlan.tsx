import { useState, useMemo } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Plus, 
  Calendar, 
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTasks } from '@/hooks/useUserTasks';
import { DEFAULT_TASKS, CATEGORY_INFO, getTasksByPhase, type DefaultTask } from '@/lib/transition-tasks';
import { PHASE_LABELS, type TransitionPhase } from '@/types/database';
import { calculatePhase, getPhaseLabel, getPhaseRecommendation } from '@/lib/ets-calculator';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';

const PHASE_ORDER: TransitionPhase[] = [
  '12_to_9_months',
  '9_to_6_months',
  '6_to_3_months',
  '90_to_30_days',
  'terminal_ptdy',
  'post_ets',
];

export default function TransitionPlan() {
  const { profile } = useAuth();
  const { tasks: userTasks, isLoading, addTask, toggleTask, deleteTask } = useUserTasks();
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [selectedPhase, setSelectedPhase] = useState<TransitionPhase | 'all'>('all');

  const etsDate = profile?.ets_date ? new Date(profile.ets_date) : null;
  const currentPhase = etsDate ? calculatePhase(etsDate) : '12_to_9_months';

  // Get user's added task IDs to check which default tasks are already added
  const addedTaskIds = new Set(userTasks.map(t => t.task_id));

  // Calculate progress by phase
  const phaseProgress = useMemo(() => {
    const progress: Record<TransitionPhase, { total: number; completed: number }> = {
      '12_to_9_months': { total: 0, completed: 0 },
      '9_to_6_months': { total: 0, completed: 0 },
      '6_to_3_months': { total: 0, completed: 0 },
      '90_to_30_days': { total: 0, completed: 0 },
      'terminal_ptdy': { total: 0, completed: 0 },
      'post_ets': { total: 0, completed: 0 },
    };

    userTasks.forEach(task => {
      // Find the default task to get its phase
      const defaultTask = DEFAULT_TASKS.find(dt => dt.id === task.task_id);
      if (defaultTask) {
        progress[defaultTask.phase].total++;
        if (task.completed) {
          progress[defaultTask.phase].completed++;
        }
      }
    });

    return progress;
  }, [userTasks]);

  const overallProgress = useMemo(() => {
    const total = userTasks.length;
    const completed = userTasks.filter(t => t.completed).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [userTasks]);

  const handleAddTask = async (defaultTask: DefaultTask) => {
    if (!etsDate) return;
    
    const dueDate = subDays(etsDate, defaultTask.dueOffsetDays);
    
    await addTask.mutateAsync({
      task_id: defaultTask.id,
      title: defaultTask.title,
      description: defaultTask.description,
      due_date: format(dueDate, 'yyyy-MM-dd'),
      completed: false,
      completed_at: null,
      notes: null,
    });
  };

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    await toggleTask.mutateAsync({ taskId, completed: !currentStatus });
  };

  const toggleExpanded = (taskId: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const filteredTasks = selectedPhase === 'all' 
    ? DEFAULT_TASKS 
    : getTasksByPhase(selectedPhase);

  const getUserTask = (defaultTaskId: string) => {
    return userTasks.find(t => t.task_id === defaultTaskId);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold">Transition Plan</h1>
            <p className="text-muted-foreground">
              Your 24-month backwards plan to civilian success
            </p>
          </div>

          {/* No ETS Date Warning */}
          {!etsDate && (
            <Alert className="border-yellow-500/50 bg-yellow-500/10">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription>
                Set your ETS date in your profile to get personalized due dates for each task.
              </AlertDescription>
            </Alert>
          )}

          {/* Progress Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Progress value={overallProgress} className="flex-1 h-3" />
                  <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {userTasks.filter(t => t.completed).length} of {userTasks.length} tasks completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Current Phase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{getPhaseLabel(currentPhase)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getPhaseRecommendation(currentPhase).slice(0, 80)}...
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Phase Progress Bars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress by Phase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {PHASE_ORDER.map((phase) => {
                const { total, completed } = phaseProgress[phase];
                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                const isCurrent = phase === currentPhase;
                
                return (
                  <div key={phase} className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-colors",
                    isCurrent && "bg-primary/5 border border-primary/20"
                  )}>
                    <div className="w-32 text-sm font-medium truncate">
                      {PHASE_LABELS[phase]}
                    </div>
                    <Progress value={percent} className="flex-1 h-2" />
                    <div className="w-16 text-right text-sm text-muted-foreground">
                      {completed}/{total}
                    </div>
                    {isCurrent && (
                      <Badge variant="outline" className="border-primary text-primary text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Phase Tabs */}
          <Tabs value={selectedPhase} onValueChange={(v) => setSelectedPhase(v as TransitionPhase | 'all')}>
            <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              {PHASE_ORDER.map((phase) => (
                <TabsTrigger 
                  key={phase} 
                  value={phase} 
                  className={cn(
                    "text-xs",
                    phase === currentPhase && "ring-1 ring-primary"
                  )}
                >
                  {PHASE_LABELS[phase]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedPhase} className="mt-6 space-y-4">
              {/* Group tasks by phase when showing all */}
              {selectedPhase === 'all' ? (
                PHASE_ORDER.map((phase) => {
                  const phaseTasks = getTasksByPhase(phase);
                  const isCurrent = phase === currentPhase;
                  
                  return (
                    <Card key={phase} className={cn(
                      isCurrent && "ring-1 ring-primary"
                    )}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {PHASE_LABELS[phase]}
                            {isCurrent && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                You are here
                              </Badge>
                            )}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {phaseTasks.length} tasks
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {phaseTasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            defaultTask={task}
                            userTask={getUserTask(task.id)}
                            isAdded={addedTaskIds.has(task.id)}
                            isExpanded={expandedTasks.has(task.id)}
                            onToggleExpand={() => toggleExpanded(task.id)}
                            onAdd={() => handleAddTask(task)}
                            onToggle={(id, status) => handleToggleTask(id, status)}
                            etsDate={etsDate}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{PHASE_LABELS[selectedPhase]}</CardTitle>
                    <CardDescription>{getPhaseRecommendation(selectedPhase)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {filteredTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        defaultTask={task}
                        userTask={getUserTask(task.id)}
                        isAdded={addedTaskIds.has(task.id)}
                        isExpanded={expandedTasks.has(task.id)}
                        onToggleExpand={() => toggleExpanded(task.id)}
                        onAdd={() => handleAddTask(task)}
                        onToggle={(id, status) => handleToggleTask(id, status)}
                        etsDate={etsDate}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <Alert className="border-muted">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Disclaimer:</strong> This transition plan is for guidance only. Verify requirements with your command and TAP counselor. Based on best practices from Military-Transition.org and DoD guidance.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
}

// Task Item Component
interface TaskItemProps {
  defaultTask: DefaultTask;
  userTask?: { id: string; completed: boolean; notes: string | null };
  isAdded: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAdd: () => void;
  onToggle: (taskId: string, currentStatus: boolean) => void;
  etsDate: Date | null;
}

function TaskItem({ defaultTask, userTask, isAdded, isExpanded, onToggleExpand, onAdd, onToggle, etsDate }: TaskItemProps) {
  const categoryInfo = CATEGORY_INFO[defaultTask.category];
  const dueDate = etsDate ? subDays(etsDate, defaultTask.dueOffsetDays) : null;
  
  return (
    <div className={cn(
      "border rounded-lg transition-all",
      userTask?.completed && "opacity-60 bg-muted/30"
    )}>
      <div className="p-3 flex items-start gap-3">
        {isAdded ? (
          <Checkbox
            checked={userTask?.completed}
            onCheckedChange={() => onToggle(userTask!.id, userTask!.completed)}
            className="mt-0.5"
          />
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 shrink-0"
            onClick={onAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <button
              onClick={onToggleExpand}
              className="flex items-center gap-2 text-left hover:text-primary transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
              <span className={cn(
                "font-medium",
                userTask?.completed && "line-through"
              )}>
                {defaultTask.title}
              </span>
            </button>
            
            <div className="flex items-center gap-2 shrink-0">
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ borderColor: categoryInfo.color.replace('bg-', '') }}
              >
                {categoryInfo.label}
              </Badge>
              {dueDate && (
                <Badge variant="secondary" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(dueDate, 'MMM d')}
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{defaultTask.description}</p>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-3 pb-3 pt-0 space-y-3 ml-8">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary">Why it matters</p>
                <p className="text-sm text-muted-foreground">{defaultTask.whyItMatters}</p>
              </div>
            </div>
          </div>
          
          {defaultTask.resources && defaultTask.resources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {defaultTask.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  {resource.label}
                </a>
              ))}
            </div>
          )}
          
          {!isAdded && (
            <Button onClick={onAdd} size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add to My Plan
            </Button>
          )}
          
          {isAdded && userTask?.completed && (
            <div className="flex items-center gap-2 text-sm text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </div>
          )}
        </div>
      )}
    </div>
  );
}

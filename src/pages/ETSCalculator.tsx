import { useState, useMemo, useRef } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Briefcase,
  Plane,
  GraduationCap,
  Info
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { RANK_DATA, TRANSITION_WINDOW_DAYS, CATEGORY_CAPS } from '@/lib/rank-caps';
import { calculateETSTimeline, formatDateDisplay, type ETSTimelineResult } from '@/lib/ets-timeline';

export default function ETSCalculator() {
  const [etsDate, setEtsDate] = useState<Date | undefined>();
  const [terminalDays, setTerminalDays] = useState<string>('60');
  const [ptdyDays, setPtdyDays] = useState<string>('10');
  const [cspDays, setCspDays] = useState<string>('90');
  const [rank, setRank] = useState<string>('E-5 (SGT)');
  const timelineRef = useRef<HTMLDivElement>(null);

  const timeline = useMemo<ETSTimelineResult | null>(() => {
    if (!etsDate) return null;
    
    return calculateETSTimeline({
      etsDate,
      terminalDays: parseFloat(terminalDays) || 0,
      ptdyDays: parseFloat(ptdyDays) || 0,
      requestedCspDays: parseFloat(cspDays) || 0,
      rank,
    });
  }, [etsDate, terminalDays, ptdyDays, cspDays, rank]);

  const selectedRankInfo = RANK_DATA.find(r => r.rank === rank);

  const handleExportPDF = () => {
    if (!timeline || !timelineRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ETS Timeline - From Service To Success</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1e3a5f; border-bottom: 3px solid #c9a227; padding-bottom: 12px; }
            h2 { color: #1e3a5f; margin-top: 24px; }
            .timeline-item { display: flex; justify-content: space-between; padding: 12px; margin: 8px 0; background: #f8f9fa; border-left: 4px solid #c9a227; }
            .label { font-weight: 600; }
            .date { color: #666; }
            .warning { background: #fff3cd; border-left-color: #ffc107; padding: 12px; margin: 12px 0; }
            .error { background: #f8d7da; border-left-color: #dc3545; }
            .info { background: #e7f3ff; border-left-color: #0d6efd; padding: 16px; margin: 16px 0; }
            .disclaimer { margin-top: 40px; padding: 16px; background: #f0f0f0; font-size: 12px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #1e3a5f; color: white; }
          </style>
        </head>
        <body>
          <h1>ETS Transition Timeline</h1>
          <p>Generated: ${format(new Date(), 'MMMM d, yyyy')}</p>
          
          <div class="info">
            <strong>Key Stats:</strong><br>
            Days until ETS: ${timeline.daysUntilETS}<br>
            Days until Last Day of Work: ${timeline.daysUntilLastDay}<br>
            Rank: ${rank} (Category ${selectedRankInfo?.category}, Max ${selectedRankInfo?.maxCspDays} CSP days)
          </div>
          
          <h2>Your Timeline</h2>
          <table>
            <tr><th>Phase</th><th>Start Date</th><th>End Date</th><th>Days</th></tr>
            ${timeline.allowedCspDays > 0 ? `
            <tr>
              <td>CSP/SkillBridge</td>
              <td>${formatDateDisplay(timeline.cspStart)}</td>
              <td>${formatDateDisplay(timeline.cspEnd)}</td>
              <td>${timeline.allowedCspDays}</td>
            </tr>` : ''}
            ${timeline.ptdyDays > 0 ? `
            <tr>
              <td>PTDY</td>
              <td>${formatDateDisplay(timeline.ptdyStart)}</td>
              <td>${formatDateDisplay(timeline.ptdyEnd)}</td>
              <td>${timeline.ptdyDays}</td>
            </tr>` : ''}
            <tr>
              <td>Terminal Leave</td>
              <td>${formatDateDisplay(timeline.terminalStart)}</td>
              <td>${formatDateDisplay(timeline.terminalEnd)}</td>
              <td>${timeline.terminalDays}</td>
            </tr>
          </table>
          
          <h2>Critical Dates</h2>
          <div class="timeline-item">
            <span class="label">Last Day of Work</span>
            <span class="date">${formatDateDisplay(timeline.lastDayOfWork)}</span>
          </div>
          <div class="timeline-item">
            <span class="label">180-Day Window Opens</span>
            <span class="date">${formatDateDisplay(timeline.windowStartDate)}</span>
          </div>
          <div class="timeline-item">
            <span class="label">ETS Date</span>
            <span class="date">${formatDateDisplay(timeline.etsDate)}</span>
          </div>
          
          ${timeline.warnings.length > 0 ? `
          <h2>Warnings</h2>
          ${timeline.warnings.map(w => `
            <div class="${w.type === 'error' ? 'warning error' : 'warning'}">
              ${w.message}
            </div>
          `).join('')}
          ` : ''}
          
          <div class="disclaimer">
            <strong>Disclaimer:</strong> This timeline is for planning purposes only. Always verify dates with your command, TAP counselor, and official Army guidance. Rules and regulations may vary by installation and change over time.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold">ETS Calculator</h1>
            <p className="text-muted-foreground">Plan your transition timeline within the 180-day window</p>
          </div>

          {/* Info Banner */}
          <Alert className="border-primary/30 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertTitle>The 180-Day Rule</AlertTitle>
            <AlertDescription>
              All transition activities (CSP/SkillBridge, PTDY, Terminal Leave) must fit within the last 180 days before your ETS date. 
              CSP duration is capped by rank category.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  Your Information
                </CardTitle>
                <CardDescription>Enter your transition details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ETS Date */}
                <div className="space-y-2">
                  <Label>ETS Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !etsDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {etsDate ? format(etsDate, "PPP") : "Select your ETS date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={etsDate}
                        onSelect={setEtsDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Rank */}
                <div className="space-y-2">
                  <Label>Current Rank</Label>
                  <Select value={rank} onValueChange={setRank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {RANK_DATA.map((r) => (
                        <SelectItem key={r.rank} value={r.rank}>
                          {r.rank} (Cat {r.category}: max {r.maxCspDays} days)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedRankInfo && (
                    <p className="text-xs text-muted-foreground">
                      Category {selectedRankInfo.category}: Up to {selectedRankInfo.maxCspDays} days CSP/SkillBridge
                    </p>
                  )}
                </div>

                <Separator />

                {/* Days Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="terminal">Terminal Leave (days)</Label>
                    <Input
                      id="terminal"
                      type="number"
                      step="0.5"
                      min="0"
                      max="120"
                      value={terminalDays}
                      onChange={(e) => setTerminalDays(e.target.value)}
                      placeholder="e.g., 60"
                    />
                    <p className="text-xs text-muted-foreground">Your accrued leave</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ptdy">PTDY (days)</Label>
                    <Input
                      id="ptdy"
                      type="number"
                      step="0.5"
                      min="0"
                      max="30"
                      value={ptdyDays}
                      onChange={(e) => setPtdyDays(e.target.value)}
                      placeholder="e.g., 10"
                    />
                    <p className="text-xs text-muted-foreground">If approved</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="csp">CSP/SkillBridge (days requested)</Label>
                  <Input
                    id="csp"
                    type="number"
                    step="0.5"
                    min="0"
                    max="180"
                    value={cspDays}
                    onChange={(e) => setCspDays(e.target.value)}
                    placeholder="e.g., 90"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max allowed: {selectedRankInfo?.maxCspDays || 120} days for your rank
                  </p>
                </div>

                {/* Rank Cap Reference */}
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h4 className="font-semibold text-sm mb-3">Army CSP Duration Caps</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Category I (E1-E5)</span>
                      <Badge variant="outline">120 days max</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Category II (E6-E7, WO1-CW3, O1-O3)</span>
                      <Badge variant="outline">90 days max</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Category III (E8+, CW4+, O4+)</span>
                      <Badge variant="outline">60 days max</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6" ref={timelineRef}>
              {timeline ? (
                <>
                  {/* Warnings */}
                  {timeline.warnings.length > 0 && (
                    <div className="space-y-3">
                      {timeline.warnings.map((warning, i) => (
                        <Alert key={i} variant={warning.type === 'error' ? 'destructive' : 'default'} className={warning.type === 'warning' ? 'border-yellow-500/50 bg-yellow-500/10' : ''}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>{warning.type === 'error' ? 'Error' : 'Warning'}</AlertTitle>
                          <AlertDescription>{warning.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <CardContent className="pt-6 text-center">
                        <div className="text-4xl font-bold text-primary">{timeline.daysUntilETS}</div>
                        <p className="text-sm text-muted-foreground mt-1">Days until ETS</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                      <CardContent className="pt-6 text-center">
                        <div className="text-4xl font-bold text-accent">{Math.max(0, timeline.daysUntilLastDay)}</div>
                        <p className="text-sm text-muted-foreground mt-1">Days until Last Day</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Your Timeline</CardTitle>
                        <CardDescription>Calculated backwards from ETS</CardDescription>
                      </div>
                      <Button onClick={handleExportPDF} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 180-Day Window */}
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">180-Day Window Opens</span>
                            <span className="text-sm">{formatDateDisplay(timeline.windowStartDate)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Transition activities can begin</p>
                        </div>
                      </div>

                      {/* Last Day of Work */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-accent bg-accent/5">
                        <Briefcase className="w-5 h-5 text-accent mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Last Day of Work</span>
                            <Badge variant="outline" className="border-accent text-accent">{formatDateDisplay(timeline.lastDayOfWork)}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Your final day before transition begins</p>
                        </div>
                      </div>

                      {/* CSP/SkillBridge */}
                      {timeline.allowedCspDays > 0 && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <GraduationCap className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">CSP/SkillBridge</span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{timeline.allowedCspDays} days</Badge>
                            </div>
                            <p className="text-sm">{formatDateDisplay(timeline.cspStart)} → {formatDateDisplay(timeline.cspEnd)}</p>
                            {timeline.requestedCspDays > timeline.allowedCspDays && (
                              <p className="text-xs text-yellow-500 mt-1">
                                Requested {timeline.requestedCspDays} days, allowed {timeline.allowedCspDays} days
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* PTDY */}
                      {timeline.ptdyDays > 0 && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <Plane className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">PTDY</span>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{timeline.ptdyDays} days</Badge>
                            </div>
                            <p className="text-sm">{formatDateDisplay(timeline.ptdyStart)} → {formatDateDisplay(timeline.ptdyEnd)}</p>
                          </div>
                        </div>
                      )}

                      {/* Terminal Leave */}
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <CalendarDays className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Terminal Leave</span>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{timeline.terminalDays} days</Badge>
                          </div>
                          <p className="text-sm">{formatDateDisplay(timeline.terminalStart)} → {formatDateDisplay(timeline.terminalEnd)}</p>
                        </div>
                      </div>

                      {/* ETS Date */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary bg-primary/5">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">ETS Date</span>
                            <Badge variant="outline" className="border-primary text-primary">{formatDateDisplay(timeline.etsDate)}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">End of service obligation</p>
                        </div>
                      </div>

                      {/* Summary Stats */}
                      <Separator className="my-4" />
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-semibold">{TRANSITION_WINDOW_DAYS}</div>
                          <div className="text-xs text-muted-foreground">Window Days</div>
                        </div>
                        <div>
                          <div className="font-semibold">{timeline.terminalDays + timeline.ptdyDays + timeline.allowedCspDays}</div>
                          <div className="text-xs text-muted-foreground">Days Used</div>
                        </div>
                        <div>
                          <div className="font-semibold">{timeline.remainingForTraining}</div>
                          <div className="text-xs text-muted-foreground">Available for CSP</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Disclaimer */}
                  <Alert className="border-muted">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Disclaimer:</strong> This calculator is for planning purposes only. Verify all dates with your command, TAP counselor, and official Army guidance. 
                      <a href="https://www.army.mil/article/284575" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        Army CSP Policy (Apr 2025)
                      </a>
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold mb-2">Enter Your ETS Date</h3>
                    <p className="text-sm text-muted-foreground">Select your ETS date to generate your personalized timeline</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

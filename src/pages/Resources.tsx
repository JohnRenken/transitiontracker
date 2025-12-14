import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Heart, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Clock,
  Shield,
  DollarSign,
  Stethoscope,
  ClipboardList,
  BookOpen,
  Users,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'guide' | 'tool' | 'organization' | 'official';
}

const VA_RESOURCES: Resource[] = [
  { title: 'VA.gov Benefits', description: 'Official VA benefits portal', url: 'https://www.va.gov/disability/', type: 'official' },
  { title: 'eBenefits', description: 'Manage your VA benefits online', url: 'https://www.ebenefits.va.gov', type: 'official' },
  { title: 'VA Health Care', description: 'Enroll in VA health care', url: 'https://www.va.gov/health-care/', type: 'official' },
  { title: 'MyHealtheVet', description: 'VA patient portal', url: 'https://www.myhealth.va.gov', type: 'tool' },
];

const VSO_RESOURCES: Resource[] = [
  { title: 'DAV (Disabled American Veterans)', description: 'Free claims assistance', url: 'https://www.dav.org', type: 'organization' },
  { title: 'VFW', description: 'Veterans of Foreign Wars claims help', url: 'https://www.vfw.org', type: 'organization' },
  { title: 'American Legion', description: 'Accredited claims representatives', url: 'https://www.legion.org', type: 'organization' },
  { title: 'Find a VSO', description: 'VA accredited representative locator', url: 'https://www.va.gov/vso/', type: 'tool' },
];

const BDD_TIMELINE = [
  { days: '180-90', title: 'BDD Window Opens', description: 'You can file a BDD claim 180-90 days before separation. This is the sweet spot.' },
  { days: '90-1', title: 'Standard Claim', description: 'Less than 90 days? You can still file but it becomes a standard claim, not BDD.' },
  { days: 'Before 180', title: 'Too Early', description: 'Cannot file BDD more than 180 days out. Use this time to document conditions.' },
];

const CP_EXAM_TIPS = [
  { title: 'Document Everything', description: 'Bring a personal statement, buddy letters, and all relevant medical records. The examiner may not have your full file.' },
  { title: 'Describe Your Worst Day', description: 'Do not downplay symptoms. Describe how conditions affect you on your worst days, not your best.' },
  { title: 'Be Specific with Ranges', description: 'When asked about range of motion or pain, be precise. "It hurts when I..." is better than "sometimes it hurts."' },
  { title: 'Mention Flare-Ups', description: 'If you have flare-ups, explain their frequency, duration, and how they limit you. This matters for ratings.' },
  { title: 'Connect to Service', description: 'Explain how each condition relates to your military service, even if it seems obvious.' },
  { title: 'Bring a Witness', description: 'A spouse or family member can wait in the lobby and observe how you look after the exam—useful if you need to appeal.' },
];

const RATING_INFO = [
  { rating: '0%', monthly: '$0', description: 'Service-connected but not compensable. Still access to VA healthcare.' },
  { rating: '10%', monthly: '~$171', description: 'Lowest compensable rating. Qualifies for VA healthcare Priority Group 3.' },
  { rating: '30%', monthly: '~$524', description: 'Additional compensation for dependents begins at 30%.' },
  { rating: '50%', monthly: '~$1,075', description: 'Significant disability. Many state benefits unlock at 50%.' },
  { rating: '70%', monthly: '~$1,716', description: 'Considered substantially disabled. More state/federal benefits.' },
  { rating: '100%', monthly: '~$3,737+', description: 'Full disability compensation. Access to CHAMPVA, DEA benefits, property tax exemptions (varies by state).' },
  { rating: '100% P&T', monthly: '~$3,737+', description: 'Permanent and Total. No future exams. Unlocks maximum benefits including ChampVA for dependents.' },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold">Resources</h1>
            <p className="text-muted-foreground">
              Essential guides, tools, and support for your transition
            </p>
          </div>

          <Tabs defaultValue="disability" className="space-y-6">
            <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="disability" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Medical & Disability
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Education
              </TabsTrigger>
            </TabsList>

            {/* DISABILITY TAB */}
            <TabsContent value="disability" className="space-y-6">
              {/* Importance Alert */}
              <Alert className="border-red-500/30 bg-red-500/5">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-500">Critical: File Before You Separate</AlertTitle>
                <AlertDescription>
                  Filing your VA disability claim through the BDD program (180-90 days before ETS) is one of the most important things you can do. 
                  A 30% rating alone is worth over $6,000/year for life. Do not leave money on the table.
                </AlertDescription>
              </Alert>

              {/* BDD Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Benefits Delivery at Discharge (BDD)
                  </CardTitle>
                  <CardDescription>
                    File your claim 180-90 days before separation for faster processing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {BDD_TIMELINE.map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "p-4 rounded-lg border",
                          i === 0 && "border-green-500/50 bg-green-500/5"
                        )}
                      >
                        <Badge className={cn(
                          "mb-2",
                          i === 0 ? "bg-green-500" : "bg-muted text-muted-foreground"
                        )}>
                          {item.days} Days
                        </Badge>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h4 className="font-semibold mb-2">BDD Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Be 180-90 days from separation date
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Have a known separation date
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Be available for VA exams before separation
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Provide a copy of your service treatment records
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* C&P Exam Prep */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-500" />
                    C&P Exam Preparation
                  </CardTitle>
                  <CardDescription>
                    The Compensation & Pension exam determines your rating. Preparation is critical.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {CP_EXAM_TIPS.map((tip, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rating Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    VA Disability Ratings & Compensation
                  </CardTitle>
                  <CardDescription>
                    2024 rates for veterans without dependents (rates increase with dependents at 30%+)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RATING_INFO.map((info, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                        <Badge 
                          className={cn(
                            "w-16 justify-center",
                            info.rating === '100% P&T' && "bg-green-500",
                            info.rating === '100%' && "bg-green-600",
                            info.rating === '70%' && "bg-blue-500",
                          )}
                        >
                          {info.rating}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-500">{info.monthly}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Rates are approximate and updated annually. Check VA.gov for current rates.
                  </p>
                </CardContent>
              </Card>

              {/* VSO Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Get Help: Veterans Service Organizations (VSOs)
                  </CardTitle>
                  <CardDescription>
                    Free accredited representatives who help file and fight for your claims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 border-blue-500/30 bg-blue-500/5">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertDescription>
                      VSOs are FREE and can significantly increase your chances of a successful claim. 
                      They know the system and can represent you at no cost.
                    </AlertDescription>
                  </Alert>
                  <div className="grid md:grid-cols-2 gap-4">
                    {VSO_RESOURCES.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Conditions FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Commonly Claimed Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="tinnitus">
                      <AccordionTrigger>Tinnitus (Ringing in Ears)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          One of the most common claims. If you were exposed to loud noises (weapons, engines, aircraft), 
                          you likely qualify. Maximum rating is 10%, but it often leads to secondary conditions like hearing loss and mental health issues.
                        </p>
                        <Badge variant="outline">Max Rating: 10%</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="hearing">
                      <AccordionTrigger>Hearing Loss</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Rated based on audiometric testing. Even mild hearing loss can be service-connected. 
                          Often claimed with tinnitus.
                        </p>
                        <Badge variant="outline">Rating: 0-100%</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="back">
                      <AccordionTrigger>Back & Spine Conditions</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Very common due to carrying gear, jumping, vehicle operations. Rated on range of motion and incapacitating episodes. 
                          Can have secondary conditions (radiculopathy in legs).
                        </p>
                        <Badge variant="outline">Rating: 10-100%</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="knee">
                      <AccordionTrigger>Knee Conditions</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Running, rucking, and jumping take a toll. Each knee is rated separately. 
                          Instability and limited motion can be rated separately for the same knee.
                        </p>
                        <Badge variant="outline">Rating: 0-60% per knee</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mental">
                      <AccordionTrigger>Mental Health (PTSD, Anxiety, Depression)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Does not require combat exposure. Stressful military service, MST, or traumatic events qualify. 
                          All mental health conditions are rated together under one rating (General Rating Formula for Mental Disorders).
                        </p>
                        <Badge variant="outline">Rating: 0-100%</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sleep">
                      <AccordionTrigger>Sleep Apnea</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Common among veterans. If you need a CPAP machine, that is 50%. Can be secondary to PTSD, weight gain from other conditions, or nasal/sinus issues.
                        </p>
                        <Badge variant="outline">Rating: 0-100% (50% with CPAP)</Badge>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Official VA Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Official VA Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {VA_RESOURCES.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h4>
                              <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BENEFITS TAB */}
            <TabsContent value="benefits" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Benefits Overview</CardTitle>
                  <CardDescription>Key benefits available to transitioning service members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Benefits content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EDUCATION TAB */}
            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education Benefits</CardTitle>
                  <CardDescription>GI Bill, VR&E, and other education resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Education content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <Alert className="border-muted">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal or medical advice. 
              Always verify information with official VA sources and consult with accredited VSOs or attorneys for claims assistance.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
}

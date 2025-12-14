import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Linkedin, 
  Users, 
  MessageSquare, 
  Target, 
  CheckCircle2, 
  Lightbulb,
  UserPlus,
  Building2,
  Calendar,
  Search,
  Bell,
  FileText,
  ArrowRight,
  Star
} from "lucide-react";

const LinkedInNetworking = () => {
  const profileOptimization = [
    {
      section: "Headline",
      tip: "Don't just list your rank/MOS. Lead with value.",
      bad: "Former Army E-7 | Infantry",
      good: "Operations Leader | 15+ Years Building High-Performance Teams | Seeking Sales Leadership Roles"
    },
    {
      section: "About Section",
      tip: "Tell your transition story in 3 paragraphs: Military background, transferable skills, what you're looking for.",
      bad: "20 years Army. Looking for work.",
      good: "After 20 years leading soldiers in high-stakes environments, I'm transitioning my expertise in team development, strategic planning, and mission execution to the private sector..."
    },
    {
      section: "Experience",
      tip: "Translate military jargon to civilian terms. Focus on outcomes and metrics.",
      bad: "Conducted PT and maintained weapons systems",
      good: "Led daily training programs for 40+ personnel, achieving 98% readiness rating and zero safety incidents over 3-year period"
    },
    {
      section: "Skills",
      tip: "Add civilian-relevant skills. Ask connections to endorse them.",
      skills: ["Leadership", "Team Building", "Project Management", "Strategic Planning", "Risk Management", "Training & Development", "Operations Management", "Crisis Management"]
    }
  ];

  const networkingStrategies = [
    {
      title: "The 5-3-1 Daily Method",
      icon: Target,
      description: "Consistent daily action beats sporadic effort",
      steps: [
        "5 new connection requests to people in your target industry",
        "3 meaningful comments on posts from industry leaders",
        "1 original post sharing insights or asking questions"
      ]
    },
    {
      title: "Warm Outreach Template",
      icon: MessageSquare,
      description: "How to message someone you don't know",
      template: `Hi [Name],

I came across your profile while researching [industry/company]. As a [rank] transitioning from [branch] after [X] years, I'm exploring opportunities in [field].

I noticed you [specific observation about their background/post]. Would you have 15 minutes for a virtual coffee to share your perspective on breaking into [industry]?

Respectfully,
[Your Name]`
    },
    {
      title: "Fellow Veteran Network",
      icon: Users,
      description: "Veterans help veterans - leverage this community",
      tips: [
        "Search 'veteran' + your target company",
        "Join veteran-focused LinkedIn groups",
        "Mention military service in connection requests",
        "Ask about veteran ERGs (Employee Resource Groups)"
      ]
    }
  ];

  const contentIdeas = [
    {
      type: "Transition Updates",
      example: "Week 8 of my transition journey: Just completed [certification]. Here's what I learned about [topic]...",
      engagement: "High - shows growth mindset"
    },
    {
      type: "Leadership Lessons",
      example: "The best leadership lesson I learned as a [rank] that applies to business: [insight]...",
      engagement: "Very High - universal appeal"
    },
    {
      type: "Gratitude Posts",
      example: "Grateful for the mentors helping me transition. Special thanks to @[name] who taught me about [topic]...",
      engagement: "High - builds relationships"
    },
    {
      type: "Industry Questions",
      example: "Sales leaders: What's the one skill you wish you'd developed earlier in your career?",
      engagement: "Very High - invites engagement"
    },
    {
      type: "Milestone Celebrations",
      example: "Excited to announce I've started my new role at [company]! Thank you to everyone who supported my transition...",
      engagement: "Very High - community celebration"
    }
  ];

  const veteranGroups = [
    { name: "Veteran Mentor Network", members: "50K+", focus: "Career mentorship" },
    { name: "Military Veterans in Sales", members: "25K+", focus: "Sales careers" },
    { name: "Hire Heroes USA", members: "40K+", focus: "Job placement" },
    { name: "American Corporate Partners", members: "30K+", focus: "Executive mentoring" },
    { name: "Veterati", members: "20K+", focus: "1-on-1 mentorship" },
    { name: "LinkedIn Veterans Program", members: "100K+", focus: "Premium access & training" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[hsl(217,91%,20%)] via-[hsl(217,91%,30%)] to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Linkedin className="w-8 h-8 text-white" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm">
              Essential Networking Guide
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Military Networking
            <span className="block text-2xl md:text-3xl font-normal text-white/80 mt-2">
              LinkedIn as Your Secret Weapon
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            80% of jobs are filled through networking. LinkedIn isn't optional—it's mission-critical 
            for your transition. Learn how to build your network before you need it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">80%</div>
              <div className="text-white/70 text-sm">Jobs filled via networking</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/70 text-sm">Connections goal before ETS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">10x</div>
              <div className="text-white/70 text-sm">More likely to get referred</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto bg-muted/50 p-2">
              <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                <FileText className="w-4 h-4" />
                Profile Setup
              </TabsTrigger>
              <TabsTrigger value="networking" className="flex items-center gap-2 py-3">
                <UserPlus className="w-4 h-4" />
                Networking
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2 py-3">
                <MessageSquare className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2 py-3">
                <Users className="w-4 h-4" />
                Veteran Groups
              </TabsTrigger>
            </TabsList>

            {/* Profile Optimization Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Optimize Your Profile</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your LinkedIn profile is your digital first impression. Make every section count.
                </p>
              </div>

              <div className="grid gap-6">
                {profileOptimization.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/30">
                      <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {item.section}
                      </CardTitle>
                      <CardDescription className="flex items-start gap-2 mt-2">
                        <Lightbulb className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                        {item.tip}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {item.bad && item.good ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <div className="flex items-center gap-2 text-destructive font-medium mb-2">
                              <span className="text-lg">✗</span> Don't Do This
                            </div>
                            <p className="text-sm text-muted-foreground italic">"{item.bad}"</p>
                          </div>
                          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="flex items-center gap-2 text-emerald-600 font-medium mb-2">
                              <CheckCircle2 className="w-4 h-4" /> Do This Instead
                            </div>
                            <p className="text-sm text-muted-foreground italic">"{item.good}"</p>
                          </div>
                        </div>
                      ) : item.skills ? (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-sm py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Profile Checklist */}
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Profile Completion Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Professional headshot (no uniform)",
                      "Custom banner image",
                      "Compelling headline (not just job title)",
                      "About section with transition story",
                      "All military experience translated",
                      "Education & certifications listed",
                      "50+ relevant skills added",
                      "Custom LinkedIn URL",
                      "Open to Work badge enabled",
                      "Location set to target area"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded border-2 border-primary/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Networking Strategies Tab */}
            <TabsContent value="networking" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Networking Strategies</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Effective networking is a daily discipline. Use these proven strategies to build your network.
                </p>
              </div>

              <div className="grid gap-6">
                {networkingStrategies.map((strategy, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <strategy.icon className="w-5 h-5 text-primary" />
                        </div>
                        {strategy.title}
                      </CardTitle>
                      <CardDescription>{strategy.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {strategy.steps ? (
                        <div className="space-y-3">
                          {strategy.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      ) : strategy.template ? (
                        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                          {strategy.template}
                        </div>
                      ) : strategy.tips ? (
                        <ul className="space-y-2">
                          {strategy.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Connection Request Tips */}
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <Bell className="w-5 h-5" />
                    Connection Request Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-emerald-600">Do:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Always add a personalized note</li>
                        <li>✓ Mention something specific about them</li>
                        <li>✓ Explain why you're connecting</li>
                        <li>✓ Keep it brief (under 200 characters)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-destructive">Don't:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>✗ Send blank connection requests</li>
                        <li>✗ Immediately ask for a job</li>
                        <li>✗ Use generic templates</li>
                        <li>✗ Connect and never engage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Strategy Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Content That Gets Noticed</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Posting content builds your personal brand and keeps you visible to your network.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {contentIdeas.map((idea, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{idea.type}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={idea.engagement.includes("Very") ? "bg-emerald-500/20 text-emerald-600" : "bg-primary/20 text-primary"}
                        >
                          {idea.engagement}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground italic">"{idea.example}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Posting Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Recommended Posting Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="font-bold text-2xl text-primary">2-3x</div>
                      <div className="text-sm text-muted-foreground">Posts per week</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="font-bold text-2xl text-primary">Daily</div>
                      <div className="text-sm text-muted-foreground">Engage with others</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="font-bold text-2xl text-primary">Tue-Thu</div>
                      <div className="text-sm text-muted-foreground">Best days to post</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="font-bold text-2xl text-primary">8-10 AM</div>
                      <div className="text-sm text-muted-foreground">Optimal posting time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Veteran Groups Tab */}
            <TabsContent value="groups" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Veteran LinkedIn Groups</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join these communities to connect with fellow veterans and access exclusive opportunities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {veteranGroups.map((group, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.focus}</p>
                        </div>
                        <Badge variant="outline">{group.members} members</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* LinkedIn Premium for Veterans */}
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    LinkedIn Premium for Veterans
                  </CardTitle>
                  <CardDescription>
                    LinkedIn offers FREE 1-year Premium Career subscription to veterans and military spouses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Premium Benefits:</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          InMail messages to anyone
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          See who viewed your profile
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          LinkedIn Learning access
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Salary insights
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">How to Claim:</h4>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Visit linkedin.com/veterans</li>
                        <li>Verify military status via ID.me</li>
                        <li>Activate Premium Career</li>
                        <li>Start using enhanced features</li>
                      </ol>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" asChild>
                    <a href="https://www.linkedin.com/veterans" target="_blank" rel="noopener noreferrer">
                      Claim Free Premium <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Start Building Your Network Today</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your network is your net worth. Every connection you make today could be the introduction 
            that lands you your next opportunity. Start with one connection request and build from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                Open LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/interview-prep">
                Practice Interview Skills
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedInNetworking;

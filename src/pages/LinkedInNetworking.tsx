import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Star,
  Clock,
  MapPin,
  Filter,
  Mail,
  RefreshCw,
  AlertTriangle,
  Zap,
  Camera,
  ImageIcon,
  Quote,
  Award,
  BookOpen,
  Globe,
  Heart,
  Briefcase,
  X
} from "lucide-react";

const LinkedInNetworking = () => {
  const searchMethodology = [
    {
      step: 1,
      title: "Past Week Only",
      icon: Clock,
      description: "Only search jobs posted within the past week",
      detail: "HR is overworked and underpaid—they don't take down old postings. A job listed for a month might already be filled. Strike while the iron's hot.",
      tip: "First week = best chance to be first seen"
    },
    {
      step: 2,
      title: "Drop Pin at Biggest City",
      icon: MapPin,
      description: "Set location to the center of the largest city you'll commute to",
      detail: "If you're in Clarksville but willing to commute to Nashville, drop your pin at Nissan Stadium. This maximizes visibility to recruiters and opens up 100+ more positions.",
      tip: "Fish where the fish are"
    },
    {
      step: 3,
      title: "Find the Veterans Inside",
      icon: Users,
      description: "Filter company employees by military service branch",
      detail: "Go to the company page → People → All Filters → Past Company → Select your branch (US Army, US Navy, etc.). These veterans will give you the real dirt, not the Instagram filter.",
      tip: "Veterans help veterans—leverage this community"
    },
    {
      step: 4,
      title: "Find HR Gatekeepers",
      icon: Building2,
      description: "Search for HR managers at the company who are also veterans",
      detail: "Type 'Human Resources' in the search, filter by your branch. These are the gatekeepers. A veteran HR manager is more likely to advocate for you.",
      tip: "They can hand-walk your resume to the decision maker"
    }
  ];

  const connectionTemplate = {
    example: `Hey [Name], Happy New Year. I am transitioning from [Unit/Base] after [X] years. I see you currently work for [Company]. I am considering a [Role] pathway as I transition. Do you have some time to hop on a call?`,
    rules: [
      "300 characters max—make every word count",
      "State WHO you are (transitioning veteran)",
      "State WHY you're connecting (interested in their company)",
      "State your ASK (15 min call, not a job)",
      "Never be a serial connector—always personalize"
    ]
  };

  const aggressiveOutreach = [
    {
      tool: "Hunter.io",
      purpose: "Find work emails",
      description: "Type their name + company domain to find their work email. Send the same message directly to their inbox.",
      tip: "Attack from multiple angles—LinkedIn AND email"
    },
    {
      tool: "Email Subject Line",
      purpose: "Get opened",
      description: "Put 'Question' in the subject line. Harvard study showed this dramatically increases response rates.",
      tip: "Make sure your 'From' name is your full name, not a nickname"
    }
  ];

  const skillSyncerMethod = [
    {
      step: 1,
      action: "Copy the job description from LinkedIn"
    },
    {
      step: 2,
      action: "Export your LinkedIn profile as PDF (it's already a resume format)"
    },
    {
      step: 3,
      action: "Upload both to SkillSyncer"
    },
    {
      step: 4,
      action: "See your match score and missing 'hard skills'"
    },
    {
      step: 5,
      action: "Add the missing language to your resume/profile where you've actually done it"
    }
  ];

  const questionsToAsk = [
    "Has this position already been filled?",
    "Is this an internal hire situation?",
    "What's the real culture like day-to-day?",
    "Am I actually qualified by their standards?",
    "What do they really pay for this role?",
    "How do they treat veterans?"
  ];

  const dailyRoutine = [
    { action: "10-15 personalized connection requests", time: "30 min" },
    { action: "Find HR managers at target companies", time: "15 min" },
    { action: "Send direct emails via Hunter.io", time: "15 min" },
    { action: "Tailor 1 resume to match a job description", time: "15 min" }
  ];

  const realityCheck = [
    {
      myth: "My rank and experience will get me hired",
      reality: "Companies want doers, not leaders. You may not have touched your craft in a decade."
    },
    {
      myth: "I'm worth a six-figure salary",
      reality: "Civilian salaries work differently. Research actual pay on Glassdoor before negotiating."
    },
    {
      myth: "Applying online is enough",
      reality: "80% of jobs are filled through networking. ATS systems are designed to filter you out."
    },
    {
      myth: "HR will find my resume",
      reality: "HR manages hiring, firing, benefits, payroll, and enrollment with 2-4 people. They're overworked."
    }
  ];

  const profileSections = [
    {
      section: "Profile Photo",
      icon: Camera,
      do: ["Good, clean professional headshot", "Friendly, approachable expression", "Plain or simple background"],
      dont: ["Military uniform (those days are over)", "Group photos or cropped images", "Selfies or casual photos"]
    },
    {
      section: "Background Banner",
      icon: ImageIcon,
      do: ["Make it about YOU, not your company", "Personally tailored to your brand", "Shows your personality/interests"],
      dont: ["Company logos (avg job tenure is 3-5 years)", "Generic stock images", "Blank/default LinkedIn banner"]
    },
    {
      section: "Headline",
      icon: Quote,
      do: ["Make it an attention grabber", "Focus on WHO you are", "Think: 'Would someone swipe right?'"],
      dont: ["Just list your job title", "Stack certifications (Six Sigma, PMP, etc.)", "Make it boring/generic"]
    },
    {
      section: "About Section",
      icon: FileText,
      do: ["Read like a resume", "Divide into clear categories", "Show your journey and bonafides"],
      dont: ["Leave it blank", "Write one vague paragraph", "Make it all about your current job"]
    },
    {
      section: "Featured Section",
      icon: Star,
      do: ["Podcasts you've been on", "Articles you've written", "Interviews and media appearances"],
      dont: ["Leave it empty", "Say no to podcast invites", "Miss opportunities to build credibility"]
    },
    {
      section: "Experience",
      icon: Briefcase,
      do: ["SUBDIVIDE military time by positions", "Show each role separately", "Make it look full and detailed"],
      dont: ["Just list 'US Army 1995-2025'", "Leave gaps unexplained", "Be vague about accomplishments"]
    },
    {
      section: "Certifications",
      icon: Award,
      do: ["List ALL of them (up to 100)", "Shows you're a learner", "Include military training certs"],
      dont: ["Skip 'small' certifications", "Assume they don't matter", "Leave this section empty"]
    },
    {
      section: "Skills",
      icon: CheckCircle2,
      do: ["Add around 50 skills", "Put TOP skills first", "Get endorsements from connections"],
      dont: ["Only add 5-10 skills", "Put irrelevant skills at top", "Skip this section"]
    },
    {
      section: "Recommendations",
      icon: MessageSquare,
      do: ["Get 8-10 to start", "From subordinates, peers, and leaders", "Ask classmates and colleagues"],
      dont: ["Have zero recommendations", "Wait for people to offer", "Only get recommendations from friends"]
    },
    {
      section: "Volunteering",
      icon: Heart,
      do: ["Add volunteer work", "Shows values alignment", "Companies look for this now"],
      dont: ["Think it doesn't matter", "Skip if you don't have much", "Leave blank if you volunteer"]
    },
    {
      section: "Languages",
      icon: Globe,
      do: ["Add any languages you speak", "Opens up non-English networks", "Reduces spam perception"],
      dont: ["Only list if fluent", "Skip if 'not relevant'", "Forget about this section"]
    },
    {
      section: "Connections",
      icon: Users,
      do: ["Keep connections OPEN (visible)", "The purpose of LinkedIn is networking", "Let people see who you know"],
      dont: ["Hide your connections", "Keep your network private", "Block visibility"]
    }
  ];

  const badProfileTraits = [
    "No profile picture",
    "No background banner",
    "No posts or activity",
    "No recommendations",
    "Very few skills listed",
    "Minimal information overall"
  ];

  const whyBadProfileFails = [
    { context: "Applying for a job", result: "Easy pass - hiring managers have hundreds of applicants" },
    { context: "Reaching out for sales", result: "Looks like spam/scam - nothing validates who you are" },
    { context: "Trying to network", result: "No credibility - why would someone invest time in you?" }
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
              The Back Door Method
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            LinkedIn: Your Secret Weapon
            <span className="block text-2xl md:text-3xl font-normal text-white/80 mt-2">
              Stop Applying Online. Start Getting Hired.
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            ATS systems are designed to filter you out. Learn how to bypass the gatekeepers 
            by connecting directly with veterans inside your target companies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">80%</div>
              <div className="text-white/70 text-sm">Jobs filled via networking</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">70%</div>
              <div className="text-white/70 text-sm">Resume match threshold</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">1 hr</div>
              <div className="text-white/70 text-sm">Per job (done right)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">10-15</div>
              <div className="text-white/70 text-sm">Daily connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="method" className="space-y-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 h-auto bg-muted/50 p-2">
              <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                <UserPlus className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="method" className="flex items-center gap-2 py-3">
                <Target className="w-4 h-4" />
                Method
              </TabsTrigger>
              <TabsTrigger value="outreach" className="flex items-center gap-2 py-3">
                <MessageSquare className="w-4 h-4" />
                Outreach
              </TabsTrigger>
              <TabsTrigger value="resume" className="flex items-center gap-2 py-3">
                <FileText className="w-4 h-4" />
                Resume
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex items-center gap-2 py-3">
                <RefreshCw className="w-4 h-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="reality" className="flex items-center gap-2 py-3">
                <AlertTriangle className="w-4 h-4" />
                Reality
              </TabsTrigger>
            </TabsList>

            {/* Profile Building Tab */}
            <TabsContent value="profile" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Build a Profile That Gets Results</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your LinkedIn profile is your digital first impression. If it looks incomplete or fake, 
                  you're an easy pass—whether you're job hunting or selling.
                </p>
              </div>

              {/* Bad Profile Warning */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <X className="w-5 h-5" />
                    The "Easy Pass" Profile
                  </CardTitle>
                  <CardDescription>
                    If your profile looks like this, hiring managers and prospects will skip right past you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {badProfileTraits.map((trait, idx) => (
                      <Badge key={idx} variant="destructive" className="bg-destructive/20 text-destructive">
                        <X className="w-3 h-3 mr-1" />
                        {trait}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    {whyBadProfileFails.map((item, idx) => (
                      <div key={idx} className="p-3 bg-background rounded-lg border">
                        <p className="text-sm font-medium mb-1">{item.context}</p>
                        <p className="text-sm text-muted-foreground">{item.result}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 mt-4">
                    <p className="text-sm font-medium text-destructive">
                      "If this is how you do your LinkedIn, chances are that's how you do everything."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Sections Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileSections.map((section, idx) => (
                  <Card key={idx} className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <section.icon className="w-5 h-5 text-primary" />
                        {section.section}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-emerald-600 mb-1">DO:</p>
                        <ul className="space-y-1">
                          {section.do.map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-1 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-destructive mb-1">DON'T:</p>
                        <ul className="space-y-1">
                          {section.dont.map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-1 text-muted-foreground">
                              <X className="w-3 h-3 text-destructive mt-1 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Key Insights */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Why Your Banner Should Be About YOU</h4>
                      <p className="text-sm text-muted-foreground">
                        The average job tenure is now 3-5 years. If you're promoting a company in your background, 
                        you'll have to change it soon. Brand yourself, not your employer.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">The Bonafides Principle</h4>
                      <p className="text-sm text-muted-foreground">
                        A thorough About section reads like a resume and establishes credibility. 
                        Scammers don't spend time building detailed profiles—your completeness proves you're legitimate.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Recommendations = Trust</h4>
                      <p className="text-sm text-muted-foreground">
                        Get 8-10 recommendations from subordinates, peers, and leaders. 
                        Ask classmates and colleagues. This proves you're not a scam artist.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Subdivide Your Military Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        Don't just list "US Army 1995-2025." Break it down by position. 
                        Each role shows progression and makes your experience look fuller.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* The Method Tab */}
            <TabsContent value="method" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">The 4-Step Back Door Method</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Don't just apply online and hope. Use LinkedIn to find veterans inside your target 
                  company who can advocate for you and hand-walk your resume to decision makers.
                </p>
              </div>

              <div className="grid gap-6">
                {searchMethodology.map((item) => (
                  <Card key={item.step} className="overflow-hidden">
                    <CardHeader className="bg-muted/30">
                      <CardTitle className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                          {item.step}
                        </span>
                        <item.icon className="w-5 h-5 text-primary" />
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-4">{item.detail}</p>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <Lightbulb className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                        <span className="text-sm font-medium">{item.tip}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Questions to Ask */}
              <Card className="mt-8 border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                    Questions to Ask the Veteran Inside
                  </CardTitle>
                  <CardDescription>
                    Before you invest time tailoring your resume, get the real intel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {questionsToAsk.map((question, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        {question}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Outreach Tab */}
            <TabsContent value="outreach" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Connection & Outreach</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Never be a serial connector. Every connection request needs a purpose and a personalized note.
                </p>
              </div>

              {/* Connection Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-primary" />
                    The 300-Character Template
                  </CardTitle>
                  <CardDescription>
                    LinkedIn gives you 300 characters. Make every word count.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm border-l-4 border-primary">
                    {connectionTemplate.example}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {connectionTemplate.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {rule}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Aggressive Outreach */}
              <Card className="border-orange-500/20">
                <CardHeader className="bg-orange-500/5">
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Zap className="w-5 h-5" />
                    Aggressive Outreach (Attack From Multiple Angles)
                  </CardTitle>
                  <CardDescription>
                    HR might not check LinkedIn for a week. Send the same message to their work email too.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {aggressiveOutreach.map((item, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold">{item.tool}</span>
                        <Badge variant="outline" className="text-xs">{item.purpose}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-start gap-2 text-sm text-orange-600">
                        <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                        {item.tip}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* What NOT to do */}
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Don't Do This
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      Don't send blank connection requests
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      Don't immediately ask for a job—ask for a conversation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      Don't use your nickname or "GoDaddy123" as your email name
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      Don't connect and never engage again
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resume Match Tab */}
            <TabsContent value="resume" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">The 70% Resume Match Rule</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Most companies use 70% as the discriminator. If your resume doesn't match 70% of the 
                  job description's language, you get filtered out by the ATS before a human sees it.
                </p>
              </div>

              {/* SkillSyncer Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    SkillSyncer Method
                  </CardTitle>
                  <CardDescription>
                    Takes about 15 minutes per job. Worth every second.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillSyncerMethod.map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                          {item.step}
                        </span>
                        <div className="pt-1">{item.action}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* LinkedIn Profile = Resume */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Your LinkedIn Profile IS Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    When you export your LinkedIn profile as a PDF, it's already in a clean resume format. 
                    Build your profile right, and you're killing two birds with one stone.
                  </p>
                  <div className="p-4 rounded-lg bg-background border">
                    <p className="text-sm font-medium mb-2">To export:</p>
                    <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                      <li>Go to your profile</li>
                      <li>Click "More" button</li>
                      <li>Select "Save to PDF"</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Hard Skills Translation */}
              <Card>
                <CardHeader>
                  <CardTitle>Translating Military to Civilian Language</CardTitle>
                  <CardDescription>
                    You've done the work. You just haven't used the right words.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="font-medium text-destructive mb-2">❌ Military Language</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>"Conducted PT and maintained weapons systems"</li>
                        <li>"Managed a 42-soldier platoon"</li>
                        <li>"Coordinated with S3 for OPORD development"</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="font-medium text-emerald-600 mb-2">✓ Civilian Language</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>"Managed daily training programs achieving 98% readiness"</li>
                        <li>"Led cross-functional team of 42+ members"</li>
                        <li>"Developed strategic operations plans with stakeholders"</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>Don't misrepresent yourself. Find where you've actually done the "hard skill" the job requires, then describe it in their language.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Daily Routine Tab */}
            <TabsContent value="daily" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Wash, Rinse, Repeat</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Finding a job is your full-time job. Here's the daily discipline that gets results.
                </p>
              </div>

              {/* Daily Routine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    The Daily Hour
                  </CardTitle>
                  <CardDescription>
                    About 1 hour per day, per company you're targeting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dailyRoutine.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <span>{item.action}</span>
                        </div>
                        <Badge variant="outline">{item.time}</Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium">Total: ~75 minutes per company</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Do this consistently and you'll have conversations scheduled within a week.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* The Full Process */}
              <Card>
                <CardHeader>
                  <CardTitle>The Complete 1-Hour Process (Per Job)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
                        <div>
                          <p className="font-medium">Find the job on LinkedIn</p>
                          <p className="text-sm text-muted-foreground">Past week, target location, your field</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                        <div>
                          <p className="font-medium">Find the veteran at the company</p>
                          <p className="text-sm text-muted-foreground">Same branch, same unit if possible</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</div>
                        <div>
                          <p className="font-medium">Find the HR manager</p>
                          <p className="text-sm text-muted-foreground">Preferably also a veteran</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">4</div>
                        <div>
                          <p className="font-medium">Tailor your resume</p>
                          <p className="text-sm text-muted-foreground">Match the job description language</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle>Your Toolkit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-background border text-center">
                      <Linkedin className="w-8 h-8 mx-auto mb-2 text-[#0A66C2]" />
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Find jobs & people</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border text-center">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <p className="font-medium">Hunter.io</p>
                      <p className="text-sm text-muted-foreground">Find work emails</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border text-center">
                      <Filter className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                      <p className="font-medium">SkillSyncer</p>
                      <p className="text-sm text-muted-foreground">Match resume to job</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-background border text-center">
                    <Search className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="font-medium">Glassdoor</p>
                    <p className="text-sm text-muted-foreground">Research company culture, pay, & how they treat veterans</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reality Check Tab */}
            <TabsContent value="reality" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">The Hard Truth</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  "I had all the accoutrements that civilian workforce wanted, but nobody told me what that meant 
                  once I would get a hold of it... I was drunk on myself."
                </p>
              </div>

              <div className="grid gap-6">
                {realityCheck.map((item, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-center gap-2 text-destructive font-medium mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            The Myth
                          </div>
                          <p className="text-sm">{item.myth}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <div className="flex items-center gap-2 text-emerald-600 font-medium mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            The Reality
                          </div>
                          <p className="text-sm">{item.reality}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Key Insight */}
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic text-center">
                    "A lot of times as a leader in the military, you haven't touched your craft in probably 
                    a decade. You've been telling other people what to do. Companies often want you to DO 
                    the thing—they don't want you leading, they want you technically capable."
                  </blockquote>
                  <p className="text-center text-muted-foreground mt-4">
                    — This is why talking to veterans inside the company matters. They'll tell you the truth.
                  </p>
                </CardContent>
              </Card>

              {/* Why Network */}
              <Card>
                <CardHeader>
                  <CardTitle>Back Door vs. Front Door</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <h4 className="font-semibold text-destructive mb-3">Front Door (Applying Online)</h4>
                      <ul className="space-y-2 text-sm">
                        <li>→ Your resume hits an ATS system</li>
                        <li>→ AI filters out 90%+ of applicants</li>
                        <li>→ HR is overworked, skims for 6 seconds</li>
                        <li>→ You compete with 200+ other applicants</li>
                        <li>→ No one advocates for you</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="font-semibold text-emerald-600 mb-3">Back Door (Veteran Network)</h4>
                      <ul className="space-y-2 text-sm">
                        <li>→ Veteran inside gives you real intel</li>
                        <li>→ You tailor resume to actual requirements</li>
                        <li>→ HR manager knows your name already</li>
                        <li>→ Someone hand-walks your resume in</li>
                        <li>→ You have an internal advocate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Start Today</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pick one company you want to work for. Find one veteran inside. Send one personalized 
            connection request. That's your mission for today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                Open LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://hunter.io" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5 mr-2" />
                Get Hunter.io
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://skillsyncer.com" target="_blank" rel="noopener noreferrer">
                <Filter className="w-5 h-5 mr-2" />
                Try SkillSyncer
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* LinkedIn Premium */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Free LinkedIn Premium for Veterans
              </CardTitle>
              <CardDescription>
                LinkedIn offers a FREE 1-year Premium Career subscription to veterans and military spouses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Premium Benefits:</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      InMail messages to anyone (skip the connection request)
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
        </div>
      </section>
    </div>
  );
};

export default LinkedInNetworking;

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Shield, 
  Cpu, 
  Activity,
  DollarSign,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CareerPath {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  description: string;
  whyVeterans: string;
  salaryRange: { entry: string; mid: string; senior: string };
  demandLevel: number; // 1-100
  typicalRoles: string[];
  requiredSkills: string[];
  militarySkillsMatch: string[];
  certifications: { name: string; provider: string; cost: string }[];
  actionSteps: string[];
  resources: { label: string; url: string }[];
  featured?: boolean;
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: 'sales',
    title: 'Sales',
    subtitle: 'The fastest path to high income',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-green-500',
    bgGradient: 'from-green-500/20 to-green-600/5',
    description: 'Sales is consistently the fastest path to six-figure income for veterans. Your leadership, discipline, and ability to perform under pressure translate directly to sales success. No degree required—just drive and coachability.',
    whyVeterans: 'Veterans excel in sales because you understand mission accomplishment, can handle rejection (like being in the field), and know how to build trust quickly. The military taught you to communicate clearly, adapt to situations, and never quit.',
    salaryRange: { entry: '$50K-70K + Commission', mid: '$80K-120K OTE', senior: '$150K-300K+ OTE' },
    demandLevel: 95,
    typicalRoles: [
      'Sales Development Rep (SDR)',
      'Business Development Rep (BDR)', 
      'Account Executive (AE)',
      'Enterprise Account Executive',
      'Sales Manager',
      'VP of Sales'
    ],
    requiredSkills: [
      'Communication & Active Listening',
      'Prospecting & Cold Outreach',
      'CRM Proficiency (Salesforce, HubSpot)',
      'Negotiation & Closing',
      'Time Management',
      'Resilience & Coachability'
    ],
    militarySkillsMatch: [
      'Leadership → Team Selling & Mentoring',
      'Briefings → Presentations & Demos',
      'Mission Planning → Account Strategy',
      'Adaptability → Handling Objections',
      'Discipline → Consistent Activity',
      'Stress Management → High-Pressure Deals'
    ],
    certifications: [
      { name: 'Salesforce Administrator', provider: 'Salesforce', cost: '$200' },
      { name: 'HubSpot Sales Certification', provider: 'HubSpot Academy', cost: 'Free' },
      { name: 'MEDDIC Sales Certification', provider: 'Various', cost: '$500-2000' },
    ],
    actionSteps: [
      'Complete "Why Sales" module in this app',
      'Build your LinkedIn profile with sales-focused keywords',
      'Apply to Sales Platoon cohort for placement support',
      'Practice your 30-second pitch daily',
      'Start networking with sales professionals on LinkedIn',
      'Research target companies and industries'
    ],
    resources: [
      { label: 'Sales Platoon', url: 'https://salesplatoon.com' },
      { label: 'Hiring Our Heroes', url: 'https://hiringourheroes.org' },
      { label: 'Shift.org', url: 'https://shift.org' },
    ],
    featured: true,
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    subtitle: 'Defend the digital frontier',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-blue-500',
    bgGradient: 'from-blue-500/20 to-blue-600/5',
    description: 'Cybersecurity is one of the fastest-growing fields with a massive talent shortage. Veterans with security clearances and operations experience are highly sought after. Protect organizations from cyber threats while earning top-tier compensation.',
    whyVeterans: 'Military veterans understand operational security, threat assessment, and working in high-stakes environments. Many already have security clearances, which are worth their weight in gold in this industry.',
    salaryRange: { entry: '$60K-80K', mid: '$90K-130K', senior: '$150K-250K+' },
    demandLevel: 98,
    typicalRoles: [
      'Security Analyst',
      'SOC Analyst',
      'Penetration Tester',
      'Security Engineer',
      'Incident Response Analyst',
      'CISO'
    ],
    requiredSkills: [
      'Network Security Fundamentals',
      'Threat Detection & Analysis',
      'SIEM Tools (Splunk, QRadar)',
      'Vulnerability Assessment',
      'Incident Response',
      'Compliance (NIST, ISO 27001)'
    ],
    militarySkillsMatch: [
      'OPSEC → Information Security',
      'Intelligence Analysis → Threat Intelligence',
      'Communications → Network Security',
      'Risk Assessment → Vulnerability Management',
      'Watch Standing → SOC Operations',
      'Clearance → Immediate Employability'
    ],
    certifications: [
      { name: 'CompTIA Security+', provider: 'CompTIA', cost: '$392' },
      { name: 'Certified Ethical Hacker (CEH)', provider: 'EC-Council', cost: '$1,199' },
      { name: 'CISSP', provider: 'ISC2', cost: '$749' },
    ],
    actionSteps: [
      'Earn CompTIA Security+ (often covered by VA)',
      'Build a home lab to practice skills',
      'Get active on LinkedIn cybersecurity communities',
      'Apply to cyber-focused SkillBridge programs',
      'Join veteran cyber groups (VetSec, CyberVets)',
      'Practice on platforms like TryHackMe or HackTheBox'
    ],
    resources: [
      { label: 'VetSec', url: 'https://vetsec.org' },
      { label: 'CyberVets USA', url: 'https://cybervetsusa.org' },
      { label: 'SANS VetSuccess', url: 'https://www.sans.org/cybertalent/vetsuccess-academy/' },
    ],
  },
  {
    id: 'medical-imaging',
    title: 'Medical Imaging Engineer',
    subtitle: 'Critical healthcare technology',
    icon: <Activity className="w-6 h-6" />,
    color: 'text-purple-500',
    bgGradient: 'from-purple-500/20 to-purple-600/5',
    description: 'Medical Imaging Engineers install, maintain, and repair critical diagnostic equipment like MRI, CT, and X-ray machines. This field combines technical skills with healthcare impact, offering stable careers with excellent growth potential.',
    whyVeterans: 'Veterans with electronics, biomedical, or maintenance backgrounds excel here. Your experience maintaining complex military equipment translates directly. The structured environment and mission-critical nature mirrors military work.',
    salaryRange: { entry: '$55K-70K', mid: '$75K-100K', senior: '$110K-150K+' },
    demandLevel: 88,
    typicalRoles: [
      'Biomedical Equipment Technician (BMET)',
      'Field Service Engineer',
      'Medical Imaging Specialist',
      'Clinical Engineer',
      'Regional Service Manager',
      'Applications Specialist'
    ],
    requiredSkills: [
      'Electronics & Electrical Systems',
      'Mechanical Troubleshooting',
      'Medical Device Regulations (FDA)',
      'Customer Service & Communication',
      'Technical Documentation',
      'Radiation Safety (for some roles)'
    ],
    militarySkillsMatch: [
      'Equipment Maintenance → Device Repair',
      'Technical Manuals → Service Documentation',
      'Safety Protocols → Healthcare Compliance',
      'Field Operations → On-Site Service',
      'Problem Solving → Diagnostic Troubleshooting',
      'Security Clearance → Hospital Access'
    ],
    certifications: [
      { name: 'CBET (Certified Biomedical Equipment Technician)', provider: 'ACI', cost: '$300' },
      { name: 'Manufacturer Training (GE, Siemens, Philips)', provider: 'OEMs', cost: 'Employer-paid' },
      { name: 'Associates in Biomedical Technology', provider: 'Community Colleges', cost: 'GI Bill' },
    ],
    actionSteps: [
      'Assess if your MOS has electronics/maintenance background',
      'Research BMET programs at community colleges (GI Bill eligible)',
      'Connect with GE Healthcare, Siemens, Philips recruiters',
      'Look for medical device SkillBridge programs',
      'Join AAMI (Association for Advancement of Medical Instrumentation)',
      'Network with veteran BMETs on LinkedIn'
    ],
    resources: [
      { label: 'AAMI', url: 'https://www.aami.org' },
      { label: 'GE Healthcare Careers', url: 'https://www.gehealthcare.com/about/careers' },
      { label: 'Siemens Healthineers Careers', url: 'https://www.siemens-healthineers.com/careers' },
    ],
  },
  {
    id: 'semiconductor',
    title: 'Semiconductor',
    subtitle: 'Building the future of technology',
    icon: <Cpu className="w-6 h-6" />,
    color: 'text-orange-500',
    bgGradient: 'from-orange-500/20 to-orange-600/5',
    description: 'The semiconductor industry is experiencing massive growth with the CHIPS Act bringing manufacturing back to the US. Veterans are ideal candidates for these precision-focused, high-tech manufacturing roles with excellent benefits and growth.',
    whyVeterans: 'Veterans bring precision, discipline, and ability to work in controlled environments. Your experience with complex systems, following exact procedures, and maintaining high standards is exactly what semiconductor manufacturing requires.',
    salaryRange: { entry: '$50K-70K', mid: '$80K-110K', senior: '$120K-180K+' },
    demandLevel: 92,
    typicalRoles: [
      'Process Technician',
      'Equipment Technician',
      'Manufacturing Engineer',
      'Quality Engineer',
      'Facilities Technician',
      'Operations Manager'
    ],
    requiredSkills: [
      'Cleanroom Protocols',
      'Equipment Maintenance & Troubleshooting',
      'Statistical Process Control (SPC)',
      'Technical Documentation',
      'Safety & Compliance',
      'Basic Electronics & Mechanical Skills'
    ],
    militarySkillsMatch: [
      'Precision Operations → Cleanroom Work',
      'Equipment Maintenance → Fab Tool Maintenance',
      'Quality Control → Defect Analysis',
      'Process Discipline → Manufacturing Protocols',
      'Teamwork → Shift Operations',
      'Continuous Improvement → Yield Enhancement'
    ],
    certifications: [
      { name: 'Semiconductor Technician Certificate', provider: 'Community Colleges', cost: 'GI Bill' },
      { name: 'SMT Process Certification', provider: 'IPC', cost: '$500' },
      { name: 'Six Sigma Green Belt', provider: 'ASQ', cost: '$400' },
    ],
    actionSteps: [
      'Research new fab locations (Intel, TSMC, Samsung in US)',
      'Look into semiconductor-focused SkillBridge programs',
      'Complete community college semiconductor tech certificate',
      'Apply directly to Intel, TSMC, GlobalFoundries, Samsung',
      'Highlight precision maintenance experience on resume',
      'Network with veteran semiconductor professionals'
    ],
    resources: [
      { label: 'Intel Veterans Program', url: 'https://www.intel.com/content/www/us/en/careers/military.html' },
      { label: 'SEMI Foundation', url: 'https://www.semi.org/en/workforce-development' },
      { label: 'CHIPS Act Info', url: 'https://www.nist.gov/chips' },
    ],
  },
];

export default function CareerPaths() {
  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold">Career Paths</h1>
            <p className="text-muted-foreground">
              Explore high-demand career tracks tailored for veterans
            </p>
          </div>

          {/* Featured Path - Sales */}
          {CAREER_PATHS.filter(p => p.featured).map(path => (
            <Card key={path.id} className={cn(
              "overflow-hidden border-2 border-primary/30 bg-gradient-to-br",
              path.bgGradient
            )}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-3 rounded-xl bg-background/80", path.color)}>
                      {path.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-2xl">{path.title}</CardTitle>
                        <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                      </div>
                      <CardDescription className="text-base">{path.subtitle}</CardDescription>
                    </div>
                  </div>
                  <Link to="/sales">
                    <Button variant="hero" size="lg">
                      Explore Why Sales
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{path.description}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-background/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-sm">Salary Range</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>Entry: {path.salaryRange.entry}</p>
                      <p>Mid: {path.salaryRange.mid}</p>
                      <p className="text-green-500 font-medium">Senior: {path.salaryRange.senior}</p>
                    </div>
                  </div>
                  <div className="bg-background/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-sm">Market Demand</span>
                    </div>
                    <Progress value={path.demandLevel} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">{path.demandLevel}% demand score</p>
                  </div>
                  <div className="bg-background/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Quick Start</span>
                    </div>
                    <p className="text-sm text-muted-foreground">No degree required. Start in 30-60 days with the right training and placement support.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* All Career Paths */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold">All Career Tracks</h2>
            
            <Tabs defaultValue="sales" className="space-y-6">
              <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
                {CAREER_PATHS.map(path => (
                  <TabsTrigger 
                    key={path.id} 
                    value={path.id}
                    className="flex items-center gap-2"
                  >
                    <span className={path.color}>{path.icon}</span>
                    {path.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {CAREER_PATHS.map(path => (
                <TabsContent key={path.id} value={path.id} className="space-y-6">
                  {/* Overview Card */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={cn("p-3 rounded-xl bg-gradient-to-br", path.bgGradient, path.color)}>
                          {path.icon}
                        </div>
                        <div>
                          <CardTitle>{path.title}</CardTitle>
                          <CardDescription>{path.subtitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Overview</h4>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Why Veterans Excel
                        </h4>
                        <p className="text-muted-foreground">{path.whyVeterans}</p>
                      </div>

                      {/* Stats Row */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            Salary Range
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <p className="text-xs text-muted-foreground">Entry</p>
                              <p className="font-semibold text-sm">{path.salaryRange.entry}</p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <p className="text-xs text-muted-foreground">Mid</p>
                              <p className="font-semibold text-sm">{path.salaryRange.mid}</p>
                            </div>
                            <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/20">
                              <p className="text-xs text-muted-foreground">Senior</p>
                              <p className="font-semibold text-sm text-green-500">{path.salaryRange.senior}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Market Demand
                          </h4>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <Progress value={path.demandLevel} className="h-3 mb-2" />
                            <p className="text-sm text-muted-foreground text-center">
                              {path.demandLevel >= 90 ? 'Extremely High Demand' : 
                               path.demandLevel >= 80 ? 'High Demand' : 'Strong Demand'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Roles & Skills */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Briefcase className="w-5 h-5" />
                          Typical Roles
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {path.typicalRoles.map((role, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Required Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {path.requiredSkills.map((skill, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Military Skills Translation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Military Skills Translation
                      </CardTitle>
                      <CardDescription>How your military experience maps to this career</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {path.militarySkillsMatch.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-sm">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications & Action Steps */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Recommended Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {path.certifications.map((cert, i) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <p className="font-medium text-sm">{cert.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{cert.provider}</p>
                              <Badge variant="outline" className="text-xs">{cert.cost}</Badge>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Action Steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2">
                          {path.actionSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resources */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {path.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {resource.label}
                            </Button>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA for Sales */}
                  {path.id === 'sales' && (
                    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
                      <CardContent className="py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div>
                            <h3 className="font-display text-xl font-bold">Ready to Start Your Sales Career?</h3>
                            <p className="text-muted-foreground">Explore our comprehensive Why Sales module and apply to Sales Platoon.</p>
                          </div>
                          <div className="flex gap-3">
                            <Link to="/sales">
                              <Button variant="hero" size="lg">
                                Why Sales Module
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Wand2, 
  Target, 
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  GraduationCap,
  Award,
  Briefcase,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  unit: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

const militaryToCivilianMap: Record<string, string> = {
  "platoon": "team of 30-40 personnel",
  "squad": "team of 8-12 personnel",
  "company": "organization of 100-200 personnel",
  "battalion": "organization of 500-800 personnel",
  "brigade": "organization of 3,000-5,000 personnel",
  "pt": "physical training programs",
  "opord": "operational plans",
  "ncoer": "performance evaluations",
  "oer": "performance evaluations",
  "mwr": "employee welfare programs",
  "fob": "forward operating base",
  "toc": "tactical operations center",
  "conop": "concept of operations",
  "sop": "standard operating procedures",
  "aao": "area of operations",
  "commo": "communications",
  "sitrep": "situation reports",
  "aar": "after action reviews",
  "pcs": "permanent change of station",
  "tdy": "temporary duty assignment",
  "nco": "non-commissioned officer",
  "jrtc": "joint readiness training center",
  "ntc": "national training center",
  "ctc": "combat training center",
};

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: ""
  });

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "",
      unit: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [""]
    }
  ]);

  // Education
  const [education, setEducation] = useState<Education[]>([]);
  
  // Certifications
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Job Description Matching
  const [jobDescription, setJobDescription] = useState("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [foundKeywords, setFoundKeywords] = useState<string[]>([]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        title: "",
        unit: "",
        location: "",
        startDate: "",
        endDate: "",
        bullets: [""]
      }
    ]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const addBullet = (expId: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId ? { ...exp, bullets: [...exp.bullets, ""] } : exp
    ));
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { ...exp, bullets: exp.bullets.map((b, i) => i === bulletIndex ? value : b) }
        : exp
    ));
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId && exp.bullets.length > 1
        ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) }
        : exp
    ));
  };

  const translateBullet = (expId: string, bulletIndex: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    let translated = exp.bullets[bulletIndex].toLowerCase();
    
    Object.entries(militaryToCivilianMap).forEach(([military, civilian]) => {
      const regex = new RegExp(`\\b${military}\\b`, 'gi');
      translated = translated.replace(regex, civilian);
    });

    // Capitalize first letter
    translated = translated.charAt(0).toUpperCase() + translated.slice(1);

    updateBullet(expId, bulletIndex, translated);
    toast({
      title: "Translated",
      description: "Military terms have been converted to civilian language.",
    });
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now().toString(), degree: "", school: "", year: "" }
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { id: Date.now().toString(), name: "", issuer: "", year: "" }
    ]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const analyzeJobMatch = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "No Job Description",
        description: "Please paste a job description to analyze.",
        variant: "destructive"
      });
      return;
    }

    // Extract keywords from job description
    const jdWords = jobDescription.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Get unique keywords (simplified extraction)
    const commonWords = new Set(['that', 'this', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'being', 'their', 'which', 'would', 'there', 'could', 'other', 'into', 'more', 'some', 'such', 'only', 'over', 'these', 'also', 'after', 'most', 'made', 'them']);
    const jdKeywords = [...new Set(jdWords)].filter(w => !commonWords.has(w));

    // Build resume text
    const resumeText = [
      personalInfo.summary,
      ...experiences.flatMap(exp => [exp.title, exp.unit, ...exp.bullets]),
      ...education.map(edu => `${edu.degree} ${edu.school}`),
      ...certifications.map(cert => cert.name),
      ...skills
    ].join(' ').toLowerCase();

    // Find matches and misses
    const found: string[] = [];
    const missing: string[] = [];

    jdKeywords.forEach(keyword => {
      if (resumeText.includes(keyword)) {
        found.push(keyword);
      } else {
        missing.push(keyword);
      }
    });

    // Calculate match score
    const score = Math.round((found.length / jdKeywords.length) * 100);
    
    setMatchScore(score);
    setFoundKeywords(found.slice(0, 20));
    setMissingKeywords(missing.slice(0, 15));

    toast({
      title: `Match Score: ${score}%`,
      description: score >= 70 ? "Good match! You meet the threshold." : "Consider adding more relevant keywords.",
      variant: score >= 70 ? "default" : "destructive"
    });
  };

  const exportResume = () => {
    // Simple text export for now
    const resumeText = `
${personalInfo.fullName}
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
${personalInfo.linkedin}

SUMMARY
${personalInfo.summary}

EXPERIENCE
${experiences.map(exp => `
${exp.title} | ${exp.unit}
${exp.location} | ${exp.startDate} - ${exp.endDate}
${exp.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

EDUCATION
${education.map(edu => `${edu.degree} - ${edu.school} (${edu.year})`).join('\n')}

CERTIFICATIONS
${certifications.map(cert => `${cert.name} - ${cert.issuer} (${cert.year})`).join('\n')}

SKILLS
${skills.join(' | ')}
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume Exported",
      description: "Your resume has been downloaded as a text file.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm">
              Military to Civilian
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resume Builder
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl">
            Translate your military experience into civilian language and match your resume 
            to job descriptions. Aim for 70%+ match score to beat the ATS.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 h-auto bg-muted/50 p-2">
              <TabsTrigger value="info" className="flex items-center gap-2 py-3">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Info</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2 py-3">
                <Briefcase className="w-4 h-4" />
                <span className="hidden md:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2 py-3">
                <GraduationCap className="w-4 h-4" />
                <span className="hidden md:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="certs" className="flex items-center gap-2 py-3">
                <Award className="w-4 h-4" />
                <span className="hidden md:inline">Certs</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2 py-3">
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden md:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="match" className="flex items-center gap-2 py-3">
                <Target className="w-4 h-4" />
                <span className="hidden md:inline">Match</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic contact details for the top of your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        placeholder="john.smith@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        placeholder="Nashville, TN"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input 
                      id="linkedin" 
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                      placeholder="linkedin.com/in/johnsmith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea 
                      id="summary" 
                      value={personalInfo.summary}
                      onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                      placeholder="Operations leader with 15+ years building high-performance teams in high-stakes environments..."
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Tip: Lead with value, not rank. Focus on transferable skills and outcomes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <div className="space-y-6">
                {experiences.map((exp, expIndex) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Experience {expIndex + 1}</CardTitle>
                        {experiences.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title / Role</Label>
                          <Input 
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            placeholder="Platoon Sergeant → Operations Manager"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Unit / Organization</Label>
                          <Input 
                            value={exp.unit}
                            onChange={(e) => updateExperience(exp.id, 'unit', e.target.value)}
                            placeholder="1st Battalion, 5th SFG → US Army Special Operations"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input 
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            placeholder="Fort Campbell, KY"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input 
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              placeholder="Jan 2018"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input 
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              placeholder="Present"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Bullet Points (Accomplishments)</Label>
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex gap-2">
                            <Textarea 
                              value={bullet}
                              onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                              placeholder="Led daily training programs for 40+ personnel, achieving 98% readiness rating..."
                              rows={2}
                              className="flex-1"
                            />
                            <div className="flex flex-col gap-1">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => translateBullet(exp.id, bulletIndex)}
                                title="Translate military terms"
                              >
                                <Wand2 className="w-4 h-4" />
                              </Button>
                              {exp.bullets.length > 1 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => removeBullet(exp.id, bulletIndex)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => addBullet(exp.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Bullet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addExperience} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>

                {/* Translation Guide */}
                <Card className="bg-amber-500/5 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <Lightbulb className="w-5 h-5" />
                      Translation Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-2">Military → Civilian</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>Platoon → Team of 30-40</li>
                          <li>Company → Organization of 100-200</li>
                          <li>OPORD → Operational plans</li>
                          <li>AAR → After action reviews</li>
                          <li>NCOER/OER → Performance evaluations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Focus On</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>✓ Quantify results (%, $, numbers)</li>
                          <li>✓ Action verbs (Led, Managed, Developed)</li>
                          <li>✓ Business outcomes</li>
                          <li>✗ Avoid military acronyms</li>
                          <li>✗ Don't assume they understand rank</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Degrees, military schools, and formal education</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label>Degree / Program</Label>
                        <Input 
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="B.S. Business Administration"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>School / Institution</Label>
                        <Input 
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          placeholder="University of Tennessee"
                        />
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="space-y-2 flex-1">
                          <Label>Year</Label>
                          <Input 
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addEducation}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certs">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Licenses</CardTitle>
                  <CardDescription>Professional certifications, security clearances, licenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Certification Name</Label>
                        <Input 
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                          placeholder="PMP, Six Sigma Green Belt, Security+"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Issuer</Label>
                        <Input 
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          placeholder="PMI, CompTIA"
                        />
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="space-y-2 flex-1">
                          <Label>Year</Label>
                          <Input 
                            value={cert.year}
                            onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                            placeholder="2023"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCertification(cert.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addCertification}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Add skills that match the job descriptions you're targeting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., Project Management, Leadership)"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="text-sm py-1 px-3 cursor-pointer hover:bg-destructive/20"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill}
                        <Trash2 className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>

                  {/* Suggested Skills */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-3">Suggested Skills for Veterans:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Leadership", "Team Building", "Project Management", "Strategic Planning",
                        "Risk Management", "Training & Development", "Operations Management",
                        "Crisis Management", "Budget Management", "Cross-functional Collaboration",
                        "Decision Making", "Problem Solving", "Communication", "Logistics"
                      ].filter(s => !skills.includes(s)).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="text-sm py-1 px-3 cursor-pointer hover:bg-primary/10"
                          onClick={() => setSkills([...skills, skill])}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Match Tab */}
            <TabsContent value="match">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Job Description Matcher
                    </CardTitle>
                    <CardDescription>
                      Paste a job description to see how well your resume matches. Aim for 70%+.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here..."
                      rows={12}
                    />
                    <Button onClick={analyzeJobMatch} className="w-full">
                      <Target className="w-4 h-4 mr-2" />
                      Analyze Match
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* Match Score */}
                  {matchScore !== null && (
                    <Card className={matchScore >= 70 ? "border-emerald-500/20 bg-emerald-500/5" : "border-amber-500/20 bg-amber-500/5"}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Match Score</span>
                          <span className={`text-3xl font-bold ${matchScore >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {matchScore}%
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={matchScore} className="h-3 mb-4" />
                        <div className="flex items-center gap-2 text-sm">
                          {matchScore >= 70 ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span className="text-emerald-600">Above 70% threshold - Good match!</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                              <span className="text-amber-600">Below 70% - Add more keywords from the job description</span>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Found Keywords */}
                  {foundKeywords.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-emerald-600">
                          <CheckCircle2 className="w-5 h-5" />
                          Keywords Found ({foundKeywords.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {foundKeywords.map((kw) => (
                            <Badge key={kw} variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Missing Keywords */}
                  {missingKeywords.length > 0 && (
                    <Card className="border-destructive/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-amber-600">
                          <AlertTriangle className="w-5 h-5" />
                          Missing Keywords ({missingKeywords.length})
                        </CardTitle>
                        <CardDescription>
                          Consider adding these to your resume where applicable
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {missingKeywords.map((kw) => (
                            <Badge 
                              key={kw} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-primary/10"
                              onClick={() => setSkills([...skills, kw])}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Export Button */}
          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={exportResume}>
              <Download className="w-5 h-5 mr-2" />
              Export Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilder;

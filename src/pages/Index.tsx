import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Target, Users, Calendar } from 'lucide-react';
import logo from '@/assets/logo.png';
import heroBg from '@/assets/hero-bg.jpg';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <img src={heroBg} alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="flex items-center gap-4 mb-8">
            <img src={logo} alt="Sales Platoon" className="w-20 h-20 lg:w-24 lg:h-24" />
            <div>
              <h1 className="font-display font-bold text-2xl lg:text-3xl">Sales Platoon</h1>
              <p className="text-muted-foreground">Veterans Transforming Veterans</p>
            </div>
          </div>

          <h2 className="font-display text-4xl lg:text-6xl font-bold max-w-3xl mb-6 animate-slide-up">
            Your Mission: <span className="text-accent">Civilian Success</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up stagger-1">
            The complete transition platform for service members and veterans. Plan your ETS, choose your career path, and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-2">
            <Link to="/auth">
              <Button variant="hero" size="xl">
                Start Your Transition <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Calendar, title: 'ETS Calculator', desc: 'Plan your timeline with precision' },
            { icon: Target, title: 'Career Paths', desc: '6 proven tracks to success' },
            { icon: CheckCircle2, title: 'Task Engine', desc: 'Weekly actionable checklist' },
            { icon: Users, title: 'Interview Prep', desc: 'AI-powered practice coach' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <item.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 text-center">
        <p className="text-xs text-muted-foreground">
          Disclaimer: This platform is not legal, financial, or official military advice. Always verify with your command and TAP counselor.
        </p>
      </div>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Calculator,
  ClipboardList,
  Compass,
  TrendingUp,
  FileText,
  Users,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import logo from '@/assets/logo.png';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/calculator', label: 'ETS Calculator', icon: Calculator },
  { path: '/plan', label: 'Transition Plan', icon: ClipboardList },
  { path: '/careers', label: 'Career Paths', icon: Compass },
  { path: '/sales', label: 'Why Sales', icon: TrendingUp },
  { path: '/resume', label: 'Resume & LinkedIn', icon: FileText },
  { path: '/interview', label: 'Interview Prep', icon: Users },
  { path: '/resources', label: 'Resources', icon: FolderOpen },
  { path: '/profile', label: 'Profile', icon: User },
];

const adminItems = [
  { path: '/admin', label: 'Admin Panel', icon: Shield },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, isAdmin, signOut, profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src={logo} alt="Sales Platoon" className="w-12 h-12" />
          <div>
            <h1 className="font-display font-bold text-sm leading-tight">Sales Platoon</h1>
            <p className="text-xs text-muted-foreground">From Service To Success</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              isActive(item.path)
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}

        {isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Admin
              </p>
            </div>
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {user && (
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium truncate">{profile?.full_name || user.email}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-border z-40 flex items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={logo} alt="Sales Platoon" className="w-10 h-10" />
          <span className="font-display font-bold text-sm">Sales Platoon</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-16 left-0 bottom-0 w-72 bg-sidebar border-r border-border z-50 flex flex-col transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-sidebar border-r border-border flex-col z-30">
        <NavContent />
      </aside>

      {/* Spacer for content */}
      <div className="hidden lg:block w-72 flex-shrink-0" />
      <div className="lg:hidden h-16" />
    </>
  );
}

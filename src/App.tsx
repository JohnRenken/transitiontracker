import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ETSCalculator from "./pages/ETSCalculator";
import TransitionPlan from "./pages/TransitionPlan";
import CareerPaths from "./pages/CareerPaths";
import InterviewPrep from "./pages/InterviewPrep";
import Resources from "./pages/Resources";
import LinkedInNetworking from "./pages/LinkedInNetworking";
import ResumeBuilder from "./pages/ResumeBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calculator" element={<ETSCalculator />} />
              <Route path="/plan" element={<TransitionPlan />} />
              <Route path="/careers" element={<CareerPaths />} />
              <Route path="/resume" element={<ResumeBuilder />} />
              <Route path="/sales" element={<Dashboard />} />
              <Route path="/resume" element={<Dashboard />} />
              <Route path="/interview" element={<InterviewPrep />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/networking" element={<LinkedInNetworking />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/admin" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

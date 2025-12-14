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
              <Route path="/sales" element={<Dashboard />} />
              <Route path="/resume" element={<Dashboard />} />
              <Route path="/interview" element={<Dashboard />} />
              <Route path="/resources" element={<Dashboard />} />
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


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicianDashboard from "./pages/ClinicianDashboard";
import DrUniversal from "./pages/patient/DrUniversal";
import MsCarey from "./pages/patient/MsCarey";
import MrVault from "./pages/patient/MrVault";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/dr-universal" element={<DrUniversal />} />
          <Route path="/patient/ms-carey" element={<MsCarey />} />
          <Route path="/patient/mr-vault" element={<MrVault />} />
          <Route path="/clinician" element={<ClinicianDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

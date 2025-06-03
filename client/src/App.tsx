import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import ProfessionalProfile from "@/pages/ProfessionalProfile";
import OrganizationProfile from "@/pages/OrganizationProfile";
import OrganizationSearch from "@/pages/OrganizationSearch";
import Messages from "@/pages/Messages";
import TrainingResources from "@/pages/TrainingResources";
import ForProfessionals from "@/pages/ForProfessionals";
import ForOrganizations from "@/pages/ForOrganizations";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/for-professionals" component={ForProfessionals} />
          <Route path="/for-organizations" component={ForOrganizations} />
          <Route path="/training" component={TrainingResources} />
          <Route path="/about" component={About} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/profile" component={ProfessionalProfile} />
          <Route path="/organization" component={OrganizationProfile} />
          <Route path="/search" component={OrganizationSearch} />
          <Route path="/messages" component={Messages} />
          <Route path="/training" component={TrainingResources} />
          <Route path="/for-professionals" component={ForProfessionals} />
          <Route path="/for-organizations" component={ForOrganizations} />
          <Route path="/about" component={About} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

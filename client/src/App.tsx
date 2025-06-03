import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import UserTypeSelection from "@/pages/UserTypeSelection";
import ProfessionalProfile from "@/pages/ProfessionalProfile";
import OrganizationProfile from "@/pages/OrganizationProfile";
import OrganizationSearch from "@/pages/OrganizationSearch";
import Messages from "@/pages/Messages";
import TrainingResources from "@/pages/TrainingResources";
import ProfessionalDetails from "@/pages/ProfessionalDetails";
import DeploymentSearch from "@/pages/DeploymentSearch";
import ForProfessionals from "@/pages/ForProfessionals";
import ForOrganizations from "@/pages/ForOrganizations";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/for-professionals" component={ForProfessionals} />
          <Route path="/for-organizations" component={ForOrganizations} />
          <Route path="/training" component={TrainingResources} />
        </>
      ) : !user?.userType ? (
        <Route path="*" component={UserTypeSelection} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/profile" component={ProfessionalProfile} />
          <Route path="/organization" component={OrganizationProfile} />
          <Route path="/search" component={OrganizationSearch} />
          <Route path="/deployments" component={DeploymentSearch} />
          <Route path="/professional/:id" component={ProfessionalDetails} />
          <Route path="/messages" component={Messages} />
          <Route path="/training" component={TrainingResources} />
          <Route path="/for-professionals" component={ForProfessionals} />
          <Route path="/for-organizations" component={ForOrganizations} />
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

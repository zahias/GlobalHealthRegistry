import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  User, 
  FileText, 
  Shield, 
  Search,
  MessageSquare,
  Clock
} from "lucide-react";
import { Link } from "wouter";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: {
    label: string;
    href: string;
  };
  icon: React.ReactNode;
}

interface OnboardingDashboardProps {
  userType: "professional" | "organization";
  user: any;
  profileData: any;
}

export function OnboardingDashboard({ userType, user, profileData }: OnboardingDashboardProps) {
  const professionalSteps: OnboardingStep[] = [
    {
      id: "profile",
      title: "Complete Your Profile",
      description: "Add your specialties, experience, and contact preferences",
      completed: !!profileData,
      action: {
        label: "Complete Profile",
        href: "/profile"
      },
      icon: <User className="h-5 w-5" />
    },
    {
      id: "documents",
      title: "Upload Credentials",
      description: "Add your medical license, certifications, and CV",
      completed: false, // TODO: Check if documents uploaded
      action: {
        label: "Upload Documents",
        href: "/profile"
      },
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "verification",
      title: "Verification Process",
      description: "Complete identity and credential verification",
      completed: false, // TODO: Check verification status
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: "search",
      title: "Explore Opportunities",
      description: "Browse and apply for deployment opportunities",
      completed: false,
      action: {
        label: "Browse Deployments",
        href: "/deployments"
      },
      icon: <Search className="h-5 w-5" />
    }
  ];

  const organizationSteps: OnboardingStep[] = [
    {
      id: "profile",
      title: "Organization Profile",
      description: "Complete your organization details and verification",
      completed: !!profileData,
      action: {
        label: "Complete Profile",
        href: "/organization"
      },
      icon: <User className="h-5 w-5" />
    },
    {
      id: "verification",
      title: "Organization Verification",
      description: "Verify your humanitarian organization status",
      completed: false, // TODO: Check verification status
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: "search",
      title: "Find Professionals",
      description: "Search and connect with verified healthcare professionals",
      completed: false,
      action: {
        label: "Search Professionals",
        href: "/search"
      },
      icon: <Search className="h-5 w-5" />
    },
    {
      id: "post",
      title: "Post Opportunities",
      description: "Create deployment opportunities for professionals",
      completed: false,
      action: {
        label: "Post Opportunity",
        href: "/deployments"
      },
      icon: <MessageSquare className="h-5 w-5" />
    }
  ];

  const steps = userType === "professional" ? professionalSteps : organizationSteps;
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Getting Started</span>
          <Badge variant="outline">
            {completedSteps} of {steps.length} completed
          </Badge>
        </CardTitle>
        <Progress value={progressPercentage} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              step.completed 
                ? "bg-green-50 border-green-200" 
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center mr-4">
              {step.completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <div className="relative">
                  <Circle className="h-6 w-6 text-gray-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-1">
                {step.icon}
                <h4 className="font-semibold ml-2">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>

            {step.action && !step.completed && (
              <Link href={step.action.href}>
                <Button size="sm" className="ml-4">
                  {step.action.label}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}

            {step.completed && (
              <Badge className="bg-green-100 text-green-800 ml-4">
                Complete
              </Badge>
            )}
          </div>
        ))}

        {progressPercentage === 100 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-900">Setup Complete!</h4>
                <p className="text-sm text-blue-700">
                  You're all set to {userType === "professional" ? "explore deployment opportunities" : "find healthcare professionals"}.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
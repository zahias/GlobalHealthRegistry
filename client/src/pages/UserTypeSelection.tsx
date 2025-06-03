import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavigation } from "@/components/PublicNavigation";
import { UserCheck, Building2, Stethoscope, Users, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function UserTypeSelection() {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const setUserTypeMutation = useMutation({
    mutationFn: async (userType: string) => {
      const response = await fetch("/api/auth/set-user-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      if (selectedType === 'professional') {
        setLocation('/profile');
      } else {
        setLocation('/organization');
      }
    },
  });

  const handleSelection = (type: string) => {
    setSelectedType(type);
    setUserTypeMutation.mutate(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <PublicNavigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Global Health Registry
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose your role to get started with your personalized experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Healthcare Professional */}
          <Card className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-500">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-900">Healthcare Professional</CardTitle>
              <Badge className="bg-blue-100 text-blue-800 w-fit mx-auto">Join the Registry</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Register as a healthcare professional to connect with humanitarian organizations worldwide
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <UserCheck className="h-4 w-4 text-green-600 mr-3" />
                  <span>Create your professional profile</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <UserCheck className="h-4 w-4 text-green-600 mr-3" />
                  <span>Upload credentials and certifications</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <UserCheck className="h-4 w-4 text-green-600 mr-3" />
                  <span>Set deployment preferences</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <UserCheck className="h-4 w-4 text-green-600 mr-3" />
                  <span>Connect with verified organizations</span>
                </div>
              </div>

              <Button 
                onClick={() => handleSelection('professional')}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                disabled={setUserTypeMutation.isPending}
              >
                {setUserTypeMutation.isPending && selectedType === 'professional' ? (
                  "Setting up..."
                ) : (
                  <>
                    Continue as Professional
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Humanitarian Organization */}
          <Card className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-2 hover:border-orange-500">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-900">Humanitarian Organization</CardTitle>
              <Badge className="bg-orange-100 text-orange-800 w-fit mx-auto">Find Professionals</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Register your organization to access our verified network of healthcare professionals
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="h-4 w-4 text-green-600 mr-3" />
                  <span>Search verified professionals</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="h-4 w-4 text-green-600 mr-3" />
                  <span>Post deployment opportunities</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="h-4 w-4 text-green-600 mr-3" />
                  <span>Manage recruitment pipeline</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="h-4 w-4 text-green-600 mr-3" />
                  <span>Access training resources</span>
                </div>
              </div>

              <Button 
                onClick={() => handleSelection('organization')}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
                disabled={setUserTypeMutation.isPending}
              >
                {setUserTypeMutation.isPending && selectedType === 'organization' ? (
                  "Setting up..."
                ) : (
                  <>
                    Continue as Organization
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            You can change your account type later in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
}
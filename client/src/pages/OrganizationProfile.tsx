import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Building, Shield } from "lucide-react";

const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  type: z.string().min(1, "Organization type is required"),
  description: z.string().optional(),
  website: z.string().optional(),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactEmail: z.string().email("Valid email is required"),
  country: z.string().min(1, "Country is required"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

export default function OrganizationProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: organization, isLoading } = useQuery({
    queryKey: ["/api/organizations/me"],
    enabled: !!user,
  });

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: (organization as any)?.name || "",
      type: (organization as any)?.type || "",
      description: (organization as any)?.description || "",
      website: (organization as any)?.website || "",
      contactPerson: (organization as any)?.contactPerson || "",
      contactEmail: (organization as any)?.contactEmail || "",
      country: (organization as any)?.country || "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: OrganizationFormData) => 
      apiRequest("POST", "/api/organizations", data),
    onSuccess: () => {
      toast({ title: "Organization profile created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/organizations/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: () => {
      toast({ title: "Failed to create organization profile", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: OrganizationFormData) => 
      apiRequest("PUT", `/api/organizations/${(organization as any).id}`, data),
    onSuccess: () => {
      toast({ title: "Organization profile updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/organizations/me"] });
    },
    onError: () => {
      toast({ title: "Failed to update organization profile", variant: "destructive" });
    },
  });

  const onSubmit = (data: OrganizationFormData) => {
    if (organization) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {organization ? 'Organization Profile' : 'Create Organization Profile'}
          </h1>
          <p className="text-gray-600">
            {organization ? 'Update your organization information and verification status' : 'Set up your organization profile to connect with healthcare professionals'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Organization Name */}
                  <div>
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      {...form.register('name')}
                      placeholder="Organization name"
                    />
                  </div>

                  {/* Organization Type */}
                  <div>
                    <Label htmlFor="type">Organization Type *</Label>
                    <Select 
                      value={form.watch('type')} 
                      onValueChange={(value) => form.setValue('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngo">NGO / Non-Profit</SelectItem>
                        <SelectItem value="government">Government Agency</SelectItem>
                        <SelectItem value="hospital">Hospital / Medical Center</SelectItem>
                        <SelectItem value="academic">Academic Institution</SelectItem>
                        <SelectItem value="international">International Organization</SelectItem>
                        <SelectItem value="foundation">Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      {...form.register('description')}
                      placeholder="Brief description of your organization's mission and activities"
                      rows={4}
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      {...form.register('website')}
                      placeholder="https://your-organization.org"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        {...form.register('contactPerson')}
                        placeholder="Primary contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        type="email"
                        {...form.register('contactEmail')}
                        placeholder="contact@organization.org"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country">Country/Region *</Label>
                    <Input
                      {...form.register('country')}
                      placeholder="Country where organization is based"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (organization ? 'Update Profile' : 'Create Profile')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="font-medium">Profile Registration</span>
                    </div>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">•</span>
                      </div>
                      <span className="font-medium">Document Verification</span>
                    </div>
                    <span className="text-orange-500 font-medium">Pending</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">○</span>
                      </div>
                      <span className="font-medium text-gray-500">Organization Approval</span>
                    </div>
                    <span className="text-gray-500 font-medium">Pending</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Estimated completion: 5-7 business days
                  </p>
                  <Button className="w-full" variant="outline">
                    Upload Verification Documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organization Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Access to verified healthcare professionals worldwide</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Advanced search and filtering capabilities</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Secure messaging system</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Real-time availability tracking</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Professional deployment history</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
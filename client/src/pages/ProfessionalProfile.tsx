import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { VerificationStatus } from "@/components/VerificationStatus";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const professionalSchema = z.object({
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseCountry: z.string().min(1, "License country is required"),
  experience: z.number().min(0, "Experience must be 0 or greater"),
  availabilityStatus: z.enum(['available', 'not_available', 'pending_documentation', 'deployment_in_progress']),
  availableFrom: z.string().optional(),
  preferredDuration: z.string().optional(),
  regionalExperience: z.array(z.string()).optional(),
  bio: z.string().optional(),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

export default function ProfessionalProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newRegion, setNewRegion] = useState("");

  const { data: professional, isLoading } = useQuery({
    queryKey: ["/api/professionals/me"],
    enabled: !!user,
  });

  const form = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      specialties: professional?.specialties || [],
      certifications: professional?.certifications || [],
      languages: professional?.languages || [],
      licenseNumber: professional?.licenseNumber || "",
      licenseCountry: professional?.licenseCountry || "",
      experience: professional?.experience || 0,
      availabilityStatus: professional?.availabilityStatus || 'pending_documentation',
      availableFrom: professional?.availableFrom ? new Date(professional.availableFrom).toISOString().split('T')[0] : "",
      preferredDuration: professional?.preferredDuration || "",
      regionalExperience: professional?.regionalExperience || [],
      bio: professional?.bio || "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ProfessionalFormData) => 
      apiRequest("POST", "/api/professionals", data),
    onSuccess: () => {
      toast({ title: "Profile created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/professionals/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: () => {
      toast({ title: "Failed to create profile", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProfessionalFormData) => 
      apiRequest("PUT", `/api/professionals/${professional.id}`, data),
    onSuccess: () => {
      toast({ title: "Profile updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/professionals/me"] });
    },
    onError: () => {
      toast({ title: "Failed to update profile", variant: "destructive" });
    },
  });

  const onSubmit = (data: ProfessionalFormData) => {
    if (professional) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const addItem = (field: 'specialties' | 'certifications' | 'languages' | 'regionalExperience', value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentValues = form.getValues(field) || [];
      if (!currentValues.includes(value.trim())) {
        form.setValue(field, [...currentValues, value.trim()]);
        setter("");
      }
    }
  };

  const removeItem = (field: 'specialties' | 'certifications' | 'languages' | 'regionalExperience', index: number) => {
    const currentValues = form.getValues(field) || [];
    form.setValue(field, currentValues.filter((_, i) => i !== index));
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
            {professional ? 'Professional Profile' : 'Create Professional Profile'}
          </h1>
          <p className="text-gray-600">
            {professional ? 'Update your professional information and availability status' : 'Set up your professional profile to connect with humanitarian organizations'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Specialties */}
                  <div>
                    <Label htmlFor="specialties">Medical Specialties *</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        placeholder="Add specialty"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem('specialties', newSpecialty, setNewSpecialty);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => addItem('specialties', newSpecialty, setNewSpecialty)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(form.watch('specialties') || []).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {specialty}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeItem('specialties', index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <Label htmlFor="languages">Languages *</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="Add language"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem('languages', newLanguage, setNewLanguage);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => addItem('languages', newLanguage, setNewLanguage)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(form.watch('languages') || []).map((language, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {language}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeItem('languages', index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <Label htmlFor="certifications">Certifications</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        placeholder="Add certification"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem('certifications', newCertification, setNewCertification);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => addItem('certifications', newCertification, setNewCertification)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(form.watch('certifications') || []).map((cert, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {cert}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeItem('certifications', index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* License Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Input
                        {...form.register('licenseNumber')}
                        placeholder="Medical license number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseCountry">License Country *</Label>
                      <Input
                        {...form.register('licenseCountry')}
                        placeholder="Country of license"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      type="number"
                      {...form.register('experience', { valueAsNumber: true })}
                      placeholder="Years of medical experience"
                    />
                  </div>

                  {/* Availability */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="availabilityStatus">Availability Status</Label>
                      <Select 
                        value={form.watch('availabilityStatus')} 
                        onValueChange={(value) => form.setValue('availabilityStatus', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available for Deployment</SelectItem>
                          <SelectItem value="not_available">Not Available</SelectItem>
                          <SelectItem value="pending_documentation">Pending Documentation</SelectItem>
                          <SelectItem value="deployment_in_progress">Deployment in Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="availableFrom">Available From</Label>
                      <Input
                        type="date"
                        {...form.register('availableFrom')}
                      />
                    </div>
                  </div>

                  {/* Preferred Duration */}
                  <div>
                    <Label htmlFor="preferredDuration">Preferred Deployment Duration</Label>
                    <Select 
                      value={form.watch('preferredDuration')} 
                      onValueChange={(value) => form.setValue('preferredDuration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="12+ months">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Regional Experience */}
                  <div>
                    <Label htmlFor="regionalExperience">Regional Experience</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        value={newRegion}
                        onChange={(e) => setNewRegion(e.target.value)}
                        placeholder="Add region"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem('regionalExperience', newRegion, setNewRegion);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => addItem('regionalExperience', newRegion, setNewRegion)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(form.watch('regionalExperience') || []).map((region, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {region}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeItem('regionalExperience', index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      {...form.register('bio')}
                      placeholder="Brief description of your experience and interests in humanitarian work"
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : professional ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            {professional && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusBadge status={professional.availabilityStatus} />
                  <p className="text-sm text-gray-600 mt-2">
                    Last updated: {new Date(professional.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Verification Status */}
            <VerificationStatus professional={professional} />

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basic Information</span>
                    <span>{professional ? '100%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: professional ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Complete your profile to be discoverable by organizations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

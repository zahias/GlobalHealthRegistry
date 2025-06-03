import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UnifiedNavigation } from "@/components/UnifiedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, Users, AlertTriangle, Plus, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const opportunitySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.string().min(2, "Location is required"),
  country: z.string().min(2, "Country is required"),
  duration: z.string().min(1, "Duration is required"),
  startDate: z.string().min(1, "Start date is required"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  specialtiesRequired: z.array(z.string()).min(1, "At least one specialty is required"),
  languagesRequired: z.array(z.string()).min(1, "At least one language is required"),
  minimumExperience: z.number().min(0, "Experience must be 0 or more years"),
  accommodationProvided: z.boolean(),
  transportationProvided: z.boolean(),
  stipendProvided: z.boolean(),
  contactEmail: z.string().email("Valid email is required"),
  additionalRequirements: z.string().optional(),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

const specialtyOptions = [
  "Emergency Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology",
  "Internal Medicine", "Anesthesiology", "Orthopedics", "Cardiology",
  "Infectious Diseases", "Mental Health", "Trauma Care", "Critical Care",
  "Family Medicine", "Radiology", "Laboratory Medicine", "Pharmacy"
];

const languageOptions = [
  "English", "Arabic", "French", "Spanish", "Portuguese", "Swahili",
  "Hausa", "Bengali", "Urdu", "Hindi", "Dari", "Pashto", "Somali"
];

export default function PostOpportunity() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const form = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      specialtiesRequired: [],
      languagesRequired: [],
      minimumExperience: 0,
      accommodationProvided: false,
      transportationProvided: false,
      stipendProvided: false,
      urgency: "medium",
    },
  });

  const createOpportunityMutation = useMutation({
    mutationFn: async (data: OpportunityFormData) => {
      return await apiRequest('/api/opportunities', {
        method: 'POST',
        body: data
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Deployment opportunity posted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/organizations/postings'] });
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to post opportunity",
        variant: "destructive",
      });
    },
  });

  const addSpecialty = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      const newSpecialties = [...selectedSpecialties, specialty];
      setSelectedSpecialties(newSpecialties);
      form.setValue('specialtiesRequired', newSpecialties);
    }
  };

  const removeSpecialty = (specialty: string) => {
    const newSpecialties = selectedSpecialties.filter(s => s !== specialty);
    setSelectedSpecialties(newSpecialties);
    form.setValue('specialtiesRequired', newSpecialties);
  };

  const addLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      const newLanguages = [...selectedLanguages, language];
      setSelectedLanguages(newLanguages);
      form.setValue('languagesRequired', newLanguages);
    }
  };

  const removeLanguage = (language: string) => {
    const newLanguages = selectedLanguages.filter(l => l !== language);
    setSelectedLanguages(newLanguages);
    form.setValue('languagesRequired', newLanguages);
  };

  const onSubmit = (data: OpportunityFormData) => {
    createOpportunityMutation.mutate({
      ...data,
      specialtiesRequired: selectedSpecialties,
      languagesRequired: selectedLanguages,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Deployment Opportunity</h1>
          <p className="text-gray-600">Connect with verified healthcare professionals ready to serve in humanitarian missions</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Position Title *</Label>
                <Input
                  id="title"
                  {...form.register('title')}
                  placeholder="e.g., Emergency Physician - Gaza Response"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location/City *</Label>
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="e.g., Gaza City"
                  />
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.location.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    {...form.register('country')}
                    placeholder="e.g., Palestine"
                  />
                  {form.formState.errors.country && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.country.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  {...form.register('description')}
                  rows={6}
                  placeholder="Describe the humanitarian situation, medical needs, working conditions, and specific responsibilities..."
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Deployment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Deployment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Select onValueChange={(value) => form.setValue('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6-12 months">6-12 months</SelectItem>
                      <SelectItem value="12+ months">12+ months</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate">Expected Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...form.register('startDate')}
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select onValueChange={(value: any) => form.setValue('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="minimumExperience">Minimum Experience (years)</Label>
                <Input
                  id="minimumExperience"
                  type="number"
                  min="0"
                  {...form.register('minimumExperience', { valueAsNumber: true })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Required Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Required Medical Specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Required Specialties *</Label>
                <Select onValueChange={addSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyOptions.filter(s => !selectedSpecialties.includes(s)).map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSpecialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                      {specialty}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeSpecialty(specialty)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Required Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Language Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Required Languages *</Label>
                <Select onValueChange={addLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.filter(l => !selectedLanguages.includes(l)).map((language) => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedLanguages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((language) => (
                    <Badge key={language} variant="outline" className="flex items-center gap-1">
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeLanguage(language)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits & Support */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Support Provided</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accommodation"
                    checked={form.watch('accommodationProvided')}
                    onCheckedChange={(checked) => form.setValue('accommodationProvided', !!checked)}
                  />
                  <Label htmlFor="accommodation">Accommodation provided</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transportation"
                    checked={form.watch('transportationProvided')}
                    onCheckedChange={(checked) => form.setValue('transportationProvided', !!checked)}
                  />
                  <Label htmlFor="transportation">Transportation/flights covered</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stipend"
                    checked={form.watch('stipendProvided')}
                    onCheckedChange={(checked) => form.setValue('stipendProvided', !!checked)}
                  />
                  <Label htmlFor="stipend">Stipend/allowance provided</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Additional Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information & Additional Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...form.register('contactEmail')}
                  placeholder="applications@organization.org"
                />
                {form.formState.errors.contactEmail && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.contactEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                <Textarea
                  id="additionalRequirements"
                  {...form.register('additionalRequirements')}
                  rows={4}
                  placeholder="Any additional requirements, certifications, or qualifications needed..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation('/')}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={createOpportunityMutation.isPending}
            >
              {createOpportunityMutation.isPending ? "Posting..." : "Post Opportunity"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
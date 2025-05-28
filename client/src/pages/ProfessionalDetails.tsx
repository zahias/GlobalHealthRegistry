import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { 
  MapPin, 
  Languages, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  Download,
  Globe
} from "lucide-react";
import { VerificationStatus } from "@/components/VerificationStatus";
import { StatusBadge } from "@/components/StatusBadge";

export default function ProfessionalDetails() {
  const { id } = useParams();

  const { data: professional, isLoading } = useQuery({
    queryKey: ['/api/professionals', id],
  });

  const { data: user } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading professional details...</div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Professional not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/api/placeholder/96/96" alt="Professional" />
                  <AvatarFallback>
                    {professional.user?.firstName?.[0]}{professional.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Dr. {professional.user?.firstName} {professional.user?.lastName}
                      </h1>
                      <p className="text-lg text-gray-600 mt-1">
                        {professional.specialties?.[0]} Specialist
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <StatusBadge status={professional.availabilityStatus} />
                        <VerificationStatus professional={professional} />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {professional.bio || "No bio available."}
                </p>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {professional.specialties?.map((specialty: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Certifications & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professional.certifications?.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Languages className="mr-2 h-5 w-5" />
                  Language Proficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {professional.languages?.map((language: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      <Globe className="mr-1 h-3 w-3" />
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={professional.availabilityStatus} />
                  </div>
                </div>
                
                {professional.availableFrom && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Available From</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(professional.availableFrom).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {professional.preferredDuration && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Preferred Duration</label>
                    <p className="mt-1 text-gray-900">{professional.preferredDuration}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {professional.experience || 0}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Years of Experience
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">License Verification</span>
                    {professional.licenseVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Check</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reference Verification</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {professional.user?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Contact through the platform messaging system for privacy and security.
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Shield, MessageSquare, Eye } from "lucide-react";
import { Link } from "wouter";

interface ProfessionalCardProps {
  professional: {
    id: number;
    userId: string;
    specialties?: string[];
    languages?: string[];
    certifications?: string[];
    experience?: number;
    availabilityStatus: string;
    availableFrom?: string;
    preferredDuration?: string;
    licenseVerified?: boolean;
    bio?: string;
  };
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const handleContact = () => {
    // Navigate to messages with this professional
    window.location.href = `/messages?contact=${professional.userId}`;
  };

  const isAvailable = professional.availabilityStatus === 'available';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold mr-3">
                Healthcare Professional
              </h3>
              <StatusBadge status={professional.availabilityStatus} size="sm" />
              {professional.licenseVerified && (
                <Shield className="text-green-600 ml-2 h-4 w-4" title="Verified License" />
              )}
            </div>
            
            <p className="text-gray-600 mb-3">
              {professional.specialties?.join(', ')} • {professional.experience} years experience
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {professional.languages?.map((language, index) => (
                <Badge key={index} variant="secondary">
                  {language}
                </Badge>
              ))}
              {professional.certifications?.slice(0, 2).map((cert, index) => (
                <Badge key={index} variant="outline">
                  {cert}
                </Badge>
              ))}
              {professional.experience && (
                <Badge variant="outline">
                  {professional.experience} years
                </Badge>
              )}
            </div>
            
            {professional.availableFrom && (
              <p className="text-sm text-gray-600">
                Available from: {new Date(professional.availableFrom).toLocaleDateString()} • 
                Preferred duration: {professional.preferredDuration || 'Not specified'}
              </p>
            )}
          </div>
          
          <div className="flex space-x-2 ml-4">
            <Button
              onClick={handleContact}
              disabled={!isAvailable}
              className={!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Contact
            </Button>
            <Link href={`/professional/${professional.id}`}>
              <Button variant="outline">
                <Eye className="mr-1 h-4 w-4" />
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

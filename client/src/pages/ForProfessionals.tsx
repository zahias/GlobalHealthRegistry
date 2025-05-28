import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRound, Shield, Globe, Clock, Heart, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { PublicNavigation } from "@/components/PublicNavigation";

export default function ForProfessionals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <PublicNavigation />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <UserRound className="mx-auto h-16 w-16 text-orange-600 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            For Healthcare Professionals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a global network of healthcare professionals making a difference in crisis zones. 
            Connect with humanitarian organizations and deploy your skills where they're needed most.
          </p>
        </div>

        {/* Why Join Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-orange-200">
            <CardHeader>
              <Heart className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle className="text-orange-900">Make an Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use your medical expertise to save lives and provide critical healthcare 
                in regions affected by conflicts, natural disasters, and humanitarian crises.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <Globe className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle className="text-orange-900">Global Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Deploy to locations worldwide with trusted humanitarian organizations. 
                Gain international experience while serving vulnerable populations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <Shield className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle className="text-orange-900">Professional Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Develop specialized skills in emergency medicine, field surgery, and 
                public health while working in challenging environments.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Section */}
        <Card className="mb-16 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">1. Create Your Profile</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Complete your professional information
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Upload medical licenses and certifications
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Specify your specialties and languages
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">2. Get Verified</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Submit verification documents
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Complete background checks
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Receive platform approval
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/profile">
                <Button className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
                  Create Professional Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Section */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900">Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">Essential Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid medical license in country of practice</li>
                  <li>• Minimum 2 years of professional experience</li>
                  <li>• Current medical malpractice insurance</li>
                  <li>• Clean criminal background check</li>
                  <li>• Basic life support certification (BLS/ACLS)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">Preferred Qualifications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Previous humanitarian or emergency experience</li>
                  <li>• Multiple language proficiency</li>
                  <li>• Specialized certifications (ATLS, PALS, etc.)</li>
                  <li>• Tropical medicine training</li>
                  <li>• Cultural competency training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
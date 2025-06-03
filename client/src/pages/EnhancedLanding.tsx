import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SuccessStoriesCarousel } from "@/components/SuccessStoriesCarousel";
import { 
  UserRound, 
  Building, 
  ArrowRight, 
  Shield, 
  Users, 
  Heart, 
  MapPin, 
  GraduationCap, 
  Globe,
  CheckCircle,
  Star,
  Award
} from "lucide-react";
import { Link } from "wouter";

export default function EnhancedLanding() {
  const handleProfessionalDemo = () => {
    window.location.href = "/professional-demo";
  };

  const handleOrganizationDemo = () => {
    window.location.href = "/organization-demo";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <UserRound className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Global Health Registry
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/for-professionals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Professionals
              </Link>
              <Link href="/for-organizations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Organizations
              </Link>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleProfessionalDemo}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserRound className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleOrganizationDemo}
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Building className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4 mr-2" />
                Powered by AUB Global Health Institute
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting Healthcare Heroes with 
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Humanitarian Missions</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the world's most trusted platform for verified healthcare professionals 
              seeking meaningful deployment opportunities in crisis and conflict zones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleProfessionalDemo}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Explore as Professional
                <UserRound className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleOrganizationDemo}
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              >
                Explore as Organization
                <Building className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                250+ Verified Professionals
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                45+ Partner Organizations
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                30+ Countries Served
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and efficient - connecting the right professionals with the right opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* For Professionals */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">For Healthcare Professionals</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Create Your Profile</h4>
                    <p className="text-gray-600">Upload credentials, certifications, and set your deployment preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Get Verified</h4>
                    <p className="text-gray-600">Our team verifies your credentials and professional standing</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Find Opportunities</h4>
                    <p className="text-gray-600">Browse and apply for deployment opportunities that match your skills</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Organizations */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-6">For Humanitarian Organizations</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Register Organization</h4>
                    <p className="text-gray-600">Complete verification as a legitimate humanitarian organization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Post Opportunities</h4>
                    <p className="text-gray-600">Create detailed deployment positions with specific requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Connect with Professionals</h4>
                    <p className="text-gray-600">Review applications and connect with verified healthcare experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories from the Field</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from healthcare professionals who've made a difference through our platform
            </p>
          </div>
          <SuccessStoriesCarousel />
        </div>
      </section>

      {/* Current Crisis Areas - Alternative Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Where Help is Needed Most</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current humanitarian crises requiring immediate medical expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-red-600 text-white">CRITICAL</Badge>
                  <div className="text-2xl font-bold text-red-700">12</div>
                </div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Gaza Strip</h3>
                <p className="text-red-700 text-sm mb-3">Emergency medical response needed for trauma care and surgical support</p>
                <div className="text-xs text-red-600">
                  <div>• Emergency physicians required</div>
                  <div>• Surgical specialists needed</div>
                  <div>• Arabic/English speaking</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-orange-600 text-white">HIGH</Badge>
                  <div className="text-2xl font-bold text-orange-700">8</div>
                </div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Bangladesh</h3>
                <p className="text-orange-700 text-sm mb-3">Rohingya refugee camps require pediatric and maternal health specialists</p>
                <div className="text-xs text-orange-600">
                  <div>• Pediatricians needed</div>
                  <div>• Maternal health specialists</div>
                  <div>• Bengali/English speaking</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-yellow-600 text-white">MEDIUM</Badge>
                  <div className="text-2xl font-bold text-yellow-700">5</div>
                </div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Sudan</h3>
                <p className="text-yellow-700 text-sm mb-3">Ongoing conflict zones need general practitioners and mental health support</p>
                <div className="text-xs text-yellow-600">
                  <div>• General practitioners</div>
                  <div>• Mental health specialists</div>
                  <div>• Arabic/English speaking</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => window.location.href = "/api/login"} className="bg-blue-600 hover:bg-blue-700">
              View All Current Opportunities
            </Button>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Global Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of healthcare professionals and organizations working together 
            to provide life-saving care where it's needed most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleProfessionalDemo}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Explore Professional Dashboard
              <UserRound className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleOrganizationDemo}
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
            >
              Explore Organization Dashboard
              <Building className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <UserRound className="text-blue-400 text-2xl mr-3" />
                <span className="text-xl font-bold">Global Health Registry</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting skilled healthcare professionals with humanitarian organizations 
                to provide critical medical care in crisis and conflict zones worldwide.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 AUB Global Health Institute. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">For Professionals</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/for-professionals" className="hover:text-white transition-colors">Getting Started</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Verification Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">For Organizations</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/for-organizations" className="hover:text-white transition-colors">Organization Setup</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Posting Opportunities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
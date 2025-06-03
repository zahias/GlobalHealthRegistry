import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UnifiedNavigation } from "@/components/UnifiedNavigation";
import { 
  UserRound, 
  ArrowRight, 
  Shield, 
  Users, 
  Heart,
  MapPin, 
  GraduationCap, 
  Globe,
  CheckCircle,
  Star,
  Award,
  Clock,
  Calendar,
  Stethoscope,
  FileText,
  MessageSquare
} from "lucide-react";
import { Link } from "wouter";

export default function EnhancedForProfessionals() {
  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-white">
      <UnifiedNavigation isPublic={true} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Stethoscope className="h-4 w-4 mr-2" />
                For Healthcare Professionals
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Lives Through 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Humanitarian Service</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join a global network of verified healthcare professionals making a real difference in crisis zones and underserved communities worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleSignIn}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Rigorous Verification
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Trusted by WHO Partners
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Global Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Healthcare Professionals Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the platform, support, and opportunities you need to make a meaningful impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Shield className="text-blue-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-blue-800 mb-4">Verified Opportunities</h4>
                <p className="text-blue-700 leading-relaxed">
                  Every opportunity is vetted by our team. Work only with legitimate humanitarian organizations 
                  committed to professional standards and duty of care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Users className="text-green-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-green-800 mb-4">Professional Network</h4>
                <p className="text-green-700 leading-relaxed">
                  Connect with a global community of like-minded healthcare professionals. Share experiences, 
                  learn from others, and build lasting professional relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Heart className="text-red-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-red-800 mb-4">Meaningful Impact</h4>
                <p className="text-red-700 leading-relaxed">
                  Your skills save lives and provide hope to vulnerable populations. Every deployment 
                  contributes to building stronger, healthier communities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Path to Global Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From registration to deployment - we guide you through every step
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Create Your Professional Profile</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Upload your credentials, certifications, and professional experience. Our verification team 
                  ensures your qualifications meet international standards for humanitarian deployment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    Medical licenses and certifications
                  </div>
                  <div className="flex items-center text-gray-700">
                    <GraduationCap className="h-5 w-5 text-blue-600 mr-3" />
                    Educational background verification
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    Professional experience documentation
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-blue-900">Profile Verification Includes:</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Medical degree and specialty verification</li>
                      <li>• Professional licensing status check</li>
                      <li>• Background and reference verification</li>
                      <li>• Language proficiency assessment</li>
                      <li>• Cultural competency evaluation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Browse Verified Opportunities</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Access curated deployment opportunities matched to your skills, experience, and preferences. 
                  Filter by location, duration, specialty, and urgency level.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-green-600 mr-3" />
                    Location-based filtering
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    Flexible duration options
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="h-5 w-5 text-green-600 mr-3" />
                    Specialty-specific matching
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-green-900">Current Critical Needs:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-800">Emergency Medicine</span>
                        <Badge className="bg-red-600 text-white">URGENT</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-800">Pediatrics</span>
                        <Badge className="bg-orange-600 text-white">HIGH</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-800">Surgery</span>
                        <Badge className="bg-red-600 text-white">URGENT</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-800">Mental Health</span>
                        <Badge className="bg-yellow-600 text-white">MEDIUM</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Deploy with Confidence</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Receive comprehensive pre-deployment support, cultural orientation, and ongoing assistance 
                  throughout your mission. We ensure you're prepared and supported every step of the way.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Shield className="h-5 w-5 text-red-600 mr-3" />
                    Safety and security briefings
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Globe className="h-5 w-5 text-red-600 mr-3" />
                    Cultural orientation training
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MessageSquare className="h-5 w-5 text-red-600 mr-3" />
                    24/7 support during deployment
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-red-900">Pre-Deployment Support:</h4>
                    <ul className="space-y-2 text-red-800">
                      <li>• Comprehensive security briefings</li>
                      <li>• Cultural sensitivity training</li>
                      <li>• Medical equipment familiarization</li>
                      <li>• Communication protocols setup</li>
                      <li>• Emergency evacuation procedures</li>
                      <li>• Mental health and wellness support</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories from the Field</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from healthcare professionals who've made a difference through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Sarah Chen</h4>
                    <p className="text-sm text-gray-600">Emergency Physician</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "My deployment to Gaza was life-changing. The platform's verification process gave me confidence 
                  in the organization, and the pre-deployment training was invaluable. I've never felt more 
                  purposeful in my medical career."
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Deployment:</span> 3 months in Gaza • Emergency Medicine
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Michael Johnson</h4>
                    <p className="text-sm text-gray-600">Pediatric Surgeon</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Working in Bangladesh's refugee camps opened my eyes to global health challenges. The 
                  children I treated reminded me why I became a doctor. This platform makes it possible 
                  for professionals like me to serve where we're needed most."
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Deployment:</span> 6 months in Bangladesh • Pediatric Surgery
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Global Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of healthcare professionals using their skills to save lives and 
            provide hope in the world's most challenging environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSignIn}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Create Your Profile Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            Registration is free • Verification typically takes 3-5 business days
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
                © 2024 Global Health Registry. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">For Professionals</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Verification Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
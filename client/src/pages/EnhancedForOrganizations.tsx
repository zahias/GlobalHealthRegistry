import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UnifiedNavigation } from "@/components/UnifiedNavigation";
import { 
  Building2, 
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
  Search,
  FileText,
  MessageSquare,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";

export default function EnhancedForOrganizations() {
  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-white">
      <UnifiedNavigation isPublic={true} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                For Humanitarian Organizations
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Verified Healthcare 
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Professionals</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with pre-verified, skilled healthcare professionals ready to deploy in crisis zones and underserved communities worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleSignIn}
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Register Your Organization
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-3"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Search className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span>Pre-verified Professionals</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span>Rapid Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Organizations Trust Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We streamline the process of finding qualified healthcare professionals for your humanitarian missions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Shield className="text-green-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-green-800 mb-4">Rigorous Verification</h4>
                <p className="text-green-700 leading-relaxed">
                  Every healthcare professional undergoes comprehensive credential verification, background checks, 
                  and competency assessments before joining our network.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Zap className="text-blue-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-blue-800 mb-4">Rapid Matching</h4>
                <p className="text-blue-700 leading-relaxed">
                  Our intelligent matching system connects you with professionals who meet your specific 
                  requirements for location, specialty, language, and experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <TrendingUp className="text-red-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-red-800 mb-4">Proven Success</h4>
                <p className="text-red-700 leading-relaxed">
                  Join organizations that have successfully deployed hundreds of healthcare professionals 
                  to crisis zones, improving health outcomes for vulnerable populations.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Steps to Find the Right Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From posting opportunities to successful deployment - we make it seamless
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Register & Verify Your Organization</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Complete your organization profile with mission details, credentials, and operational focus. 
                  Our team verifies your humanitarian status and commitment to professional standards.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FileText className="h-5 w-5 text-green-600 mr-3" />
                    <span>Organization credentials verification</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-5 w-5 text-green-600 mr-3" />
                    <span>Mission and operational scope review</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Shield className="h-5 w-5 text-green-600 mr-3" />
                    <span>Duty of care and safety protocols assessment</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-green-900">Organization Verification Includes:</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• Legal registration and humanitarian status</li>
                      <li>• Financial transparency and accountability</li>
                      <li>• Safety and security protocols review</li>
                      <li>• Previous deployment track record</li>
                      <li>• Partnership and donor verification</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Post Detailed Opportunities</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Create comprehensive deployment opportunities with specific requirements, location details, 
                  and support provided. Our platform helps you reach qualified professionals instantly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Detailed location and context information</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Specific specialty and skill requirements</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Duration and timeline specifications</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-blue-900">Current Deployment Needs:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800">Gaza Strip - Emergency Medicine</span>
                        <Badge className="bg-red-600 text-white">CRITICAL</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800">Bangladesh - Pediatric Care</span>
                        <Badge className="bg-orange-600 text-white">HIGH</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800">Sudan - Surgical Support</span>
                        <Badge className="bg-red-600 text-white">CRITICAL</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800">Haiti - Mental Health</span>
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
                  <h3 className="text-2xl font-bold text-gray-900">Connect & Deploy Successfully</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Review qualified applications, conduct interviews, and onboard selected professionals. 
                  We provide ongoing support throughout the deployment process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Search className="h-5 w-5 text-red-600 mr-3" />
                    <span>Advanced filtering and matching tools</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MessageSquare className="h-5 w-5 text-red-600 mr-3" />
                    <span>Built-in communication and interview tools</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Globe className="h-5 w-5 text-red-600 mr-3" />
                    <span>Deployment support and monitoring</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold mb-4 text-red-900">Deployment Support Includes:</h4>
                    <ul className="space-y-2 text-red-800">
                      <li>• Pre-deployment briefing coordination</li>
                      <li>• Cultural orientation and training</li>
                      <li>• Documentation and visa assistance</li>
                      <li>• On-ground support coordination</li>
                      <li>• Emergency evacuation protocols</li>
                      <li>• Post-deployment debriefing and follow-up</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Organizations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how humanitarian organizations have successfully deployed professionals through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Médecins Sans Frontières</h4>
                    <p className="text-sm text-gray-600">International Medical Humanitarian Organization</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The platform's verification process saved us weeks of credential checking. We deployed 
                  5 emergency physicians to Gaza within 10 days of posting. The quality of professionals 
                  has been exceptional."
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Result:</span> 5 successful deployments • 95% retention rate
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">International Rescue Committee</h4>
                    <p className="text-sm text-gray-600">Global Humanitarian Response Organization</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Finding Arabic-speaking pediatricians for our Syria operations was challenging until we 
                  found this platform. The language verification and cultural competency assessments 
                  are invaluable."
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Result:</span> 8 specialized deployments • 100% mission completion
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Healthcare Team?
          </h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed">
            Join hundreds of humanitarian organizations using our platform to connect with 
            verified healthcare professionals and save more lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSignIn}
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Register Your Organization
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 text-green-100 text-sm">
            Registration is free • Organization verification typically takes 2-3 business days
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <Building2 className="text-green-400 text-2xl mr-3" />
                <span className="text-xl font-bold">Global Health Registry</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting humanitarian organizations with verified healthcare professionals 
                to provide critical medical care in crisis and conflict zones worldwide.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 Global Health Registry. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">For Organizations</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Verification Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Posting Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
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
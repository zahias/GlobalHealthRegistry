import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessStoriesCarousel } from "@/components/SuccessStoriesCarousel";
import { DeploymentMap } from "@/components/DeploymentMap";
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
  const handleSignIn = () => {
    window.location.href = "/api/login";
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
              <Button onClick={handleSignIn} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
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
                onClick={handleSignIn}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Join as Healthcare Professional
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleSignIn}
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              >
                Register Organization
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

      {/* Active Deployment Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Crisis Response Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See where humanitarian assistance is needed most right now
            </p>
          </div>
          <DeploymentMap />
        </div>
      </section>

      {/* About AUB Global Health Institute */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About AUB Global Health Institute</h2>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Heart className="text-red-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-red-800 mb-4">Humanitarian Excellence</h4>
                <p className="text-red-700 leading-relaxed">
                  Committed to the highest standards of humanitarian aid, ensuring dignity, respect, and quality
                  care for all people affected by crises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Shield className="text-blue-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-blue-800 mb-4">Professional Integrity</h4>
                <p className="text-blue-700 leading-relaxed">
                  Rigorous verification ensures every healthcare professional meets the highest standards of
                  credentials, experience, and ethical practice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Globe className="text-green-600 h-16 w-16 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-green-800 mb-4">Global Collaboration</h4>
                <p className="text-green-700 leading-relaxed">
                  Fostering partnerships between healthcare professionals, humanitarian organizations, and 
                  academic institutions worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AUB Background */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Leading Global Health Innovation</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              At the crossroads of three continents, the AUB Global Health Institute is uniquely positioned to address 
              global health challenges. As a WHO Collaborating Center with 500+ alumni in humanitarian work and programs 
              in 20+ countries, we're transforming how healthcare reaches vulnerable populations worldwide.
            </p>
            
            <div className="flex items-center justify-center space-x-12 text-amber-700">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2" />
                <span className="font-medium">WHO Collaborating Center</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-6 w-6 mr-2" />
                <span className="font-medium">500+ Alumni in Humanitarian Work</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                <span className="font-medium">Programs in 20+ Countries</span>
              </div>
            </div>
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
              onClick={handleSignIn}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
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
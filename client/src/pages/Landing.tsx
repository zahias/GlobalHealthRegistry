import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessStoriesCarousel } from "@/components/SuccessStoriesCarousel";
import { DeploymentMap } from "@/components/DeploymentMap";
import { UserRound, Building, Check, Clock, X, Plane, Shield, Users, Heart, MapPin, GraduationCap, Globe } from "lucide-react";
import { Link } from "wouter";
import aubLogo from "@assets/ghi_logo-345x198-1.png";

export default function Landing() {
  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={aubLogo} alt="AUB Global Health Institute" className="h-12 mr-4" />
              <span className="text-xl font-bold text-gray-900">Global Health Registry</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/for-professionals">
                  <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">For Professionals</span>
                </Link>
                <Link href="/for-organizations">
                  <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">For Organizations</span>
                </Link>
                <Link href="/training">
                  <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Training Resources</span>
                </Link>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">About</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button onClick={handleSignIn}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Connecting Skilled Professionals with Humanitarian Response Needs
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                A secure, global roster of licensed healthcare professionals facilitating rapid deployment to humanitarian and conflict zones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" onClick={handleSignIn}>
                  <UserRound className="mr-2 h-5 w-5" />
                  Register as Professional
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent" onClick={handleSignIn}>
                  <Building className="mr-2 h-5 w-5" />
                  <span className="text-white hover:text-primary">Register Organization</span>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Real-time Global Response</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Active Professionals</span>
                    <span className="text-white font-bold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Verified Organizations</span>
                    <span className="text-white font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Current Deployments</span>
                    <span className="text-white font-bold">73</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Health Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our registry connects skilled healthcare professionals with humanitarian organizations worldwide, 
              ensuring rapid response capabilities in times of crisis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">250+</h3>
              <p className="text-gray-600">Verified Healthcare Professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">45+</h3>
              <p className="text-gray-600">Partner Organizations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">30+</h3>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Global Health Registry */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold mb-4">About the Global Health Registry</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              A initiative by the American University of Beirut Global Health Institute to connect
              skilled healthcare professionals with humanitarian organizations serving in crisis and
              conflict zones worldwide.
            </p>
          </div>
          
          {/* Our Mission */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <Heart className="text-white h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-red-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-5xl">
              The Global Health Registry was created to address the critical shortage of qualified healthcare professionals in humanitarian crises. By maintaining a comprehensive database of
              verified medical personnel and facilitating connections with reputable humanitarian organizations, we aim to ensure that life-saving medical care reaches those who need it most,
              when they need it most.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <Heart className="text-red-600 h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-red-800 mb-3">Humanitarian Excellence</h4>
                <p className="text-red-700">
                  We are committed to the highest standards of humanitarian aid, ensuring dignity, respect, and quality
                  care for all people affected by crises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Shield className="text-blue-600 h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-blue-800 mb-3">Professional Integrity</h4>
                <p className="text-blue-700">
                  Every healthcare professional in our registry undergoes
                  rigorous verification to ensure credentials, experience, and
                  commitment to ethical practice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <Globe className="text-green-600 h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-800 mb-3">Global Collaboration</h4>
                <p className="text-green-700">
                  We foster partnerships between healthcare professionals,
                  humanitarian organizations, and academic institutions
                  worldwide to maximize impact.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AUB Global Health Institute */}
          <div className="bg-white rounded-lg p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">American University of Beirut Global Health Institute</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The AUB Global Health Institute is a leading center for global health research, education, and
              practice in the Middle East and beyond. At the crossroads of three continents, AUB-GHI is
              uniquely positioned to address global health challenges affecting vulnerable populations.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Since its establishment, the institute has been at the forefront of humanitarian health responses,
              training the next generation of global health leaders, and conducting research that informs policy
              and practice worldwide.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="text-amber-600 h-6 w-6 mr-2" />
                  <span className="text-sm text-gray-600">WHO Collaborating Center</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <GraduationCap className="text-amber-600 h-6 w-6 mr-2" />
                  <span className="text-sm text-gray-600">500+ Alumni in Humanitarian Work</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="text-amber-600 h-6 w-6 mr-2" />
                  <span className="text-sm text-gray-600">Programs in 20+ Countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Real Stories from the Field</h3>
            <SuccessStoriesCarousel />
          </div>

          {/* Active Deployment Locations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Crisis Response Areas</h3>
            <DeploymentMap />
          </div>


        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <UserRound className="text-primary text-2xl mr-3" />
                <span className="text-xl font-bold">Global Health Registry</span>
              </div>
              <p className="text-gray-300 mb-4">
                Connecting skilled healthcare professionals with humanitarian response needs worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Professionals</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Register Profile</a></li>
                <li><a href="#" className="hover:text-white">Verification Process</a></li>
                <li><a href="#" className="hover:text-white">Training Resources</a></li>
                <li><a href="#" className="hover:text-white">Deployment Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Search Professionals</a></li>
                <li><a href="#" className="hover:text-white">Organization Registration</a></li>
                <li><a href="#" className="hover:text-white">Partnership Programs</a></li>
                <li><a href="#" className="hover:text-white">API Access</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Global Health Registry. All rights reserved. | Securing humanitarian healthcare deployment worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

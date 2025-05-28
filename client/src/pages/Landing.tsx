import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, Building, Check, Clock, X, Plane, Shield, Users } from "lucide-react";
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

      {/* Status Badge Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Status Tracking</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real-time availability tracking ensures rapid response capabilities with clear status indicators for all stakeholders.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-white" />
              </div>
              <h3 className="font-semibold text-green-700 mb-2">Available for Deployment</h3>
              <p className="text-sm text-gray-600">Ready for immediate deployment with verified credentials</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" />
              </div>
              <h3 className="font-semibold text-orange-700 mb-2">Pending Documentation</h3>
              <p className="text-sm text-gray-600">Awaiting document verification or license validation</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="text-white" />
              </div>
              <h3 className="font-semibold text-red-700 mb-2">Not Available</h3>
              <p className="text-sm text-gray-600">Temporarily unavailable due to personal or professional constraints</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="text-white" />
              </div>
              <h3 className="font-semibold text-purple-700 mb-2">Deployment in Progress</h3>
              <p className="text-sm text-gray-600">Currently deployed in humanitarian response mission</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Secure Verification Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multi-step verification ensures all professionals meet the highest standards for humanitarian deployment.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Registration</h3>
                  <p className="text-gray-600">Licensed healthcare professionals submit credentials, specialties, and deployment preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">License Verification</h3>
                  <p className="text-gray-600">Automated verification of medical licenses, certifications, and professional standing in home country.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reference Check</h3>
                  <p className="text-gray-600">Professional references from colleagues, supervisors, or previous deployment partners.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  <Check />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Registry Activation</h3>
                  <p className="text-gray-600">Verified profiles become searchable by authorized humanitarian organizations worldwide.</p>
                </div>
              </div>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Shield className="text-green-600 h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Verification Dashboard</h3>
                  <p className="text-gray-600">Track your verification status</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span className="font-medium">Profile Registration</span>
                    </div>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span className="font-medium">License Verification</span>
                    </div>
                    <span className="text-green-600 font-medium">Verified</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="text-orange-500 mr-3 h-5 w-5" />
                      <span className="font-medium">Reference Check</span>
                    </div>
                    <span className="text-orange-500 font-medium">In Progress</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"></div>
                      <span className="font-medium text-gray-500">Registry Activation</span>
                    </div>
                    <span className="text-gray-500 font-medium">Pending</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Estimated completion: 2-3 business days</p>
                  <Button className="w-full" onClick={handleSignIn}>
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
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

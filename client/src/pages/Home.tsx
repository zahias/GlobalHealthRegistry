import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { OnboardingDashboard } from "@/components/OnboardingDashboard";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { UserRound, Building, MessageSquare, GraduationCap, Search, Users, TrendingUp, AlertTriangle, Heart, Shield, Globe, MapPin, Bell, Calendar, Activity } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useAuth();
  
  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isProfessional = userProfile?.userType === 'professional';
  const isOrganization = userProfile?.userType === 'organization';
  const hasProfile = !!userProfile?.profileData;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">
            {isProfessional && "Manage your professional profile and find deployment opportunities"}
            {isOrganization && "Search for qualified professionals and manage your organization"}
            {!isProfessional && !isOrganization && "Complete your profile to get started"}
          </p>
        </div>

        {/* Profile Setup for New Users */}
        {!hasProfile && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Complete Your Profile</h3>
                  <p className="text-orange-700">Set up your profile to access all platform features</p>
                </div>
                <div className="flex space-x-3">
                  <Link href="/profile">
                    <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      <UserRound className="mr-2 h-4 w-4" />
                      Professional Profile
                    </Button>
                  </Link>
                  <Link href="/organization">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Building className="mr-2 h-4 w-4" />
                      Organization Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding Dashboard - Show for new users */}
            {userProfile && (!userProfile.profileData || !userProfile.onboardingCompleted) && (
              <OnboardingDashboard 
                userType={userProfile.userType || "professional"} 
                user={userProfile}
                profileData={userProfile.profileData}
              />
            )}
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {isProfessional && (
                    <>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          <UserRound className="mr-2 h-4 w-4" />
                          Update Profile
                        </Button>
                      </Link>
                      <Link href="/training">
                        <Button variant="outline" className="w-full justify-start">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Browse Training
                        </Button>
                      </Link>
                    </>
                  )}
                  {isOrganization && (
                    <>
                      <Link href="/search">
                        <Button variant="outline" className="w-full justify-start">
                          <Search className="mr-2 h-4 w-4" />
                          Search Professionals
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          <Building className="mr-2 h-4 w-4" />
                          Organization Settings
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link href="/messages">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Response Center */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Emergency Response Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div>
                      <h3 className="font-semibold text-red-900">Gaza Health Crisis</h3>
                      <p className="text-sm text-red-700">Urgent need for emergency medical professionals</p>
                    </div>
                    <Badge variant="destructive">URGENT</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <div>
                      <h3 className="font-semibold text-orange-900">Turkey Earthquake Response</h3>
                      <p className="text-sm text-orange-700">Ongoing rehabilitation support needed</p>
                    </div>
                    <Badge variant="secondary">ACTIVE</Badge>
                  </div>
                  <Link href="/deployments">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      View Emergency Deployments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Current Deployment Opportunities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Active Deployment Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Emergency Medicine Team - Jordan</h3>
                      <p className="text-sm text-blue-700">Médecins Sans Frontières seeking 3 emergency physicians for refugee camp</p>
                      <div className="flex space-x-4 mt-2 text-xs text-blue-600">
                        <span>Duration: 6 months</span>
                        <span>Languages: Arabic, English</span>
                        <span>Start: June 2025</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-600">URGENT</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Mental Health Support - Lebanon</h3>
                      <p className="text-sm text-green-700">WHO seeking mental health professionals for trauma response</p>
                      <div className="flex space-x-4 mt-2 text-xs text-green-600">
                        <span>Duration: 3-6 months</span>
                        <span>Languages: Arabic, French</span>
                        <span>Start: July 2025</span>
                      </div>
                    </div>
                    <Badge variant="secondary">OPEN</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-900">Surgical Team - Sudan</h3>
                      <p className="text-sm text-purple-700">International Red Cross needs orthopedic surgeons</p>
                      <div className="flex space-x-4 mt-2 text-xs text-purple-600">
                        <span>Duration: 12+ months</span>
                        <span>Languages: English, Arabic</span>
                        <span>Start: August 2025</span>
                      </div>
                    </div>
                    <Badge variant="outline">REVIEWING</Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link href="/deployments">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      View All Opportunities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>



            {/* About AUB Global Health Institute */}
            <Card>
              <CardHeader>
                <CardTitle>About AUB Global Health Institute</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  The AUB Global Health Institute is a leading center for global health research, education, and
                  practice in the Middle East and beyond. At the crossroads of three continents, AUB-GHI is
                  uniquely positioned to address global health challenges affecting vulnerable populations.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Users className="text-amber-600 h-4 w-4 mr-2" />
                    <span className="text-gray-600">WHO Collaborating Center</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <GraduationCap className="text-amber-600 h-4 w-4 mr-2" />
                    <span className="text-gray-600">500+ Alumni in Humanitarian Work</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="text-amber-600 h-4 w-4 mr-2" />
                    <span className="text-gray-600">Programs in 20+ Countries</span>
                  </div>
                </div>

                {/* Core Values */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Heart className="text-red-600 h-8 w-8 mx-auto mb-2" />
                    <h5 className="font-semibold text-red-800 mb-1">Humanitarian Excellence</h5>
                    <p className="text-xs text-red-700">
                      Highest standards of humanitarian aid with dignity and respect
                    </p>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Shield className="text-blue-600 h-8 w-8 mx-auto mb-2" />
                    <h5 className="font-semibold text-blue-800 mb-1">Professional Integrity</h5>
                    <p className="text-xs text-blue-700">
                      Rigorous verification of credentials and ethical practice
                    </p>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Globe className="text-green-600 h-8 w-8 mx-auto mb-2" />
                    <h5 className="font-semibold text-green-800 mb-1">Global Collaboration</h5>
                    <p className="text-xs text-green-700">
                      Partnerships worldwide to maximize humanitarian impact
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            {hasProfile && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <img
                        src={userProfile?.profileImageUrl || '/api/placeholder/40/40'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</div>
                        <div className="text-sm text-gray-600">{userProfile?.email}</div>
                      </div>
                    </div>
                    {isProfessional && (
                      <div className="space-y-2 text-sm">
                        <div><strong>Specialties:</strong> {userProfile.profileData?.specialties?.join(', ') || 'Not specified'}</div>
                        <div><strong>Languages:</strong> {userProfile.profileData?.languages?.join(', ') || 'Not specified'}</div>
                      </div>
                    )}
                    {isOrganization && (
                      <div className="space-y-2 text-sm">
                        <div><strong>Organization:</strong> {userProfile.profileData?.name || 'Not specified'}</div>
                        <div><strong>Type:</strong> {userProfile.profileData?.type || 'Not specified'}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>No recent activity</div>
                </div>
              </CardContent>
            </Card>

            {/* User Menu */}
            <Card>
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

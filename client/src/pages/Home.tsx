import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { UserRound, Building, MessageSquare, GraduationCap, Search, Users, TrendingUp, AlertTriangle } from "lucide-react";

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
                  <Link href="/search">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      View Emergency Deployments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Deployment Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Deployment Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <h3 className="font-semibold text-red-900">Emergency Medical Response - Gaza</h3>
                      <p className="text-sm text-red-700">Seeking trauma surgeons and emergency physicians</p>
                      <p className="text-xs text-red-600 mt-1">Posted 2 hours ago by MSF</p>
                    </div>
                    <Badge variant="destructive">URGENT</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <h3 className="font-semibold text-orange-900">Refugee Health Services - Jordan</h3>
                      <p className="text-sm text-orange-700">Primary care physicians and nurses needed</p>
                      <p className="text-xs text-orange-600 mt-1">Posted 1 day ago by UNHCR</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-semibold text-blue-900">Public Health Program - Lebanon</h3>
                      <p className="text-sm text-blue-700">Epidemiologists and health educators</p>
                      <p className="text-xs text-blue-600 mt-1">Posted 3 days ago by WHO</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">ONGOING</Badge>
                  </div>
                  <Link href="/search">
                    <Button className="w-full">View All Opportunities</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Global Health Registry Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">2,847</div>
                    <div className="text-sm text-gray-600">Active Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Verified Organizations</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">73</div>
                    <div className="text-sm text-gray-600">Current Deployments</div>
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

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Applications Sent</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="font-semibold text-green-600">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Training Completed</span>
                    <span className="font-semibold">3 courses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Profile updated</span>
                    <span className="text-gray-400 text-xs">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Applied to MSF deployment</span>
                    <span className="text-gray-400 text-xs">1 week ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Completed training course</span>
                    <span className="text-gray-400 text-xs">2 weeks ago</span>
                  </div>
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

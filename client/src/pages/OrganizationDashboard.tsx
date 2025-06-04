import { useAuth } from "@/hooks/useAuth";
import { UnifiedNavigation } from "@/components/UnifiedNavigation";
import { OnboardingDashboard } from "@/components/OnboardingDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { mockOrganizationData } from "@/components/MockDataProvider";
import { extendedMockProfessionals } from "@/components/ExtendedMockData";
import { 
  Search, 
  Plus, 
  Users, 
  Briefcase, 
  TrendingUp,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin
} from "lucide-react";

export default function OrganizationDashboard() {
  // Use comprehensive mock data for demo experience
  const userProfile = mockOrganizationData.user;
  const profileData = mockOrganizationData.profileData;
  const activePostings = mockOrganizationData.activePostings;
  const applications = mockOrganizationData.applications;
  const professionals = extendedMockProfessionals;

  const needsOnboarding = false;
  const hasProfile = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userProfile?.profileData?.name || 'Organization Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            Connect with verified healthcare professionals for your humanitarian missions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding - Show for new organizations */}
            {needsOnboarding && (
              <OnboardingDashboard 
                userType="organization" 
                user={userProfile}
                profileData={userProfile?.profileData}
              />
            )}

            {/* Quick Actions for Complete Profiles */}
            {hasProfile && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/search">
                      <Button className="w-full h-20 flex flex-col bg-blue-600 hover:bg-blue-700">
                        <Search className="h-6 w-6 mb-2" />
                        <span className="text-sm">Find Professionals</span>
                      </Button>
                    </Link>
                    
                    <Link href="/post-opportunity">
                      <Button variant="outline" className="w-full h-20 flex flex-col">
                        <Plus className="h-6 w-6 mb-2" />
                        <span className="text-sm">Post Opportunity</span>
                      </Button>
                    </Link>
                    
                    <Link href="/organization">
                      <Button variant="outline" className="w-full h-20 flex flex-col">
                        <Users className="h-6 w-6 mb-2" />
                        <span className="text-sm">Update Profile</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Postings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Opportunities</span>
                  <Badge variant="outline">{activePostings.length} posted</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activePostings.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No active postings yet</p>
                    <Link href="/deployments">
                      <Button>Post Your First Opportunity</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activePostings.slice(0, 3).map((posting: any) => (
                      <div key={posting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{posting.title}</h4>
                          <p className="text-sm text-gray-600">{posting.location} • {posting.duration}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {posting.applicants || 0} applicants
                          </div>
                        </div>
                        <Badge 
                          className={
                            posting.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                            posting.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }
                        >
                          {posting.urgency}
                        </Badge>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Link href="/deployments">
                        <Button variant="outline" className="w-full">
                          Manage All Postings
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-6">
                    <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 4).map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h5 className="font-medium">{app.professionalName}</h5>
                            <p className="text-sm text-gray-600">{app.specialty} • {app.experience} years</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{app.status}</Badge>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Status */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Complete</span>
                    {hasProfile ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organization Verified</span>
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Check</span>
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {!hasProfile && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link href="/organization">
                      <Button size="sm" className="w-full">
                        Complete Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm">Profile Views</span>
                    </div>
                    <span className="font-semibold">24</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Applications</span>
                    </div>
                    <span className="font-semibold">8</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm">Messages</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Professionals */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Dr. Sarah Chen</div>
                      <div className="text-xs text-gray-600">Emergency Medicine • 8 years</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Dr. Michael Johnson</div>
                      <div className="text-xs text-gray-600">Surgery • 12 years</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/search">
                    <Button variant="outline" size="sm" className="w-full">
                      Search All Professionals
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Post new opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Review applications</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Contact professionals</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
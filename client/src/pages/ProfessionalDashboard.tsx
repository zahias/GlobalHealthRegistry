import { useAuth } from "@/hooks/useAuth";
import { RoleBasedNavigation } from "@/components/RoleBasedNavigation";
import { OnboardingDashboard } from "@/components/OnboardingDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MessageSquare,
  FileText,
  Users
} from "lucide-react";

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  
  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: !!user,
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["/api/professionals/applications"],
    enabled: !!user,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages/conversations"],
    enabled: !!user,
  });

  const needsOnboarding = !userProfile?.profileData;
  const hasProfile = !!userProfile?.profileData;

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.firstName || 'Professional'}
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to make a difference in global health? Here's your overview.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding - Show for new users */}
            {needsOnboarding && (
              <OnboardingDashboard 
                userType="professional" 
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
                    <Link href="/deployments">
                      <Button className="w-full h-20 flex flex-col bg-blue-600 hover:bg-blue-700">
                        <MapPin className="h-6 w-6 mb-2" />
                        <span className="text-sm">Find Opportunities</span>
                      </Button>
                    </Link>
                    
                    <Link href="/profile">
                      <Button variant="outline" className="w-full h-20 flex flex-col">
                        <FileText className="h-6 w-6 mb-2" />
                        <span className="text-sm">Update Profile</span>
                      </Button>
                    </Link>
                    
                    <Link href="/training">
                      <Button variant="outline" className="w-full h-20 flex flex-col">
                        <TrendingUp className="h-6 w-6 mb-2" />
                        <span className="text-sm">View Training</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>My Applications</span>
                  <Badge variant="outline">{applications.length} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No applications yet</p>
                    <Link href="/deployments">
                      <Button>Browse Opportunities</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{app.position}</h4>
                          <p className="text-sm text-gray-600">{app.organization} • {app.location}</p>
                        </div>
                        <Badge 
                          className={
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div>
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                        <h4 className="font-semibold text-red-900">Emergency Response - Gaza</h4>
                      </div>
                      <p className="text-sm text-red-700">WHO seeking emergency physicians for trauma response</p>
                      <div className="flex space-x-4 mt-2 text-xs text-red-600">
                        <span>Duration: 3-6 months</span>
                        <span>Languages: Arabic, English</span>
                        <span>Start: Immediate</span>
                      </div>
                    </div>
                    <Badge className="bg-red-600 text-white">URGENT</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h4 className="font-semibold text-blue-900">Pediatric Team - Bangladesh</h4>
                      <p className="text-sm text-blue-700">UNICEF needs pediatricians for refugee health programs</p>
                      <div className="flex space-x-4 mt-2 text-xs text-blue-600">
                        <span>Duration: 6-12 months</span>
                        <span>Languages: Bengali, English</span>
                        <span>Start: April 2025</span>
                      </div>
                    </div>
                    <Badge variant="outline">OPEN</Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link href="/deployments">
                    <Button variant="outline" className="w-full">
                      View All Opportunities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Status */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Status</CardTitle>
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
                    <span className="text-sm">Documents Verified</span>
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Check</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {!hasProfile && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link href="/profile">
                      <Button size="sm" className="w-full">
                        Complete Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-sm text-gray-600">No recent messages</p>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((message: any) => (
                      <div key={message.id} className="text-sm">
                        <div className="font-medium">{message.senderName}</div>
                        <div className="text-gray-600 truncate">{message.content}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/messages">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Messages
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
                    <Calendar className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Review new opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Update availability status</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-3" />
                    <span>Complete training modules</span>
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
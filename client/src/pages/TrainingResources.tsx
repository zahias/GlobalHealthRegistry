import { Navigation } from "@/components/Navigation";
import { PublicNavigation } from "@/components/PublicNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Clock, Users, Star, CheckCircle } from "lucide-react";

export default function TrainingResources() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/training/courses"],
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/training/enrollments"],
    enabled: !!user,
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: number) =>
      apiRequest("POST", `/api/training/enroll/${courseId}`, {}),
    onSuccess: () => {
      toast({ title: "Successfully enrolled in course!" });
      queryClient.invalidateQueries({ queryKey: ["/api/training/enrollments"] });
    },
    onError: () => {
      toast({ title: "Failed to enroll in course", variant: "destructive" });
    },
  });

  const isEnrolled = (courseId: number) => {
    return enrollments.some((enrollment: any) => enrollment.courseId === courseId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Emergency': 'bg-red-100 text-red-800',
      'Mental Health': 'bg-green-100 text-green-800',
      'Core': 'bg-blue-100 text-blue-800',
      'Specialty': 'bg-purple-100 text-purple-800',
      'Safety': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <Navigation /> : <PublicNavigation />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Training & Continuing Education</h1>
          <p className="text-gray-600">
            Access specialized training programs and continuing education resources for humanitarian healthcare professionals.
          </p>
        </div>

        {/* Featured Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course: any) => course.featured)
              .map((course: any) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center">
                    <GraduationCap className="text-white h-16 w-16" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(course.category || 'Core')}>
                        {course.category || 'Core'}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}h</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>347 enrolled</span>
                      </div>
                      {user ? (
                        isEnrolled(course.id) ? (
                          <Button disabled className="bg-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Enrolled
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => enrollMutation.mutate(course.id)}
                            disabled={enrollMutation.isPending}
                          >
                            {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                          </Button>
                        )
                      ) : (
                        <Button onClick={() => window.location.href = '/api/login'}>
                          Sign In to Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Training Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course: any) => !course.featured)
              .map((course: any) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className={`h-48 bg-gradient-to-br flex items-center justify-center ${
                    course.category === 'Emergency' ? 'from-red-600 to-red-800' :
                    course.category === 'Mental Health' ? 'from-green-600 to-green-800' :
                    course.category === 'Safety' ? 'from-orange-600 to-orange-800' :
                    'from-blue-600 to-blue-800'
                  }`}>
                    <GraduationCap className="text-white h-16 w-16" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(course.category || 'Core')}>
                        {course.category || 'Core'}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}h</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>156 enrolled</span>
                      </div>
                      {user ? (
                        isEnrolled(course.id) ? (
                          <Button disabled className="bg-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Enrolled
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => enrollMutation.mutate(course.id)}
                            disabled={enrollMutation.isPending}
                          >
                            {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                          </Button>
                        )
                      ) : (
                        <Button onClick={() => window.location.href = '/api/login'}>
                          Sign In to Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* My Enrollments */}
        {user && enrollments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Enrollments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment: any) => {
                const course = courses.find((c: any) => c.id === enrollment.courseId);
                if (!course) return null;

                return (
                  <Card key={enrollment.id} className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800">
                          Enrolled
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{course.duration}h</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </span>
                        <Button variant="outline" size="sm">
                          Continue Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UnifiedNavigation } from "@/components/UnifiedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Trash2, 
  RefreshCw,
  UserRound,
  Building2,
  Save,
  AlertTriangle
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  bio: z.string().optional(),
});

const userTypeChangeSchema = z.object({
  newUserType: z.enum(["professional", "organization"]),
  confirmPassword: z.string().min(1, "Please confirm this action"),
});

type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
type UserTypeChangeData = z.infer<typeof userTypeChangeSchema>;

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTypeChangeConfirm, setShowTypeChangeConfirm] = useState(false);

  const profileForm = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      bio: "",
    },
  });

  const typeChangeForm = useForm<UserTypeChangeData>({
    resolver: zodResolver(userTypeChangeSchema),
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      return await apiRequest('/api/auth/profile', {
        method: 'PATCH',
        body: data
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Change user type mutation
  const changeUserTypeMutation = useMutation({
    mutationFn: async (data: UserTypeChangeData) => {
      return await apiRequest('/api/auth/change-type', {
        method: 'POST',
        body: { userType: data.newUserType }
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Account type changed successfully. Please sign in again.",
      });
      setTimeout(() => {
        window.location.href = "/api/logout";
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to change account type",
        variant: "destructive",
      });
    },
  });

  // Delete profile mutation
  const deleteProfileMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/auth/profile', {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile deleted successfully",
      });
      setTimeout(() => {
        window.location.href = "/api/logout";
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete profile",
        variant: "destructive",
      });
    },
  });

  const onProfileSubmit = (data: ProfileUpdateData) => {
    updateProfileMutation.mutate(data);
  };

  const onTypeChangeSubmit = (data: UserTypeChangeData) => {
    changeUserTypeMutation.mutate(data);
    setShowTypeChangeConfirm(false);
  };

  const handleDeleteProfile = () => {
    deleteProfileMutation.mutate();
    setShowDeleteConfirm(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3 text-blue-600" />
            Settings
          </h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          {...profileForm.register('firstName')}
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">
                            {profileForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          {...profileForm.register('lastName')}
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">
                            {profileForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        {...profileForm.register('email')}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Textarea
                        id="bio"
                        {...profileForm.register('bio')}
                        rows={4}
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                {/* Account Type */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Account Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {user?.userType === 'professional' ? (
                          <UserRound className="h-8 w-8 text-blue-600 mr-3" />
                        ) : (
                          <Building2 className="h-8 w-8 text-green-600 mr-3" />
                        )}
                        <div>
                          <p className="font-medium">
                            {user?.userType === 'professional' ? 'Healthcare Professional' : 'Humanitarian Organization'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Current account type
                          </p>
                        </div>
                      </div>
                      
                      <AlertDialog open={showTypeChangeConfirm} onOpenChange={setShowTypeChangeConfirm}>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Change Type
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                              Change Account Type
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Changing your account type will reset your profile data and may affect your access to certain features. This action cannot be undone easily.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          
                          <form onSubmit={typeChangeForm.handleSubmit(onTypeChangeSubmit)} className="space-y-4">
                            <div>
                              <Label>New Account Type</Label>
                              <Select onValueChange={(value: any) => typeChangeForm.setValue('newUserType', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select new account type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professional">Healthcare Professional</SelectItem>
                                  <SelectItem value="organization">Humanitarian Organization</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Confirmation</Label>
                              <Input
                                {...typeChangeForm.register('confirmPassword')}
                                placeholder="Type 'CHANGE' to confirm"
                              />
                            </div>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button
                                type="submit"
                                variant="destructive"
                                disabled={changeUserTypeMutation.isPending}
                              >
                                {changeUserTypeMutation.isPending ? "Changing..." : "Change Account Type"}
                              </Button>
                            </AlertDialogFooter>
                          </form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        
                        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="flex items-center">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center text-red-600">
                                <Trash2 className="h-5 w-5 mr-2" />
                                Delete Account
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete your account and all associated data including:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  <li>Profile information and credentials</li>
                                  <li>Application history</li>
                                  <li>Messages and communications</li>
                                  <li>All posted opportunities (if organization)</li>
                                </ul>
                                <strong className="block mt-2">This action cannot be undone.</strong>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteProfile}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={deleteProfileMutation.isPending}
                              >
                                {deleteProfileMutation.isPending ? "Deleting..." : "Delete Account"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application Updates</p>
                        <p className="text-sm text-gray-600">Get notified about application status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Opportunities</p>
                        <p className="text-sm text-gray-600">Receive alerts for new deployment opportunities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages</p>
                        <p className="text-sm text-gray-600">Get notified about new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
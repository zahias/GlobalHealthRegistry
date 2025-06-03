import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserRound, 
  Search, 
  MessageSquare, 
  GraduationCap, 
  Building, 
  LogOut, 
  MapPin,
  Users,
  Briefcase,
  Settings
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

interface UnifiedNavigationProps {
  isPublic?: boolean;
}

export function UnifiedNavigation({ isPublic = false }: UnifiedNavigationProps) {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: !!user && isAuthenticated,
  });

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  // Public navigation for logged out users
  if (isPublic || !isAuthenticated) {
    return (
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <UserRound className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Global Health Registry
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/for-professionals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Professionals
              </Link>
              <Link href="/for-organizations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Organizations
              </Link>
              <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu for public */}
            <div className="md:hidden flex items-center">
              <Button onClick={handleLogin} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Authenticated navigation with role-based menu items
  const isProfessional = userProfile?.userType === 'professional';
  const isOrganization = userProfile?.userType === 'organization';

  const professionalNavItems = [
    { href: "/", icon: UserRound, label: "Dashboard" },
    { href: "/deployments", icon: MapPin, label: "Find Opportunities" },
    { href: "/profile", icon: Settings, label: "My Profile" },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: "/training", icon: GraduationCap, label: "Training" }
  ];

  const organizationNavItems = [
    { href: "/", icon: Building, label: "Dashboard" },
    { href: "/search", icon: Search, label: "Find Professionals" },
    { href: "/deployments", icon: Briefcase, label: "My Opportunities" },
    { href: "/organization", icon: Settings, label: "Organization Profile" },
    { href: "/messages", icon: MessageSquare, label: "Messages" }
  ];

  const navItems = isProfessional ? professionalNavItems : organizationNavItems;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <UserRound className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Global Health Registry
              </span>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.profileImageUrl || ""} />
                <AvatarFallback>
                  {userProfile?.firstName?.[0] || "U"}{userProfile?.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {userProfile?.firstName || ""} {userProfile?.lastName || ""}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {userProfile?.userType || "User"}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
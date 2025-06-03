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
  Calendar,
  Settings
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export function RoleBasedNavigation() {
  const { user } = useAuth();
  const [location] = useLocation();
  
  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: !!user,
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const isProfessional = userProfile?.userType === 'professional';
  const isOrganization = userProfile?.userType === 'organization';

  const professionalNavItems = [
    { href: "/", icon: UserRound, label: "Dashboard", description: "Your overview" },
    { href: "/deployments", icon: MapPin, label: "Find Opportunities", description: "Browse deployments" },
    { href: "/profile", icon: Settings, label: "My Profile", description: "Manage credentials" },
    { href: "/messages", icon: MessageSquare, label: "Messages", description: "Communications" },
    { href: "/training", icon: GraduationCap, label: "Training", description: "Courses & certifications" }
  ];

  const organizationNavItems = [
    { href: "/", icon: Building, label: "Dashboard", description: "Organization overview" },
    { href: "/search", icon: Search, label: "Find Professionals", description: "Search healthcare experts" },
    { href: "/deployments", icon: Briefcase, label: "My Opportunities", description: "Posted positions" },
    { href: "/organization", icon: Settings, label: "Organization Profile", description: "Manage details" },
    { href: "/messages", icon: MessageSquare, label: "Messages", description: "Communications" }
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors group relative ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {item.description}
                      </div>
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
                <AvatarImage src={userProfile?.profileImageUrl} />
                <AvatarFallback>
                  {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {userProfile?.firstName} {userProfile?.lastName}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {userProfile?.userType}
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
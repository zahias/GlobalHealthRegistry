import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { UserRound, Search, MessageSquare, GraduationCap, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <UserRound className="text-primary text-2xl mr-3" />
                <span className="text-xl font-bold text-gray-900">Global Health Registry</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  Dashboard
                </span>
              </Link>
              
              <Link href="/profile">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/profile') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  Profile
                </span>
              </Link>
              
              <Link href="/search">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/search') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  <Search className="inline h-4 w-4 mr-1" />
                  Search
                </span>
              </Link>
              
              <Link href="/messages">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/messages') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  <MessageSquare className="inline h-4 w-4 mr-1" />
                  Messages
                </span>
              </Link>
              
              <Link href="/training">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/training') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  <GraduationCap className="inline h-4 w-4 mr-1" />
                  Training
                </span>
              </Link>
              
              <Link href="/for-professionals">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/for-professionals') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  For Professionals
                </span>
              </Link>
              
              <Link href="/for-organizations">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/for-organizations') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  For Organizations
                </span>
              </Link>
              
              <Link href="/about">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive('/about') 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-primary'
                }`}>
                  About
                </span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img
                    src={(user as any)?.profileImageUrl || '/api/placeholder/32/32'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block">{(user as any)?.firstName || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

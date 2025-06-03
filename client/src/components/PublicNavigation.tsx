import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import aubLogo from "@assets/ghi_logo-345x198-1.png";

export function PublicNavigation() {
  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src={aubLogo} alt="AUB Global Health Institute" className="h-12 mr-4" />
                <span className="text-xl font-bold text-gray-900">Global Health Registry</span>
              </div>
            </Link>
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
  );
}
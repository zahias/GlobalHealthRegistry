import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Shield, Clock, Users, Building, Globe, CheckCircle } from "lucide-react";
import { PublicNavigation } from "@/components/PublicNavigation";

export default function ForOrganizations() {
  const handleSignUp = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <PublicNavigation />
    </div>
  );
}
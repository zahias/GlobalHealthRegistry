import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DeploymentLocation {
  id: number;
  country: string;
  region: string;
  coordinates: [number, number];
  activeDeployments: number;
  urgency: "low" | "medium" | "high" | "critical";
  lastUpdated: string;
  organizations: string[];
  neededSpecialties: string[];
}

export function DeploymentMap() {
  const [selectedLocation, setSelectedLocation] = useState<DeploymentLocation | null>(null);

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ["/api/deployment-locations"],
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "Critical";
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Deployment Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Active Deployment Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* SVG World Map with Location Markers */}
          <div className="relative w-full h-80 bg-blue-50 rounded-lg overflow-hidden">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              style={{ background: "linear-gradient(to bottom, #e0f2fe, #b3e5fc)" }}
            >
              {/* Simplified world map outline */}
              <path
                d="M150,200 Q200,180 250,200 L300,190 Q350,180 400,190 L450,185 Q500,175 550,185 L600,180 Q650,170 700,180 L750,175 Q800,165 850,175"
                stroke="#64b5f6"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M100,250 Q150,230 200,250 L250,240 Q300,230 350,240 L400,235 Q450,225 500,235 L550,230 Q600,220 650,230 L700,225 Q750,215 800,225"
                stroke="#64b5f6"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Location markers */}
              {locations.map((location: DeploymentLocation, index: number) => {
                const x = 150 + (index * 120) % 700;
                const y = 200 + (index % 3) * 80;
                
                return (
                  <g key={location.id}>
                    {/* Pulsing circle for critical locations */}
                    {location.urgency === "critical" && (
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="rgba(239, 68, 68, 0.3)"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Location marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      className={`cursor-pointer transition-all hover:r-10 ${getUrgencyColor(location.urgency)}`}
                      onClick={() => setSelectedLocation(location)}
                    />
                    
                    {/* Location label */}
                    <text
                      x={x}
                      y={y + 25}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      {location.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            {["critical", "high", "medium", "low"].map((urgency) => (
              <div key={urgency} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getUrgencyColor(urgency)}`} />
                <span className="text-sm capitalize">{urgency}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      {selectedLocation && (
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {selectedLocation.country} - {selectedLocation.region}
              </div>
              <Badge className={getUrgencyColor(selectedLocation.urgency) + " text-white"}>
                {getUrgencyLabel(selectedLocation.urgency)} Priority
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm">
                  <strong>{selectedLocation.activeDeployments}</strong> active deployments
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm">
                  Updated {new Date(selectedLocation.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Organizations Present:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.organizations.map((org, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {org}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Needed Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.neededSpecialties.map((specialty, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button size="sm">
                View Opportunities
              </Button>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {locations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No active deployment locations at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Users, AlertTriangle } from "lucide-react";

interface DeploymentFilters {
  location: string;
  urgency: string;
  duration: string;
  specialty: string;
  organization: string;
}

const mockDeployments = [
  {
    id: 1,
    title: "Emergency Medical Response - Syria",
    organization: "Doctors Without Borders",
    location: "Aleppo, Syria",
    urgency: "Critical",
    duration: "6-12 months",
    specialties: ["Emergency Medicine", "Surgery", "Critical Care"],
    description: "Urgent need for emergency medical professionals to support hospital operations in conflict-affected areas.",
    startDate: "2025-07-01",
    positionsAvailable: 8,
    requirements: ["5+ years experience", "Arabic language preferred", "Previous conflict zone experience"]
  },
  {
    id: 2,
    title: "Maternal Health Program - South Sudan",
    organization: "Save the Children",
    location: "Juba, South Sudan",
    urgency: "High",
    duration: "12+ months",
    specialties: ["Obstetrics", "Midwifery", "Neonatology"],
    description: "Comprehensive maternal and child health program in refugee settlements.",
    startDate: "2025-08-15",
    positionsAvailable: 6,
    requirements: ["Board certification", "English proficiency", "Rural medicine experience"]
  },
  {
    id: 3,
    title: "Nutrition Crisis Response - Yemen",
    organization: "Oxfam International",
    location: "Sana'a, Yemen",
    urgency: "Critical",
    duration: "6-12 months",
    specialties: ["Nutrition", "Public Health", "Pediatrics"],
    description: "Addressing severe malnutrition crisis affecting children and vulnerable populations.",
    startDate: "2025-06-15",
    positionsAvailable: 4,
    requirements: ["Nutrition specialist certification", "Arabic language", "Emergency response experience"]
  },
  {
    id: 4,
    title: "Mental Health Support - Afghanistan",
    organization: "International Rescue Committee",
    location: "Kabul, Afghanistan",
    urgency: "Medium",
    duration: "3-6 months",
    specialties: ["Psychology", "Mental Health", "Social Work"],
    description: "Providing psychological support and trauma counseling for displaced populations.",
    startDate: "2025-09-01",
    positionsAvailable: 3,
    requirements: ["Clinical psychology degree", "Trauma counseling experience", "Cultural sensitivity training"]
  }
];

export default function DeploymentSearch() {
  const [filters, setFilters] = useState<DeploymentFilters>({
    location: "",
    urgency: "",
    duration: "",
    specialty: "",
    organization: "",
  });

  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleFilterChange = (key: keyof DeploymentFilters, value: string) => {
    const apiValue = value === "any" ? "" : value;
    setFilters(prev => ({ ...prev, [key]: apiValue }));
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      urgency: "",
      duration: "",
      specialty: "",
      organization: "",
    });
    setSearchTriggered(false);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Deployment Opportunities</h1>
          <p className="text-gray-600">
            Find urgent humanitarian deployment opportunities that match your skills and availability.
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="location">Location/Region</Label>
                <Select value={filters.location || "any"} onValueChange={(value) => handleFilterChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="Syria">Syria</SelectItem>
                    <SelectItem value="Yemen">Yemen</SelectItem>
                    <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                    <SelectItem value="South Sudan">South Sudan</SelectItem>
                    <SelectItem value="Democratic Republic of Congo">Democratic Republic of Congo</SelectItem>
                    <SelectItem value="Somalia">Somalia</SelectItem>
                    <SelectItem value="Myanmar">Myanmar</SelectItem>
                    <SelectItem value="Ukraine">Ukraine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={filters.urgency || "any"} onValueChange={(value) => handleFilterChange('urgency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Urgency</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duration">Deployment Duration</Label>
                <Select value={filters.duration || "any"} onValueChange={(value) => handleFilterChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Duration</SelectItem>
                    <SelectItem value="3-6 months">3-6 Months</SelectItem>
                    <SelectItem value="6-12 months">6-12 Months</SelectItem>
                    <SelectItem value="12+ months">12+ Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="specialty">Required Specialty</Label>
                <Select value={filters.specialty || "any"} onValueChange={(value) => handleFilterChange('specialty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Specialty</SelectItem>
                    <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Critical Care">Critical Care</SelectItem>
                    <SelectItem value="Obstetrics">Obstetrics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Select value={filters.organization || "any"} onValueChange={(value) => handleFilterChange('organization', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Organization</SelectItem>
                    <SelectItem value="Doctors Without Borders">Doctors Without Borders</SelectItem>
                    <SelectItem value="Save the Children">Save the Children</SelectItem>
                    <SelectItem value="Oxfam International">Oxfam International</SelectItem>
                    <SelectItem value="International Rescue Committee">International Rescue Committee</SelectItem>
                    <SelectItem value="World Health Organization">World Health Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search Deployments
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {mockDeployments.length} Deployment Opportunities Found
            </h2>
          </div>

          {mockDeployments.map((deployment) => (
            <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{deployment.title}</h3>
                      <Badge className={getUrgencyColor(deployment.urgency)}>
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {deployment.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-lg text-blue-600 font-medium mb-3">{deployment.organization}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        {deployment.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        Starts: {new Date(deployment.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="mr-2 h-4 w-4" />
                        {deployment.positionsAvailable} positions available
                      </div>
                      <div className="text-gray-600">
                        Duration: {deployment.duration}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{deployment.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Required Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {deployment.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {deployment.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Apply for Deployment
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                  <Button variant="outline">
                    Save Opportunity
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
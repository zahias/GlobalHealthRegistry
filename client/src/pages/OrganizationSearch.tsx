import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { extendedMockProfessionals } from "@/components/ExtendedMockData";

interface SearchFilters {
  specialty: string;
  language: string;
  availability: string;
  region: string;
  experience: string;
  duration: string;
  certification: string;
  verified: string;
}

export default function OrganizationSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    specialty: "",
    language: "",
    availability: "",
    region: "",
    experience: "",
    duration: "",
    certification: "",
    verified: "",
  });

  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: professionals = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/professionals/search", filters],
    enabled: searchTriggered,
  });

  const handleSearch = () => {
    setSearchTriggered(true);
    refetch();
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    // Convert "any" back to empty string for API calls
    const apiValue = value === "any" ? "" : value;
    setFilters(prev => ({ ...prev, [key]: apiValue }));
  };

  const clearFilters = () => {
    setFilters({
      specialty: "",
      language: "",
      availability: "",
      region: "",
      experience: "",
      duration: "",
      certification: "",
      verified: "",
    });
    setSearchTriggered(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Healthcare Professionals</h1>
          <p className="text-gray-600">Find qualified professionals for your humanitarian deployment needs</p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="specialty">Medical Specialty</Label>
                <Select value={filters.specialty || "any"} onValueChange={(value) => handleFilterChange('specialty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Specialty</SelectItem>
                    <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                    <SelectItem value="Nursing">Nursing</SelectItem>
                    <SelectItem value="Obstetrics">Obstetrics & Gynecology</SelectItem>
                    <SelectItem value="Anesthesiology">Anesthesiology</SelectItem>
                    <SelectItem value="Infectious Disease">Infectious Disease</SelectItem>
                    <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                    <SelectItem value="Critical Care">Critical Care</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Neurosurgery">Neurosurgery</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Maternal Health">Maternal Health</SelectItem>
                    <SelectItem value="Neonatology">Neonatology</SelectItem>
                    <SelectItem value="Trauma Surgery">Trauma Surgery</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Epidemiology">Epidemiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="language">Language Proficiency</Label>
                <Select value={filters.language || "any"} onValueChange={(value) => handleFilterChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Language</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Swahili">Swahili</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Urdu">Urdu</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Igbo">Igbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability">Availability Status</Label>
                <Select value={filters.availability || "any"} onValueChange={(value) => handleFilterChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">All Statuses</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="pending_documentation">Pending Verification</SelectItem>
                    <SelectItem value="deployed">Currently Deployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={filters.experience || "any"} onValueChange={(value) => handleFilterChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Experience</SelectItem>
                    <SelectItem value="2-5">2-5 Years</SelectItem>
                    <SelectItem value="5-10">5-10 Years</SelectItem>
                    <SelectItem value="10+">10+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="duration">Preferred Duration</Label>
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
                <Label htmlFor="certification">Key Certifications</Label>
                <Select value={filters.certification || "any"} onValueChange={(value) => handleFilterChange('certification', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Certification</SelectItem>
                    <SelectItem value="ACLS">ACLS</SelectItem>
                    <SelectItem value="PALS">PALS</SelectItem>
                    <SelectItem value="ATLS">ATLS</SelectItem>
                    <SelectItem value="Board Certified">Board Certified</SelectItem>
                    <SelectItem value="MPH">Master of Public Health</SelectItem>
                    <SelectItem value="RN">Registered Nurse</SelectItem>
                    <SelectItem value="Tropical Medicine">Tropical Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="verification">License Status</Label>
                <Select value={filters.verified || "any"} onValueChange={(value) => handleFilterChange('verified', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Licenses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">All Licenses</SelectItem>
                    <SelectItem value="verified">Verified Only</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Searching...' : 'Search Professionals'}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTriggered && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? 'Searching...' : `${professionals.length} professionals found`}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                          <div className="flex space-x-2 mb-3">
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <div className="h-10 bg-gray-200 rounded w-20"></div>
                          <div className="h-10 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : professionals.length > 0 ? (
              <div className="space-y-4">
                {professionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">
                    <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No professionals found</h3>
                    <p>Try adjusting your search filters to find more results.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searchTriggered && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Search for Healthcare Professionals</h3>
                <p>Use the filters above to find qualified professionals for your deployment needs.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

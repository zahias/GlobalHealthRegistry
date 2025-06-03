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

interface SearchFilters {
  specialty: string;
  language: string;
  availability: string;
  region: string;
}

export default function OrganizationSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    specialty: "",
    language: "",
    availability: "",
    region: "",
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
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="specialty">Specialty Required</Label>
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
                    <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                    <SelectItem value="Anesthesiology">Anesthesiology</SelectItem>
                    <SelectItem value="Obstetrics">Obstetrics</SelectItem>
                    <SelectItem value="Infectious Disease">Infectious Disease</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="region">Geographic Region</Label>
                <Select value={filters.region || "any"} onValueChange={(value) => handleFilterChange('region', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Region</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Americas">Americas</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Middle East">Middle East</SelectItem>
                    <SelectItem value="Caribbean">Caribbean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="language">Language Requirements</Label>
                <Select value={filters.language || "any"} onValueChange={(value) => handleFilterChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Language</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
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
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="pending_documentation">Pending Documentation</SelectItem>
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

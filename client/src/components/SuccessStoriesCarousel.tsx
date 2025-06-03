import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, MapPin, Calendar } from "lucide-react";

interface SuccessStory {
  id: number;
  professionalName: string;
  profileImage: string;
  specialty: string;
  organization: string;
  location: string;
  deploymentDate: string;
  testimonial: string;
  impact: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    professionalName: "Dr. Sarah Chen",
    profileImage: "/api/placeholder/80/80",
    specialty: "Emergency Medicine",
    organization: "Médecins Sans Frontières",
    location: "Cox's Bazar, Bangladesh",
    deploymentDate: "March 2024",
    testimonial: "Working with the Rohingya refugees was life-changing. The Global Health Registry made it possible to connect with MSF quickly when they needed emergency physicians. The verification process gave both sides confidence.",
    impact: "Treated over 2,500 patients during 6-month deployment"
  },
  {
    id: 2,
    professionalName: "Dr. Michael Okonkwo",
    profileImage: "/api/placeholder/80/80",
    specialty: "Infectious Disease",
    organization: "World Health Organization",
    location: "Goma, DRC",
    deploymentDate: "January 2024",
    testimonial: "The registry's matching system connected me with WHO's Ebola response team. Having all my credentials pre-verified meant I could deploy within 48 hours of the outbreak notification.",
    impact: "Led contact tracing efforts reaching 15,000+ people"
  },
  {
    id: 3,
    professionalName: "Dr. Ana Rodriguez",
    profileImage: "/api/placeholder/80/80",
    specialty: "Pediatric Surgery",
    organization: "International Red Cross",
    location: "Aleppo, Syria",
    deploymentDate: "September 2023",
    testimonial: "Thanks to the Global Health Registry, I was able to provide critical pediatric surgical care where it was needed most. The platform made the deployment process seamless and focused on what matters - saving lives.",
    impact: "Performed 180+ life-saving pediatric surgeries"
  },
  {
    id: 4,
    professionalName: "Dr. James Walker",
    profileImage: "/api/placeholder/80/80",
    specialty: "Mental Health",
    organization: "UNHCR",
    location: "Kakuma, Kenya",
    deploymentDate: "July 2023",
    testimonial: "The registry helped me find my calling in refugee mental health. Working with trauma survivors in Kakuma taught me more about resilience than any textbook ever could.",
    impact: "Established mental health services for 8,000+ refugees"
  }
];

export function SuccessStoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % successStories.length);
  };

  const currentStory = successStories[currentIndex];

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Quote className="h-8 w-8 text-blue-600" />
          </div>

          <div className="text-center space-y-6">
            <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-3xl mx-auto">
              "{currentStory.testimonial}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentStory.profileImage} alt={currentStory.professionalName} />
                <AvatarFallback>
                  {currentStory.professionalName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{currentStory.professionalName}</h4>
                <p className="text-sm text-blue-600">{currentStory.specialty}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {currentStory.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {currentStory.deploymentDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm font-medium text-green-800">Impact:</p>
              <p className="text-sm text-green-700">{currentStory.impact}</p>
              <p className="text-xs text-green-600 mt-1">with {currentStory.organization}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevious}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-2">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          Auto-advancing every 6 seconds • Click dots to navigate
        </p>
      </div>
    </div>
  );
}
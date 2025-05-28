import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Globe, Users, Award, Target, Shield } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import ghiLogoPath from "@assets/ghi_logo-345x198-1.png";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img 
            src={ghiLogoPath} 
            alt="AUB Global Health Institute" 
            className="mx-auto h-24 mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About the Global Health Registry
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A initiative by the American University of Beirut Global Health Institute 
            to connect skilled healthcare professionals with humanitarian organizations 
            serving in crisis and conflict zones worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900 flex items-center">
              <Target className="h-8 w-8 mr-3" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Global Health Registry was created to address the critical shortage of qualified 
              healthcare professionals in humanitarian crises. By maintaining a comprehensive database 
              of verified medical personnel and facilitating connections with reputable humanitarian 
              organizations, we aim to ensure that life-saving medical care reaches those who need it most, 
              when they need it most.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-orange-200">
            <CardHeader>
              <Heart className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle className="text-orange-900">Humanitarian Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We are committed to the highest standards of humanitarian aid, ensuring dignity, 
                respect, and quality care for all people affected by crises.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-orange-900">Professional Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Every healthcare professional in our registry undergoes rigorous verification 
                to ensure credentials, experience, and commitment to ethical practice.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <Globe className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle className="text-orange-900">Global Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We foster partnerships between healthcare professionals, humanitarian organizations, 
                and academic institutions worldwide to maximize impact.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AUB GHI Section */}
        <Card className="mb-16 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900">
              American University of Beirut Global Health Institute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  The AUB Global Health Institute is a leading center for global health research, 
                  education, and practice in the Middle East and beyond. Located at the crossroads 
                  of three continents, AUB-GHI is uniquely positioned to address global health 
                  challenges affecting vulnerable populations.
                </p>
                <p className="text-gray-700">
                  Since its establishment, the institute has been at the forefront of humanitarian 
                  health responses, training the next generation of global health leaders, and 
                  conducting research that informs policy and practice worldwide.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="text-gray-700">WHO Collaborating Center</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="text-gray-700">500+ Alumni in Humanitarian Work</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="text-gray-700">Programs in 20+ Countries</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <Card className="mb-16 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900">Our Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">250+</div>
                <div className="text-gray-700">Verified Healthcare Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">45+</div>
                <div className="text-gray-700">Partner Organizations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">30+</div>
                <div className="text-gray-700">Countries Served</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-900">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">
                  AUB Global Health Institute
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>American University of Beirut</p>
                  <p>Riad El-Solh / Beirut 1107 2020</p>
                  <p>Lebanon</p>
                  <p className="mt-4">
                    <strong>Phone:</strong> +961-1-350000 ext. 4697
                  </p>
                  <p>
                    <strong>Email:</strong> ghi@aub.edu.lb
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-orange-800">
                  Registry Support
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>For technical support or questions about the registry:</p>
                  <p className="mt-4">
                    <strong>Email:</strong> registry@aub.edu.lb
                  </p>
                  <p>
                    <strong>Support Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM (GMT+2)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
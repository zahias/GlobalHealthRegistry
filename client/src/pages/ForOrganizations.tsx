import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Search, Shield, Globe, Award } from "lucide-react";
import { Link } from "wouter";

export default function ForOrganizations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Building className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            For Humanitarian Organizations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a verified network of healthcare professionals ready for deployment. 
            Find the right expertise for your humanitarian missions and emergency responses.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-blue-200">
            <CardHeader>
              <Search className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-blue-900">Find Qualified Professionals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Search our database of verified healthcare professionals by specialty, 
                language, experience, and availability for immediate deployment.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-blue-900">Pre-Verified Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All professionals undergo thorough credential verification, background checks, 
                and license validation before joining our registry.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-blue-900">Rapid Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with available professionals quickly during emergencies. 
                Streamlined communication and deployment processes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mb-16 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-blue-800">Register Your Organization</h3>
                <p className="text-gray-600">
                  Create your organization profile and get verified as a legitimate humanitarian entity.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-blue-800">Search & Connect</h3>
                <p className="text-gray-600">
                  Use our advanced search to find professionals that match your mission requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-blue-800">Deploy & Coordinate</h3>
                <p className="text-gray-600">
                  Coordinate deployment details and maintain communication throughout the mission.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/organization">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 mr-4">
                  Register Organization
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 text-lg px-8 py-3">
                  Search Professionals
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Organization Types Section */}
        <Card className="mb-16 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Eligible Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-800">International NGOs</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Médecins Sans Frontières (MSF)</li>
                  <li>• International Red Cross/Red Crescent</li>
                  <li>• World Health Organization (WHO)</li>
                  <li>• UNICEF</li>
                  <li>• Save the Children</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-800">Other Qualified Organizations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• UN agencies and peacekeeping missions</li>
                  <li>• Government disaster response teams</li>
                  <li>• Faith-based humanitarian organizations</li>
                  <li>• Regional humanitarian networks</li>
                  <li>• Emergency medical response teams</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Section */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Organization Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-800">Verification Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid registration as humanitarian organization</li>
                  <li>• Proof of tax-exempt or charitable status</li>
                  <li>• References from established humanitarian networks</li>
                  <li>• Clear mission statement and operational history</li>
                  <li>• Comprehensive insurance coverage</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-800">Operational Standards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Adherence to humanitarian principles</li>
                  <li>• Duty of care protocols for deployed staff</li>
                  <li>• Security and safety procedures</li>
                  <li>• Professional development support</li>
                  <li>• Clear deployment terms and conditions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
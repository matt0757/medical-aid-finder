
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, FileText } from "lucide-react";

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MedConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Patient</span>
              <Link to="/">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Dashboard</h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700">
            Welcome to your patient portal. Access our AI-powered tools to help manage your healthcare needs.
          </p>
        </div>

        <Tabs defaultValue="dr-universal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dr-universal" className="text-base py-3">
              <Search className="h-5 w-5 mr-2" />
              Dr. Universal
            </TabsTrigger>
            <TabsTrigger value="ms-carey" className="text-base py-3">
              <Calendar className="h-5 w-5 mr-2" />
              Ms. Carey
            </TabsTrigger>
            <TabsTrigger value="mr-vault" className="text-base py-3">
              <FileText className="h-5 w-5 mr-2" />
              Mr. Vault
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dr-universal" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Dr. Universal</h2>
              <p className="text-gray-700">
                Our AI-powered pre-diagnosis assistant helps identify potential health concerns based on your symptoms and medical history.
              </p>
              <div className="flex items-center">
                <Button onClick={() => navigate('/patient/dr-universal')} className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ms-carey" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ms. Carey</h2>
              <p className="text-gray-700">
                Let our intelligent appointment handler find nearby hospitals, match your budget, and schedule appointments based on your availability.
              </p>
              <div className="flex items-center">
                <Button onClick={() => navigate('/patient/ms-carey')} className="bg-green-600 hover:bg-green-700">
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mr-vault" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Mr. Vault</h2>
              <p className="text-gray-700">
                Securely store and manage your medical documents, allowing easy access and sharing with healthcare providers.
              </p>
              <div className="flex items-center">
                <Button onClick={() => navigate('/patient/mr-vault')} className="bg-purple-600 hover:bg-purple-700">
                  Access Documents
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;

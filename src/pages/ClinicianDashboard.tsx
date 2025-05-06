
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Mail } from "lucide-react";

const ClinicianDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-green-600">MedConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Dr. Smith</span>
              <Link to="/">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Clinician Dashboard</h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700">
            Welcome to your clinician portal. Manage patient appointments, access medical records, and more.
          </p>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="appointments" className="text-base py-3">
              <Calendar className="h-5 w-5 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-base py-3">
              <Mail className="h-5 w-5 mr-2" />
              Patient Messages
            </TabsTrigger>
            <TabsTrigger value="records" className="text-base py-3">
              <FileText className="h-5 w-5 mr-2" />
              Patient Records
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">General Checkup • 10:00 AM, May 7, 2025</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-sm text-gray-600">Follow-up • 11:30 AM, May 7, 2025</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-gray-600">Cardiology Consult • 2:00 PM, May 7, 2025</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Patient Messages</h2>
              
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Incoming Appointment Request</p>
                    <p className="text-sm text-gray-600">From: Emma Wilson • Cardiology Department • Received 2 hours ago</p>
                  </div>
                  <Button variant="outline">Respond</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Appointment Confirmation</p>
                    <p className="text-sm text-gray-600">From: Michael Brown • Neurology Department • Received 5 hours ago</p>
                  </div>
                  <Button variant="outline">Respond</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="records" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Patient Records</h2>
              
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">Patient ID: 12345 • Last Visit: April 23, 2025</p>
                  </div>
                  <Button variant="outline">View Records</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-sm text-gray-600">Patient ID: 12346 • Last Visit: April 25, 2025</p>
                  </div>
                  <Button variant="outline">View Records</Button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-gray-600">Patient ID: 12347 • Last Visit: May 1, 2025</p>
                  </div>
                  <Button variant="outline">View Records</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClinicianDashboard;

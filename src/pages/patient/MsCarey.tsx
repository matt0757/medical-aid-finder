
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowLeft, MapPin, Clock, Mail, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface Hospital {
  id: number;
  name: string;
  distance: string;
  departments: string[];
  address: string;
}

interface AppointmentDetails {
  hospital: Hospital | null;
  department: string;
  budget: string;
  date: string;
  time: string;
  alternateDate: string;
  alternateTime: string;
  email: string;
}

const MsCarey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    hospital: null,
    department: "",
    budget: "",
    date: "",
    time: "",
    alternateDate: "",
    alternateTime: "",
    email: ""
  });
  const [appointmentStatus, setAppointmentStatus] = useState<"pending" | "confirmed" | "rejected" | null>(null);

  const searchHospitals = () => {
    setIsLoading(true);
    
    // Simulate API call to find nearby hospitals
    setTimeout(() => {
      const mockHospitals = [
        {
          id: 1,
          name: "City General Hospital",
          distance: "1.3 miles",
          departments: ["Cardiology", "Neurology", "Orthopedics", "General Medicine", "Pediatrics"],
          address: "123 Medical Drive, Springfield"
        },
        {
          id: 2,
          name: "Memorial Medical Center",
          distance: "2.7 miles",
          departments: ["Oncology", "Dermatology", "ENT", "Gynecology", "Urology"],
          address: "456 Health Avenue, Springfield"
        },
        {
          id: 3,
          name: "Riverside Healthcare",
          distance: "3.5 miles",
          departments: ["Ophthalmology", "Dentistry", "Psychiatry", "Physical Therapy", "Radiology"],
          address: "789 Wellness Blvd, Springfield"
        }
      ];
      
      setHospitals(mockHospitals);
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const selectHospital = (hospital: Hospital) => {
    setAppointmentDetails({
      ...appointmentDetails,
      hospital
    });
    setCurrentStep(3);
  };

  const selectDepartment = (department: string) => {
    setAppointmentDetails({
      ...appointmentDetails,
      department
    });
    setCurrentStep(4);
  };

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(5);
  };

  const handleDateTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(6);
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to book appointment
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(7);
      setAppointmentStatus("pending");
      
      // Simulate response from hospital
      setTimeout(() => {
        setAppointmentStatus("confirmed");
        toast({
          title: "Appointment Confirmed",
          description: `Your appointment with ${appointmentDetails.hospital?.name} has been confirmed.`,
        });
      }, 3000);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Find Hospitals Near You</h2>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your location
              </label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your city or zip code"
                  className="flex-grow"
                  required
                />
                <Button 
                  onClick={searchHospitals} 
                  disabled={isLoading || location.trim() === ""}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select a Hospital</h2>
            <div className="grid gap-4">
              {hospitals.map((hospital) => (
                <div 
                  key={hospital.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors"
                  onClick={() => selectHospital(hospital)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{hospital.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {hospital.address}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{hospital.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 3: Select Department</h2>
            <p className="text-gray-700 mb-4">
              Which department at {appointmentDetails.hospital?.name} would you like to visit?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentDetails.hospital?.departments.map((dept) => (
                <Button
                  key={dept}
                  variant="outline"
                  className="justify-start font-normal text-left h-auto py-3"
                  onClick={() => selectDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 4: Budget Information</h2>
            <p className="text-gray-700 mb-4">
              Please provide your budget information for your {appointmentDetails.department} appointment at {appointmentDetails.hospital?.name}.
            </p>
            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget range
                </label>
                <select
                  id="budget"
                  value={appointmentDetails.budget}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, budget: e.target.value})}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a budget range</option>
                  <option value="$0-$50">$0-$50</option>
                  <option value="$50-$100">$50-$100</option>
                  <option value="$100-$200">$100-$200</option>
                  <option value="$200-$500">$200-$500</option>
                  <option value="$500+">$500+</option>
                  <option value="Insurance">Using Insurance</option>
                </select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={appointmentDetails.budget === ""}
              >
                Continue
              </Button>
            </form>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 5: Select Date and Time</h2>
            <p className="text-gray-700 mb-4">
              Please select your preferred appointment date and time, as well as an alternate option.
            </p>
            <form onSubmit={handleDateTimeSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferred Option</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentDetails.date}
                        onChange={(e) => setAppointmentDetails({...appointmentDetails, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <Input
                        id="time"
                        type="time"
                        value={appointmentDetails.time}
                        onChange={(e) => setAppointmentDetails({...appointmentDetails, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Alternate Option</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="alt-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <Input
                        id="alt-date"
                        type="date"
                        value={appointmentDetails.alternateDate}
                        onChange={(e) => setAppointmentDetails({...appointmentDetails, alternateDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="alt-time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <Input
                        id="alt-time"
                        type="time"
                        value={appointmentDetails.alternateTime}
                        onChange={(e) => setAppointmentDetails({...appointmentDetails, alternateTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  !appointmentDetails.date || !appointmentDetails.time || 
                  !appointmentDetails.alternateDate || !appointmentDetails.alternateTime
                }
              >
                Continue
              </Button>
            </form>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 6: Confirm Appointment Details</h2>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Hospital</p>
                  <p className="font-medium">{appointmentDetails.hospital?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{appointmentDetails.department}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{appointmentDetails.hospital?.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Budget Range</p>
                  <p className="font-medium">{appointmentDetails.budget}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Preferred Date & Time</p>
                  <p className="font-medium">{appointmentDetails.date} at {appointmentDetails.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alternate Date & Time</p>
                  <p className="font-medium">{appointmentDetails.alternateDate} at {appointmentDetails.alternateTime}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleConfirmAppointment} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email (for appointment confirmation)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={appointmentDetails.email}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, email: e.target.value})}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading || !appointmentDetails.email}
              >
                {isLoading ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </form>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              {appointmentStatus === "pending" ? (
                <Clock className="h-16 w-16 text-yellow-500" />
              ) : appointmentStatus === "confirmed" ? (
                <Check className="h-16 w-16 text-green-500" />
              ) : (
                <Mail className="h-16 w-16 text-blue-500" />
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {appointmentStatus === "pending" 
                  ? "Processing Your Appointment" 
                  : appointmentStatus === "confirmed"
                  ? "Appointment Confirmed!"
                  : "Appointment Request Sent"}
              </h2>
              <p className="text-gray-700">
                {appointmentStatus === "pending" 
                  ? "We're waiting for confirmation from the hospital. This usually takes a few minutes." 
                  : appointmentStatus === "confirmed"
                  ? `Your appointment with ${appointmentDetails.hospital?.name} has been confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}.`
                  : `We've sent your appointment request to ${appointmentDetails.hospital?.name}. You'll receive a confirmation email at ${appointmentDetails.email} once it's approved.`}
              </p>
            </div>
            
            {appointmentStatus === "confirmed" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium">Appointment Details:</p>
                <p>Hospital: {appointmentDetails.hospital?.name}</p>
                <p>Department: {appointmentDetails.department}</p>
                <p>Date: {appointmentDetails.date}</p>
                <p>Time: {appointmentDetails.time}</p>
              </div>
            )}
            
            <div className="pt-4">
              <Link to="/patient">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/patient" className="flex items-center text-green-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-green-600">MedConnect</span>
            </div>
            <div className="w-24"></div> {/* Space balancer */}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-6">
            <Calendar className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Ms. Carey</h1>
          </div>
          
          <p className="text-gray-700 mb-8">
            Let our AI appointment handler help you schedule a visit with a healthcare provider based on your location, budget, and availability.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                {currentStep}
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {currentStep === 1 ? "Find Hospitals" : 
                   currentStep === 2 ? "Select Hospital" :
                   currentStep === 3 ? "Select Department" :
                   currentStep === 4 ? "Budget Information" :
                   currentStep === 5 ? "Select Date & Time" :
                   currentStep === 6 ? "Confirm Details" :
                   "Appointment Status"}
                </p>
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-green-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 7) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {renderStepContent()}
        </div>
      </main>
    </div>
  );
};

export default MsCarey;

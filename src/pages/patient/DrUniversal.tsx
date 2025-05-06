
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";

const DrUniversal = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for diagnosis
    setTimeout(() => {
      if (symptoms.toLowerCase().includes("headache")) {
        setDiagnosis("Based on your symptoms, you might be experiencing tension headaches. This could be due to stress, dehydration, or eye strain. Recommend consulting with a general practitioner if symptoms persist for more than 3 days.");
      } else if (symptoms.toLowerCase().includes("cough")) {
        setDiagnosis("Your symptoms suggest an upper respiratory infection. Rest, hydration, and over-the-counter cough medicine may help. If you develop fever or difficulty breathing, please consult a healthcare provider immediately.");
      } else {
        setDiagnosis("Based on the limited information provided, we recommend consulting with a healthcare professional for a proper diagnosis. Remember that this is not a substitute for professional medical advice.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/patient" className="flex items-center text-blue-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MedConnect</span>
            </div>
            <div className="w-24"></div> {/* Space balancer */}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-6">
            <Search className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Dr. Universal</h1>
          </div>
          
          <p className="text-gray-700 mb-8">
            Describe your symptoms in detail to receive a preliminary assessment. Remember, this is not a replacement for professional medical advice.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your symptoms
              </label>
              <textarea 
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full min-h-32 rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Example: I've had a persistent headache for the last 3 days, along with fatigue and slight dizziness..."
                required
              />
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || symptoms.trim() === ""}
              >
                {isLoading ? "Analyzing..." : "Get Assessment"}
              </Button>
            </div>
          </form>
          
          {diagnosis && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Preliminary Assessment</h2>
              <p className="text-gray-700">{diagnosis}</p>
              <div className="mt-4">
                <Link to="/patient/ms-carey">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Schedule Appointment
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> The information provided is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DrUniversal;

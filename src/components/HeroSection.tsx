
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <HeartPulse className="h-12 w-12 text-blue-600 mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              Experience comprehensive healthcare services with a team of dedicated professionals. 
              We provide personalized care to ensure your well-being at every stage of life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button size="lg" className="px-6 py-3 text-base font-medium">
                Book an Appointment
              </Button>
              <Button size="lg" variant="outline" className="px-6 py-3 text-base font-medium">
                Find a Doctor
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                  <span className="text-xs font-medium">A+</span>
                </div>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white">
                  <span className="text-xs font-medium">5★</span>
                </div>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-500 text-white">
                  <span className="text-xs font-medium">P+</span>
                </div>
              </div>
              <div className="ml-4">
                <span className="text-sm text-gray-500">Trusted by</span>
                <p className="text-sm font-medium text-gray-900">10,000+ patients</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full h-auto max-w-md relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform -rotate-6 rounded-2xl -z-10"></div>
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <div className="aspect-w-4 aspect-h-3 relative">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse-slow"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=500" 
                      alt="Doctor consulting with patient" 
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <HeartPulse className="h-5 w-5 text-blue-500" />
                    <h3 className="ml-2 text-sm font-medium text-blue-900">Working Hours</h3>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Mon - Fri:</div>
                    <div className="font-medium">8:00 AM - 8:00 PM</div>
                    <div>Saturday:</div>
                    <div className="font-medium">9:00 AM - 5:00 PM</div>
                    <div>Sunday:</div>
                    <div className="font-medium">10:00 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { User, Hospital } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MedConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-4">
                <a href="#about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#services" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <a href="#contact" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </nav>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Healthcare Simplified</h1>
              <p className="mt-4 text-xl max-w-2xl mx-auto">
                Connecting patients with healthcare providers through intelligent AI solutions.
              </p>
            </div>
          </div>
        </section>

        {/* User Selection Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Access</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Patient Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold">For Patients</h3>
                <p className="mt-3 text-gray-600 mb-6">
                  Access our AI-powered tools to get pre-diagnosis assistance, schedule appointments, and manage your medical documents.
                </p>
                <Link to="/patient">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Patient Access
                  </Button>
                </Link>
              </div>

              {/* Clinician Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 mb-4">
                  <Hospital className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">For Clinicians</h3>
                <p className="mt-3 text-gray-600 mb-6">
                  Manage patient appointments, access medical records, and collaborate with other healthcare professionals.
                </p>
                <Link to="/clinician">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full">
                    Clinician Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Our AI-Powered Services</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive healthcare solutions designed to improve patient care and clinical efficiency.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {/* Dr. Universal */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Dr. Universal</h3>
                <p className="mt-2 text-gray-600">
                  Our AI pre-diagnosis assistant helps identify potential health concerns based on your symptoms and medical history.
                </p>
              </div>

              {/* Ms. Carey */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Ms. Carey</h3>
                <p className="mt-2 text-gray-600">
                  Our intelligent appointment handler finds nearby hospitals, matches your budget, and schedules appointments based on your availability.
                </p>
              </div>

              {/* Mr. Vault */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Mr. Vault</h3>
                <p className="mt-2 text-gray-600">
                  Secure storage and management of your medical documents, allowing easy access and sharing with healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">About MedConnect</h2>
                <p className="mt-4 text-lg text-gray-600">
                  MedConnect is revolutionizing healthcare access by connecting patients with the right healthcare providers through intelligent AI solutions. Our platform streamlines the healthcare journey from initial symptom assessment to appointment scheduling and medical record management.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  We're committed to making healthcare more accessible, efficient, and personalized for everyone.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070" 
                  alt="Medical professionals" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about our services? Reach out to our support team.
              </p>
            </div>
            
            <div className="mt-12 max-w-lg mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">support@medconnect.com</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-2 text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                  <p className="mt-2 text-gray-600">123 Healthcare Ave, Medical District, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

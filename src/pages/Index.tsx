
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";
import { Heart, Syringe, Microscope, Pill, Brain, Eye, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const services = [
    {
      title: "Primary Care",
      description: "Comprehensive healthcare for individuals and families, focused on prevention and wellness.",
      icon: Heart,
      color: "bg-blue-600"
    },
    {
      title: "Vaccinations",
      description: "Stay protected with our full range of vaccines for children, adults, and travel needs.",
      icon: Syringe,
      color: "bg-green-500"
    },
    {
      title: "Laboratory Testing",
      description: "Advanced diagnostic tests with quick and accurate results for better healthcare decisions.",
      icon: Microscope,
      color: "bg-purple-500"
    },
    {
      title: "Pharmacy Services",
      description: "Convenient access to prescriptions and expert medication management guidance.",
      icon: Pill,
      color: "bg-red-500"
    },
    {
      title: "Neurology",
      description: "Specialized care for disorders of the nervous system, brain, and spinal cord.",
      icon: Brain,
      color: "bg-yellow-500"
    },
    {
      title: "Ophthalmology",
      description: "Comprehensive eye care services including routine exams and treatment of eye disorders.",
      icon: Eye,
      color: "bg-indigo-500"
    }
  ];

  const doctors = [
    {
      name: "Sarah Johnson",
      specialty: "Cardiologist",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300",
      rating: 4.9,
      experience: 12
    },
    {
      name: "Michael Chen",
      specialty: "Neurologist",
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300",
      rating: 4.8,
      experience: 10
    },
    {
      name: "Amelia Rodriguez",
      specialty: "Pediatrician",
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300",
      rating: 4.9,
      experience: 15
    },
    {
      name: "Robert Wilson",
      specialty: "Orthopedic Surgeon",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300",
      rating: 4.7,
      experience: 14
    }
  ];

  const resources = [
    {
      title: "Understanding Hypertension",
      description: "Learn about the causes, symptoms, and management of high blood pressure.",
      icon: Heart,
      link: "#"
    },
    {
      title: "Diabetes Care Guide",
      description: "Essential information for managing diabetes and maintaining a healthy lifestyle.",
      icon: Pill,
      link: "#"
    },
    {
      title: "Sleep Disorders & Solutions",
      description: "Explore common sleep problems and effective treatments for better rest.",
      icon: BedDouble,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We offer a wide range of healthcare services to meet your medical needs with a focus on quality and patient satisfaction.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color={service.color}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Doctors Section */}
        <section id="doctors" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Doctors</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our team of experienced healthcare professionals is dedicated to providing you with the best medical care.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {doctors.map((doctor, index) => (
                <DoctorCard 
                  key={index}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  imageUrl={doctor.imageUrl}
                  rating={doctor.rating}
                  experience={doctor.experience}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Your Health is Our Priority</h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their healthcare needs.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-base font-medium bg-white text-blue-600 hover:bg-blue-50">
                Schedule a Visit Today
              </Button>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section id="resources" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Health Resources</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our collection of health articles and resources to help you make informed decisions about your wellbeing.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {resources.map((resource, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <resource.icon className="h-10 w-10 text-blue-500" />
                  <h3 className="mt-4 text-xl font-medium text-gray-900">{resource.title}</h3>
                  <p className="mt-2 text-gray-600">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Appointment Section */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Book an Appointment</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Schedule a visit with one of our healthcare professionals. We're here to help you stay healthy.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment form submitted:', formData);
    // Here you would typically send the data to your server
    alert('Thank you! Your appointment request has been received. We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      message: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Book an Appointment</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select Service</option>
              <option value="general">General Consultation</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="dermatology">Dermatology</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select Time</option>
              <option value="morning">Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 3pm)</option>
              <option value="evening">Evening (3pm - 6pm)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Please share any specific concerns or questions you have..."
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
            I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">terms and conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-800">privacy policy</a>.
          </label>
        </div>
        <Button type="submit" className="w-full mt-6">
          Request Appointment
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;

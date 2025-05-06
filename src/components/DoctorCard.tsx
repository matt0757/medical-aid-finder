
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  experience: number;
}

const DoctorCard = ({ name, specialty, imageUrl, rating, experience }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="aspect-w-3 aspect-h-4 relative">
        <div className="absolute inset-0 bg-gray-200 animate-pulse-slow"></div>
        <img
          src={imageUrl}
          alt={`Dr. ${name}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
          {rating % 1 !== 0 && (
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          )}
          <span className="text-gray-600 text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Dr. {name}</h3>
        <p className="text-sm text-gray-600 mb-3">{specialty}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{experience}+ Years Experience</span>
        </div>
        <Button className="w-full">Book Appointment</Button>
      </div>
    </div>
  );
};

export default DoctorCard;

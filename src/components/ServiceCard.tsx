
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

const ServiceCard = ({ title, description, icon: Icon, color, onClick }: ServiceCardProps) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`inline-flex items-center justify-center p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-4 text-xl font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;

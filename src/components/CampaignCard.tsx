
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  raisedAmount: number;
  goalAmount: number;
  backers: number;
  daysLeft: number;
  category: string;
}

const CampaignCard = ({
  id,
  title,
  description,
  image,
  raisedAmount,
  goalAmount,
  backers,
  daysLeft,
  category,
}: CampaignCardProps) => {
  const percentFunded = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100);
  
  return (
    <div className="apple-card overflow-hidden transition-all duration-300 hover:shadow-apple-md flex flex-col h-full animate-fade-in">
      <Link to={`/campaign/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 backdrop-blur-md text-xs rounded-full px-2.5 py-1 font-medium text-gray-700 shadow-sm">
              {category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <Link to={`/campaign/${id}`} className="block">
          <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <div className="space-y-3 mt-auto">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-medium">{percentFunded}% funded</span>
            <span className="text-gray-500 text-xs">${raisedAmount.toLocaleString()} raised</span>
          </div>
          
          <Progress value={percentFunded} className="h-1.5 bg-gray-100" />
          
          <div className="flex justify-between pt-3 text-sm text-gray-500 border-t border-gray-100">
            <div>
              <span className="font-medium text-gray-900">{backers}</span> backers
            </div>
            <div>
              <span className="font-medium text-gray-900">{daysLeft}</span> days left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

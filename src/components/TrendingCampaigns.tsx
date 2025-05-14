
import CampaignCard from "./CampaignCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for trending campaigns
const trendingCampaigns = [
  {
    id: "1",
    title: "Eco-Friendly Water Bottle with Built-in Purifier",
    description: "A reusable water bottle that purifies water from any source, reducing plastic waste and providing clean water anywhere.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGVyJTIwYm90dGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 58420,
    goalAmount: 75000,
    backers: 1245,
    daysLeft: 18,
    category: "Eco-friendly"
  },
  {
    id: "2",
    title: "Smart Home Security Camera with AI Detection",
    description: "An advanced security camera that uses artificial intelligence to detect and alert you of suspicious activity.",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 124500,
    goalAmount: 100000,
    backers: 2187,
    daysLeft: 7,
    category: "Technology"
  },
  {
    id: "3",
    title: "Modular Backpack for Urban Commuters",
    description: "A versatile backpack with removable modules for different uses - from gym sessions to office meetings, all in one bag.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 42180,
    goalAmount: 50000,
    backers: 837,
    daysLeft: 15,
    category: "Design"
  },
  {
    id: "4",
    title: "Immersive VR Fitness Experience",
    description: "Turn your workouts into adventures with our VR fitness games that make exercise fun and engaging.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 87640,
    goalAmount: 120000,
    backers: 1423,
    daysLeft: 21,
    category: "Games"
  }
];

const TrendingCampaigns = () => {
  return (
    <div className="bg-apple-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Trending Now</h2>
          <Link to="/discover">
            <Button variant="outline">View all</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCampaigns;


import CampaignCard from "./CampaignCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCampaigns, type Campaign } from "@/store/campaignStore";

const TrendingCampaigns = () => {
  const [trendingCampaigns, setTrendingCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Holen der Kampagnen aus dem Store und Filtern der Top 4
    const allCampaigns = getCampaigns();
    const trending = allCampaigns
      .sort((a, b) => b.raisedAmount / b.goalAmount - a.raisedAmount / a.goalAmount)
      .slice(0, 4);
    
    setTrendingCampaigns(trending);
  }, []);

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

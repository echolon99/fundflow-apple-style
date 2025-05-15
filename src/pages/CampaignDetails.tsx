
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCampaigns, type Campaign } from "@/store/campaignStore";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const allCampaigns = getCampaigns();
      const foundCampaign = allCampaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleBackProject = () => {
    toast({
      title: "Thank you for your support!",
      description: "This is a demo project, so no actual payment will be processed.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-center">
              <div className="h-8 bg-gray-200 rounded w-48 mb-4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mb-2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-56 mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
          <p className="mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link to="/discover">
            <Button>Discover Other Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const percentFunded = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);

  return (
    <Layout>
      <div className="bg-apple-background min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Link to="/discover" className="text-primary hover:underline mb-6 inline-block">
            &larr; Back to Discover
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Image and funding details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-apple-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md text-sm rounded-full px-3 py-1 font-medium text-gray-700">
                      {campaign.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
                  <p className="text-gray-600 mb-6 whitespace-pre-line">
                    {campaign.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Funding info and back project */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-apple-md p-6 sticky top-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold">${campaign.raisedAmount.toLocaleString()}</h3>
                      <span className="text-gray-500">of ${campaign.goalAmount.toLocaleString()} goal</span>
                    </div>
                    <Progress value={percentFunded} className="h-2 mb-4" />
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-bold text-lg">{percentFunded}%</div>
                        <div className="text-gray-500 text-sm">Funded</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{campaign.backers}</div>
                        <div className="text-gray-500 text-sm">Backers</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{campaign.daysLeft}</div>
                        <div className="text-gray-500 text-sm">Days Left</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg" 
                    onClick={handleBackProject}
                  >
                    Back this project
                  </Button>

                  <div className="text-center text-gray-500 text-sm">
                    By backing, you agree to the Terms of Use and Privacy Policy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;

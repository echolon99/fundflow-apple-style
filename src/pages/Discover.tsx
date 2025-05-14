
import { useState } from "react";
import Layout from "@/components/Layout";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock data for campaigns - same as in TrendingCampaigns for now
const allCampaigns = [
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
  },
  {
    id: "5",
    title: "Sustainable Fashion Collection from Recycled Materials",
    description: "A clothing line created entirely from recycled ocean plastics and sustainable fabrics, reducing fashion's environmental impact.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 35700,
    goalAmount: 60000,
    backers: 625,
    daysLeft: 12,
    category: "Fashion"
  },
  {
    id: "6",
    title: "Educational Board Game Series for Kids",
    description: "A series of engaging board games that teach STEM concepts, critical thinking, and problem-solving to children ages 6-12.",
    image: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9hcmQlMjBnYW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 28450,
    goalAmount: 40000,
    backers: 512,
    daysLeft: 25,
    category: "Games"
  },
  {
    id: "7",
    title: "Solar-Powered Portable Charger",
    description: "A foldable solar panel with high-capacity battery that lets you charge your devices anywhere using clean, renewable energy.",
    image: "https://images.unsplash.com/photo-1594064424123-5ef1335e080c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXIlMjBjaGFyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 52300,
    goalAmount: 65000,
    backers: 987,
    daysLeft: 9,
    category: "Technology"
  },
  {
    id: "8",
    title: "Artisanal Small Batch Coffee Subscription",
    description: "A monthly subscription box featuring unique, ethically-sourced coffee beans from small farms around the world.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    raisedAmount: 18750,
    goalAmount: 25000,
    backers: 375,
    daysLeft: 19,
    category: "Food"
  }
];

// Categories from CategorySection component
const categories = [
  { id: "tech", name: "Technology", icon: "⚡" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "games", name: "Games", icon: "🎮" },
  { id: "film", name: "Film & Video", icon: "🎬" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "publishing", name: "Publishing", icon: "📚" },
  { id: "food", name: "Food", icon: "🍽️" },
  { id: "fashion", name: "Fashion", icon: "👕" },
];

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter campaigns based on category and search query
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesCategory = selectedCategory ? campaign.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
    const matchesSearch = searchQuery ? 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="bg-apple-background min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Discover Projects</h1>
          
          {/* Search and filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for projects..."
                  className="pl-10 w-full h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <div className="relative inline-block">
                  <Button variant="outline" className="rounded-full flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'Project' : 'Projects'} {selectedCategory && `in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}

              {filteredCampaigns.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;

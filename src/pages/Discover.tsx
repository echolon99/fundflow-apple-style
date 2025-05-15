
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { getCampaigns, type Campaign } from "@/store/campaignStore";

// Kategorien aus der CategorySection-Komponente
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
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  
  // Kampagnen aus dem Store beim Seitenaufbau laden
  useEffect(() => {
    setAllCampaigns(getCampaigns());
  }, []);
  
  // Kampagnen filtern basierend auf Kategorie und Suchbegriff
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesCategory = selectedCategory 
      ? campaign.category.toLowerCase().includes(selectedCategory.toLowerCase()) 
      : true;
    const matchesSearch = searchQuery 
      ? campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;
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


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-blue-50/50 overflow-hidden pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[40%] top-[10%] w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute left-[20%] bottom-0 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Bring your creative ideas to life
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            FundMe is where creators and backers come together to make unique and innovative projects happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/start-campaign">
              <Button size="lg" className="apple-button text-base px-8 py-6">
                Start a campaign
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="outline" size="lg" className="apple-button text-base px-8 py-6">
                Discover projects
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">20K+</div>
              <div className="text-gray-500 text-sm">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$120M+</div>
              <div className="text-gray-500 text-sm">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500K+</div>
              <div className="text-gray-500 text-sm">Backers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">190+</div>
              <div className="text-gray-500 text-sm">Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-12 relative">
        <div className="rounded-xl overflow-hidden shadow-apple-lg border border-gray-200/50">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80" 
            alt="Featured campaign" 
            className="w-full h-80 object-cover"
          />
          <div className="bg-white p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-12">
                <h2 className="text-2xl font-semibold mb-3">Featured Project: Next-Gen Smart Notebook</h2>
                <p className="text-gray-600 mb-6">
                  A revolutionary paper notebook that seamlessly syncs with your digital devices. Capture your thoughts on paper and access them anywhere.
                </p>
                <Link to="/campaign/featured">
                  <Button className="apple-button">
                    View this project
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 md:pl-12 pt-6 md:pt-0 flex flex-col justify-center">
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Funded</div>
                  <div className="text-2xl font-semibold">$287,640</div>
                  <div className="text-xs text-green-600 font-medium">286% of $100,000 goal</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Backers</div>
                  <div className="text-2xl font-semibold">3,840</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Days Left</div>
                  <div className="text-2xl font-semibold">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

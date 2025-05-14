
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create your campaign",
    description: "Share your story, set your funding goal, and create engaging rewards for your backers.",
    icon: "✏️"
  },
  {
    number: "02",
    title: "Get funded",
    description: "Promote your campaign and watch as backers support your idea with their pledges.",
    icon: "💰"
  },
  {
    number: "03",
    title: "Build your project",
    description: "Use the funds to bring your project to life and keep your backers updated on your progress.",
    icon: "🚀"
  },
  {
    number: "04",
    title: "Deliver rewards",
    description: "Send out rewards to your backers and build a community around your successful project.",
    icon: "🎁"
  }
];

const HowItWorks = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            FundMe helps you bring creative projects to life in just four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative apple-card p-6 transition-all duration-300 hover:shadow-apple-md">
              <div className="absolute -top-4 -left-2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-medium text-sm shadow-lg">
                {step.number}
              </div>
              <div className="text-4xl mb-4 mt-4">{step.icon}</div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/start-campaign">
            <Button size="lg" className="apple-button">
              Start your campaign
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

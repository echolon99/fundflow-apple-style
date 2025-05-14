
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import TrendingCampaigns from "@/components/TrendingCampaigns";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategorySection />
      <TrendingCampaigns />
      <HowItWorks />
      <Testimonials />
    </Layout>
  );
};

export default Index;

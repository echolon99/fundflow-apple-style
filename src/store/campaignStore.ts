
interface Campaign {
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

// Mock data für campaigns - gleich wie in TrendingCampaigns
const initialCampaigns: Campaign[] = [
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

// Verwenden eines globalen Zustands zur gemeinsamen Nutzung zwischen Komponenten
let campaigns = [...initialCampaigns];

// Export Funktionen für die Verwaltung der Kampagnen
export const getCampaigns = (): Campaign[] => {
  return campaigns;
};

export const addCampaign = (campaign: Campaign): void => {
  campaigns = [campaign, ...campaigns];
};

export const getCategoryNames = (): string[] => {
  return Array.from(new Set(campaigns.map(campaign => campaign.category)));
};

export type { Campaign };


import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "tech", name: "Technology", icon: "⚡" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "games", name: "Games", icon: "🎮" },
  { id: "film", name: "Film & Video", icon: "🎬" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "publishing", name: "Publishing", icon: "📚" },
  { id: "food", name: "Food", icon: "🍽️" },
  { id: "fashion", name: "Fashion", icon: "👕" },
];

const CategorySection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Explore Categories</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Discover projects across different categories that match your interests
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              className="apple-card group p-6 text-center hover:shadow-apple-md transition-all duration-300"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;

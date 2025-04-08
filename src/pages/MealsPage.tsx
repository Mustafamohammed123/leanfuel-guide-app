
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import MealItem from "@/components/MealItem";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { Search, FilterX, BookOpen, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Mock meal data
const mockMeals = [
  {
    id: "1",
    title: "Greek Yogurt with Berries",
    calories: 320,
    prepTime: 5,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "2",
    title: "Avocado Toast with Egg",
    calories: 450,
    prepTime: 10,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "3",
    title: "Overnight Oats",
    calories: 380,
    prepTime: 5,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1514326005837-fb4791d25e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "4",
    title: "Grilled Chicken Salad",
    calories: 380,
    prepTime: 15,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: true,
  },
  {
    id: "5",
    title: "Quinoa Buddha Bowl",
    calories: 420,
    prepTime: 20,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: true,
  },
  {
    id: "6",
    title: "Turkey Wrap",
    calories: 350,
    prepTime: 10,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "7",
    title: "Baked Salmon",
    calories: 450,
    prepTime: 25,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: true,
  },
  {
    id: "8",
    title: "Vegetable Stir Fry",
    calories: 320,
    prepTime: 15,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
];

const MealsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Breakfast", "Lunch", "Dinner"];

  const handleUpgrade = () => {
    toast("Upgrade feature coming soon!");
  };
  
  const handleMealClick = (meal: any) => {
    if (meal.isPremium) {
      toast("This is a premium meal. Upgrade to unlock!", {
        action: {
          label: "Upgrade",
          onClick: handleUpgrade
        }
      });
    } else {
      toast(`Added ${meal.title} to your meal plan`);
    }
  };

  // Filter meals based on search and category
  const filteredMeals = mockMeals.filter((meal) => {
    const matchesSearch = meal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Meal Plans</h1>
        <p className="text-gray-500">Discover healthy recipes</p>
      </header>
      
      <div className="mb-4">
        <Link 
          to="/meal-plans" 
          className="flex items-center justify-between leanfuel-card bg-green-50 hover:bg-green-100 transition-colors"
        >
          <div className="flex items-center">
            <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2 mr-3">
              <BookOpen size={24} className="text-leanfuel-primary" />
            </div>
            <div>
              <h3 className="font-medium">Weekly Meal Plans</h3>
              <p className="text-sm text-gray-600">7-day planned meals for your goals</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-leanfuel-primary" />
        </Link>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="leanfuel-input w-full pl-10"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <FilterX size={18} />
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto space-x-2 mb-4 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? "bg-leanfuel-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredMeals.length > 0 ? (
        <div>
          {filteredMeals.map((meal) => (
            <MealItem
              key={meal.id}
              title={meal.title}
              calories={meal.calories}
              prepTime={meal.prepTime}
              image={meal.image}
              isPremium={meal.isPremium}
              onClick={() => handleMealClick(meal)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No meals found. Try another search term.</p>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default MealsPage;

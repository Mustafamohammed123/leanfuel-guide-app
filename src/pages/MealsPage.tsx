
import { useState } from "react";
import { toast } from "sonner";
import BottomNavigation from "@/components/BottomNavigation";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import SearchBar from "@/components/meals/SearchBar";
import CategoryFilter from "@/components/meals/CategoryFilter";
import MealsList from "@/components/meals/MealsList";
import MealPlanBanner from "@/components/meals/MealPlanBanner";
import { mockMeals } from "@/components/meals/mockData";

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
      
      <MealPlanBanner />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <MealsList meals={filteredMeals} onMealClick={handleMealClick} />
      <BottomNavigation />
    </div>
  );
};

export default MealsPage;

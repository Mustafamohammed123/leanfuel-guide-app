
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag, Plus, Check, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MealPlan } from "@/components/meals/MealPlanCard";
import { MEAL_PLAN_DATA } from "@/utils/mealPlanUtils";
import { 
  GroceryItem, 
  GroceryList, 
  GROCERY_CATEGORIES,
  generateGroceryListFromMeals,
  getAllMealsFromMealPlan
} from "@/utils/groceryListUtils";

interface GroceryListBuilderProps {
  plan: MealPlan;
  onBack: () => void;
}

const GroceryListBuilder: React.FC<GroceryListBuilderProps> = ({ plan, onBack }) => {
  const [groceryItems, setGroceryItems] = useState<GroceryList>([]);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate grocery list when component mounts
    const mealPlanData = MEAL_PLAN_DATA[plan.id] || [];
    const allMeals = getAllMealsFromMealPlan(mealPlanData);
    const groceryList = generateGroceryListFromMeals(allMeals);
    
    setGroceryItems(groceryList);
    setIsLoading(false);
  }, [plan.id]);

  const handleToggleItem = (id: string, checked: boolean) => {
    setGroceryItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  const handleFilterCategory = (category: string | null) => {
    setFilteredCategory(category);
  };

  const saveToGroceryList = () => {
    // In a real app, this would save to a database
    const uncheckedItems = groceryItems.filter(item => !item.checked);
    
    if (uncheckedItems.length === 0) {
      toast("No items to add to your grocery list");
      return;
    }
    
    // Save to localStorage for now as a simple persistence mechanism
    const existingList = JSON.parse(localStorage.getItem("groceryList") || "[]");
    const newList = [...existingList, ...uncheckedItems];
    localStorage.setItem("groceryList", JSON.stringify(newList));
    
    toast.success(`Added ${uncheckedItems.length} items to your grocery list`);
    onBack();
  };

  // Get the list of categories that have items
  const categoriesWithItems = [...new Set(groceryItems.map(item => item.category))];
  
  // Filter the grocery items based on the selected category
  const displayedItems = filteredCategory 
    ? groceryItems.filter(item => item.category === filteredCategory)
    : groceryItems;

  return (
    <div className="leanfuel-container pb-20">
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft size={18} />
          </Button>
          <Button onClick={saveToGroceryList} size="sm" className="flex gap-1">
            <Plus size={16} />
            Add to Grocery List
          </Button>
        </div>
      </div>
      
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Grocery Builder</h1>
        <p className="text-gray-500">Based on: {plan.title}</p>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Generating grocery list...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <Button
                size="sm"
                variant={filteredCategory === null ? "default" : "outline"}
                onClick={() => handleFilterCategory(null)}
                className="whitespace-nowrap"
              >
                All Items
              </Button>
              {categoriesWithItems.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={filteredCategory === category ? "default" : "outline"}
                  onClick={() => handleFilterCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {displayedItems.length > 0 ? (
            <div className="space-y-4">
              {filteredCategory === null && categoriesWithItems.map(category => {
                const categoryItems = groceryItems.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4">
                    <h2 className="font-medium text-base mb-1">{category}</h2>
                    <div className="leanfuel-card p-0">
                      {categoryItems.map(item => (
                        <GroceryItemRow 
                          key={item.id} 
                          item={item} 
                          onToggle={handleToggleItem} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {filteredCategory !== null && (
                <div className="leanfuel-card p-0">
                  {displayedItems.map(item => (
                    <GroceryItemRow 
                      key={item.id} 
                      item={item} 
                      onToggle={handleToggleItem} 
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="leanfuel-card flex flex-col items-center justify-center py-8">
              <ShoppingBag size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-500">No grocery items found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Subcomponent for rendering a grocery item row
const GroceryItemRow: React.FC<{
  item: GroceryItem;
  onToggle: (id: string, checked: boolean) => void;
}> = ({ item, onToggle }) => {
  return (
    <div className={`flex items-center p-3 border-b ${item.checked ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center gap-2 flex-1">
        <Checkbox 
          id={item.id}
          checked={item.checked}
          onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
        />
        <label
          htmlFor={item.id}
          className={`${item.checked ? 'line-through text-gray-400' : ''} flex-1 cursor-pointer`}
        >
          {item.name}
        </label>
      </div>
    </div>
  );
};

export default GroceryListBuilder;

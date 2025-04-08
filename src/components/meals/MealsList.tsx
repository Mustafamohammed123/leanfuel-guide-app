
import React from "react";
import MealItem from "@/components/MealItem";

interface Meal {
  id: string;
  title: string;
  calories: number;
  prepTime: number;
  category: string;
  image: string;
  isPremium: boolean;
}

interface MealsListProps {
  meals: Meal[];
  onMealClick: (meal: Meal) => void;
}

const MealsList = ({ meals, onMealClick }: MealsListProps) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No meals found. Try another search term.</p>
      </div>
    );
  }

  return (
    <div>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          title={meal.title}
          calories={meal.calories}
          prepTime={meal.prepTime}
          image={meal.image}
          isPremium={meal.isPremium}
          onClick={() => onMealClick(meal)}
        />
      ))}
    </div>
  );
};

export default MealsList;

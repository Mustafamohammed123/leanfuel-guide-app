
// Types for our meal plan data
export interface Meal {
  name: string;
  calories: number;
  prepTime: number;
  ingredients: string[];
  instructions?: string[];
}

export interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

// Helper function to generate Clean Eating meal plan
export function generateCleanEatingPlan(): DayMeals[] {
  return [
    // Day 1
    {
      breakfast: {
        name: "Greek Yogurt with Berries and Honey",
        calories: 320,
        prepTime: 5,
        ingredients: [
          "1 cup Greek yogurt (plain, low-fat)",
          "1/2 cup mixed berries (strawberries, blueberries)",
          "1 tbsp honey",
          "1 tbsp chia seeds"
        ],
        instructions: [
          "Add yogurt to a bowl",
          "Top with berries, honey, and chia seeds"
        ]
      },
      lunch: {
        name: "Quinoa Vegetable Bowl",
        calories: 430,
        prepTime: 20,
        ingredients: [
          "1 cup cooked quinoa",
          "1 cup roasted vegetables (bell peppers, zucchini, broccoli)",
          "1/4 avocado, sliced",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "Fresh herbs (basil, parsley)",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Baked Salmon with Steamed Vegetables",
        calories: 480,
        prepTime: 25,
        ingredients: [
          "5 oz wild-caught salmon fillet",
          "1 tbsp olive oil",
          "1 lemon (for juice and zest)",
          "2 cups steamed vegetables (asparagus, carrots)",
          "Fresh dill",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Apple with Almond Butter",
          calories: 200,
          prepTime: 2,
          ingredients: [
            "1 medium apple, sliced",
            "1 tbsp natural almond butter"
          ]
        }
      ]
    },
    // Day 2
    {
      breakfast: {
        name: "Overnight Oats with Almond Milk",
        calories: 350,
        prepTime: 5,
        ingredients: [
          "1/2 cup rolled oats",
          "3/4 cup almond milk",
          "1 tbsp chia seeds",
          "1/2 banana, sliced",
          "1 tbsp maple syrup",
          "Cinnamon to taste"
        ]
      },
      lunch: {
        name: "Mediterranean Chickpea Salad",
        calories: 410,
        prepTime: 15,
        ingredients: [
          "1 cup chickpeas, rinsed and drained",
          "1 cucumber, diced",
          "1 bell pepper, diced",
          "1/4 cup red onion, diced",
          "1/4 cup feta cheese (optional)",
          "2 tbsp olive oil",
          "1 tbsp red wine vinegar",
          "Fresh herbs (parsley, mint)",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Herb-Roasted Chicken with Sweet Potatoes",
        calories: 520,
        prepTime: 40,
        ingredients: [
          "5 oz chicken breast",
          "1 medium sweet potato, cubed",
          "2 cups mixed vegetables",
          "2 tbsp olive oil",
          "Fresh herbs (rosemary, thyme)",
          "Garlic powder",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Veggie Sticks with Hummus",
          calories: 150,
          prepTime: 5,
          ingredients: [
            "Carrot, cucumber, and bell pepper sticks",
            "3 tbsp hummus"
          ]
        }
      ]
    },
    // Day 3
    {
      breakfast: {
        name: "Veggie Egg Scramble with Avocado Toast",
        calories: 380,
        prepTime: 15,
        ingredients: [
          "2 eggs",
          "1/4 cup diced bell peppers",
          "1/4 cup diced onions",
          "1/4 cup spinach",
          "1 slice whole grain bread",
          "1/4 avocado",
          "1 tsp olive oil",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Turkey and Vegetable Wrap",
        calories: 390,
        prepTime: 10,
        ingredients: [
          "1 whole wheat tortilla",
          "3 oz sliced turkey breast",
          "1/4 avocado, sliced",
          "1/2 cup mixed greens",
          "1/4 cup grated carrots",
          "1 tbsp hummus",
          "1 tsp mustard"
        ]
      },
      dinner: {
        name: "Grilled Fish Tacos with Cabbage Slaw",
        calories: 450,
        prepTime: 25,
        ingredients: [
          "5 oz white fish (cod or tilapia)",
          "2 corn tortillas",
          "1 cup shredded cabbage",
          "1/4 cup diced tomatoes",
          "1 tbsp lime juice",
          "1 tbsp olive oil",
          "Fresh cilantro",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Greek Yogurt with Honey",
          calories: 180,
          prepTime: 2,
          ingredients: [
            "3/4 cup Greek yogurt",
            "1 tsp honey",
            "Cinnamon to taste"
          ]
        }
      ]
    },
    // Days 4-7 (simplified for brevity but would follow same pattern)
    {
      breakfast: {
        name: "Spinach and Mushroom Omelette",
        calories: 340,
        prepTime: 15,
        ingredients: [
          "2 eggs",
          "1 cup spinach",
          "1/2 cup mushrooms, sliced",
          "1 tbsp olive oil",
          "1 slice whole grain toast",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Tuna Salad with Mixed Greens",
        calories: 380,
        prepTime: 10,
        ingredients: [
          "4 oz canned tuna in water, drained",
          "2 cups mixed greens",
          "1/2 cucumber, sliced",
          "1/4 cup cherry tomatoes",
          "1 tbsp olive oil",
          "1 tsp lemon juice",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Lean Beef Stir Fry with Brown Rice",
        calories: 490,
        prepTime: 25,
        ingredients: [
          "4 oz lean beef, sliced",
          "2 cups mixed vegetables (broccoli, carrots, snap peas)",
          "1/2 cup cooked brown rice",
          "1 tbsp low-sodium soy sauce",
          "1 tsp ginger, minced",
          "1 clove garlic, minced",
          "1 tbsp olive oil"
        ]
      },
      snacks: [
        {
          name: "Mixed Nuts and Dried Fruit",
          calories: 190,
          prepTime: 0,
          ingredients: [
            "1/4 cup mixed nuts (almonds, walnuts)",
            "2 tbsp dried cranberries"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Avocado Toast with Poached Egg",
        calories: 360,
        prepTime: 15,
        ingredients: [
          "1 slice whole grain bread",
          "1/2 avocado, mashed",
          "1 egg, poached",
          "Red pepper flakes",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Lentil Soup with Whole Grain Bread",
        calories: 420,
        prepTime: 30,
        ingredients: [
          "1 cup lentil soup",
          "1 slice whole grain bread",
          "1 tsp olive oil",
          "Fresh herbs (thyme, parsley)"
        ]
      },
      dinner: {
        name: "Baked Chicken with Roasted Vegetables",
        calories: 460,
        prepTime: 35,
        ingredients: [
          "5 oz chicken breast",
          "2 cups roasted vegetables (brussels sprouts, carrots, onions)",
          "2 tbsp olive oil",
          "1 clove garlic, minced",
          "Fresh herbs (rosemary, thyme)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Cottage Cheese with Pineapple",
          calories: 160,
          prepTime: 2,
          ingredients: [
            "1/2 cup low-fat cottage cheese",
            "1/2 cup pineapple chunks"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Berry Smoothie Bowl",
        calories: 330,
        prepTime: 10,
        ingredients: [
          "1 cup mixed berries",
          "1 banana",
          "1/2 cup Greek yogurt",
          "1/4 cup almond milk",
          "1 tbsp almond butter",
          "1 tbsp chia seeds",
          "1 tbsp granola for topping"
        ]
      },
      lunch: {
        name: "Grilled Chicken Caesar Salad",
        calories: 400,
        prepTime: 20,
        ingredients: [
          "4 oz grilled chicken breast",
          "2 cups romaine lettuce",
          "1 tbsp Parmesan cheese",
          "1 tbsp olive oil",
          "1 tsp lemon juice",
          "1 clove garlic, minced",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Shrimp and Vegetable Stir Fry",
        calories: 410,
        prepTime: 20,
        ingredients: [
          "5 oz shrimp",
          "2 cups mixed vegetables (bell peppers, snap peas, broccoli)",
          "1/2 cup brown rice",
          "1 tbsp low-sodium soy sauce",
          "1 tsp sesame oil",
          "1 clove garlic, minced",
          "1 tsp ginger, minced"
        ]
      },
      snacks: [
        {
          name: "Apple Slices with Peanut Butter",
          calories: 200,
          prepTime: 3,
          ingredients: [
            "1 medium apple, sliced",
            "1 tbsp natural peanut butter"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Whole Grain Cereal with Berries",
        calories: 310,
        prepTime: 5,
        ingredients: [
          "3/4 cup whole grain cereal",
          "1 cup almond milk",
          "1/2 cup mixed berries",
          "1 tbsp flaxseeds"
        ]
      },
      lunch: {
        name: "Quinoa and Black Bean Bowl",
        calories: 430,
        prepTime: 15,
        ingredients: [
          "1/2 cup cooked quinoa",
          "1/2 cup black beans",
          "1/4 avocado, sliced",
          "1/4 cup corn",
          "1/4 cup diced tomatoes",
          "1 tbsp lime juice",
          "Fresh cilantro",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Baked Cod with Lemon and Herbs",
        calories: 390,
        prepTime: 25,
        ingredients: [
          "5 oz cod fillet",
          "1 lemon (juice and zest)",
          "2 cups steamed vegetables (zucchini, yellow squash)",
          "1 tbsp olive oil",
          "Fresh herbs (dill, parsley)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Handful of Mixed Berries",
          calories: 85,
          prepTime: 0,
          ingredients: [
            "1 cup mixed berries (strawberries, blueberries, raspberries)"
          ]
        }
      ]
    }
  ];
}

// Helper function to generate Low Calorie meal plan
export function generateLowCaloriePlan(): DayMeals[] {
  return [
    // Day 1
    {
      breakfast: {
        name: "Egg White Veggie Scramble",
        calories: 220,
        prepTime: 10,
        ingredients: [
          "4 egg whites",
          "1 cup spinach",
          "1/4 cup diced bell peppers",
          "1/4 cup diced onions",
          "1 tsp olive oil",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Zucchini Noodles with Tomato Sauce",
        calories: 280,
        prepTime: 20,
        ingredients: [
          "2 medium zucchinis, spiralized",
          "1/2 cup tomato sauce",
          "2 oz lean ground turkey (optional)",
          "1 tbsp grated Parmesan cheese",
          "Fresh basil",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Grilled White Fish with Steamed Vegetables",
        calories: 340,
        prepTime: 20,
        ingredients: [
          "5 oz white fish (tilapia or cod)",
          "2 cups steamed mixed vegetables",
          "1 tbsp lemon juice",
          "1 tsp olive oil",
          "Fresh herbs (dill, parsley)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Cucumber Slices with Greek Yogurt Dip",
          calories: 120,
          prepTime: 5,
          ingredients: [
            "1 cucumber, sliced",
            "1/4 cup non-fat Greek yogurt",
            "1 tsp dill",
            "1 tsp lemon juice",
            "Salt and pepper to taste"
          ]
        }
      ]
    },
    // Including the remaining days with simplified structure for brevity
    {
      breakfast: {
        name: "Overnight Chia Pudding",
        calories: 240,
        prepTime: 5,
        ingredients: [
          "2 tbsp chia seeds",
          "3/4 cup almond milk",
          "1/2 tsp vanilla extract",
          "1/2 cup berries",
          "Stevia or monk fruit sweetener to taste"
        ]
      },
      lunch: {
        name: "Large Green Salad with Grilled Chicken",
        calories: 320,
        prepTime: 15,
        ingredients: [
          "3 oz grilled chicken breast",
          "3 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "1/4 cup shredded carrots",
          "1 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Cauliflower Fried Rice",
        calories: 290,
        prepTime: 25,
        ingredients: [
          "2 cups cauliflower rice",
          "1 egg, scrambled",
          "1/4 cup peas and carrots",
          "1 tbsp low-sodium soy sauce",
          "1 clove garlic, minced",
          "1 tsp ginger, minced",
          "1 tsp sesame oil",
          "Green onions for garnish"
        ]
      },
      snacks: [
        {
          name: "Celery with Cottage Cheese",
          calories: 100,
          prepTime: 3,
          ingredients: [
            "2 stalks celery",
            "1/4 cup low-fat cottage cheese",
            "Paprika or herbs to taste"
          ]
        }
      ]
    },
    // Simplified remaining days for brevity
    {
      breakfast: {
        name: "Greek Yogurt Parfait",
        calories: 250,
        prepTime: 5,
        ingredients: [
          "3/4 cup non-fat Greek yogurt",
          "1/4 cup berries",
          "1 tbsp granola",
          "1 tsp honey",
          "Cinnamon to taste"
        ]
      },
      lunch: {
        name: "Turkey and Vegetable Lettuce Wraps",
        calories: 280,
        prepTime: 10,
        ingredients: [
          "3 oz sliced turkey breast",
          "4 large lettuce leaves",
          "1/4 cup grated carrots",
          "1/4 cup cucumber, sliced",
          "1/4 avocado, sliced",
          "2 tsp mustard",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Baked Salmon with Asparagus",
        calories: 350,
        prepTime: 20,
        ingredients: [
          "4 oz salmon fillet",
          "10 asparagus spears",
          "1/2 lemon (juice and zest)",
          "1 tsp olive oil",
          "Fresh dill",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Rice Cake with Cottage Cheese",
          calories: 110,
          prepTime: 2,
          ingredients: [
            "1 rice cake",
            "2 tbsp low-fat cottage cheese",
            "Sliced cucumber",
            "Fresh herbs (optional)"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Smoothie with Spinach and Protein",
        calories: 230,
        prepTime: 5,
        ingredients: [
          "1 cup spinach",
          "1/2 banana",
          "1 scoop protein powder",
          "3/4 cup almond milk",
          "Ice cubes",
          "Cinnamon to taste"
        ]
      },
      lunch: {
        name: "Lentil and Vegetable Soup",
        calories: 290,
        prepTime: 30,
        ingredients: [
          "1/2 cup lentils, cooked",
          "1/4 cup diced carrots",
          "1/4 cup diced celery",
          "1/4 cup diced onions",
          "2 cups vegetable broth",
          "1 tsp olive oil",
          "Fresh herbs (thyme, bay leaf)",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Shirataki Noodle Stir Fry",
        calories: 310,
        prepTime: 15,
        ingredients: [
          "1 package shirataki noodles, rinsed and drained",
          "3 oz chicken breast, sliced",
          "1 cup stir-fry vegetables",
          "1 tbsp low-sodium soy sauce",
          "1 tsp sesame oil",
          "1 clove garlic, minced",
          "1 tsp ginger, minced"
        ]
      },
      snacks: [
        {
          name: "Apple with Cinnamon",
          calories: 95,
          prepTime: 2,
          ingredients: [
            "1 medium apple, sliced",
            "Cinnamon to taste"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Veggie Egg Muffins",
        calories: 220,
        prepTime: 30,
        ingredients: [
          "2 eggs",
          "1/4 cup egg whites",
          "1/4 cup diced bell peppers",
          "1/4 cup diced spinach",
          "1 tbsp feta cheese",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Tuna Salad in Lettuce Cups",
        calories: 270,
        prepTime: 10,
        ingredients: [
          "3 oz canned tuna in water, drained",
          "1 tbsp Greek yogurt",
          "1 tsp lemon juice",
          "1/4 cup diced celery",
          "4 large lettuce leaves",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Vegetable and Chicken Skewers",
        calories: 340,
        prepTime: 25,
        ingredients: [
          "4 oz chicken breast, cubed",
          "1 cup mixed vegetables (bell peppers, zucchini, mushrooms)",
          "1 tbsp olive oil",
          "1 tsp garlic powder",
          "1 tsp Italian herbs",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Carrot and Celery Sticks",
          calories: 50,
          prepTime: 5,
          ingredients: [
            "1 medium carrot, sliced",
            "2 celery stalks, sliced",
            "2 tbsp salsa for dipping"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Low-Carb Breakfast Bowl",
        calories: 240,
        prepTime: 15,
        ingredients: [
          "2 eggs, scrambled",
          "1/4 avocado, diced",
          "1/4 cup diced tomatoes",
          "1 cup spinach, sautéed",
          "1 tsp olive oil",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Cucumber and Hummus Wrap",
        calories: 280,
        prepTime: 10,
        ingredients: [
          "1 low-carb tortilla",
          "3 tbsp hummus",
          "1/2 cucumber, sliced",
          "1/4 cup shredded carrots",
          "1/4 cup mixed greens",
          "1 tsp lemon juice",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Spaghetti Squash with Turkey Meatballs",
        calories: 330,
        prepTime: 40,
        ingredients: [
          "1.5 cups cooked spaghetti squash",
          "3 oz turkey meatballs",
          "1/4 cup tomato sauce",
          "1 tbsp grated Parmesan cheese",
          "Fresh basil",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Edamame",
          calories: 100,
          prepTime: 5,
          ingredients: [
            "1/2 cup edamame, shelled",
            "Sea salt to taste"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Cottage Cheese with Fruit",
        calories: 230,
        prepTime: 5,
        ingredients: [
          "3/4 cup low-fat cottage cheese",
          "1/2 cup berries",
          "1 tbsp sliced almonds",
          "Cinnamon to taste"
        ]
      },
      lunch: {
        name: "Cauliflower Rice Bowl",
        calories: 290,
        prepTime: 20,
        ingredients: [
          "1.5 cups cauliflower rice",
          "3 oz grilled shrimp",
          "1/4 avocado, diced",
          "1/4 cup diced tomatoes",
          "1/4 cup black beans",
          "1 tbsp lime juice",
          "Fresh cilantro",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Herb-Roasted Chicken with Vegetables",
        calories: 340,
        prepTime: 35,
        ingredients: [
          "4 oz chicken breast",
          "2 cups roasted vegetables (brussels sprouts, carrots)",
          "1 tsp olive oil",
          "1 tsp herbs de Provence",
          "1 clove garlic, minced",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Sliced Bell Peppers with Tzatziki",
          calories: 90,
          prepTime: 5,
          ingredients: [
            "1 bell pepper, sliced",
            "2 tbsp tzatziki sauce"
          ]
        }
      ]
    }
  ];
}

// Helper function to generate High Protein meal plan
export function generateHighProteinPlan(): DayMeals[] {
  return [
    // Day 1
    {
      breakfast: {
        name: "Protein-Packed Scramble",
        calories: 420,
        prepTime: 15,
        ingredients: [
          "3 eggs",
          "3 oz turkey sausage",
          "1/2 cup spinach",
          "1/4 cup diced bell peppers",
          "1 tsp olive oil",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Grilled Chicken Salad with Chickpeas",
        calories: 450,
        prepTime: 20,
        ingredients: [
          "5 oz grilled chicken breast",
          "2 cups mixed greens",
          "1/4 cup chickpeas",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "1 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Baked Salmon with Quinoa",
        calories: 490,
        prepTime: 25,
        ingredients: [
          "5 oz salmon fillet",
          "1/2 cup cooked quinoa",
          "1 cup roasted broccoli",
          "1 tbsp lemon juice",
          "1 tsp olive oil",
          "Fresh dill",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Greek Yogurt with Nuts",
          calories: 230,
          prepTime: 2,
          ingredients: [
            "3/4 cup Greek yogurt",
            "1 tbsp sliced almonds",
            "1 tsp honey",
            "Cinnamon to taste"
          ]
        }
      ]
    },
    // Including remaining days with simplified structure for brevity
    {
      breakfast: {
        name: "Protein Smoothie Bowl",
        calories: 410,
        prepTime: 10,
        ingredients: [
          "1 scoop protein powder",
          "1/2 banana",
          "1/2 cup berries",
          "3/4 cup almond milk",
          "1 tbsp almond butter",
          "1 tbsp chia seeds",
          "Ice cubes"
        ]
      },
      lunch: {
        name: "Turkey and Avocado Lettuce Wraps",
        calories: 440,
        prepTime: 15,
        ingredients: [
          "5 oz sliced turkey breast",
          "4 large lettuce leaves",
          "1/2 avocado, sliced",
          "1/4 cup shredded carrots",
          "2 tbsp hummus",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Lean Beef Stir Fry",
        calories: 480,
        prepTime: 20,
        ingredients: [
          "5 oz lean beef strips",
          "2 cups mixed vegetables (broccoli, bell peppers, snap peas)",
          "1/2 cup brown rice",
          "1 tbsp low-sodium soy sauce",
          "1 tsp sesame oil",
          "1 clove garlic, minced",
          "1 tsp ginger, minced"
        ]
      },
      snacks: [
        {
          name: "Cottage Cheese with Pineapple",
          calories: 200,
          prepTime: 2,
          ingredients: [
            "3/4 cup cottage cheese",
            "1/2 cup pineapple chunks"
          ]
        }
      ]
    },
    // Simplified remaining days for brevity
    {
      breakfast: {
        name: "Egg and Vegetable Muffins",
        calories: 390,
        prepTime: 30,
        ingredients: [
          "4 eggs",
          "1/4 cup diced bell peppers",
          "1/4 cup diced spinach",
          "1 oz shredded cheddar cheese",
          "2 slices turkey bacon, chopped",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Tuna Salad with Whole Grain Crackers",
        calories: 430,
        prepTime: 10,
        ingredients: [
          "5 oz canned tuna in water, drained",
          "1 tbsp Greek yogurt",
          "1 tbsp olive oil mayo",
          "1/4 cup diced celery",
          "1/4 cup diced red onion",
          "10 whole grain crackers",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Grilled Chicken with Sweet Potato",
        calories: 470,
        prepTime: 30,
        ingredients: [
          "5 oz chicken breast",
          "1 medium sweet potato",
          "1 cup steamed broccoli",
          "1 tsp olive oil",
          "1 tsp garlic powder",
          "Fresh herbs (rosemary, thyme)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Protein Bar",
          calories: 220,
          prepTime: 0,
          ingredients: [
            "1 protein bar (20g protein)"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Protein Pancakes",
        calories: 410,
        prepTime: 15,
        ingredients: [
          "1 scoop protein powder",
          "1 banana",
          "2 eggs",
          "1/4 tsp baking powder",
          "1/4 tsp vanilla extract",
          "1 tsp coconut oil for cooking",
          "1 tbsp sugar-free maple syrup"
        ]
      },
      lunch: {
        name: "Grilled Salmon Salad",
        calories: 460,
        prepTime: 20,
        ingredients: [
          "5 oz grilled salmon",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "1/4 avocado, sliced",
          "1 tbsp olive oil",
          "1 tbsp lemon juice",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Turkey Meatballs with Zucchini Noodles",
        calories: 450,
        prepTime: 30,
        ingredients: [
          "5 oz ground turkey (formed into meatballs)",
          "2 medium zucchinis, spiralized",
          "1/2 cup tomato sauce",
          "1 tbsp grated Parmesan cheese",
          "1 tsp Italian herbs",
          "1 clove garlic, minced",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Hard-Boiled Eggs",
          calories: 140,
          prepTime: 15,
          ingredients: [
            "2 hard-boiled eggs",
            "Salt and pepper to taste"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Greek Yogurt Protein Bowl",
        calories: 400,
        prepTime: 5,
        ingredients: [
          "1 cup Greek yogurt",
          "1 scoop protein powder",
          "1/4 cup berries",
          "1 tbsp sliced almonds",
          "1 tsp honey",
          "Cinnamon to taste"
        ]
      },
      lunch: {
        name: "Chicken and Quinoa Bowl",
        calories: 470,
        prepTime: 15,
        ingredients: [
          "5 oz grilled chicken breast",
          "1/2 cup cooked quinoa",
          "1/4 avocado, sliced",
          "1/4 cup black beans",
          "1/4 cup corn",
          "1 tbsp lime juice",
          "Fresh cilantro",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Baked White Fish with Green Beans",
        calories: 430,
        prepTime: 25,
        ingredients: [
          "6 oz white fish (cod or tilapia)",
          "1 cup green beans",
          "1/2 cup cherry tomatoes, halved",
          "1 tbsp olive oil",
          "1 lemon (juice and zest)",
          "Fresh herbs (dill, parsley)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Chocolate Protein Shake",
          calories: 220,
          prepTime: 3,
          ingredients: [
            "1 scoop chocolate protein powder",
            "1 cup almond milk",
            "1/2 banana",
            "Ice cubes",
            "1 tsp cocoa powder (optional)"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Smoked Salmon and Avocado Toast",
        calories: 410,
        prepTime: 10,
        ingredients: [
          "2 oz smoked salmon",
          "1 slice whole grain bread",
          "1/4 avocado, mashed",
          "1 tbsp cream cheese (optional)",
          "1 tsp lemon juice",
          "Fresh dill",
          "Pepper to taste"
        ]
      },
      lunch: {
        name: "Shrimp and Vegetable Skewers",
        calories: 440,
        prepTime: 25,
        ingredients: [
          "5 oz shrimp",
          "1 cup mixed vegetables (bell peppers, zucchini, cherry tomatoes)",
          "1/2 cup cooked couscous",
          "1 tbsp olive oil",
          "1 tsp garlic powder",
          "1 tsp paprika",
          "Fresh herbs (basil, parsley)",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Herb-Roasted Pork Tenderloin",
        calories: 480,
        prepTime: 35,
        ingredients: [
          "5 oz pork tenderloin",
          "1 cup roasted brussels sprouts",
          "1/2 cup roasted sweet potatoes",
          "1 tbsp olive oil",
          "1 tsp dijon mustard",
          "Fresh herbs (rosemary, thyme)",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "String Cheese and Turkey",
          calories: 180,
          prepTime: 0,
          ingredients: [
            "1 string cheese",
            "2 slices deli turkey"
          ]
        }
      ]
    },
    {
      breakfast: {
        name: "Tofu Scramble",
        calories: 380,
        prepTime: 15,
        ingredients: [
          "8 oz firm tofu, crumbled",
          "1/4 cup diced bell peppers",
          "1/4 cup diced onions",
          "1/2 cup spinach",
          "1 tbsp nutritional yeast",
          "1 tsp turmeric",
          "1 tsp olive oil",
          "Salt and pepper to taste"
        ]
      },
      lunch: {
        name: "Lentil and Vegetable Salad",
        calories: 440,
        prepTime: 20,
        ingredients: [
          "1/2 cup cooked lentils",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "1/4 cup grated carrots",
          "2 tbsp pumpkin seeds",
          "1 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Salt and pepper to taste"
        ]
      },
      dinner: {
        name: "Grilled Steak with Roasted Vegetables",
        calories: 490,
        prepTime: 30,
        ingredients: [
          "5 oz lean steak",
          "2 cups roasted vegetables (cauliflower, carrots, onions)",
          "1 tbsp olive oil",
          "1 clove garlic, minced",
          "1 tsp rosemary",
          "Salt and pepper to taste"
        ]
      },
      snacks: [
        {
          name: "Protein Muffin",
          calories: 210,
          prepTime: 30,
          ingredients: [
            "1 protein muffin (homemade with protein powder, almond flour, eggs)"
          ]
        }
      ]
    }
  ];
}

// Map to store meal plan data by plan ID
export const MEAL_PLAN_DATA: Record<string, DayMeals[]> = {
  "clean-eating": generateCleanEatingPlan(),
  "low-calorie": generateLowCaloriePlan(),
  "high-protein": generateHighProteinPlan(),
};

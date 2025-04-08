
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import GroceryItem from "@/components/GroceryItem";
import { Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { GroceryItem as GroceryItemType } from "@/utils/groceryListUtils";

const GroceryPage = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItemType[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Vegetables");
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Categories
  const categories = ["Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Oils", "Spices", "Other"];

  // Load grocery items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("groceryList");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setGroceryItems(parsedItems);
      } catch (error) {
        console.error("Error parsing grocery items:", error);
      }
    } else {
      // Initialize with some items if no saved list exists
      setGroceryItems([
        { id: "g1", name: "Spinach", category: "Vegetables", checked: false },
        { id: "g2", name: "Chicken breast", category: "Meat", checked: false },
        { id: "g3", name: "Greek yogurt", category: "Dairy", checked: false },
        { id: "g4", name: "Quinoa", category: "Grains", checked: false },
        { id: "g5", name: "Avocados", category: "Fruits", checked: true },
        { id: "g6", name: "Eggs", category: "Dairy", checked: false },
        { id: "g7", name: "Sweet potatoes", category: "Vegetables", checked: false },
        { id: "g8", name: "Olive oil", category: "Oils", checked: true },
      ]);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryItems));
  }, [groceryItems]);

  const handleCheck = (id: string, checked: boolean) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
    toast.success("Item removed from grocery list");
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      const newItem = {
        id: `g${Date.now()}`,
        name: newItemName.trim(),
        category: newItemCategory,
        checked: false,
      };
      setGroceryItems([...groceryItems, newItem]);
      setNewItemName("");
      setShowAddForm(false);
      toast.success("Item added to grocery list");
    }
  };

  // Group grocery items by category
  const groupedItems = groceryItems.reduce<Record<string, GroceryItemType[]>>(
    (groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {}
  );

  // Sort categories by name
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Grocery List</h1>
        <p className="text-gray-500">Your shopping essentials</p>
      </header>

      {groceryItems.length > 0 ? (
        <div className="space-y-4">
          {sortedCategories.map(category => {
            const items = groupedItems[category];
            return (
              <div key={category} className="mb-4">
                <h2 className="font-medium text-base mb-1">{category}</h2>
                <div className="leanfuel-card p-0">
                  {items.map((item) => (
                    <GroceryItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      checked={item.checked}
                      onCheck={handleCheck}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="leanfuel-card flex flex-col items-center justify-center py-8">
          <ShoppingBag size={40} className="text-gray-300 mb-2" />
          <p className="text-gray-500">Your grocery list is empty</p>
        </div>
      )}

      {showAddForm ? (
        <form onSubmit={handleAddItem} className="leanfuel-card mb-4">
          <h3 className="font-bold mb-3">Add New Item</h3>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="leanfuel-input w-full mb-3"
            placeholder="Item name"
            autoFocus
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="leanfuel-input w-full mb-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 leanfuel-btn-primary"
              disabled={!newItemName.trim()}
            >
              Add Item
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-20 right-4 bg-leanfuel-primary text-white p-4 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </button>
      )}

      <BottomNavigation />
    </div>
  );
};

export default GroceryPage;

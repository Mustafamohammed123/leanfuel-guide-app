
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import GroceryItem from "@/components/GroceryItem";
import { Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

// Mock data
const initialGroceryItems = [
  { id: "g1", name: "Spinach", category: "Vegetables", checked: false },
  { id: "g2", name: "Chicken breast", category: "Meat", checked: false },
  { id: "g3", name: "Greek yogurt", category: "Dairy", checked: false },
  { id: "g4", name: "Quinoa", category: "Grains", checked: false },
  { id: "g5", name: "Avocados", category: "Fruits", checked: true },
  { id: "g6", name: "Eggs", category: "Dairy", checked: false },
  { id: "g7", name: "Sweet potatoes", category: "Vegetables", checked: false },
  { id: "g8", name: "Olive oil", category: "Oils", checked: true },
];

const categories = ["Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Oils", "Spices", "Other"];

const GroceryPage = () => {
  const [groceryItems, setGroceryItems] = useState(initialGroceryItems);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Vegetables");
  const [showAddForm, setShowAddForm] = useState(false);

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

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Grocery List</h1>
        <p className="text-gray-500">Your shopping essentials</p>
      </header>

      {groceryItems.length > 0 ? (
        <div className="leanfuel-card p-0 mb-4">
          {groceryItems.map((item) => (
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

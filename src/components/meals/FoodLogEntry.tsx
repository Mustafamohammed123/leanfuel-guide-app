
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Plus, Barcode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FoodItem } from "@/utils/foodLogUtils";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface FoodLogEntryProps {
  onAddFood: (food: FoodItem) => void;
}

const FoodLogEntry: React.FC<FoodLogEntryProps> = ({ onAddFood }) => {
  const { isPremium, setIsModalOpen } = useSubscription();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFood, setNewFood] = useState<FoodItem>({
    id: "",
    name: "",
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    servingSize: "100g",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood({
      ...newFood,
      [name]: name === "name" || name === "servingSize" ? value : Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFood.name) {
      toast.error("Please enter a food name");
      return;
    }

    // Generate a unique ID
    const foodWithId = {
      ...newFood,
      id: `food-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    onAddFood(foodWithId);
    setIsDialogOpen(false);
    
    // Reset form
    setNewFood({
      id: "",
      name: "",
      calories: 0, 
      carbs: 0,
      fat: 0,
      protein: 0,
      servingSize: "100g",
    });
    
    toast.success(`Added ${foodWithId.name} to your daily log`);
  };

  const handleBarcodeScanner = () => {
    if (!isPremium) {
      toast("Barcode scanner is a premium feature", {
        action: {
          label: "Upgrade",
          onClick: () => setIsModalOpen(true),
        },
      });
      return;
    }
    
    toast("Barcode scanner coming soon!");
    // Here you would integrate with a barcode scanning library
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full flex items-center gap-2">
            <Plus size={16} />
            Log Food
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Food to Log</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBarcodeScanner}
              className={!isPremium ? "text-gray-400" : ""}
            >
              <Barcode size={16} />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Food Name</Label>
              <Input
                id="name"
                name="name"
                value={newFood.name}
                onChange={handleChange}
                placeholder="e.g. Grilled Chicken"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={newFood.calories}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servingSize">Serving Size</Label>
                <Input
                  id="servingSize"
                  name="servingSize"
                  value={newFood.servingSize}
                  onChange={handleChange}
                  placeholder="e.g. 100g"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  value={newFood.carbs}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  value={newFood.protein}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  name="fat"
                  type="number"
                  value={newFood.fat}
                  onChange={handleChange}
                  min={0}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">Add to Log</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodLogEntry;

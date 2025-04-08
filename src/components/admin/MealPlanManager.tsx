
import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MEAL_PLANS } from "@/components/meals/mealPlanData";

const MealPlanManager = () => {
  const [plans, setPlans] = useState(MEAL_PLANS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEditPlan = () => {
    // In a real app, this would save to the database
    if (editingPlan) {
      if (editingPlan.id) {
        // Edit existing plan
        setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      } else {
        // Add new plan with generated ID
        const newPlan = { ...editingPlan, id: `plan-${Date.now()}` };
        setPlans([...plans, newPlan]);
      }
    }
    setIsDialogOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const openAddDialog = () => {
    setEditingPlan({
      title: "",
      description: "",
      calories: "",
      duration: "7-day rotation",
      category: "balanced",
      isPremium: false,
      tags: []
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (plan: any) => {
    setEditingPlan({ ...plan });
    setIsDialogOpen(true);
  };

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meal Plans</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meal plans..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.title}</TableCell>
                  <TableCell>{plan.category}</TableCell>
                  <TableCell>{plan.calories}</TableCell>
                  <TableCell>{plan.isPremium ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? 'Edit Meal Plan' : 'Add New Meal Plan'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingPlan?.title || ''}
                onChange={e => setEditingPlan({ ...editingPlan, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingPlan?.description || ''}
                onChange={e => setEditingPlan({ ...editingPlan, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  value={editingPlan?.calories || ''}
                  onChange={e => setEditingPlan({ ...editingPlan, calories: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editingPlan?.category || ''}
                  onChange={e => setEditingPlan({ ...editingPlan, category: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={editingPlan?.isPremium || false}
                onChange={e => setEditingPlan({ ...editingPlan, isPremium: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isPremium">Premium Plan</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddEditPlan}>Save Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlanManager;

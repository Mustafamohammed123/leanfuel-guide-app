
import React, { useState } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import OnboardingLayout from "./OnboardingLayout";

const commonAllergies = [
  "Dairy", "Eggs", "Nuts", "Peanuts", "Shellfish", 
  "Wheat", "Soy", "Fish", "Gluten"
];

const Step4Allergies = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [customAllergy, setCustomAllergy] = useState("");

  const handleNext = () => {
    setCurrentStep(5);
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  const toggleAllergy = (allergy: string) => {
    const currentAllergies = [...data.allergies];
    const index = currentAllergies.indexOf(allergy);
    
    if (index > -1) {
      currentAllergies.splice(index, 1);
    } else {
      currentAllergies.push(allergy);
    }
    
    updateData({ allergies: currentAllergies });
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !data.allergies.includes(customAllergy.trim())) {
      updateData({ allergies: [...data.allergies, customAllergy.trim()] });
      setCustomAllergy("");
    }
  };

  const removeAllergy = (allergy: string) => {
    updateData({ 
      allergies: data.allergies.filter(a => a !== allergy) 
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAllergy();
    }
  };

  return (
    <OnboardingLayout 
      onNext={handleNext} 
      onBack={handleBack}
      canProceed={true}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Allergies & Intolerances</h1>
        <p className="text-gray-600">
          Help us keep your meal plans safe by telling us what to avoid.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Common Allergies</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonAllergies.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`allergy-${allergy}`} 
                    checked={data.allergies.includes(allergy)}
                    onCheckedChange={() => toggleAllergy(allergy)}
                  />
                  <Label 
                    htmlFor={`allergy-${allergy}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {allergy}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="custom-allergy" className="text-base">Other Allergies or Intolerances</Label>
            <div className="flex space-x-2">
              <Input
                id="custom-allergy"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="E.g., Sesame"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addCustomAllergy}
                disabled={!customAllergy.trim()}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {data.allergies.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base">Your Allergies & Intolerances</Label>
              <div className="flex flex-wrap gap-2">
                {data.allergies.map((allergy) => (
                  <div 
                    key={allergy}
                    className="bg-leanfuel-gray rounded-full px-3 py-1 flex items-center space-x-1"
                  >
                    <span className="text-sm">{allergy}</span>
                    <button 
                      type="button"
                      onClick={() => removeAllergy(allergy)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.allergies.length === 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-700 text-sm">
                No allergies or intolerances selected. This is fine! Click Next to continue.
              </p>
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step4Allergies;


import React, { useState } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OnboardingLayout from "./OnboardingLayout";

const Step2WeightGoals = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!data.weight) {
      newErrors.weight = "Current weight is required";
    } else {
      const minWeight = data.weightUnit === "kg" ? 40 : 88;
      const maxWeight = data.weightUnit === "kg" ? 200 : 440;
      
      if (data.weight < minWeight || data.weight > maxWeight) {
        newErrors.weight = `Weight must be between ${minWeight} and ${maxWeight} ${data.weightUnit}`;
      }
    }
    
    if (!data.weightGoal) {
      newErrors.weightGoal = "Target weight is required";
    } else {
      const minWeight = data.weightUnit === "kg" ? 40 : 88;
      const maxWeight = data.weightUnit === "kg" ? 200 : 440;
      
      if (data.weightGoal < minWeight || data.weightGoal > maxWeight) {
        newErrors.weightGoal = `Weight must be between ${minWeight} and ${maxWeight} ${data.weightUnit}`;
      }
      
      if (data.weight && data.weightGoal >= data.weight) {
        newErrors.weightGoal = "Target weight must be lower than current weight";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleUnitChange = (unit: "kg" | "lbs") => {
    if (unit === data.weightUnit) return;
    
    const convertedWeight = data.weight 
      ? unit === "kg" 
        ? Math.round(data.weight * 0.453592) 
        : Math.round(data.weight * 2.20462)
      : null;
      
    const convertedGoal = data.weightGoal 
      ? unit === "kg" 
        ? Math.round(data.weightGoal * 0.453592) 
        : Math.round(data.weightGoal * 2.20462)
      : null;
    
    updateData({ 
      weightUnit: unit,
      weight: convertedWeight,
      weightGoal: convertedGoal
    });
  };

  return (
    <OnboardingLayout 
      onNext={handleNext} 
      onBack={handleBack}
      canProceed={!!data.weight && !!data.weightGoal && data.weightGoal < data.weight}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Your Weight Goals</h1>
        <p className="text-gray-600">
          Let's track where you are and where you want to be.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Weight Unit</Label>
            <RadioGroup
              value={data.weightUnit}
              onValueChange={(value) => handleUnitChange(value as "kg" | "lbs")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kg" id="kg" />
                <Label htmlFor="kg">Kilograms (kg)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lbs" id="lbs" />
                <Label htmlFor="lbs">Pounds (lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Current Weight ({data.weightUnit})</Label>
            <Input
              id="weight"
              type="number"
              placeholder={`Enter your current weight in ${data.weightUnit}`}
              value={data.weight || ""}
              onChange={(e) => updateData({ weight: e.target.value ? Number(e.target.value) : null })}
              min={data.weightUnit === "kg" ? 40 : 88}
              max={data.weightUnit === "kg" ? 200 : 440}
            />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weightGoal">Target Weight ({data.weightUnit})</Label>
            <Input
              id="weightGoal"
              type="number"
              placeholder={`Enter your target weight in ${data.weightUnit}`}
              value={data.weightGoal || ""}
              onChange={(e) => updateData({ weightGoal: e.target.value ? Number(e.target.value) : null })}
              min={data.weightUnit === "kg" ? 40 : 88}
              max={data.weightUnit === "kg" ? 200 : 440}
            />
            {errors.weightGoal && <p className="text-red-500 text-sm">{errors.weightGoal}</p>}
          </div>

          {data.weight && data.weightGoal && data.weightGoal < data.weight && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 font-medium">
                You want to lose {(data.weight - data.weightGoal).toFixed(1)} {data.weightUnit}
              </p>
              <p className="text-green-600 text-sm mt-1">
                That's a healthy and achievable goal!
              </p>
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step2WeightGoals;

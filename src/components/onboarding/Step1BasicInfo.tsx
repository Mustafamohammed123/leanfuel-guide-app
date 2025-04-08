
import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OnboardingLayout from "./OnboardingLayout";

const Step1BasicInfo = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!data.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!data.age) {
      newErrors.age = "Age is required";
    } else if (data.age < 18 || data.age > 100) {
      newErrors.age = "Age must be between 18 and 100";
    }
    
    if (!data.gender) {
      newErrors.gender = "Please select a gender";
    }
    
    if (!data.height) {
      newErrors.height = "Height is required";
    } else if (data.height < 120 || data.height > 220) {
      newErrors.height = "Height must be between 120 and 220 cm";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  return (
    <OnboardingLayout 
      onNext={handleNext} 
      canProceed={!!data.name && !!data.age && !!data.gender && !!data.height}
      hideBackButton={true}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Welcome to LeanFuel!</h1>
        <p className="text-gray-600">
          Let's get to know you better to create your personalized plan.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={data.age || ""}
              onChange={(e) => updateData({ age: e.target.value ? Number(e.target.value) : null })}
              min={18}
              max={100}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={data.gender || ""}
              onValueChange={(value) => updateData({ gender: value as any })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height in cm"
              value={data.height || ""}
              onChange={(e) => updateData({ height: e.target.value ? Number(e.target.value) : null })}
              min={120}
              max={220}
            />
            {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step1BasicInfo;

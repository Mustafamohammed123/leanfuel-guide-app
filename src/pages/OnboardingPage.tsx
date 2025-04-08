
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import Step1BasicInfo from "@/components/onboarding/Step1BasicInfo";
import Step2WeightGoals from "@/components/onboarding/Step2WeightGoals";
import Step3DietaryPreferences from "@/components/onboarding/Step3DietaryPreferences";
import Step4Allergies from "@/components/onboarding/Step4Allergies";
import Step5Results from "@/components/onboarding/Step5Results";

const OnboardingPage = () => {
  const { data, currentStep } = useOnboarding();
  const navigate = useNavigate();

  // If onboarding is already completed, redirect to home
  useEffect(() => {
    if (data.completed) {
      navigate("/");
    }
  }, [data.completed, navigate]);

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2WeightGoals />;
      case 3:
        return <Step3DietaryPreferences />;
      case 4:
        return <Step4Allergies />;
      case 5:
        return <Step5Results />;
      default:
        return <Step1BasicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {renderCurrentStep()}
    </div>
  );
};

export default OnboardingPage;

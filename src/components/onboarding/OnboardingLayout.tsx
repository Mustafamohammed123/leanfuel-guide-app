
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  canProceed: boolean;
  hideBackButton?: boolean;
  nextButtonText?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  onNext,
  onBack,
  canProceed,
  hideBackButton = false,
  nextButtonText = "Next",
}) => {
  const { currentStep, totalSteps } = useOnboarding();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6">
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-leanfuel-primary h-2 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <div className="flex-grow">{children}</div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-white flex justify-between">
        {!hideBackButton && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center"
            type="button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        {hideBackButton && <div />}
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center"
          type="button"
        >
          {nextButtonText}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLayout;

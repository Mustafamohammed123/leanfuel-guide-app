
import React from "react";
import { GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";

const PremiumContentBanner = () => {
  const { setIsModalOpen } = useSubscription();

  return (
    <div className="bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
          <GraduationCap size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">Upgrade to Premium</h3>
          <p className="text-white text-opacity-90 text-sm mb-3">
            Get full access to our video content, AI-personalized articles, and detailed guides.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-leanfuel-accent hover:bg-gray-100 font-medium text-sm"
            size="sm"
          >
            <Star className="w-4 h-4 mr-1" />
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumContentBanner;

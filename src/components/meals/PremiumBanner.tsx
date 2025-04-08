
import React from "react";
import { Star } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";

const PremiumBanner: React.FC = () => {
  const { setIsModalOpen } = useSubscription();

  return (
    <div className="bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary rounded-lg shadow-md p-4 mt-6">
      <div className="flex items-start">
        <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
          <Star size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">Unlock Premium Meal Plans</h3>
          <p className="text-white text-opacity-90 text-sm mb-3">
            Get specialized meal plans, detailed nutrition guides, and personalized recipes.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-leanfuel-accent font-medium text-sm py-1.5 px-3 rounded-lg"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;

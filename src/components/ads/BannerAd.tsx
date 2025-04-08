
import React from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface BannerAdProps {
  className?: string;
}

const BannerAd: React.FC<BannerAdProps> = ({ className = "" }) => {
  const { isPremium, setIsModalOpen } = useSubscription();
  
  // Don't show ads for premium users
  if (isPremium) return null;
  
  return (
    <div className={`bg-gray-100 p-2 text-center ${className}`}>
      <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 py-3 px-4 rounded">
        <div className="text-xs text-gray-500 mb-1">ADVERTISEMENT</div>
        <div className="text-sm flex items-center justify-center">
          <span className="mr-2">Enjoy an ad-free experience</span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs bg-leanfuel-primary text-white px-2 py-1 rounded"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;

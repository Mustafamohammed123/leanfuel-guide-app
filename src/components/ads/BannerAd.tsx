
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
    <div className={`p-2 text-center ${className}`}>
      <div className="flex flex-col items-center justify-center border border-dashed border-leanfuel-light py-3 px-4 rounded-lg bg-white shadow-sm">
        <div className="text-xs text-gray-500 mb-1">ADVERTISEMENT</div>
        <div className="text-sm flex items-center justify-center">
          <span className="mr-2">Enjoy an ad-free experience</span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs bg-leanfuel-accent text-white px-3 py-1 rounded-full hover:bg-leanfuel-accent/90 transition-colors"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;


import { Star } from "lucide-react";

interface SubscriptionBannerProps {
  onUpgrade: () => void;
}

const SubscriptionBanner = ({ onUpgrade }: SubscriptionBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
          <Star size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">Upgrade to Premium</h3>
          <p className="text-white text-opacity-90 text-sm mb-3">
            Get custom meal plans, detailed nutritional analysis, and more.
          </p>
          <button
            onClick={onUpgrade}
            className="bg-white text-leanfuel-accent font-medium text-sm py-1.5 px-3 rounded-lg"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;

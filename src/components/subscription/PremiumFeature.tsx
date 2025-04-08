
import { ReactNode } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumFeatureProps {
  children: ReactNode;
  fallback?: ReactNode;
  message?: string;
}

const PremiumFeature = ({ 
  children, 
  fallback, 
  message = "This is a premium feature" 
}: PremiumFeatureProps) => {
  const { isPremium, setIsModalOpen } = useSubscription();
  
  if (isPremium) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <div className="relative overflow-hidden rounded-lg border">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
        <div className="text-center p-6 flex flex-col items-center">
          <div className="bg-white rounded-full p-3 inline-block mb-3 shadow-lg">
            <Lock className="h-6 w-6 text-leanfuel-accent" />
          </div>
          <h3 className="text-white text-lg font-bold mb-2">{message}</h3>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-leanfuel-accent hover:bg-leanfuel-light"
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default PremiumFeature;

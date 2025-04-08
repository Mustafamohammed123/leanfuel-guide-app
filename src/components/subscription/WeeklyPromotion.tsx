
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";

const WeeklyPromotion = () => {
  const { showPromotion, dismissPromotion, setIsModalOpen } = useSubscription();
  
  const handleUpgradeClick = () => {
    dismissPromotion();
    setIsModalOpen(true);
  };
  
  return (
    <Dialog open={showPromotion} onOpenChange={dismissPromotion}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Ready to Take Your Progress to the Next Level?
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary p-6 mt-2 rounded-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Upgrade to Premium</h3>
              <p className="text-sm text-white text-opacity-90">Starting at $4.99/month</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Personalized meal plans based on your goals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>AI nutrition coach for 24/7 guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Weekly insights & detailed reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Barcode scanner for easy meal logging</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 bg-white text-leanfuel-primary hover:bg-gray-100"
              onClick={handleUpgradeClick}
            >
              See Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30"
              onClick={dismissPromotion}
            >
              Not Now
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            Your progress so far: <span className="font-bold">7 meals logged, 3.4 kg lost</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Premium users achieve their goals 2x faster on average
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeeklyPromotion;

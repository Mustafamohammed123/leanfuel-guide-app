
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ isOpen, onClose }) => {
  const { isPremium, setIsModalOpen } = useSubscription();
  
  // Auto-close after 5 seconds
  useEffect(() => {
    if (isOpen && !isPremium) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, isPremium]);
  
  // Don't show for premium users
  if (isPremium) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500">ADVERTISEMENT</span>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X size={16} />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-dashed border-gray-300 p-4 rounded-md">
          <div className="text-gray-600 mb-4 text-center">
            Want to remove ads and unlock premium features?
          </div>
          <Button onClick={() => {
            onClose();
            setIsModalOpen(true);
          }}>
            Upgrade to Premium
          </Button>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          This ad will close automatically in a few seconds
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterstitialAd;

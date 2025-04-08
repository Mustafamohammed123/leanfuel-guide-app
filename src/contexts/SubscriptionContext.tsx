
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  interval: "month" | "quarter" | "year";
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    description: "Billed monthly",
    interval: "month",
    features: [
      "Personalized meal plans",
      "AI nutrition coach",
      "Barcode scanner",
      "Weekly insights & reports",
      "Ad-free experience"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$11.99",
    description: "Billed every 3 months ($3.99/mo)",
    interval: "quarter",
    features: [
      "Everything in Monthly",
      "20% savings vs monthly"
    ]
  },
  {
    id: "yearly",
    name: "Annual",
    price: "$29.99",
    description: "Billed annually ($2.49/mo)",
    interval: "year",
    features: [
      "Everything in Monthly",
      "50% savings vs monthly",
      "Priority support"
    ]
  }
];

interface SubscriptionContextType {
  isPremium: boolean;
  isModalOpen: boolean;
  lastPromptDate: string | null;
  setIsModalOpen: (isOpen: boolean) => void;
  handleUpgrade: (plan?: string) => void;
  plans: SubscriptionPlan[];
  showPromotion: boolean;
  dismissPromotion: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastPromptDate, setLastPromptDate] = useState<string | null>(null);
  const [showPromotion, setShowPromotion] = useState(false);
  
  useEffect(() => {
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
    setIsPremium(premiumStatus);
    
    // Check last prompt date
    const lastPrompt = localStorage.getItem('lastSubscriptionPrompt');
    setLastPromptDate(lastPrompt);
    
    // Show promotion if user has been active for 3+ days and not prompted in the last 7 days
    const firstVisitDate = localStorage.getItem('firstVisitDate');
    
    if (!firstVisitDate) {
      localStorage.setItem('firstVisitDate', new Date().toISOString());
    } else {
      const daysSinceFirstVisit = Math.floor(
        (new Date().getTime() - new Date(firstVisitDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const daysSinceLastPrompt = lastPrompt 
        ? Math.floor((new Date().getTime() - new Date(lastPrompt).getTime()) / (1000 * 60 * 60 * 24))
        : 100; // Large number if never prompted
      
      if (daysSinceFirstVisit >= 3 && daysSinceLastPrompt >= 7 && !premiumStatus) {
        setShowPromotion(true);
      }
    }
  }, []);
  
  const handleUpgrade = (plan?: string) => {
    // Mock implementation - in a real app, this would initiate payment
    localStorage.setItem('isPremiumUser', 'true');
    setIsPremium(true);
    setIsModalOpen(false);
    
    // Record that we showed a prompt
    const now = new Date().toISOString();
    localStorage.setItem('lastSubscriptionPrompt', now);
    setLastPromptDate(now);
    
    const planName = plan || "premium";
    toast.success(`You're now subscribed to the ${planName} plan!`);
    
    // In a real app, we'd reload only affected components
    // For demo, we'll reload the page
    window.location.reload();
  };
  
  const dismissPromotion = () => {
    setShowPromotion(false);
    
    // Record that we showed a prompt
    const now = new Date().toISOString();
    localStorage.setItem('lastSubscriptionPrompt', now);
    setLastPromptDate(now);
  };
  
  return (
    <SubscriptionContext.Provider 
      value={{ 
        isPremium, 
        isModalOpen, 
        setIsModalOpen, 
        handleUpgrade, 
        lastPromptDate,
        plans: SUBSCRIPTION_PLANS,
        showPromotion,
        dismissPromotion
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

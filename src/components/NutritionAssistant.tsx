
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSubscription } from "@/contexts/SubscriptionContext";
import ChatMessages from "@/components/nutrition/ChatMessages";
import ChatInput from "@/components/nutrition/ChatInput";
import PremiumChatPrompt from "@/components/nutrition/PremiumChatPrompt";
import { Message } from "@/types/chat";

interface NutritionAssistantProps {
  isPremium?: boolean;
}

const NutritionAssistant: React.FC<NutritionAssistantProps> = ({ isPremium: propIsPremium }) => {
  const { isPremium: contextIsPremium, setIsModalOpen } = useSubscription();
  const isPremium = propIsPremium !== undefined ? propIsPremium : contextIsPremium;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add initial greeting message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && isPremium) {
      setMessages([
        {
          id: "greeting",
          content: "Hi there! I'm your AI nutrition coach. How can I help with your nutrition or weight loss journey today?",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, isPremium]);

  const handleSendMessage = (content: string) => {
    if (content.trim() === "") return;
    
    if (!isPremium) {
      setIsModalOpen(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSubmitting(true);

    // Send to chat service and get response
    getChatResponse(content).then(responseContent => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsSubmitting(false);
    });
  };

  return (
    <>
      {!isOpen && (
        <AssistantButton 
          isPremium={isPremium} 
          onClick={() => setIsOpen(true)} 
          onUpgrade={() => setIsModalOpen(true)}
        />
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md p-0 h-[90vh] sm:h-[90vh] sm:rounded-lg sm:bottom-4 sm:top-auto sm:right-4 sm:left-auto fixed">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-leanfuel-primary text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-bold">AI Nutrition Coach</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
                <X size={18} />
              </Button>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              {!isPremium ? (
                <PremiumChatPrompt onUpgrade={() => setIsModalOpen(true)} />
              ) : (
                <ChatMessages 
                  messages={messages} 
                  isSubmitting={isSubmitting} 
                />
              )}
            </div>

            {/* Input area */}
            <ChatInput 
              isPremium={isPremium}
              isSubmitting={isSubmitting}
              onSendMessage={handleSendMessage}
              onUpgrade={() => setIsModalOpen(true)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

// Local component for the assistant floating button
const AssistantButton: React.FC<{ 
  isPremium: boolean; 
  onClick: () => void;
  onUpgrade: () => void;
}> = ({ isPremium, onClick, onUpgrade }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg bg-leanfuel-primary hover:bg-leanfuel-accent"
          size="icon"
        >
          <Bot size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="end">
        <div className="p-4">
          <h3 className="font-bold mb-2">AI Nutrition Coach</h3>
          <p className="text-sm mb-3">
            {isPremium
              ? "Ask me anything about nutrition, meal planning, or weight loss!"
              : "Upgrade to Pro for real-time meal feedback & fat-loss tips from your AI coach."}
          </p>
          {isPremium ? (
            <Button 
              className="w-full" 
              onClick={onClick}
            >
              Start chatting
            </Button>
          ) : (
            <Button className="w-full" onClick={onUpgrade}>
              Upgrade to Pro
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Simulated chat response function
const getChatResponse = async (query: string): Promise<string> => {
  // Sample responses for demo purposes
  const sampleResponses: Record<string, string> = {
    "what's a healthy snack under 150 calories?": "Great question! Here are some healthy snack options under 150 calories:\n\n• 1 medium apple (95 calories)\n• 1 cup of baby carrots with 2 tbsp hummus (130 calories)\n• 1 hard-boiled egg with a small piece of fruit (135 calories)\n• 1/4 cup of unsalted nuts (140 calories)\n• Greek yogurt with berries (120 calories)",
    "how do i break a plateau?": "Breaking a weight loss plateau requires a few strategic adjustments:\n\n1. Recalculate your calorie needs - your metabolism adapts as you lose weight\n2. Increase protein intake to preserve muscle mass\n3. Mix up your exercise routine to challenge your body differently\n4. Ensure adequate sleep and stress management\n5. Track your food intake more accurately - hidden calories may be sneaking in\n\nConsistency is key! Small adjustments can restart your progress.",
    "what are good sources of protein?": "Excellent sources of protein include:\n\n• Lean meats: chicken breast, turkey, lean beef\n• Fish: salmon, tuna, tilapia\n• Plant-based: tofu, tempeh, lentils, chickpeas\n• Dairy: Greek yogurt, cottage cheese\n• Eggs and egg whites\n• Protein powders: whey, casein, pea protein\n\nAim for 0.7-1g of protein per pound of body weight for optimal muscle maintenance during weight loss.",
  };

  const defaultResponse = "I can help with nutrition advice, meal ideas, and weight management strategies. What specific question do you have about your nutrition goals?";

  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase().trim();
      let responseContent = defaultResponse;
      
      // Check for matching responses in our sample data
      Object.entries(sampleResponses).forEach(([key, value]) => {
        if (lowercaseQuery.includes(key.toLowerCase()) || 
            key.toLowerCase().includes(lowercaseQuery)) {
          responseContent = value;
        }
      });

      resolve(responseContent);
    }, 1000);
  });
};

export default NutritionAssistant;

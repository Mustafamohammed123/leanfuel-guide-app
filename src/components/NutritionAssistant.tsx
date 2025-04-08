
import React, { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bot, Send, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const NutritionAssistant: React.FC = () => {
  const { isPremium, setIsModalOpen } = useSubscription();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const sampleResponses = {
    "what's a healthy snack under 150 calories?": "Great question! Here are some healthy snack options under 150 calories:\n\n• 1 medium apple (95 calories)\n• 1 cup of baby carrots with 2 tbsp hummus (130 calories)\n• 1 hard-boiled egg with a small piece of fruit (135 calories)\n• 1/4 cup of unsalted nuts (140 calories)\n• Greek yogurt with berries (120 calories)",
    "how do i break a plateau?": "Breaking a weight loss plateau requires a few strategic adjustments:\n\n1. Recalculate your calorie needs - your metabolism adapts as you lose weight\n2. Increase protein intake to preserve muscle mass\n3. Mix up your exercise routine to challenge your body differently\n4. Ensure adequate sleep and stress management\n5. Track your food intake more accurately - hidden calories may be sneaking in\n\nConsistency is key! Small adjustments can restart your progress.",
    "what are good sources of protein?": "Excellent sources of protein include:\n\n• Lean meats: chicken breast, turkey, lean beef\n• Fish: salmon, tuna, tilapia\n• Plant-based: tofu, tempeh, lentils, chickpeas\n• Dairy: Greek yogurt, cottage cheese\n• Eggs and egg whites\n• Protein powders: whey, casein, pea protein\n\nAim for 0.7-1g of protein per pound of body weight for optimal muscle maintenance during weight loss.",
  };

  const defaultResponse = "I can help with nutrition advice, meal ideas, and weight management strategies. What specific question do you have about your nutrition goals?";

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const handleSend = () => {
    if (input.trim() === "") return;
    
    if (!isPremium) {
      setIsModalOpen(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSubmitting(true);

    // Simulate AI response
    setTimeout(() => {
      const query = input.toLowerCase().trim();
      let responseContent = defaultResponse;
      
      // Check for matching responses in our sample data
      Object.entries(sampleResponses).forEach(([key, value]) => {
        if (query.includes(key.toLowerCase()) || 
            key.toLowerCase().includes(query)) {
          responseContent = value;
        }
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
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
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Start chatting
                </Button>
              ) : (
                <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
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
                <Alert className="mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This feature is only available for premium users.
                    <Button variant="link" className="p-0 h-auto ml-2" onClick={() => setIsModalOpen(true)}>
                      Upgrade to Pro
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 ${
                        message.sender === "user" ? "flex justify-end" : "flex justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-leanfuel-primary text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="whitespace-pre-line text-sm">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isSubmitting && (
                    <div className="flex justify-start mb-3">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input area */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <textarea
                  className="flex-1 border rounded-md p-2 resize-none h-12 max-h-32"
                  placeholder={isPremium ? "Ask a nutrition question..." : "Upgrade to Pro to chat with AI..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!isPremium || isSubmitting}
                />
                <Button 
                  size="icon" 
                  disabled={!isPremium || isSubmitting || input.trim() === ""}
                  onClick={handleSend}
                >
                  <Send size={18} />
                </Button>
              </div>
              {!isPremium && (
                <Button variant="outline" className="w-full mt-2" onClick={() => setIsModalOpen(true)}>
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NutritionAssistant;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  isPremium: boolean;
  isSubmitting: boolean;
  onSendMessage: (message: string) => void;
  onUpgrade: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  isPremium, 
  isSubmitting, 
  onSendMessage,
  onUpgrade
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage(input);
    setInput("");
  };

  return (
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
        <Button variant="outline" className="w-full mt-2" onClick={onUpgrade}>
          Upgrade to Pro
        </Button>
      )}
    </div>
  );
};

export default ChatInput;

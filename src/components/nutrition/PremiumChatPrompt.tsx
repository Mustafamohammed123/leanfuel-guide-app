
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PremiumChatPromptProps {
  onUpgrade: () => void;
}

const PremiumChatPrompt: React.FC<PremiumChatPromptProps> = ({ onUpgrade }) => {
  return (
    <Alert className="mb-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        This feature is only available for premium users.
        <Button variant="link" className="p-0 h-auto ml-2" onClick={onUpgrade}>
          Upgrade to Pro
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default PremiumChatPrompt;

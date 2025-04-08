
import React, { useRef, useEffect } from "react";
import { Message } from "@/types/chat";

interface ChatMessagesProps {
  messages: Message[];
  isSubmitting: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isSubmitting }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSubmitting]);

  return (
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
      
      {isSubmitting && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
        <div className="flex space-x-1">
          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;

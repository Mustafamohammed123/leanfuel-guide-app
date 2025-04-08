
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DayTabsProps {
  activeDay: string;
  onDayChange: (day: string) => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ activeDay, onDayChange }) => {
  const formatDayLabel = (index: number) => {
    return `Day ${index + 1}`;
  };

  return (
    <Tabs 
      value={activeDay} 
      onValueChange={onDayChange}
      className="mb-4"
    >
      <TabsList className="grid grid-cols-7 w-full overflow-x-auto rounded-lg">
        {Array.from({ length: 7 }).map((_, index) => (
          <TabsTrigger 
            key={`day${index + 1}`} 
            value={`day${index + 1}`}
            className="text-xs py-2"
          >
            {formatDayLabel(index)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default DayTabs;

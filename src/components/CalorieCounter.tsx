
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CalorieCounterProps {
  dailyGoal: number;
  consumed: number;
}

const CalorieCounter = ({ dailyGoal, consumed }: CalorieCounterProps) => {
  const remaining = Math.max(0, dailyGoal - consumed);
  const percentage = Math.min(100, Math.round((consumed / dailyGoal) * 100));

  const data = [
    { name: "Consumed", value: consumed },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#4CAF50", "#F5F5F5"];

  return (
    <div className="leanfuel-card p-5">
      <h3 className="text-lg font-bold text-center mb-2">Daily Calories</h3>
      <div className="flex justify-center items-center">
        <div className="w-28 h-28 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{percentage}%</p>
            <p className="text-xs text-gray-500">of goal</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div className="text-center">
          <p className="font-medium">{dailyGoal}</p>
          <p className="text-gray-500">Goal</p>
        </div>
        <div className="text-center">
          <p className="font-medium">{consumed}</p>
          <p className="text-gray-500">Eaten</p>
        </div>
        <div className="text-center">
          <p className="font-medium">{remaining}</p>
          <p className="text-gray-500">Left</p>
        </div>
      </div>
    </div>
  );
};

export default CalorieCounter;

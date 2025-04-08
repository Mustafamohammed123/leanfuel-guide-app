
import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface CalorieHistoryProps {
  isPremium: boolean;
}

const CalorieHistory = ({ isPremium }: CalorieHistoryProps) => {
  const [calorieData, setCalorieData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate some sample data
    const data = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return {
        date: format(date, 'MM/dd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        calories: Math.floor(Math.random() * 600) + 1400,
        burned: Math.floor(Math.random() * 400) + 200,
      };
    }).reverse();
    
    setCalorieData(data);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Calorie History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={calorieData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                        <p className="text-sm font-semibold">{payload[0].payload.date}</p>
                        <p className="text-xs text-green-600">
                          Consumed: {payload[0].value} cal
                        </p>
                        {isPremium && (
                          <p className="text-xs text-orange-500">
                            Burned: {payload[0].payload.burned} cal
                          </p>
                        )}
                        {isPremium && (
                          <p className="text-xs font-medium border-t border-gray-100 pt-1 mt-1">
                            Net: {payload[0].value - payload[0].payload.burned} cal
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="calories" 
                fill="#4CAF50" 
                radius={[4, 4, 0, 0]}
                name="Calories Consumed" 
              />
              {isPremium && (
                <Bar 
                  dataKey="burned" 
                  fill="#FF9800" 
                  radius={[4, 4, 0, 0]} 
                  name="Calories Burned" 
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {!isPremium && (
          <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-2">
            <p>Upgrade to Premium to see calorie burn data and net calorie balance</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalorieHistory;

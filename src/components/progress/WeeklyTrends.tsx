
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from "lucide-react";

interface WeeklyTrendsProps {
  weightData: Array<{ date: string; weight: number }>;
}

const WeeklyTrends = ({ weightData }: WeeklyTrendsProps) => {
  // Calculate weekly averages from daily weight data
  const calculateWeeklyAverages = () => {
    const weeks: Record<string, { total: number; count: number; dates: string[] }> = {};
    
    weightData.forEach(entry => {
      const date = new Date(entry.date);
      // Get the week number (approximate)
      const weekKey = `${date.getFullYear()}-${Math.floor(date.getDate() / 7)}`;
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = { total: 0, count: 0, dates: [] };
      }
      
      weeks[weekKey].total += entry.weight;
      weeks[weekKey].count += 1;
      weeks[weekKey].dates.push(entry.date);
    });
    
    // Convert to array and sort by date
    return Object.entries(weeks).map(([week, data]) => {
      // Use the earliest date in the week for the label
      const earliestDate = data.dates.sort()[0];
      return {
        week: new Date(earliestDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        average: +(data.total / data.count).toFixed(1)
      };
    }).sort((a, b) => a.week.localeCompare(b.week));
  };
  
  const weeklyData = calculateWeeklyAverages();
  
  // Calculate weight change trend
  const calculateTrend = () => {
    if (weeklyData.length < 2) return { trend: 0, isPositive: false };
    
    const firstWeek = weeklyData[0].average;
    const lastWeek = weeklyData[weeklyData.length - 1].average;
    const change = +(lastWeek - firstWeek).toFixed(1);
    
    // For weight loss, negative change is positive progress
    return { 
      trend: Math.abs(change), 
      isPositive: change < 0 
    };
  };
  
  const trend = calculateTrend();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Weekly Weight Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="week" />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip 
                formatter={(value) => [`${value} kg`, 'Weekly Average']}
                labelFormatter={(label) => `Week of ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#4CAF50" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {trend.trend > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center">
              {trend.isPositive ? (
                <TrendingDown className="w-5 h-5 mr-2 text-green-500" />
              ) : (
                <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
              )}
              <div>
                <p className="font-medium">
                  {trend.isPositive 
                    ? `You've lost ${trend.trend} kg over this period` 
                    : `You've gained ${trend.trend} kg over this period`}
                </p>
                <p className="text-sm text-gray-500">
                  {trend.isPositive 
                    ? "Great progress! Keep up the good work." 
                    : "Don't worry, weight fluctuations are normal. Focus on consistency."}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTrends;

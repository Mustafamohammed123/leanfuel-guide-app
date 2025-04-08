
import React, { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getWeeklyNutritionTotals } from "@/utils/foodLogUtils";

interface WeeklyMacroReportProps {
  isPremium: boolean;
}

const WeeklyMacroReport: React.FC<WeeklyMacroReportProps> = ({ isPremium }) => {
  const [reportData, setReportData] = useState<any>(null);
  
  useEffect(() => {
    if (isPremium) {
      generateReport();
    }
  }, [isPremium]);
  
  const generateReport = () => {
    if (!isPremium) {
      toast("Weekly macro reports are a premium feature", {
        action: {
          label: "Upgrade",
          onClick: () => toast("Upgrade feature coming soon!")
        }
      });
      return;
    }
    
    // Get data for the last 7 days
    const endDate = format(new Date(), 'yyyy-MM-dd');
    const startDate = format(subDays(new Date(), 6), 'yyyy-MM-dd');
    
    const weeklyData = getWeeklyNutritionTotals(startDate, endDate);
    
    // Format the data for the chart
    const chartData = [];
    
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const dailyLog = getWeeklyNutritionTotals(date, date);
      
      chartData.unshift({
        name: format(subDays(new Date(), i), 'EEE'),
        carbs: dailyLog.carbs,
        protein: dailyLog.protein,
        fat: dailyLog.fat,
      });
    }
    
    setReportData({
      summary: weeklyData,
      chartData
    });
  };

  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="text-center p-4">
            <h3 className="text-white text-lg font-bold mb-2">Premium Feature</h3>
            <p className="text-white text-sm mb-4">Unlock weekly macro reports with a premium subscription</p>
            <Button 
              onClick={() => toast("Upgrade feature coming soon!")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle>Weekly Macro Report</CardTitle>
          <CardDescription>Track your nutrition trends over time</CardDescription>
        </CardHeader>
        
        <CardContent className="h-[300px] flex items-center justify-center text-gray-400">
          <p>Report preview not available</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!reportData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Macro Report</CardTitle>
          <CardDescription>Track your nutrition trends over time</CardDescription>
        </CardHeader>
        
        <CardContent className="h-[300px] flex items-center justify-center">
          <Button onClick={generateReport}>Generate Report</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Macro Report</CardTitle>
        <CardDescription>
          {format(subDays(new Date(), 6), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Avg. Daily Calories</p>
            <p className="text-xl font-bold">
              {Math.round(reportData.summary.calories / (reportData.summary.daysLogged || 1))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Avg. Protein</p>
            <p className="text-xl font-bold text-blue-600">
              {Math.round(reportData.summary.protein / (reportData.summary.daysLogged || 1))}g
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Total Net Calories</p>
            <p className="text-xl font-bold">
              {reportData.summary.netCalories}
            </p>
          </div>
        </div>
        
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reportData.chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbs" name="Carbs" fill="#4ade80" />
              <Bar dataKey="protein" name="Protein" fill="#60a5fa" />
              <Bar dataKey="fat" name="Fat" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyMacroReport;

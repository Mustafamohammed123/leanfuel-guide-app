
import React, { useState } from "react";
import { BarChart, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

// Mock data for ad performance
const adRevenue = [
  { date: "Apr 01", revenue: 85 },
  { date: "Apr 02", revenue: 92 },
  { date: "Apr 03", revenue: 102 },
  { date: "Apr 04", revenue: 99 },
  { date: "Apr 05", revenue: 108 },
  { date: "Apr 06", revenue: 120 },
  { date: "Apr 07", revenue: 135 },
];

const adImpressions = [
  { date: "Apr 01", impressions: 25000 },
  { date: "Apr 02", impressions: 27500 },
  { date: "Apr 03", impressions: 28200 },
  { date: "Apr 04", impressions: 26800 },
  { date: "Apr 05", impressions: 29100 },
  { date: "Apr 06", impressions: 32500 },
  { date: "Apr 07", impressions: 35100 },
];

const adPlacements = [
  { placement: "Meal Plans Banner", impressions: 12500, clicks: 625, ctr: "5.0%", revenue: "$437.50" },
  { placement: "Home Page Banner", impressions: 18200, clicks: 728, ctr: "4.0%", revenue: "$509.60" },
  { placement: "Grocery List Interstitial", impressions: 5800, clicks: 348, ctr: "6.0%", revenue: "$243.60" },
  { placement: "Learning Hub Banner", impressions: 8600, clicks: 258, ctr: "3.0%", revenue: "$180.60" },
  { placement: "Meal Tracking Interstitial", impressions: 4700, clicks: 282, ctr: "6.0%", revenue: "$197.40" },
];

const AdPerformance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ad Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Ad Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,238</div>
            <p className="text-xs text-green-500 mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">204,200</div>
            <p className="text-xs text-green-500 mt-1">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Average CTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-green-500 mt-1">+0.3% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="placements">Ad Placements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Daily Ad Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adImpressions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Daily Ad Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="placements">
          <Card>
            <CardHeader>
              <CardTitle>Ad Placement Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Placement</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adPlacements.map((placement, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{placement.placement}</TableCell>
                      <TableCell>{placement.impressions.toLocaleString()}</TableCell>
                      <TableCell>{placement.clicks.toLocaleString()}</TableCell>
                      <TableCell>{placement.ctr}</TableCell>
                      <TableCell>{placement.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdPerformance;

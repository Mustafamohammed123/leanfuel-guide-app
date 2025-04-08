
import React, { useState } from "react";
import { Shield, ArrowLeft, BarChart, FileText, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MealPlanManager from "@/components/admin/MealPlanManager";
import ArticleManager from "@/components/admin/ArticleManager";
import UserEngagement from "@/components/admin/UserEngagement";
import SubscriptionManager from "@/components/admin/SubscriptionManager";
import AdPerformance from "@/components/admin/AdPerformance";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("meal-plans");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Shield className="text-leanfuel-accent h-5 w-5" />
          <h1 className="text-xl font-bold">LeanFuel Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to App
            </Button>
          </Link>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,451</div>
            <p className="text-xs text-green-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Premium Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">583</div>
            <p className="text-xs text-green-500 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Ad Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,238</div>
            <p className="text-xs text-green-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Active Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-blue-500 mt-1">Add new plans</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="meal-plans" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Meal Plans</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">User Engagement</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span className="hidden md:inline">Ad Performance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meal-plans" className="mt-0">
            <MealPlanManager />
          </TabsContent>
          
          <TabsContent value="articles" className="mt-0">
            <ArticleManager />
          </TabsContent>
          
          <TabsContent value="engagement" className="mt-0">
            <UserEngagement />
          </TabsContent>
          
          <TabsContent value="subscriptions" className="mt-0">
            <SubscriptionManager />
          </TabsContent>
          
          <TabsContent value="ads" className="mt-0">
            <AdPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import SubscriptionModal from "@/components/subscription/SubscriptionModal";
import WeeklyPromotion from "@/components/subscription/WeeklyPromotion";
import Index from "./pages/Index";
import MealsPage from "./pages/MealsPage";
import MealPlanPage from "./pages/MealPlanPage";
import MealTrackingPage from "./pages/MealTrackingPage";
import GroceryPage from "./pages/GroceryPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import OnboardingPage from "./pages/OnboardingPage";
import LearningHubPage from "./pages/LearningHubPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";

// Create a query client instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SubscriptionModal />
            <WeeklyPromotion />
            <BrowserRouter>
              <Routes>
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/" element={<Index />} />
                <Route path="/meals" element={<MealsPage />} />
                <Route path="/meal-plans" element={<MealPlanPage />} />
                <Route path="/meal-tracking" element={<MealTrackingPage />} />
                <Route path="/grocery" element={<GroceryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/learning" element={<LearningHubPage />} />
                <Route path="/learning/:articleId" element={<ArticleDetailPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </OnboardingProvider>
    </QueryClientProvider>
  );
};

export default App;

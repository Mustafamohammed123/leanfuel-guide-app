
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import Index from "./pages/Index";
import MealsPage from "./pages/MealsPage";
import MealPlanPage from "./pages/MealPlanPage";
import MealTrackingPage from "./pages/MealTrackingPage";
import GroceryPage from "./pages/GroceryPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import OnboardingPage from "./pages/OnboardingPage";
import NotFound from "./pages/NotFound";

// Create a query client instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </OnboardingProvider>
    </QueryClientProvider>
  );
};

export default App;


import React, { useState } from "react";
import { 
  User, Moon, Sun, Target, Languages, CreditCard, 
  ChevronRight, LogOut, Check 
} from "lucide-react";
import { toast } from "sonner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import BottomNavigation from "@/components/BottomNavigation";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SettingsPage = () => {
  const { isPremium, setIsModalOpen } = useSubscription();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  
  // Profile form setup
  const form = useForm({
    defaultValues: {
      name: "Jane Doe",
      email: "jane@example.com",
      height: "165",
      weight: "78.6",
      goalWeight: "75",
    },
  });

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`${newTheme === "light" ? "Light" : "Dark"} theme activated`);
    // In a real app, we would add a class to the body or use a theme context
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${value === "en" ? "English" : "Español"}`);
    // In a real app, we would update language context/store
  };

  // Save profile changes
  const onSubmit = (data: any) => {
    toast.success("Profile updated successfully");
    console.log(data);
  };

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </header>

      <Tabs defaultValue="account" className="mb-20">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <div className="leanfuel-card p-4 mb-4">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-leanfuel-secondary flex items-center justify-center text-leanfuel-primary font-bold text-xl">
                JD
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-lg">Jane Doe</h2>
                <p className="text-gray-500 text-sm">jane@example.com</p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Weight (kg)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.1" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full">Save Profile</Button>
              </form>
            </Form>
          </div>

          <div className="leanfuel-card p-0">
            {!isPremium && (
              <button 
                className="w-full flex items-center justify-between p-4 border-b"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex items-center">
                  <CreditCard size={20} className="text-leanfuel-accent mr-3" />
                  <span>Upgrade to Premium</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            )}
            
            <button 
              className="w-full flex items-center justify-between p-4 text-red-500"
              onClick={() => toast.error("Logout functionality coming soon!")}
            >
              <div className="flex items-center">
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <div className="leanfuel-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {theme === "light" ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
                <div>
                  <h3 className="font-medium">App Theme</h3>
                  <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                </div>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="leanfuel-card">
            <FormField
              control={form.control}
              name="goalWeight"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center mb-2">
                    <Target size={20} className="text-leanfuel-accent mr-3" />
                    <FormLabel className="text-base font-medium">Goal Weight (kg)</FormLabel>
                  </div>
                  <FormDescription>
                    Set your target weight to track your progress
                  </FormDescription>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="mt-4">
              <Button 
                onClick={() => toast.success("Weight goal updated")}
                className="w-full"
              >
                Update Goals
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-4">
          <div className="leanfuel-card">
            <div className="flex items-center mb-2">
              <Languages size={20} className="text-leanfuel-accent mr-3" />
              <div>
                <h3 className="font-medium">App Language</h3>
                <p className="text-sm text-gray-500">Choose your preferred language</p>
              </div>
            </div>
            
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <div className="flex items-center">
                    <span>English</span>
                    {language === "en" && <Check size={16} className="ml-2 text-leanfuel-accent" />}
                  </div>
                </SelectItem>
                <SelectItem value="es">
                  <div className="flex items-center">
                    <span>Español</span>
                    {language === "es" && <Check size={16} className="ml-2 text-leanfuel-accent" />}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;

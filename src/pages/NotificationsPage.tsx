
import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Clock, Bell, BellRing, BellOff, Plus, Trash2, Droplets, Utensils, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NotificationSetting, NotificationType } from "@/types/notification";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const NotificationsPage = () => {
  const {
    notifications,
    permissionGranted,
    requestPermission,
    toggleNotification,
    updateNotification,
    addNotification,
    removeNotification,
    showTestNotification
  } = useNotifications();
  
  const [selectedType, setSelectedType] = useState<NotificationType>("meal-reminder");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<NotificationSetting | null>(null);
  
  const form = useForm({
    defaultValues: {
      type: "meal-reminder" as NotificationType,
      time: "12:00",
      days: ["1", "2", "3", "4", "5"],
      frequency: "daily",
      customMessage: ""
    }
  });

  const getNotificationsByType = (type: NotificationType) => {
    return notifications.filter(notification => notification.type === type);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "meal-reminder":
        return <Utensils className="h-5 w-5" />;
      case "water-reminder":
        return <Droplets className="h-5 w-5" />;
      case "motivation":
        return <Award className="h-5 w-5" />;
      case "goal-check":
        return <Target className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      toast.success("Notifications enabled!");
    }
  };

  const handleEditNotification = (notification: NotificationSetting) => {
    setEditingNotification(notification);
    form.reset({
      type: notification.type,
      time: notification.time || "12:00",
      days: notification.days ? notification.days.map(String) : ["1", "2", "3", "4", "5"],
      frequency: notification.frequency || "daily",
      customMessage: notification.customMessage || ""
    });
    setIsFormOpen(true);
  };

  const handleAddNotification = () => {
    setEditingNotification(null);
    form.reset({
      type: selectedType,
      time: "12:00",
      days: ["1", "2", "3", "4", "5"],
      frequency: "daily",
      customMessage: ""
    });
    setIsFormOpen(true);
  };

  const onSubmit = (data: any) => {
    const days = data.days.map(Number);
    
    if (editingNotification) {
      updateNotification({
        ...editingNotification,
        time: data.time,
        days,
        frequency: data.frequency,
        customMessage: data.customMessage
      });
      toast.success("Notification updated!");
    } else {
      const id = addNotification(selectedType, {
        time: data.time,
        days,
        frequency: data.frequency,
        customMessage: data.customMessage
      });
      toast.success("Notification added!");
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Notifications</h1>
        <p className="text-gray-500">Manage your reminders</p>
      </header>

      {!permissionGranted && (
        <div className="leanfuel-card mb-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <BellOff className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <h3 className="font-medium text-sm">Notifications are disabled</h3>
              <p className="text-sm text-gray-500">Enable notifications to receive reminders</p>
            </div>
            <Button onClick={handleRequestPermission} size="sm">
              Enable
            </Button>
          </div>
        </div>
      )}

      <div className="leanfuel-card mb-4">
        <div className="flex gap-2 overflow-x-auto py-1 mb-4">
          <Button
            variant={selectedType === "meal-reminder" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSelectedType("meal-reminder")}
          >
            <Utensils className="h-4 w-4" />
            Meals
          </Button>
          <Button
            variant={selectedType === "water-reminder" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSelectedType("water-reminder")}
          >
            <Droplets className="h-4 w-4" />
            Water
          </Button>
          <Button
            variant={selectedType === "motivation" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSelectedType("motivation")}
          >
            <Award className="h-4 w-4" />
            Motivation
          </Button>
          <Button
            variant={selectedType === "goal-check" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSelectedType("goal-check")}
          >
            <Target className="h-4 w-4" />
            Goals
          </Button>
        </div>

        <div className="space-y-3">
          {getNotificationsByType(selectedType).length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <BellOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications set</p>
            </div>
          ) : (
            getNotificationsByType(selectedType).map((notification) => (
              <div
                key={notification.id}
                className="flex items-center p-3 border rounded-lg"
              >
                <div className="mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1" onClick={() => handleEditNotification(notification)}>
                  <h3 className="font-medium">{notification.customMessage || "Reminder"}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                    {notification.frequency === "weekly" && " (Weekly)"}
                    {notification.frequency === "daily" && " (Daily)"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={() => toggleNotification(notification.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this notification?")) {
                        removeNotification(notification.id);
                        toast.success("Notification removed");
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Button
          className="w-full mt-4"
          onClick={handleAddNotification}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {selectedType.split('-')[0]} reminder
        </Button>
      </div>

      <div className="leanfuel-card mb-4">
        <h2 className="text-lg font-bold mb-2">Try it out</h2>
        <p className="text-sm text-gray-500 mb-3">
          Send a test notification to see how it works
        </p>
        <Button
          onClick={() => showTestNotification("This is a test notification from LeanFuel!")}
          disabled={!permissionGranted}
          className="w-full"
          variant="outline"
        >
          <BellRing className="h-4 w-4 mr-2" />
          Send test notification
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNotification ? "Edit Notification" : "Add New Notification"}
            </DialogTitle>
            <DialogDescription>
              Configure when and how you want to be reminded
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>
                      When do you want to be reminded?
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often do you want to receive this notification?
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant={field.value.includes(String(index)) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newDays = field.value.includes(String(index))
                              ? field.value.filter(d => d !== String(index))
                              : [...field.value, String(index)];
                            field.onChange(newDays);
                          }}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                    <FormDescription>
                      Which days do you want to be reminded?
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Time to drink water!" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Custom message for your notification
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default NotificationsPage;

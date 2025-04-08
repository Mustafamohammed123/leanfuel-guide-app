
import { useState, useEffect } from "react";
import { NotificationSetting, NotificationType } from "@/types/notification";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const defaultNotifications: NotificationSetting[] = [
  {
    id: "meal-breakfast",
    type: "meal-reminder",
    enabled: false,
    time: "08:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    customMessage: "Time for breakfast!"
  },
  {
    id: "meal-lunch",
    type: "meal-reminder",
    enabled: false,
    time: "12:30",
    days: [0, 1, 2, 3, 4, 5, 6],
    customMessage: "Time for lunch!"
  },
  {
    id: "meal-dinner",
    type: "meal-reminder",
    enabled: false,
    time: "19:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    customMessage: "Time for dinner!"
  },
  {
    id: "water-reminder",
    type: "water-reminder",
    enabled: false,
    frequency: "daily",
    time: "10:00,13:00,16:00",
    customMessage: "Don't forget to drink water!"
  },
  {
    id: "motivation",
    type: "motivation",
    enabled: false,
    frequency: "daily",
    time: "09:00",
    customMessage: "You're doing great! Keep going!"
  },
  {
    id: "goal-check",
    type: "goal-check",
    enabled: false,
    frequency: "weekly",
    days: [0], // Sunday
    time: "18:00",
    customMessage: "Time to check on your weekly goals!"
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(defaultNotifications);
    }

    // Check if notification permission is granted
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // Save notifications to localStorage when changed
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Request notification permission
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error("Your browser doesn't support notifications");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setPermissionGranted(granted);
      
      if (granted) {
        toast.success("Notification permission granted!");
      } else {
        toast.error("Notification permission denied");
      }
      
      return granted;
    } catch (error) {
      toast.error("Error requesting notification permission");
      return false;
    }
  };

  // Toggle notification setting
  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled } 
          : notification
      )
    );
  };

  // Update notification setting
  const updateNotification = (updatedSetting: NotificationSetting) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === updatedSetting.id 
          ? updatedSetting 
          : notification
      )
    );
  };

  // Add new notification
  const addNotification = (type: NotificationType, settings: Partial<NotificationSetting> = {}) => {
    const newNotification: NotificationSetting = {
      id: uuidv4(),
      type,
      enabled: false,
      ...settings
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return newNotification.id;
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Show test notification
  const showTestNotification = (message: string) => {
    if (!('Notification' in window)) {
      toast.error("Your browser doesn't support notifications");
      return;
    }

    if (Notification.permission !== 'granted') {
      toast.error("You need to allow notifications first");
      return;
    }

    try {
      new Notification("LeanFuel Test Notification", {
        body: message || "This is a test notification",
        icon: "/favicon.ico"
      });
    } catch (error) {
      toast.error("Error showing test notification");
    }
  };

  return {
    notifications,
    permissionGranted,
    requestPermission,
    toggleNotification,
    updateNotification,
    addNotification,
    removeNotification,
    showTestNotification
  };
};

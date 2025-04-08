
import { NotificationSetting } from "@/types/notification";

// Check if browser supports notifications
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNotificationSupported()) {
    console.error("Notifications are not supported in this browser");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

// Show a notification
export const showNotification = (title: string, options: NotificationOptions = {}): boolean => {
  if (!isNotificationSupported()) {
    console.error("Notifications are not supported in this browser");
    return false;
  }

  if (Notification.permission !== 'granted') {
    console.error("Notification permission not granted");
    return false;
  }

  try {
    const defaultOptions: NotificationOptions = {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options
    };

    new Notification(title, defaultOptions);
    return true;
  } catch (error) {
    console.error("Error showing notification:", error);
    return false;
  }
};

// Schedule all notifications based on user settings
export const scheduleNotifications = (notifications: NotificationSetting[]): void => {
  // Clear any existing scheduled notifications
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // In a real implementation, this would communicate with a service worker
    console.log("Scheduling notifications...");
  }

  // For this demo, we'll simulate notifications using setTimeout
  // This is just for demonstration and would be handled by a service worker in production
  const enabledNotifications = notifications.filter(n => n.enabled);
  
  enabledNotifications.forEach(notification => {
    // This is a simplified version for demo purposes
    // In a real app, you'd use a service worker and proper scheduling
    const now = new Date();
    let scheduledTime: Date | null = null;
    
    if (notification.time) {
      const [hour, minute] = notification.time.split(':').map(Number);
      scheduledTime = new Date();
      scheduledTime.setHours(hour, minute, 0, 0);
      
      // If time already passed today, schedule for tomorrow
      if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
      
      // Check if notification should run on this day of week
      if (notification.days && notification.days.length > 0) {
        const dayOfWeek = scheduledTime.getDay();
        if (!notification.days.includes(dayOfWeek)) {
          // Find the next valid day
          let daysToAdd = 1;
          let nextDay = (dayOfWeek + daysToAdd) % 7;
          
          while (!notification.days.includes(nextDay) && daysToAdd < 7) {
            daysToAdd++;
            nextDay = (dayOfWeek + daysToAdd) % 7;
          }
          
          scheduledTime.setDate(scheduledTime.getDate() + daysToAdd);
        }
      }
    }
    
    if (scheduledTime) {
      const timeUntilNotification = scheduledTime.getTime() - now.getTime();
      
      if (timeUntilNotification > 0) {
        // For demo purposes only - in a real app this would be handled by service workers
        console.log(`Scheduled "${notification.customMessage}" for ${scheduledTime}`);
      }
    }
  });
};

// Check if it's time to show notifications (would be called by a service worker)
export const checkScheduledNotifications = (notifications: NotificationSetting[]): void => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay();

  notifications
    .filter(n => n.enabled)
    .forEach(notification => {
      if (notification.time) {
        const [hour, minute] = notification.time.split(':').map(Number);
        
        // Check if it's time to show the notification
        if (
          currentHour === hour && 
          currentMinute === minute &&
          (!notification.days || notification.days.includes(currentDay))
        ) {
          showNotification("LeanFuel Reminder", {
            body: notification.customMessage || "Time for your reminder!",
            icon: "/favicon.ico"
          });
        }
      }
    });
};

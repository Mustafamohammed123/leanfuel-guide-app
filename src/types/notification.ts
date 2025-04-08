
export type NotificationType = 
  | "meal-reminder" 
  | "water-reminder" 
  | "motivation" 
  | "goal-check";

export interface NotificationSetting {
  id: string;
  type: NotificationType;
  enabled: boolean;
  time?: string; // HH:MM format
  days?: number[]; // 0-6 (Sunday to Saturday)
  frequency?: "daily" | "weekly";
  customMessage?: string;
}

export interface NotificationState {
  settings: NotificationSetting[];
  lastUpdated: string; // ISO date string
}

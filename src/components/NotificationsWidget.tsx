
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationsWidget = () => {
  const navigate = useNavigate();
  const { notifications, permissionGranted, requestPermission } = useNotifications();
  
  const enabledNotifications = notifications.filter(n => n.enabled);

  return (
    <div className="leanfuel-card mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-base flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/notifications')}
          className="text-sm"
        >
          Manage
        </Button>
      </div>

      {!permissionGranted ? (
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Enable notifications to get reminders for meals, water, and more
          </p>
          <Button size="sm" onClick={requestPermission}>
            Enable Notifications
          </Button>
        </div>
      ) : enabledNotifications.length === 0 ? (
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You haven't set up any notifications yet
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {enabledNotifications.slice(0, 3).map(notification => (
            <div 
              key={notification.id} 
              className="p-2 text-sm bg-gray-50 rounded flex items-center"
            >
              <div className="h-2 w-2 rounded-full bg-leanfuel-primary mr-2"></div>
              <span>{notification.customMessage || "Reminder"}</span>
              <span className="ml-auto text-gray-500 text-xs">{notification.time}</span>
            </div>
          ))}
          
          {enabledNotifications.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full text-xs"
              onClick={() => navigate('/notifications')}
            >
              View all {enabledNotifications.length} notifications
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;

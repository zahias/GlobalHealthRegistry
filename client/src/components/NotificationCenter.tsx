import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, AlertCircle, MessageSquare, Users, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Notification {
  id: number;
  type: "message" | "application" | "verification" | "deployment" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["/api/notifications"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to mark as read");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to mark all as read");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "application":
        return <Users className="h-4 w-4 text-green-600" />;
      case "verification":
        return <Check className="h-4 w-4 text-purple-600" />;
      case "deployment":
        return <Calendar className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "border-l-blue-500";
      case "application":
        return "border-l-green-500";
      case "verification":
        return "border-l-purple-500";
      case "deployment":
        return "border-l-orange-500";
      default:
        return "border-l-gray-500";
    }
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Bell className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 z-50">
          <Card className="shadow-xl border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAllAsReadMutation.mutate()}
                      disabled={markAllAsReadMutation.isPending}
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification: Notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                        !notification.isRead ? "bg-blue-50" : "bg-white"
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsReadMutation.mutate(notification.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </span>
                            {notification.actionUrl && notification.actionLabel && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-xs"
                                onClick={() => {
                                  window.location.href = notification.actionUrl!;
                                  setIsOpen(false);
                                }}
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
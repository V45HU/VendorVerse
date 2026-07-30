import { useCallback, useEffect, useState } from "react";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notificationService";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // The initial fetch synchronizes this hook with the authenticated API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return {
    notifications,

    loading,

    unreadCount,

    refreshNotifications: loadNotifications,

    markOneAsRead: async (id) => {
      await markAsRead(id);

      await loadNotifications();
    },

    markEverythingAsRead: async () => {
      await markAllAsRead();

      await loadNotifications();
    },
  };
}

export default useNotifications;

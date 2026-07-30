import { Bell } from "lucide-react";
import { useState } from "react";

import NotificationDropdown from "./NotificationDropdown";

import useNotifications from "../../hooks/useNotifications";

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const {
    notifications,

    unreadCount,

    markOneAsRead,

    markEverythingAsRead,
  } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          p-3
          rounded-xl
          hover:bg-slate-100
        "
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              w-6
              h-6
              rounded-full
              bg-red-500
              text-white
              text-xs
              flex
              items-center
              justify-center
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          onRead={markOneAsRead}
          onReadAll={markEverythingAsRead}
        />
      )}
    </div>
  );
}

export default NotificationBell;

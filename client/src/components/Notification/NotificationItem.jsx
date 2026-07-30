import { Calendar, Star, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const icons = {
  booking: Calendar,
  quotation: Bell,
  meeting: Calendar,
  review: Star,
  system: Bell,
};

function NotificationItem({ notification, onRead }) {
  const Icon = icons[notification.type] || Bell;
  const navigate = useNavigate();

  const handleClick = async () => {
    await onRead(notification._id);

    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full
        text-left
        p-4
        border-b
        hover:bg-slate-50
        transition

        ${!notification.isRead ? "bg-emerald-50" : ""}
      `}
    >
      <div className="flex gap-4">
        <div className="mt-1">
          <Icon size={18} className="text-emerald-600" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{notification.title}</h4>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            {notification.message}
          </p>
        </div>
      </div>
    </button>
  );
}

export default NotificationItem;

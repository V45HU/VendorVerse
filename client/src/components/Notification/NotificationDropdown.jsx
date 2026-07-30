import NotificationItem from "./NotificationItem";

function NotificationDropdown({
  notifications,

  onRead,

  onReadAll,
}) {
  return (
    <div
      className="
        absolute
        right-0
        mt-4
        w-96
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-slate-200
        overflow-hidden
        z-50
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          p-5
          border-b
        "
      >
        <h3 className="font-bold">Notifications</h3>

        <button
          onClick={onReadAll}
          className="
            text-emerald-600
            text-sm
          "
        >
          Mark all read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="p-8 text-center text-slate-500">No Notifications</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onRead={onRead}
          />
        ))
      )}
    </div>
  );
}

export default NotificationDropdown;

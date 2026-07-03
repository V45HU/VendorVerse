function DashboardCard({ title, value, icon: Icon, color = "emerald" }) {
  const colors = {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
  };

  const theme = colors[color];

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        border-slate-200
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500">{title}</p>

          <h2 className="text-4xl font-bold mt-3">{value}</h2>
        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            ${theme.bg}
          `}
        >
          <Icon size={30} className={theme.text} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;

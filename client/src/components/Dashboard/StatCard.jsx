function StatCard({ label, value, trend }) {
  const positive = trend >= 0;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-5
      "
    >
      <p className="text-slate-500">{label}</p>

      <h3
        className="
          text-3xl
          font-bold
          mt-2
        "
      >
        {value}
      </h3>

      <p
        className={`
          mt-3
          font-medium
          ${positive ? "text-emerald-600" : "text-red-500"}
        `}
      >
        {positive ? "+" : ""}
        {trend}%
      </p>
    </div>
  );
}

export default StatCard;

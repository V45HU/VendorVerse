function DashboardHeader({ title, description, action }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-10
      "
    >
      <div>
        <h1
          className="
            text-4xl
            font-bold
            text-slate-900
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-3
            text-slate-500
          "
        >
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

export default DashboardHeader;

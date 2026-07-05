function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",

    Accepted: "bg-emerald-100 text-emerald-700",

    Rejected: "bg-red-100 text-red-700",

    Completed: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`
        px-3
        py-2
        rounded-xl
        text-sm
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;

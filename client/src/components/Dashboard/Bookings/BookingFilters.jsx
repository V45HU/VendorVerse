function BookingFilters({ status, setStatus }) {
  const filters = ["All", "Pending", "Accepted", "Rejected", "Completed"];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setStatus(item === "All" ? "" : item)}
          className={`
            px-5
            py-2.5
            rounded-xl
            font-medium
            transition-all

            ${
              (status === "" && item === "All") || status === item
                ? "bg-emerald-600 text-white"
                : "bg-white border border-slate-200 hover:border-emerald-500"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default BookingFilters;

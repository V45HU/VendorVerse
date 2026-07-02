function RoleSelector({ value, onChange }) {
  const roles = ["customer", "vendor"];

  return (
    <div className="grid grid-cols-2 gap-4">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={`
            py-4
            rounded-2xl
            border
            capitalize
            transition

            ${
              value === role
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-slate-300"
            }
          `}
        >
          {role}
        </button>
      ))}
    </div>
  );
}

export default RoleSelector;

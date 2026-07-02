function AuthCard({ children }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-xl
        p-10
      "
    >
      {children}
    </div>
  );
}

export default AuthCard;

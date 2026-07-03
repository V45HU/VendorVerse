function LoadingState() {
  return (
    <div
      className="
        flex
        justify-center
        items-center
        min-h-[500px]
      "
    >
      <div
        className="
          w-16
          h-16
          rounded-full
          border-4
          border-slate-300
          border-t-emerald-600
          animate-spin
        "
      />
    </div>
  );
}

export default LoadingState;

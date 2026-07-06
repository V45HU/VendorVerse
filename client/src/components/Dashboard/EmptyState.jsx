import { Inbox } from "lucide-react";

function EmptyState({ title, description, icon: Icon = Inbox, action }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-dashed
        border-slate-300
        py-20
        px-8
        text-center
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          bg-slate-100
          mx-auto
          flex
          items-center
          justify-center
        "
      >
        <Icon size={38} className="text-slate-500" />
      </div>

      <h2
        className="
          text-2xl
          font-bold
          mt-8
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          text-slate-500
          max-w-md
          mx-auto
        "
      >
        {description}
      </p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export default EmptyState;

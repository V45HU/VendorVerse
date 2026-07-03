import { Bell, Search, ChevronDown } from "lucide-react";

import useAuth from "../../hooks/useAuth";

function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        px-8
        flex
        items-center
        justify-between
      "
    >
      {/* Search */}

      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            w-full
            rounded-2xl
            bg-slate-100
            pl-12
            pr-5
            py-3
            outline-none
            focus:ring-2
            focus:ring-emerald-500
          "
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        <button
          className="
            relative
            p-3
            rounded-2xl
            hover:bg-slate-100
            transition
          "
        >
          <Bell size={22} />

          <span
            className="
              absolute
              top-2
              right-2
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-full
              bg-emerald-600
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-lg
            "
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4 className="font-semibold">{user?.name}</h4>

            <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;

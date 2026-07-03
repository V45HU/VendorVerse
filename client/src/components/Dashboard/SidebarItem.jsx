import { NavLink } from "react-router-dom";

function SidebarItem({ icon: Icon, title, path }) {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-4
        px-5
        py-4
        rounded-2xl
        transition-all
        ${
          isActive
            ? "bg-emerald-600 text-white shadow-lg"
            : "text-slate-600 hover:bg-slate-100"
        }
      `
      }
    >
      <Icon size={22} />

      <span className="font-medium">{title}</span>
    </NavLink>
  );
}

export default SidebarItem;

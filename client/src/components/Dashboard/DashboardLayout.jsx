import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout({ menuItems, children }) {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        flex
      "
    >
      {/* Sidebar */}

      <DashboardSidebar menuItems={menuItems} />

      {/* Main */}

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >
        <DashboardNavbar />

        <main
          className="
            flex-1
            p-10
            overflow-y-auto
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

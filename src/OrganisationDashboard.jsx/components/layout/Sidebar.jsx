import { LayoutDashboard, FileText, CheckSquare, Settings } from "lucide-react";
import { Link } from "./Link";

export function Sidebar({ onNavigate, currentPage }) {
  const links = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "tenders",
      label: "Manage Tenders",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "approvals",
      label: "Approvals",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Organization",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Tender Management</h1>
      </div>

      <nav className="space-y-2">
        {links.map(({ id, label, icon }) => (
          <Link
            key={id}
            href="#"
            icon={icon}
            isActive={currentPage === id}
            onClick={() => onNavigate(id)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

import React from "react";
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
      id: "my-bids",
      label: "My Bids",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "approvals",
      label: "BrowseTenders",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Organization",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 p-6 flex flex-col md:w-64 lg:w-80">
      {/* Logo Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white text-center tracking-wide">
          Contractor
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4 flex-1">
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

      {/* Footer */}
      <div className="mt-auto text-center text-gray-500 text-sm">
        <p>© 2024 Tender Management</p>
      </div>
    </div>
  );
}

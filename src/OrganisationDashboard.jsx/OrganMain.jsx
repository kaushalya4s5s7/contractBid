import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { MainContent } from "./components/layout/MainContent";
import { Dashboard } from "./pages/Dashboard";
import { ManageTenders } from "./pages/ManageTenders";
import { Approvals } from "./pages/Approvals";
import { Organization } from "./pages/Organization";

export default function OrganMain() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "tenders":
        return <ManageTenders />;
      case "approvals":
        return <Approvals />;
      case "settings":
        return <Organization />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <MainContent>{renderPage()}</MainContent>
    </div>
  );
}

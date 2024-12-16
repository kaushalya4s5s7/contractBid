import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { Overview } from "./pages/Overview";
import { BrowseTenders } from "./pages/BrowseTenders";
import { MyBids } from "./components/MyBids";
import { Settings } from "./pages/Settings";

export default function ContraMain() {
  // State to track which page is active
  const [currentPage, setCurrentPage] = useState("overview");

  // Logic to render the correct page
  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "approvals":
        return <BrowseTenders />;
      case "my-bids":
        return <MyBids />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      {/* Main content to render the current page */}
      <MainContent>{renderPage()}</MainContent>
    </div>
  );
}

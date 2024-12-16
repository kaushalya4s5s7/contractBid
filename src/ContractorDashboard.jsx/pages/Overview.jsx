import React from "react";
import ProfileSection from "../components/ProfileSection";
import { TenderList } from "../components/TenderList";

export const Overview = () => {
  return (
    <div className="space-y-8">
      <ProfileSection />
      <TenderList />
    </div>
  );
};

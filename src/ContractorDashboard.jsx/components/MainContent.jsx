import React from "react";

export function MainContent({ children }) {
  return (
    <main className="flex-1 ml-64 md:ml-64 lg:ml-80 p-6 bg-black-100 min-h-screen">
      {children}
    </main>
  );
}

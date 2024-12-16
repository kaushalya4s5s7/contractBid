import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Landingpage/LandingPage";
import OrganMain from "./OrganisationDashboard.jsx/OrganMain";
import ContraMain from "./ContractorDashboard.jsx/ContraMain";
import { isUserAuthorized } from "./utils/authUtils";

const ProtectedRoute = ({ element, requiredType }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authorized = await isUserAuthorized(requiredType);
      setIsAuthorized(authorized);
      setIsLoading(false);
    };
    checkAuth();
  }, [requiredType]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthorized ? element : <Navigate to="/" replace />;
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            isModalOpen={isModalOpen}
            openModal={() => setIsModalOpen(true)}
            closeModal={() => setIsModalOpen(false)}
          />
        }
      />
      <Route
        path="/organisation"
        element={
          <ProtectedRoute element={<OrganMain />} requiredType="organisation" />
        }
      />
      <Route
        path="/contractor"
        element={
          <ProtectedRoute element={<ContraMain />} requiredType="contractor" />
        }
      />
    </Routes>
  );
};

export default App;

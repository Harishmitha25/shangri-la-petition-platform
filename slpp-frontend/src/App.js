import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PetitionerLoginPage from "./pages/PetitionerLoginPage";
import PetitionsCommitteeLoginPage from "./pages/PetitionsCommitteeLoginPage";
import PetitionerDashboardPage from "./pages/PetitionerDashboardPage";
import PetitionsCommitteeDashboard from "./pages/PetitionsCommitteeDashboard";
import RegistrationPage from "./pages/RegistrationPage";
import CreatePetitionPage from "./pages/CreatePetitionPage";
import PetitionDetails from "./components/PetitionDetails";
import PetitionsCommitteeStatisticsPage from "./pages/PetitionsCommitteeStatistics";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route for Landing Page */}
        <Route path="/slpp" element={<LandingPage />} />

        {/* Public routes */}
        <Route
          path="/slpp/petitioner/register"
          element={<RegistrationPage />}
        />
        <Route
          path="/slpp/petitioner/login"
          element={<PetitionerLoginPage />}
        />
        <Route
          path="/slpp/petitions-committee/login"
          element={<PetitionsCommitteeLoginPage />}
        />

        {/* Protected routes */}
        <Route
          path="slpp/petitioner/dashboard"
          element={
            <ProtectedRoute requiredRole="PETITIONER">
              <PetitionerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slpp/petitions-committee/dashboard"
          element={
            <ProtectedRoute requiredRole="PETITIONS_COMMITTEE">
              <PetitionsCommitteeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slpp/petitions-committee/view-statistics"
          element={
            <ProtectedRoute requiredRole="PETITIONS_COMMITTEE">
              <PetitionsCommitteeStatisticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slpp/petitions/create"
          element={
            <ProtectedRoute requiredRole="PETITIONER">
              <CreatePetitionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slpp/petitions/:petitionId"
          element={
            <ProtectedRoute requiredRole="PETITIONER">
              <PetitionDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<Navigate to="/slpp" />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const currentUser = localStorage.getItem("currentUser");

  // If no user is logged in redirect to the appropriate login page
  if (!currentUser) {
    if (requiredRole === "PETITIONER") {
      return <Navigate to="/slpp/petitioner/login" replace />;
    } else if (requiredRole === "PETITIONS_COMMITTEE") {
      return <Navigate to="/slpp/petitions-committee/login" replace />;
    }
  }

  const token = localStorage.getItem(`jwt_${currentUser}`);
  if (!token) {
    // Redirect to login if the token is missing
    if (requiredRole === "PETITIONER") {
      return <Navigate to="/slpp/petitioner/login" replace />;
    } else if (requiredRole === "PETITIONS_COMMITTEE") {
      return <Navigate to="/slpp/petitions-committee/login" replace />;
    }
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem(`jwt_${currentUser}`);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserFullName");
      localStorage.removeItem("currentUserRole");

      if (requiredRole === "PETITIONER") {
        return <Navigate to="/slpp/petitioner/login" replace />;
      } else if (requiredRole === "ADMIN") {
        return <Navigate to="/slpp/petitions-committee/login" replace />;
      }
    }
    //Redirect to unauthorised if the roles do not match
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    localStorage.removeItem(`jwt_${currentUser}`);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserFullName");
    localStorage.removeItem("currentUserRole");
    if (requiredRole === "PETITIONER") {
      return <Navigate to="/slpp/petitioner/login" replace />;
    } else if (requiredRole === "ADMIN") {
      return <Navigate to="/slpp/petitions-committee/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/api";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const currentUser = localStorage.getItem("currentUserRole");
    console.log(currentUser);
    if (token) {
      // Redirect based on the user's role
      if (currentUser.includes("PETITIONER")) {
        navigate("/slpp/petitioner/dashboard", { replace: true });
      } else if (currentUser.includes("PETITIONS_COMMITTEE")) {
        navigate("/slpp/petitions-committee/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome to SLPP
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Shangri-La Petition Platform
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/slpp/petitioner/register")}
            className="p-6 bg-purple-500 text-white text-center rounded-lg shadow-md hover:shadow-lg hover:bg-purple-600 cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">Register as Petitioner</h2>
          </div>
          <div
            onClick={() => navigate("/slpp/petitioner/login")}
            className="p-6 bg-primary text-white text-center rounded-lg shadow-md hover:shadow-lg hover:bg-primary cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">Sign in as Petitioner</h2>
          </div>
          <div
            onClick={() => navigate("/slpp/petitions-committee/login")}
            className="p-6 bg-green-500 text-white text-center rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">Sign in as Committee</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

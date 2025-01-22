import React from "react";
import PetitionList from "../components/PetitionList";

const PetitionerDashboardPage = () => {
  const userFullName = localStorage.getItem("currentUserFullName") || "User";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SLPP - Petitioner Dashboard</h1>
          <div className="flex items-center space-x-6">
            <p className="text-lg font-medium">
              Welcome, {userFullName || ""}!
            </p>
            <button
              onClick={() => (window.location.href = "/slpp/petitions/create")}
              className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 transition"
            >
              Create Petition
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/slpp/petitioner/login";
              }}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <PetitionList />
      </div>
    </div>
  );
};

export default PetitionerDashboardPage;

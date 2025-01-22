import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userRole }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/slpp";
  };

  const dashboardTitle =
    userRole === "PETITIONER"
      ? "SLPP - Petitioner Dashboard"
      : "SLPP - Petitions Committee Dashboard";

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{dashboardTitle}</h1>

        <nav>
          <ul className="flex items-center gap-4">
            {userRole === "PETITIONER" && (
              <li>
                <Link
                  to="/slpp/petitions/create"
                  className="bg-green-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition"
                >
                  Create Petition
                </Link>
              </li>
            )}
            {userRole === "PETITIONS_COMMITTEE" && (
              <li>
                <Link
                  to="/slpp/petitions-committee/view-statistics"
                  className="bg-green-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition"
                >
                  View statistics
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-900 px-6 py-2 rounded-md text-sm text-white font-medium hover:bg-red-800 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

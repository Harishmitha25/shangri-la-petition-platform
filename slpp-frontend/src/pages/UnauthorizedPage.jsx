import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to the landing page after 4 seconds to allow users to read content in the page
    const timer = setTimeout(() => {
      navigate("/slpp");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Unauthorized Access
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to view this page. <br />
        Redirecting you to the main page...
      </p>
      <button
        onClick={() => navigate("/slpp")}
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary transition"
      >
        Go to the main page now
      </button>
    </div>
  );
};

export default UnauthorizedPage;

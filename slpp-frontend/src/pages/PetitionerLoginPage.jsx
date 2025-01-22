import React from "react";
import LoginForm from "../components/LoginForm";
import { loginPetitioner } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../services/api";
import { useEffect, useState } from "react";

const PetitionerLoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/slpp/petitioner/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    try {
      const response = await loginPetitioner(formData);
      const fullName = localStorage.getItem("currentUserFullName");
      setTimeout(() => {
        navigate("/slpp/petitioner/dashboard"); // Delay beforeredirecting to the dashboard to show login
      }, 1000);
      toast.success(`Welcome, ${fullName}!`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <LoginForm title="Petitioner Login" onLogin={handleLogin}>
        <p className="text-gray-600">
          Not registered yet?{" "}
          <button
            onClick={() => navigate("/slpp/petitioner/register")}
            className="text-primary underline hover:text-primary"
          >
            Register here
          </button>
        </p>
      </LoginForm>
    </div>
  );
};

export default PetitionerLoginPage;

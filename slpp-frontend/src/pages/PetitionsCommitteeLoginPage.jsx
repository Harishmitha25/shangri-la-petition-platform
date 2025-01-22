import React from "react";
import LoginForm from "../components/LoginForm";
import { loginAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../services/api";
import { useEffect, useState } from "react";

const PetitionsCommitteeLoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/slpp/petitions-committee/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    try {
      const response = await loginAdmin(formData);
      const fullName = localStorage.getItem("currentUserFullName");
      toast.success(`Welcome, ${fullName}!`);
      setTimeout(() => {
        navigate("/slpp/petitions-committee/dashboard");
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <LoginForm title="Petitions Committee Login" onLogin={handleLogin} />
    </div>
  );
};

export default PetitionsCommitteeLoginPage;

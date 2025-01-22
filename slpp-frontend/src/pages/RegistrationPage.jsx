import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { registerPetitioner } from "../services/api";

const RegistrationPage = () => {
  const handleRegister = async (formData) => {
    try {
      console.log(formData);
      const response = await registerPetitioner(formData);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="registration-page">
      <RegistrationForm onRegister={handleRegister} />
    </div>
  );
};

export default RegistrationPage;

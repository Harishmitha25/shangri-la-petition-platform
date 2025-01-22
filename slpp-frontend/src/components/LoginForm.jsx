import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ title, onLogin, children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await onLogin(formData);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            SLPP - Shangri-La Petition Platform
          </h1>
          <button
            onClick={() => navigate("/slpp")}
            className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Home
          </button>
        </div>
      </header>

      <form
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-primary"
        >
          Login
        </button>

        {children && <div className="mt-4 text-center">{children}</div>}
      </form>
    </div>
  );
};

export default LoginForm;

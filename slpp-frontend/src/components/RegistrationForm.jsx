import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    dob: "",
    password: "",
    bioid: "",
  });

  const [error, setError] = useState("");
  const [useQrCode, setUseQrCode] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setShowPasswordError(!validatePassword(value));
    }

    if (name === "fullname") {
      setShowNameError(!validateName(value));
    }
    if (name === "email") {
      setShowEmailError(!validateEmail(value));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation checks for Registraion fields
    if (
      !formData.email ||
      !formData.password ||
      !formData.bioid ||
      !formData.fullname
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateName(formData.fullname)) {
      setError("Full name should not contain numbers or special characters.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email is not in correct format. Itcshould have @ and .");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      await onRegister(formData);

      navigate("/slpp/petitioner/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleScan = (data) => {
    if (data && data.text) {
      setFormData((prev) => ({ ...prev, bioid: data.text }));
      setUseQrCode(false);
    } else if (data === null) {
      console.log("No QR code detected yet");
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error: ", err);
    setError("Unable to scan QR code. Please try again.");
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
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {showNameError && (
            <p className="text-sm text-red-500 mt-2">
              Full name should not contain numbers or special characters.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {showEmailError && (
            <p className="text-sm text-red-500 mt-2">
              Email is not in correct format. Itcshould have @ and .{" "}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {showPasswordError && (
            <p className="text-sm text-red-500 mt-2">
              Password must be at least 8 characters long and include at least
              one uppercase letter, one lowercase letter, one number, and one
              special character.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">BioID</label>
          {!useQrCode ? (
            <>
              <input
                type="text"
                name="bioid"
                value={formData.bioid}
                onChange={handleChange}
                placeholder="Enter BioID or scan QR Code"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary"
                onClick={() => setUseQrCode(true)}
              >
                Scan QR Code
              </button>
            </>
          ) : (
            <div className="mt-2">
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleError}
                onScan={handleScan}
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
                onClick={() => setUseQrCode(false)}
              >
                Cancel QR Scan
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-opacity-80"
        >
          Register
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already a petitioner?{" "}
            <button
              onClick={() => navigate("/slpp/petitioner/login")}
              className="text-primary underline hover:text-primary"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

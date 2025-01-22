import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePetitionForm = () => {
  const [formData, setFormData] = useState({
    petitionTitle: "",
    petitionText: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get current user and token from local storage
      const currentUser = localStorage.getItem("currentUser");
      const token = localStorage.getItem(`jwt_${currentUser}`);
      if (!token) {
        toast.error("Not authenticated. Please try logging in again.");
        return;
      }

      await axios.post(
        "https://localhost:8443/slpp/petitions/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Petition created successfully!");
      setTimeout(() => {
        navigate("/slpp/petitioner/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data || "Error creating petition.");
    }
  };

  const handleCancel = () => {
    navigate("/slpp/petitioner/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">
          Create a Petition
        </h2>

        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3">
            Petition Title
          </label>
          <input
            type="text"
            name="petitionTitle"
            value={formData.petitionTitle}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter petition title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3">
            Petition Text
          </label>
          <textarea
            name="petitionText"
            value={formData.petitionText}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows="8"
            placeholder="Enter petition details"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-primary transition duration-200"
          >
            Create Petition
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePetitionForm;

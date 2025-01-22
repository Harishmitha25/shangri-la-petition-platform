import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PetitionResponseModal from "../components/PetitionResponseModal";

const PetitionsCommitteeDashboard = () => {
  const [threshold, setThreshold] = useState(100);
  const [dbThreshold, setDbThreshold] = useState(100);
  const [petitions, setPetitions] = useState([]);
  const [selectedPetition, setSelectedPetition] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchThreshold = async () => {
    try {
      const response = await axios.get(
        "https://localhost:8443/slpp/petitions-committee/threshold"
      );
      setDbThreshold(response.data);
      setThreshold(response.data);
    } catch (error) {
      console.error("Error fetching threshold:", error);
      toast.error("Failed to fetch threshold!");
    }
  };

  const fetchPetitions = async () => {
    try {
      const response = await axios.get("https://localhost:8443/slpp/petitions");
      setPetitions(response.data["petitions"]);
    } catch (error) {
      console.error("Error fetching petitions:", error);
      toast.error("Failed to fetch petitions!");
    }
  };

  const handleThresholdChange = async () => {
    try {
      await axios.post(
        "https://localhost:8443/slpp/petitions-committee/threshold",
        {
          threshold,
        }
      );
      toast.success("Threshold updated successfully!");
      await fetchThreshold();
    } catch (error) {
      console.error("Error updating threshold:", error);
      toast.error("Failed to update threshold. Please try again.");
    }
  };

  const handleRespond = async (petitionId, responseText) => {
    try {
      await axios.post(
        `https://localhost:8443/slpp/petitions/${petitionId}/respond`,
        { responseText }
      );
      toast.success("Response submitted successfully!");
      fetchPetitions();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error(error.response?.data || "Error submitting response.");
    }
  };

  const openModal = (petition) => {
    setSelectedPetition(petition);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPetition(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchThreshold();
    fetchPetitions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              SLPP - Petitions Committee Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg mt-1">Welcome, Admin!</p>
            <button
              onClick={() =>
                (window.location.href =
                  "/slpp/petitions-committee/view-statistics")
              }
              className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 transition"
            >
              View Statistics
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/slpp/petitions-committee/login";
              }}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-end items-center mb-6 space-x-4">
          <label className="text-gray-700 font-medium">
            Set Signature Threshold:
          </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-20 p-2 border rounded-md"
          />
          <button
            onClick={handleThresholdChange}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary transition"
          >
            Update Threshold
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4 p-4 border-b">All Petitions</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Content</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Signatures</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {petitions.map((petition) => (
                <tr key={petition.petition_id}>
                  <td className="border px-4 py-2">
                    {petition.petition_title}
                  </td>
                  <td className="border px-4 py-2">{petition.petition_text}</td>
                  <td className="border px-4 py-2">{petition.status}</td>
                  <td className="border px-4 py-2">{petition.signatures}</td>
                  <td className="border px-4 py-2">
                    {petition.status === "open" &&
                    Number(petition.signatures) >= dbThreshold ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={() => openModal(petition)}
                      >
                        Respond
                      </button>
                    ) : petition.status === "closed" ? (
                      <span className="text-gray-500">
                        Responded and closed petition
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        No action needed until signature threshold is reached
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && selectedPetition && (
        <PetitionResponseModal
          petition={selectedPetition}
          onClose={closeModal}
          onSubmit={handleRespond}
        />
      )}
    </div>
  );
};

export default PetitionsCommitteeDashboard;

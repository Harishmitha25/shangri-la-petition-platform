import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const PetitionDetails = () => {
  const { petitionId } = useParams();
  const navigate = useNavigate();
  const [petition, setPetition] = useState(null);
  const [signerName, setSignerName] = useState("");
  const [showSignForm, setShowSignForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSigned, setHasSigned] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const fetchPetitionDetails = async () => {
      const currentUser = localStorage.getItem("currentUser");
      const token = localStorage.getItem(`jwt_${currentUser}`);
      try {
        const response = await axios.get(
          `https://localhost:8443/slpp/petitions/${petitionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPetition(response.data["petition"]);

        setIsCreator(response.data["petition"].petitioner === currentUser);

        const signedResponse = await axios.get(
          `https://localhost:8443/slpp/petitions/${petitionId}/signed`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHasSigned(signedResponse.data);
      } catch (error) {
        console.error("Error fetching petition details:", error);
      }
    };

    fetchPetitionDetails();
  }, [petitionId]);

  const handleSignPetition = async () => {
    const currentUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem(`jwt_${currentUser}`);

    try {
      await axios.post(
        `https://localhost:8443/slpp/petitions/${petitionId}/sign`,
        { signerName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("You have successfully signed the petition!");
      setErrorMessage("");
      setSignerName("");
      setShowSignForm(false);
      setHasSigned(true);
      setPetition((prev) => ({
        ...prev,
        signatures: Number(prev.signatures) + 1,
      }));
    } catch (error) {
      setErrorMessage(error.response?.data || "Error signing the petition.");
    }
  };

  const handleCancelSign = () => {
    setShowSignForm(false);
    setSignerName("");
    setErrorMessage("");
  };

  if (!petition) {
    return <p>Loading petition details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary font-medium hover:text-primary transition"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {petition.petition_title}
        </h2>
        <p className="mb-4 text-gray-600">{petition.petition_text}</p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Created by:</span> {petition.petitioner}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Signatures:</span> {petition.signatures}
        </p>
        {petition.response && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">Response</h4>
            <p className="text-gray-600">{petition.response}</p>
          </div>
        )}
        {successMessage && (
          <p className="text-green-600 font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 font-medium">{errorMessage}</p>
        )}

        {petition.status === "closed" ? (
          <p className="text-primary font-semibold">
            This petition is closed and can no longer be signed.
          </p>
        ) : isCreator ? (
          <p className="text-primary font-semibold">
            You are the creator of this petition and cannot sign it.
          </p>
        ) : hasSigned ? (
          <p className="text-green-500 font-semibold">
            {successMessage === "" && (
              <p className="text-green-600">
                You have already signed this petition.
              </p>
            )}
          </p>
        ) : !showSignForm ? (
          <button
            onClick={() => setShowSignForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Sign Petition
          </button>
        ) : (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your full name"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="p-3 border rounded-md w-1/3 mb-2 focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-start gap-4 mt-4">
              <button
                onClick={handleSignPetition}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                disabled={!signerName}
              >
                Sign
              </button>
              <button
                onClick={handleCancelSign}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetitionDetails;

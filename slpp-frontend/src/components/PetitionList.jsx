import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PetitionList = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "all"
  );
  const [petitions, setPetitions] = useState([]);
  const [signedPetitions, setSignedPetitions] = useState([]);
  const [filteredPetitions, setFilteredPetitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const currentUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem(`jwt_${currentUser}`);

    try {
      const petitionsResponse = await axios.get(
        "https://localhost:8443/slpp/petitions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch petitions signed by the user
      const signedResponse = await axios.get(
        "https://localhost:8443/slpp/signatures",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPetitions(petitionsResponse.data["petitions"]);
      setSignedPetitions(
        signedResponse.data.map((signature) => signature.petition)
      );
      filterPetitions(
        petitionsResponse.data["petitions"],
        signedResponse.data.map((signature) => signature.petition),
        activeTab,
        currentUser
      );
    } catch (error) {
      console.error("Error fetching petitions or signatures:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPetitions = (allPetitions, signedPetitions, tab, currentUser) => {
    let filtered = [];
    if (tab === "all") {
      filtered = allPetitions;
    } else if (tab === "created") {
      filtered = allPetitions.filter(
        (petition) => petition.petitioner === currentUser
      );
    } else if (tab === "signed") {
      const signedIds = signedPetitions.map((petition) => petition.petitionId);
      filtered = allPetitions.filter((petition) =>
        signedIds.includes(Number(petition.petition_id))
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((petition) =>
        petition.petition_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // console.log(filtered);

    setFilteredPetitions(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterPetitions(
      petitions,
      signedPetitions,
      activeTab,
      localStorage.getItem("currentUser")
    );
  }, [activeTab, petitions, signedPetitions, searchTerm]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectPetition = (petition_id) => {
    navigate(`/slpp/petitions/${petition_id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex border-b mb-4">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 text-md font-medium ${
            activeTab === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          All Petitions
        </button>
        <button
          onClick={() => handleTabChange("created")}
          className={`px-4 py-2 text-md font-medium ${
            activeTab === "created"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          Petitions Created
        </button>
        <button
          onClick={() => handleTabChange("signed")}
          className={`px-4 py-2 text-md font-medium ${
            activeTab === "signed"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          Petitions Signed
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search petitions by title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredPetitions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredPetitions.map((petition) => (
            <li
              key={petition.petition_id}
              className="py-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectPetition(petition.petition_id)}
            >
              <h4 className="text-lg font-semibold text-primary">
                {petition.petition_title}
              </h4>
              <p className="text-gray-700">Content: {petition.petition_text}</p>
              <p className="text-gray-700">Status: {petition.status}</p>
              <p className="text-gray-700">
                Signatures Count: {petition.signatures}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No petitions in here yet.</p>
      )}
    </div>
  );
};

export default PetitionList;

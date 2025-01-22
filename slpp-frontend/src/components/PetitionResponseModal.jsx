import React, { useState } from "react";

const PetitionResponseModal = ({ petition, onClose, onSubmit }) => {
  const [responseText, setResponseText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(petition.petition_id, responseText);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          Respond to Petition: {petition.petition_title}
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write your response here..."
            className="w-full p-3 border rounded-md mb-4"
            rows="5"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Response
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetitionResponseModal;

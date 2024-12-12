import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewLead = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lead/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLead(response.data.lead);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLead();
  }, [id]);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      {lead ? (
        <div className="min-h-screen bg-gray-100 px-10 py-8">
          {/* Header Section */}
          <div className="border-b border-gray-300 pb-6 mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{lead.name}</h1>
            <p className="text-sm text-gray-600">{lead.email}</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column: Lead Details and Actions */}
            <div className="col-span-12 md:col-span-7 space-y-8">
              {/* Actions */}
              <div className="flex space-x-4">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md">
                  Call
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md">
                  Email
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md">
                  Assign
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md">
                  Block Lead
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md">
                  Delete Lead
                </button>
              </div>

              {/* About This Lead */}
              <div>
                <button
                  onClick={toggleDetails}
                  className="w-full text-left px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  About this Lead {showDetails ? "▲" : "▼"}
                </button>
                {showDetails && (
                  <div className="mt-4 space-y-4">
                    <p>
                      <span className="font-semibold">Phone:</span> {lead.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Company:</span> {lead.company}
                    </p>
                    <p>
                      <span className="font-semibold">Country:</span>{" "}
                      {lead.country || "Not Provided"}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> {lead.status}
                    </p>
                    <p>
                      <span className="font-semibold">Created At:</span>{" "}
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Employee Activities */}
            <div className="col-span-12 md:col-span-5 bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Employee Activities</h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">No meetings scheduled yet.</p>
                <p className="text-sm text-gray-600">No notes added by employees.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default ViewLead;

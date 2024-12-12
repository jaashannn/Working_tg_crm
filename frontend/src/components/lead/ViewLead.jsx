import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaUserPlus, FaBan, FaTrash } from "react-icons/fa";

const ViewLead = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(
          `https://working-tg-crm.onrender.com/api/lead/${id}`,
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
            {/* Section 1: Lead Info and Actions */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-md shadow-md p-6 space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Lead Info</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Phone:</span> {lead.phone}
                </p>
                <p>
                  <span className="font-semibold">Company:</span> {lead.company}
                </p>
                <p>
                  <span className="font-semibold">Country:</span> {lead.country || "Not Provided"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {lead.status}
                </p>
                <p>
                  <span className="font-semibold">Created At:</span> {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                    <FaPhone className="mr-2" /> Call
                  </button>
                  <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">
                    <FaEnvelope className="mr-2" /> Email
                  </button>
                  <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600">
                    <FaUserPlus className="mr-2" /> Assign
                  </button>
                  <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
                    <FaBan className="mr-2" /> Block Lead
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
                    <FaTrash className="mr-2" /> Delete Lead
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Employee Activities */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-bold border-b pb-2">Employee Activities</h2>
              <div className="space-y-3 mt-4">
                <p className="text-gray-600">No meetings scheduled yet.</p>
                <p className="text-gray-600">No notes added by employees.</p>
              </div>
            </div>

            {/* Section 3: Additional Lead Details */}
            <div className="col-span-12 lg:col-span-3 bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-bold border-b pb-2">Additional Details</h2>
              <div className="mt-4 space-y-4">
                <p>
                  <span className="font-semibold">Associated Company:</span> {lead.associatedCompany || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Owner:</span> {lead.owner || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">BDR Owner:</span> {lead.bdrOwner || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Lead Status:</span> {lead.status}
                </p>
                <p>
                  <span className="font-semibold">Last Touch Point:</span> {lead.lastTouchPoint || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">LinkedIn URL:</span>
                  {lead.linkedinURL ? (
                    <a
                      href={lead.linkedinURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Profile
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
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

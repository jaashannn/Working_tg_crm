import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define columns for the DataTable
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Lead ID",
    selector: (row) => row.leadId,
    width: "150px",
  },
  {
    name: "Lead Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    width: "200px",
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    width: "150px",
  },
  {
    name: "Company",
    selector: (row) => row.company,
    width: "180px",
  },
  // {
  //   name: "Source",
  //   selector: (row) => row.source,
  //   width: "120px",
  // },
  // {
  //   name: "Status",
  //   selector: (row) => row.status,
  //   width: "130px",
  // },
  {
    name: "Action",
    selector: (row) => row.action,
    // center: true,
  },
];

// Function to fetch lead data from the backend
export const fetchLeads = async () => {
  let leads;
  try {
    const response = await axios.get("http://localhost:5000/api/lead", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      leads = response.data.leads;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return leads;
};

// Function to handle actions like View, Edit, Delete for leads
export const LeadButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/leads/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/leads/assign/${Id}`)}
      >
        Assign
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/leads/delete/${Id}`)}
      >
        Delete
      </button>
    </div>
  );
};

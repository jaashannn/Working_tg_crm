import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, LeadButtons } from '../../utils/LeadHelper'; // Assuming you have similar helpers for leads
import DataTable from 'react-data-table-component';
import axios from 'axios';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [leadLoading, setLeadLoading] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  
  useEffect(() => {
    const fetchLeads = async () => {
      setLeadLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/lead", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log(response.data)
        // console.log(response.data.success)
        if (response.data.success) {
          let sno = 1;
          const data = response.data.leads.map((lead) => ({
            _id: lead._id,
            sno: sno++,
            leadId: lead.leadId,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            source: lead.source,
            status: lead.status,
            action: <LeadButtons Id={lead._id} />,
          }));

          setLeads(data);
          setFilteredLeads(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLeadLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleFilter = (e) => {
    const records = leads.filter((lead) =>
      lead.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeads(records);
  };

  if (leadLoading) {
    return <div>Loading ...</div>; // Show loading if data is being fetched
  }

  // if (!filteredLeads.length) {
  //   return (
  //     <div className="p-6">
  //       <div className="text-center">
  //         <h3 className="text-2xl font-bold">Manage Leads</h3>
  //       </div>
  //       <div className="flex justify-between items-center">
  //         <input
  //           type="text"
  //           placeholder="Search By Lead Name"
  //           className="px-4 py-0.5 border"
  //           onChange={handleFilter}
  //         />
  //         <Link
  //           to="/admin-dashboard/add-lead"
  //           className="px-4 py-1 bg-teal-600 rounded text-white"
  //         >
  //           Add New Lead
  //         </Link>
  //       </div>
  //       <div className="mt-6">
  //         <p>No leads available.</p> {/* Show message if no leads */}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leads</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Lead Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-lead"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Lead
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredLeads} pagination />
      </div>
    </div>
  );
};

export default LeadList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AssignLead = () => {
  const { id } = useParams(); // Lead ID
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the lead details
    const fetchLeadDetails = async () => {
      try {
        const response = await axios.get(`https://working-tg-crm.onrender.com/api/lead/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setLead(response.data.lead);
          setSelectedEmployee(response.data.lead.assignedTo || "");
        }
      } catch (error) {
        console.error("Error fetching lead details:", error);
        alert("Failed to load lead details. Please try again later.");
      }
    };

    // Fetch the list of employees
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://working-tg-crm.onrender.com/api/employee", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to load employees. Please try again later.");
      }
    };

    fetchLeadDetails();
    fetchEmployees();
  }, [id]);

  const handleAssignLead = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      alert("Please select an employee to assign this lead.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://working-tg-crm.onrender.com/api/lead/assign/${id}`,
        { employeeId: selectedEmployee },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        alert("Lead successfully assigned!");
        navigate("/admin-dashboard/leads");
      }
    } catch (error) {
      console.error("Error assigning lead:", error);
      alert("Failed to assign lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Assign Lead</h2>
      {lead && (
        <div className="mb-8 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-2">Lead Information</h3>
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Company:</strong> {lead.company}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p>
            <strong>Assigned To:</strong>{" "}
            {lead.assignedTo
              ? `${lead.assignedTo.name} (${lead.assignedTo.employeeId})`
              : "Not Assigned"}
          </p>
        </div>
      )}
      <form onSubmit={handleAssignLead}>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Select Employee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className={`p-4 border rounded-md shadow-md hover:shadow-lg transition ${
                  selectedEmployee === employee._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedEmployee(employee._id)}
              >
                <h4 className="text-lg font-semibold">{employee.userId.name}</h4>
                <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                <p><strong>Department:</strong> {employee.department.dep_name}</p>
                <p><strong>Designation:</strong> {employee.designation}</p>
                <p><strong>Salary:</strong> ${employee.salary}</p>
                {lead?.assignedTo?._id === employee._id && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Already Assigned
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold text-lg ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Assigning..." : "Assign Lead"}
        </button>
      </form>
    </div>
  );
};

export default AssignLead;

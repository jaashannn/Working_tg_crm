import React, { useState } from 'react';

const Settings = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Employee", status: "Deactivated" },
  ]);
  const [permissions, setPermissions] = useState({
    addEmployee: true,
    deactivateEmployee: true,
    manageRoles: true,
    viewActivity: true,
  });

  const handleRoleChange = (id, newRole) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, role: newRole } : emp
      )
    );
  };

  const handleStatusToggle = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, status: emp.status === "Active" ? "Deactivated" : "Active" }
          : emp
      )
    );
  };

  return (
    <div className="settings-page p-6">
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      {/* Employee Management */}
      <div className="employee-management mb-6 p-4 shadow bg-white rounded">
        <h2 className="text-lg font-semibold mb-4">Employee Management</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={employee.role}
                    onChange={(e) => handleRoleChange(employee.id, e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleStatusToggle(employee.id)}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-1 px-3 rounded hover:shadow-md"
                  >
                    {employee.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions Management */}
      <div className="permissions-management mb-6 p-4 shadow bg-white rounded">
        <h2 className="text-lg font-semibold mb-4">Permissions</h2>
        <div className="space-y-2">
          {Object.keys(permissions).map((key) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                className="mr-2"
              />
              <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Activity */}
      <div className="employee-activity mb-6 p-4 shadow bg-white rounded">
        <h2 className="text-lg font-semibold mb-4">Employee Activity</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Login/Logout Times</li>
          <li>Online Status</li>
          <li>Idle Time</li>
          <li>Mouse Movement Tracking</li>
        </ul>
      </div>

      {/* Email Integration */}
      <div className="email-integration p-4 shadow bg-white rounded">
        <h2 className="text-lg font-semibold mb-4">Email Integration</h2>
        <p className="text-gray-700 mb-4">
          Integrate your email services to sync notifications, updates, and communication.
        </p>
        <button
          className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded hover:shadow-md"
        >
          Integrate Email
        </button>
      </div>
    </div>
  );
};

export default Settings;

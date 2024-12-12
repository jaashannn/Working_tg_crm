import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

// Helper for task columns and buttons
import { taskColumns, TaskButtons } from "../../utils/TasksHelper";

const TaskList = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lead/Tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          let sno = 1;
          const data = response.data.map((task) => ({
            _id: task._id,
            sno: sno++,
            name: task.name,
            email: task.email,
            phone: task.phone,
            company: task.company,
            status: task.status || "Pending",
            action: <TaskButtons Id={task._id} />,
          }));

          setTasks(data);
          setFilteredTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setTaskLoading(false);
      }
    };

    fetchTasks();
  }, [employeeId]);

  const handleFilter = (e) => {
    const records = tasks.filter((task) =>
      task.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTasks(records);
  };

  if (taskLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Your Assigned Tasks</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Task Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/employee-dashboard/add-task"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Task
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={taskColumns} data={filteredTasks} pagination />
      </div>
    </div>
  );
};

export default TaskList;

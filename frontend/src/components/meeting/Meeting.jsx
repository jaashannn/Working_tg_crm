import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Dummy meeting data
const dummyMeetings = [
  {
    id: 1,
    title: "Project Kickoff",
    employee: "John Doe",
    date: "2024-12-15",
    time: "10:00 AM",
    location: "Conference Room A",
  },
  {
    id: 2,
    title: "Client Presentation",
    employee: "Jane Smith",
    date: "2024-12-16",
    time: "02:00 PM",
    location: "Zoom",
  },
];

const Meetings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState(dummyMeetings);

  const scheduleMeeting = (event) => {
    event.preventDefault();
    const form = event.target;
    const newMeeting = {
      id: meetings.length + 1,
      title: form.title.value,
      employee: form.employee.value,
      date: form.date.value,
      time: form.time.value,
      location: form.location.value,
    };
    setMeetings([...meetings, newMeeting]);
    form.reset();
  };

  return (
    <div className="meetings-page p-6">
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meetings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Calendar Section */}
        <div className="calendar-section p-4 shadow bg-white rounded">
          <h2 className="text-lg font-semibold mb-4">Schedule a Meeting</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded border"
          />
        </div>

        {/* Meeting Form */}
        <div className="schedule-meeting-form p-4 shadow bg-white rounded">
          <h2 className="text-lg font-semibold mb-4">Add New Meeting</h2>
          <form onSubmit={scheduleMeeting} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meeting Title</label>
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee</label>
              <input
                type="text"
                name="employee"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded hover:shadow-md"
            >
              Add Meeting
            </button>
          </form>
        </div>
      </div>

      {/* Upcoming Meetings Table */}
      <div className="meetings-table-container overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Upcoming Meetings</h2>
        <table className="meetings-table w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Employee</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{meeting.title}</td>
                <td className="border border-gray-300 px-4 py-2">{meeting.employee}</td>
                <td className="border border-gray-300 px-4 py-2">{meeting.date}</td>
                <td className="border border-gray-300 px-4 py-2">{meeting.time}</td>
                <td className="border border-gray-300 px-4 py-2">{meeting.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meetings;
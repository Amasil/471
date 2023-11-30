// ViewEditAppointment.js
import React, { useState } from "react";

const ViewEditAppointment = ({ appointmentData }) => {
  const [newDate, setNewDate] = useState("");

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send newDate to the server for appointment update
  };

  return (
    <div>
      <h3>Upcoming Appointment</h3>
      <p>Date: {appointmentData.date}</p>

      <form onSubmit={handleEditSubmit}>
        <label>Edit Appointment Date:</label>
        <input type="date" value={newDate} onChange={handleDateChange} />

        <button type="submit">Edit Appointment</button>
      </form>
    </div>
  );
};

export default ViewEditAppointment;

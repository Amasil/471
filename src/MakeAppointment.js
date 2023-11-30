// MakeAppointment.js
import React, { useState } from "react";

const MakeAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send appointmentDate to the server for appointment creation
  };

  return (
    <form onSubmit={handleAppointmentSubmit}>
      <label>Appointment Date:</label>
      <input type="date" value={appointmentDate} onChange={handleDateChange} />

      <button type="submit">Schedule Appointment</button>
    </form>
  );
};

export default MakeAppointment;

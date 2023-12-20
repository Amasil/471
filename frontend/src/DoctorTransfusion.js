
import React, { useState, useEffect } from "react";

const TransfusionAppt = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentID, setSelectedAppointmentID] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Retrieve Doctor_ID and Recipient_ID from localStorage
  const storedDoctorID = localStorage.getItem("userId");
  const storedRecipientID = localStorage.getItem("recipientId");

  useEffect(() => {
    setSelectedDoctor(storedDoctorID || "");
    setSelectedRecipient(storedRecipientID || "");
  }, [storedDoctorID, storedRecipientID]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleVolumeChange = (event) => {
    setSelectedVolume(event.target.value);
  };

  const handleBloodTypeChange = (event) => {
    setSelectedBloodType(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setSelectedRecipient(event.target.value);
  };

  const scheduleTransfusionAppointment = () => {
    if (
      selectedDoctor.trim() !== "" &&
      selectedRecipient.trim() !== "" &&
      selectedDate.trim() !== "" &&
      selectedTime.trim() !== "" &&
      selectedVolume.trim() !== "" &&
      selectedBloodType.trim() !== ""
    ) {
      const currentDate = new Date();
      const selectedAppointmentDate = new Date(selectedDate);

      // Check if the selected date is in the future
      if (selectedAppointmentDate <= currentDate) {
        alert("Please select a future date for the appointment.");
        return;
      }

      // Continue with scheduling if the date is in the future
      const appointmentData = {
        Medical_ID: selectedDoctor,
        Recipient_ID: selectedRecipient,
        Status: "Scheduled",
        Transfusion_date: selectedDate,
        Transfusion_time: selectedTime,
        Volume: selectedVolume,
        Type: selectedBloodType,
      };
      console.log(appointmentData);
      fetch("http://localhost:3000/schedule-transfusion-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const appointmentID = data && data.appointment && data.appointment.Transfusion_ID;
          if (appointmentID) {
            setSelectedAppointmentID(appointmentID);
            setAppointments((prevAppointments) => [
              ...prevAppointments,
              {
                Appointment_ID: appointmentID,
                Medical_ID: selectedDoctor,
                Recipient_ID: selectedRecipient,
                Status: "Scheduled",
                Transfusion_date: selectedDate,
                Transfusion_Time: selectedTime,
                Volume: selectedVolume,
                Type: selectedBloodType,
              },
            ]);
            console.log(appointments);

            setSelectedDate("");
            setSelectedTime("");
            setSelectedVolume("");
            setSelectedBloodType("");
            setSelectedRecipient("");

            alert(
              `Appointment scheduled successfully. Appointment ID: ${appointmentID}`
            );
          } else {
            throw new Error("Appointment ID not found in the response data");
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error
          );
          alert("Error scheduling appointment. Please try again later.");
        });
    }
  };

  useEffect(() => {
    // Fetch appointment data when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Fetch appointments for the specific user
      const response = await fetch(
        `http://localhost:3000/get-transfusion-appointments/${selectedDoctor}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleRefresh = () => {
    // Fetch appointment data when the refresh button is clicked
    fetchAppointments();
  };

  return (
    <div className="transfusion-appt-container">
      <header>
        <h1>Transfusion Appointment</h1>
      </header>
      <div className="recipient-selection-container">
        <p>Enter the recipient ID:</p>
        <input
          type="text"
          value={selectedRecipient}
          onChange={handleRecipientChange}
          className="recipient-picker"
        />
      </div>
      <div className="date-selection-container">
        <p>Select a date for the transfusion appointment:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-picker"
        />
      </div>
      <div className="time-selection-container">
        <p>Select a time for the transfusion appointment:</p>
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="time-picker"
        />
      </div>
      <div className="volume-selection-container">
        <p>Volume needed for transfusion in mL:</p>
        <input
          type="text"
          value={selectedVolume}
          onChange={handleVolumeChange}
          className="volume-picker"
        />
      </div>
      <div className="blood-type-selection-container">
        <p>Blood type:</p>
        <input
          type="text"
          value={selectedBloodType}
          onChange={handleBloodTypeChange}
          className="blood-type-picker"
        />
      </div>
      <button
        disabled={
          selectedDoctor.trim() === "" ||
          selectedRecipient.trim() === "" ||
          selectedDate.trim() === "" ||
          selectedTime.trim() === "" ||
          selectedVolume.trim() === "" ||
          selectedBloodType.trim() === ""
        }
        onClick={scheduleTransfusionAppointment}
      >
        Schedule Transfusion Appointment
      </button>
      <div className="appointments-container">
        <table>
          <thead>
            <tr>
              <th colSpan="3">Transfusion Appointments</th>
              <th>
                <button
                  className="refresh-button"
                  onClick={handleRefresh}
                  style={{ width: "100%" }}
                >
                  Refresh
                </button>
              </th>
            </tr>
          </thead>
        </table>
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Status</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Volume</th>
              <th>Blood Type</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.Appointment_ID}>
                <td>{appointment.Appointment_ID}</td>
                <td>{appointment.Status}</td>
                <td>{appointment.Transfusion_date.split("T")[0]}</td>
                <td>{appointment.Transfusion_time}</td>
                <td>{appointment.Volume}</td>
                <td>{appointment.Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransfusionAppt;

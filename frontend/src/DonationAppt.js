import React, { useState, useEffect } from "react";

const DonationAppt = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentID, setSelectedAppointmentID] = useState(null);

  // Retrieve USER_ID from localStorage
  const storedUserID = localStorage.getItem("userId");
  const [selectedUser, setSelectedUser] = useState(storedUserID || "");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const scheduleAppointment = () => {
    if (
      selectedUser.trim() !== "" &&
      selectedDate.trim() !== "" &&
      selectedTime.trim() !== ""
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
        USER_ID: selectedUser,
        Status: "Scheduled",
        Appointment_Date: selectedDate,
        Appointment_Time: selectedTime,
      };
      fetch("http://localhost:3000/schedule-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const appointmentID = data && data.appointment && data.appointment.Appointment_ID;
          console.log("appointmentID:", appointmentID);
          if (appointmentID) {
            setSelectedAppointmentID(appointmentID);

            setAppointments((prevAppointments) => [
              ...prevAppointments,
              {
                Appointment_ID: appointmentID,
                USER_ID: selectedUser,
                Status: "Scheduled",
                Appointment_Date: selectedDate,
                Appointment_Time: selectedTime,
              },
            ]);

            setSelectedDate("");
            setSelectedTime("");

            alert(
              `Appointment scheduled successfully. Appointment ID: ${appointmentID}`
            );
          } else {
            throw new Error("Appointment ID not found in the response data");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
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
      const response = await fetch(`http://localhost:3000/get-appointments/${selectedUser}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAppointments(data);
      console.log("appointments:", data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleRefresh = () => {
    // Fetch appointment data when the refresh button is clicked
    fetchAppointments();
  };

  const handleFetchUserAppointments = () => {
    // Fetch appointments for the selected user ID
    fetch(`http://localhost:3000/get-appointments/${selectedUser}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Error fetching user appointments:", error);
        alert("Error fetching user appointments. Please try again later.");
      });
  };

  return (
    <div className="donation-appt-container">
      <header>
        <h1>Donation Appointment</h1>
      </header>
      <div className="date-selection-container">
        <p>Select a date for your donation appointment:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-picker"
        />
      </div>
      <div className="time-selection-container">
        <p>Select a time for your donation appointment:</p>
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="time-picker"
        />
      </div>
      <button
        disabled={
          selectedDate.trim() === "" ||
          selectedTime.trim() === ""
        }
        onClick={scheduleAppointment}
      >
        Schedule Appointment
      </button>
      <div className="appointments-container">
        <table>
          <thead>
            <tr>
              <th colSpan="3">Your Appointments</th>
              <th> <button className="refresh-button" onClick={handleRefresh} style={{ width: '100%' }}>
                Refresh
              </button></th>
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
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.Appointment_ID}>
                <td>{appointment.Appointment_ID}</td>
                <td>{appointment.Status}</td>
                <td>{appointment.Appointment_Date.split("T")[0]}</td>
                <td>{appointment.Appointment_Time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationAppt;

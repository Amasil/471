import React, { useState, useEffect } from "react";

const RecipientAppointments = () => {
  const [transfusions, setTransfusions] = useState([]);
  const [recipientId, setRecipientId] = useState("");

  useEffect(() => {
    fetchRecipientAppointments();
  }, [recipientId]);

  const fetchRecipientAppointments = async () => {
    try {
      // Get appointments for the recipient
      const response = await fetch(
        `http://localhost:3000/get-recipient-appointments/${recipientId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTransfusions(data);
    } catch (error) {
      console.error("Error fetching recipient's transfusions:", error);
    }
  };

  const handleRefresh = () => {
    // Manually trigger a refresh by calling fetchRecipientAppointments
    fetchRecipientAppointments();
  };

  return (
    <div className="recipient-transfusions-container">
      <header>
        <h1>Your Transfusion Appointments</h1>
      </header>
      <div className="transfusions-container">
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
        <table>
          <thead>
            <tr>
              <th>Transfusion ID</th>
              <th>Transfusion Date</th>
              <th>Transfusion Time</th>
              <th>Volume</th>
              <th>Blood Type</th>
            </tr>
          </thead>
          <tbody>
            {transfusions.map((transfusion) => (
              <tr key={transfusion.Transfusion_ID}>
                <td>{transfusion.Transfusion_ID}</td>
                <td>{transfusion.Transfusion_Date.split("T")[0]}</td>
                <td>{transfusion.Transfusion_Time}</td>
                <td>{transfusion.Volume}</td>
                <td>{transfusion.Blood_Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipientAppointments;
  
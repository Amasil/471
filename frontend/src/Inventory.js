import React, { useState } from "react";
import "./dashboard.css"; // Assuming you have a CSS file for styling

const Inventory = () => {
  const [sendAlerts, setSendAlerts] = useState({
    "A+": false,
    "A-": false,
    "B+": false,
    "B-": false,
    "AB+": false,
    "AB-": false,
    "O+": false,
    "O-": false,
  });

  const [editableQuantities, setEditableQuantities] = useState({
    "A+": false,
    "A-": false,
    "B+": false,
    "B-": false,
    "AB+": false,
    "AB-": false,
    "O+": false,
    "O-": false,
  });

  const [quantities, setQuantities] = useState({
    "A+": 50,
    "A-": 25,
    "B+": 40,
    "B-": 15,
    "AB+": 30,
    "AB-": 10,
    "O+": 35,
    "O-": 20,
  });

  const handleSendAlert = (bloodType, status) => {
    if (status === "Low") {
      setSendAlerts((prevSendAlerts) => ({
        ...prevSendAlerts,
        [bloodType]: true,
      }));

      alert("Alert sent!");
    }
  };

  const handleUpdateQuantity = (bloodType) => {
    setEditableQuantities((prevEditableQuantities) => ({
      ...prevEditableQuantities,
      [bloodType]: true,
    }));
  };

  const handleSaveQuantity = (bloodType) => {
    setEditableQuantities((prevEditableQuantities) => ({
      ...prevEditableQuantities,
      [bloodType]: false,
    }));

    // Save logic - Update the state with the new quantity
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bloodType]: parseInt(prevQuantities[bloodType], 10), // Convert to integer if needed
    }));

    // If you have a server or database, you can send the updated quantity data here
    // For example, you can use fetch or axios to make an API call to update the backend
    // fetch('your-api-endpoint', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     bloodType,
    //     quantity: parseInt(prevQuantities[bloodType], 10),
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error('Error:', error));
  };

  const handleQuantityChange = (bloodType, event) => {
    const updatedQuantities = { ...quantities, [bloodType]: parseInt(event.target.value, 10) };
    setQuantities(updatedQuantities);
  };

  return (
    <div>
      <header>
        <h1>Inventory Dashboard</h1>
      </header>

      <nav>
        <a href="doctorDashboard.html">Home</a>
        <a href="inventory.html">Inventory</a>
        <a href="#">Logout</a>
      </nav>

      <section>
        <h2>Inventory</h2>

        <table>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Quantity (units)</th>
              <th>Status</th>
              <th>Update</th>
              <th>Send Alert</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(quantities).map((bloodType) => (
              <tr key={bloodType}>
                <td>{bloodType}</td>
                <td>
                  {editableQuantities[bloodType] ? (
                    <input
                      type="text"
                      value={quantities[bloodType]}
                      onChange={(e) => handleQuantityChange(bloodType, e)}
                    />
                  ) : (
                    quantities[bloodType]
                  )}
                </td>
                <td>Healthy</td>
                <td>
                  {editableQuantities[bloodType] ? (
                    <button onClick={() => handleSaveQuantity(bloodType)}>Save</button>
                  ) : (
                    <button onClick={() => handleUpdateQuantity(bloodType)}>Update</button>
                  )}
                </td>
                <td>
                  <button
                    disabled={sendAlerts[bloodType]}
                    onClick={() => handleSendAlert(bloodType, "Low")}
                  >
                    Send Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Inventory;

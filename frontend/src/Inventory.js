import React, { useState } from "react";
import "./inventory.css";

const Inventory = () => {
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

  const [status, setStatus] = useState({
    "A+": "Healthy",
    "A-": "Healthy",
    "B+": "Healthy",
    "B-": "Healthy",
    "AB+": "Healthy",
    "AB-": "Healthy",
    "O+": "Healthy",
    "O-": "Healthy",
  });

  const [sendAlert, setSendAlert] = useState({
    "A+": false,
    "A-": false,
    "B+": false,
    "B-": false,
    "AB+": false,
    "AB-": false,
    "O+": false,
    "O-": false,
  });

  const handleSendAlert = (bloodType) => {
    setSendAlert((prevSendAlert) => ({
      ...prevSendAlert,
      [bloodType]: true,
    }));
    alert("Alert sent!");
  };

  const handleUpdateQuantity = (bloodType) => {
    setEditableQuantities((prevEditableQuantities) => ({
      ...prevEditableQuantities,
      [bloodType]: true,
    }));
  };

  const handleSaveQuantity = (bloodType) => {
    const updatedQuantities = {
      ...quantities,
      [bloodType]: parseInt(quantities[bloodType], 10),
    };

    setEditableQuantities((prevEditableQuantities) => ({
      ...prevEditableQuantities,
      [bloodType]: false,
    }));

    setQuantities(updatedQuantities);

    if (parseInt(updatedQuantities[bloodType], 10) < 30) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        [bloodType]: "Low",
      }));
      alert(`Status for ${bloodType} set to Low due to low quantity.`);
    }
  };

  const handleQuantityChange = (bloodType, event) => {
    const updatedQuantities = {
      ...quantities,
      [bloodType]: parseInt(event.target.value, 10),
    };
    setQuantities(updatedQuantities);
  };

  return (
    <div className="admin-dashboard">
      <div className="inventory-container">
        <header>
          <h1>Inventory Dashboard</h1>
        </header>

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
                  <td>{status[bloodType]}</td>
                  <td>
                    {editableQuantities[bloodType] ? (
                      <button onClick={() => handleSaveQuantity(bloodType)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleUpdateQuantity(bloodType)}>
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={
                        status[bloodType] !== "Low" || sendAlert[bloodType]
                      }
                      onClick={() => handleSendAlert(bloodType)}
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
    </div>
  );
};

export default Inventory;

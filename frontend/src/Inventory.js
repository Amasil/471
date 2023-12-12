import React, { useState, useEffect } from "react";
import "./Inventory.css";

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
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "AB+": 0,
    "AB-": 0,
    "O+": 0,
    "O-": 0,
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

  useEffect(() => {
    // Make an asynchronous call to fetch initial quantities from the database
    const fetchInitialQuantities = async () => {
      try {
        const response = await fetch("http://localhost:3000/bloodQuantities");
        const data = await response.json();

        // Update the quantities state with the fetched data
        setQuantities(data);

        // Check and update status based on initial quantities
        const updatedStatus = {};
        Object.keys(data).forEach((bloodType) => {
          if (parseInt(data[bloodType], 10) < 20) {
            updatedStatus[bloodType] = "Low";
          } else {
            updatedStatus[bloodType] = "Healthy";
          }
        });

        setStatus(updatedStatus);
      } catch (error) {
        console.error("Error fetching initial quantities:", error);
      }
    };

    // Call the function to fetch initial quantities when the component mounts
    fetchInitialQuantities();
  }, []);

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

  const handleSaveQuantity = async (bloodType) => {
    const updatedQuantities = {
      ...quantities,
      [bloodType]: parseInt(quantities[bloodType], 10),
    };

    setEditableQuantities((prevEditableQuantities) => ({
      ...prevEditableQuantities,
      [bloodType]: false,
    }));

    setQuantities(updatedQuantities);

    if (parseInt(updatedQuantities[bloodType], 10) < 20) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        [bloodType]: "Low",
      }));
    }

    try {
      // Send the updated data to the server
      const response = await fetch("http://localhost:3000/updateQuantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Blood_type: bloodType,
          No_of_units: updatedQuantities[bloodType],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update blood quantity for ${bloodType}`);
      }

      console.log(`Blood quantity for ${bloodType} updated successfully.`);
    } catch (error) {
      console.error("Error updating blood quantity:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const handleQuantityChange = (bloodType, event) => {
    const updatedQuantities = {
      ...quantities,
      [bloodType]: parseInt(event.target.value, 10),
    };
    setQuantities(updatedQuantities);
  };
  const handleRefreshInventory = async () => {
    try {
      const response = await fetch("http://localhost:3000/bloodQuantities");
      const data = await response.json();

      setQuantities(data);

      const updatedStatus = {};
      Object.keys(data).forEach((bloodType) => {
        if (parseInt(data[bloodType], 10) < 20) {
          updatedStatus[bloodType] = "Low";
        } else {
          updatedStatus[bloodType] = "Healthy";
        }
      });

      setStatus(updatedStatus);
    } catch (error) {
      console.error("Error refreshing inventory:", error);
    }
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
          <div className="refresh-button-container">
            <button onClick={handleRefreshInventory} className="refresh-button">
              Refresh
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inventory;

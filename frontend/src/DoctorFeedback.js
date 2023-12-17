import React, { useState, useEffect } from "react";
import "./DoctorFeedback.css";

const DoctorFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-feedback");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    // Fetch feedback data when the component mounts
    fetchFeedback();
  }, []);

  const handleRefreshFeedback = () => {
    fetchFeedback();
  };

  return (
    <div className="doctor-feedback-container">
      <header>
        <h1>Doctor Feedback</h1>
      </header>
      <div className="feedback-list">
        <table className="header-table">
          <tr className="header-row">
            <td className="header-inventory">
              <h2>All Feedback</h2>
            </td>
            <td className="refresh-button-container">
              <button
                onClick={handleRefreshFeedback}
                className="refresh-button"
              >
                Refresh
              </button>
            </td>
          </tr>
        </table>
        <table>
          <thead>
            <tr>
              <th>Feedback ID</th>
              {/* <th>User ID</th> */}
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => (
              <tr key={feedback.Feedback_ID}>
                <td>{feedback.Feedback_ID}</td>
                {/* <td>{feedback.User_ID}</td> */}
                <td>{feedback.Rating}</td>
                <td>{feedback.Feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorFeedback;

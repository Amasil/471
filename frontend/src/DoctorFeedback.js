import React, { useState, useEffect } from "react";
import "./DoctorFeedback.css";

const DoctorFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback data when the component mounts
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    // Make a GET request to fetch all feedback
    fetch("http://localhost:3000/get-feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeedbackList(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle error or provide user feedback
      });
  };

  return (
    <div className="doctor-feedback-container">
      <header>
        <h1>Doctor Feedback</h1>
      </header>
      <div className="feedback-list">
        <h2>All Feedback</h2>
        <table>
          <thead>
            <tr>
              <th>Feedback ID</th>
              <th>User ID</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => (
              <tr key={feedback.Feedback_ID}>
                <td>{feedback.Feedback_ID}</td>
                <td>{feedback.User_ID}</td>
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

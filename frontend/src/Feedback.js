import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const submitFeedback = () => {
    // Prepare the data to be sent to the server
    const feedbackData = {
      User_ID: 20, // Replace with the actual user ID
      Feedback_Date: new Date().toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
      Details: "Additional details if needed", // Add details if applicable
      Comment: feedbackText,
      Rating: rating,
    };

    // Make a POST request to the server
    fetch("http://localhost:3000/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Your feedback has been recorded.");
        // You can also perform any additional actions after successful submission
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert(
          "There was an error submitting your feedback. Please try again later."
        );
      });
  };

  return (
    <div className="feedback-container">
      <header>
        <h1>Feedback</h1>
      </header>
      <div className="rating-container">
        <p>Rate us out of 5:</p>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="rating-dropdown"
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <textarea
        id="feedback-text"
        placeholder="Plese enter your feedback."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        className="textarea-size"
      ></textarea>
      <button //ensures button can only be pressed if feedback is present
        disabled={rating === 0 || feedbackText.trim() === ""}
        onClick={submitFeedback}
      >
        Submit
      </button>
    </div>
  );
};

export default Feedback;

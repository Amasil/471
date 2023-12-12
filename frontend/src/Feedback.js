import React, { useState, useEffect } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const submitFeedback = () => {
    alert(`Your feedback has been recorded.`);
  };

  return (
    <div className="feedback-container">
      <header>
        <h1>Feedback</h1>
      </header>
      <div id="rating-container">
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
        disabled={rating == 0 || feedbackText.trim() == ""}
        onClick={submitFeedback}
      >
        Submit
      </button>
    </div>
  );
};

export default Feedback;

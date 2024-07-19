import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/sameReporter.css";
import { UserContext } from "./userContext";

const SameReporter = ({ reportId }) => {
  const { userId } = useContext(UserContext);
  const [buttonState, setButtonState] = useState({
    canReport: false,
    isPoster: false,
  });
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    fetchStatus();
    fetchCount();
  }, [reportId]);

  const fetchStatus = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/sameReporter/${reportId}/${userId}`
      );
      const { data } = await response.json();
      setButtonState(data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/count/${reportId}`
      );
      const { data } = await response.json();
      setUpvoteCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  const handleClick = async () => {
    if (buttonState.isPoster || !userId) return;

    const url = buttonState.canReport
      ? `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/${reportId}`
      : `${
          import.meta.env.VITE_BACKEND_URL
        }/api/sameReporter/delete/${reportId}`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      fetchStatus();
      fetchCount();
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  const getButtonClass = () => {
    if (buttonState.isPoster || !userId) return "btn btn-secondary btn-custom";
    if (buttonState.canReport) return "btn btn-success btn-custom";
    return "btn btn-warning btn-custom";
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        className={`${getButtonClass()} me-2 d-flex align-items-center justify-content-center`}
        onClick={handleClick}
        disabled={buttonState.isPoster || !userId}
        aria-label={
          buttonState.isPoster || !userId
            ? "You are the poster"
            : buttonState.canReport
            ? "Upvote"
            : "Retract Upvote"
        }
        style={{ width: "150px", height: "40px", fontSize: "16px" }}
      >
        {buttonState.isPoster || !userId ? (
          <>
            <span role="img" aria-label="stop">
              🛑
            </span>
            <span className="ms-2">{upvoteCount} Upvotes</span>
          </>
        ) : buttonState.canReport ? (
          <>
            <span role="img" aria-label="thumbs up">
              👍
            </span>
            <span className="ms-2">{upvoteCount} Upvotes</span>
          </>
        ) : (
          <>
            <span role="img" aria-label="reload">
              🔄
            </span>
            <span className="ms-2">{upvoteCount} Upvotes</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SameReporter;

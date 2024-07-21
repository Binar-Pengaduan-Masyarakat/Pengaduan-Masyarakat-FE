import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/SameReporter.css";
import { UserContext } from "./UserContext";

const SameReporter = ({ reportId }) => {
  const { userId } = useContext(UserContext);
  const [buttonState, setButtonState] = useState({
    canReport: false,
    isPoster: false,
  });
  const [upvoteCount, setUpvoteCount] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (reportId) {
      fetchCount();
    }
    if (userId && reportId) {
      fetchStatus();
    }
  }, [reportId, userId]);

  useEffect(() => {
    if (buttonRef.current) {
      scaleFontSize();
    }
  }, [buttonState, upvoteCount]);

  const fetchStatus = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/sameReporter/${reportId}/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
      const { data } = await response.json();
      setButtonState({
        canReport: data.canReport,
        isPoster: data.isPoster,
      });
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/count/${reportId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch count");
      }
      const { data } = await response.json();
      setUpvoteCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  const handleClick = async () => {
    if (buttonState.isPoster || !userId || !userId.startsWith("US")) return;

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

  const scaleFontSize = () => {
    if (buttonRef.current) {
      const button = buttonRef.current;
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      const minFontSize = 12;
      const maxFontSize = 16;

      let fontSize = maxFontSize;
      let textWidth = button.scrollWidth;
      let textHeight = button.scrollHeight;

      while (textWidth > buttonWidth || textHeight > buttonHeight) {
        fontSize -= 1;
        button.style.fontSize = `${fontSize}px`;
        textWidth = button.scrollWidth;
        textHeight = button.scrollHeight;
        if (fontSize <= minFontSize) break;
      }
    }
  };

  const getButtonClass = () => {
    if (!userId || userId === "") return "btn btn-secondary btn-custom";
    if (buttonState.isPoster || !userId.startsWith("US"))
      return "btn btn-secondary btn-custom";
    if (buttonState.canReport) return "btn btn-success btn-custom";
    return "btn btn-warning btn-custom";
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        ref={buttonRef}
        className={`${getButtonClass()} me-2 d-flex align-items-center justify-content-center`}
        onClick={handleClick}
        disabled={buttonState.isPoster || !userId || !userId.startsWith("US")}
        aria-label={
          buttonState.isPoster || !userId || !userId.startsWith("US")
            ? "You are the poster"
            : buttonState.canReport
            ? "Upvote"
            : "Retract Upvote"
        }
        style={{ width: "150px", height: "40px" }}
      >
        {buttonState.isPoster || !userId || !userId.startsWith("US") ? (
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

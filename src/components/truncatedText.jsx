import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../public/css/truncatedText.css";

const TruncatedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <span
      className={`truncated-text ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={handleToggle}
    >
      {isExpanded ? text : truncatedText}
    </span>
  );
};

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default TruncatedText;

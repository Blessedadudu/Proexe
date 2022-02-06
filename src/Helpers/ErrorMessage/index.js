import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import "./error.scss";

function ErrorMessage({ message }) {
  return (
    <div>
      {message? <div className="root">
        <div className="flex--2 icon--error">
          <div>
            <RiErrorWarningFill className="error--icon" />
          </div>
          <small className="error--both">{message}</small>
        </div>
      </div>: null}
    </div>
  );
} 

export default ErrorMessage; 

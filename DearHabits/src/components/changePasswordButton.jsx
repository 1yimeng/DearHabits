import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.jsx";

// FR3. Password Update - The system shall allow the user to change the password upon request and update it in the database.
const ChangePasswordButton = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/changePassword");
  };

  return (
    <div className={"inputContainer"}>
      <input
        className={"inputButton"}
        type="button"
        onClick={onButtonClick}
        value={"Change Password"}
      />
    </div>
  );
};

export default ChangePasswordButton;
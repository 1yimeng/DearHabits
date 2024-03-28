import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.jsx";

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
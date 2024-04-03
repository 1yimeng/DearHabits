import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase.jsx";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async (e) => {
    e.preventDefault();
    // Set initial error values to empty
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Pull out user's data from the userCredential property
    const user = auth.currentUser;

    updatePassword(user, password)
      .then(() => {
        // Update successful.
        setShowSuccessMessage(true);
      })
      .catch((err) => {
        // An error ocurred
        const errorMessage = err.message;
        const errorCode = err.code;
        setPasswordError(errorCode + errorMessage);
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Change Password</div>
      </div>

      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your new password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />

      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Confirm"}
        />
      </div>

      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={()=> {navigate("/main")}}
          value={"Go Back"}
        />
      </div>

      {/* <button type="button" onClick={navigate("/main")}>Go Back</button> */}
      {/* <a href="/main" onClick = {()=>{navigate("/main")}}>click here to go back to main</a> */}

      <div>
        {showSuccessMessage
          ? "Password Reset successfully! Click the link above to go back to the main page."
          : null}
      </div>
    </div>
  );
};

export default ChangePassword;

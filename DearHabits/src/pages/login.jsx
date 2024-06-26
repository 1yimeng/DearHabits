import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";

// FR2. Login - The system shall check if the provided Username and Password are matched with the registered users.
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Authentication calls will be made here...
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case("auth/invalid-credential"):
            setPasswordError("invalid credential!");
            break;
          case("auth/too-many-requests"):
            setPasswordError("Too many requests, please wait a bit before clicking!");
          default:
            setPasswordError("Error occured, could not sign in.");
            break;
        }
      });

  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          id="input_email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          id="input_password"
          type="password"
          value={password}
          placeholder="Enter your password here"
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
          onClick={onLoginButtonClick}
          value={"Login"}
        />
      </div>
    </div>
  );
};

export default Login;

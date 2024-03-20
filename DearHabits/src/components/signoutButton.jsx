import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignoutButton = () => {
    const navigate = useNavigate();
    const [logoutError, setLogoutError] = useState("");

    const onButtonClick = async () => {
      await auth
        .signOut()
        .then(navigate("/"))
        .catch((error) => setLogoutError(error));
    };

    return (
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Sign Out"}
        />
        <label className="errorLabel">{logoutError}</label>
      </div>
    );
};

export default SignoutButton;



import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    navigate("/login");
  };

  const onRegistrationButtonClick = () => {
    navigate("/registration");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome to DearHabit!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onLoginButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}

        <input
          className={"inputButton"}
          type="button"
          onClick={onRegistrationButtonClick}
          value="Registration"
        />
      </div>
    </div>
  );
};

export default Home;

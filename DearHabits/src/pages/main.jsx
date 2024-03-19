import React from "react";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../components/signoutButton";
import ChangePasswordButton from "../components/changePasswordButton";

const Main = () => {

    return (
      <div>
        <h1>you've logged in!</h1>
        <h1>HOME PAGE</h1>
        <SignoutButton></SignoutButton>
        <ChangePasswordButton></ChangePasswordButton>
      </div>
    );

};

export default Main;
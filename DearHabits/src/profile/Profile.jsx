import React from "react";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../components/signoutButton";
import ChangePasswordButton from "../components/changePasswordButton";

const Profile = props => {
    return (
        <>
            <h1>HOME PAGE</h1>
            <SignoutButton></SignoutButton>
            <ChangePasswordButton></ChangePasswordButton>
        </>
    )
}

export default Profile;
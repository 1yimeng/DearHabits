import React from "react";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../components/signoutButton.jsx";
import ChangePasswordButton from "../components/changePasswordButton.jsx";
import { auth } from "../firebase.jsx";
import NotificationDropdown from "../components/notificationDropdown.jsx";

const Profile = props => {
    const user = auth.currentUser;
    var userEmail = "";
    var userName = "";

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      userName = user.displayName;
      userEmail = user.email;
    }

    // call database to check current frequency
    // const currentFrequency = "Weekly";

    return (
      <div className="mainContainer">
        <div className="titleContainer">
          <div>Email: {userEmail}</div>
        </div>

        <NotificationDropdown />

        <ChangePasswordButton></ChangePasswordButton>
        <SignoutButton></SignoutButton>
      </div>
    );
}

export default Profile;
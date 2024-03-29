import React from "react";
import SignoutButton from "../components/signoutButton";
import ChangePasswordButton from "../components/changePasswordButton";
import { auth } from "../firebase";
import NotificationDropdown from "../components/notificationDropdown";

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
    const currentFrequency = "Weekly";

    return (
      <div className="mainContainer">
        <div className="titleContainer">
          <div>Email: {userEmail}</div>
        </div>

        <div className="buttonContainer">
          <h3>Your current notification setting: {currentFrequency}</h3>
          <h3>Set Frequency: </h3>
          <NotificationDropdown
            frequency={currentFrequency}
          ></NotificationDropdown>
        </div>

        <ChangePasswordButton></ChangePasswordButton>
        <SignoutButton></SignoutButton>
      </div>
    );
}

export default Profile;
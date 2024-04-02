import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { auth } from "../firebase.jsx";

// Get the users initial notification frequency setting
const getNotification = async user => {
    let freq = "Daily";
    await axios.get(`http://localhost:5001/user/frequency/${user}`)
                .then(res => { freq = res.data[0].Notif_Frequency; })
    return freq;
}

// FR20. Set Notifications
const NotificationDropdown = (props) => {
    const [newFrequency, setNewFrequency] = useState("Daily");
    
    // Backend portion to update users new notification frequency in the database (FR20)
    const handleOnChange = async (e) => {
        setNewFrequency(e.target.value);
        await axios.put(`http://localhost:5001/user/update/${auth.currentUser.email}`, {"freq": e.target.value});
    }

    useEffect(() => {
        const retrieve = async () => {
            let response = await getNotification(auth.currentUser.email);
            setNewFrequency(() => response);
        }
        retrieve();
    }, []);

    return (
    <div className="buttonContainer">
        <h3>Your current notification setting: {newFrequency}</h3>
        <h3>Set Frequency: </h3>
        {/* Options for user to select a new notification frequency (FR20) */}
        <select value={newFrequency} onChange={handleOnChange}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
        </select>
    </div>
    );
};

export default NotificationDropdown;

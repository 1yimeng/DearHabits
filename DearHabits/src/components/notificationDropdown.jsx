import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = ({ frequency, ...props }) => {
    const [newFrequency, setNewFrequency] = useState(frequency);
    
    const handleOnChange = (e) => {
        setNewFrequency(e.target.value);

        // TODO: call database to update 
    }

    return (
    <select value={newFrequency} onChange={handleOnChange}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
    </select>
    );
};

export default NotificationDropdown;

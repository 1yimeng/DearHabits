import { useState, useEffect } from "react"

// say we want to get a user's habits
const [habits, setHabits] = useState([]);
const email = "test@example.com";

useEffect(() => {
    // the base url of the heroku deployment is https://dear-habits-c60eea4fae63.herokuapp.com
    // we introduce a layer of division by introducing an api ('/api')
    // and then specify our 
    fetch('https://dear-habits-c60eea4fae63.herokuapp.com/api/${email}')
        .then((res) => res.json())
        // .then((habits) => setHabits(date));
}, []);
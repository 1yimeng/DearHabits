import React from "react";
import Hotbar from '../Hotbar.jsx';
import axios from 'axios';

function getHabits() {
  fetch("http://localhost:5001/api/habits")
  .then((response)=>{
    console.log(("received response: \n", response));
    // response.json();
  })
  // .then(habits => console.log("habits: \n",habits))
  .catch(err=>{console.log(err)});
}

const getHabitsData = () => {
  axios
  .get("http://localhost:5001/api/habits")
  .then(data => {
    console.log("received: \n", data.data);
    data.data.forEach((result) => {
      console.log("result: ", result);
      console.log("name: ", result["Name"]);
      habits.push(new Habit(result["Name"], result["Frequency"], result["Privacy"], result["Streak_Num"]));
      console.log("habits: ", habits);
    });
  })
  .catch(error => console.log(error));
};

const Main = () => {
    return (
      <div>
        <Hotbar/>
      </div>
    );

};

export default Main;
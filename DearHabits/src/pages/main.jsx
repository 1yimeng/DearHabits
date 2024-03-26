import React from "react";
import Hotbar from '../Hotbar.jsx';
import axios from 'axios';

import Habit from "../habits/classes/Habit.jsx";
import HabitGrouping from "../habits/classes/HabitGrouping.jsx";
const group = [new HabitGrouping("Running", "Numerical"), 
               new HabitGrouping("Mood", "Scale", "Good", "Bad", 3), 
               new HabitGrouping("Weights", "Text"),
               new HabitGrouping("Plank", "Checkmark")];
const habit = new Habit("Exercise", "Weekly", "Private");
// const habits = [habit, new Habit("Sleep", "Daily", "Private"), new Habit("Eating", "Daily", "Public")];
const habits = [habit];
// group[0].values = [["2024-03-13", "2"], ["2024-03-14", "5"], ["2024-03-15", "3"], ["2024-03-16", "6"]];
for (let i = 1; i < 66; i++) {
  const date = new Date(2023, 1, i);
  group[0].incrementValue([`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, "2"]);
}
group[3].values = [["2024-03-13", "1"], ["2024-03-14", "1"], ["2024-03-15", "0"], ["2024-03-16", "1"]];
habit.updateGroup(group);

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
  getHabitsData();
    return (
      <div>
        <Hotbar habits={habits} />
      </div>
    );

};

export default Main;
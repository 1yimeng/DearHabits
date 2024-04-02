import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from "../firebase.jsx";

import { MainCreate } from './CreateHabit.jsx';
import MainView from './ViewHabit.jsx';
import ListHabits from './ListHabits.jsx';
import Error from '../utility/Error.jsx';

import Habit from "../habits/classes/Habit.jsx";
import HabitGrouping from "../habits/classes/HabitGrouping.jsx";

import './stylesheet/habits.css';

// Retrive all of the users existing habits
const getHabits = async (user) => {
    const habits = [];
    const ids = [];

    await axios.get(`http://localhost:5001/api/habits/read/${user}`)
                .then(res => {
                  res.data.forEach(result => {
                      habits.push(new Habit(
                                    result.Name, 
                                    result.Frequency, 
                                    result.Privacy, 
                                    result.Streak_Num, 
                                    (result.Is_Completed) ? true : false,
                                    result.id));
                      ids.push(result.id);
                  });
                })
                .catch(err => console.log(err));
    
    if (habits.length === 0) { return [] }

    const groupings = [];
    await axios.get(`http://localhost:5001/api/habits/read/groupings/${ids.reduce((sum, cur) => `${sum}+${cur}`)}`)
                .then(res => {
                  res.data.forEach(result => {
                    const group = new HabitGrouping(
                      result.Label,
                      result.Type,
                      result.Upper_Bound,
                      result.Lower_Bound,
                      result.Num_Intervals,
                      result.Hid,
                    );
                    (result.Value) ? group.JSONValue(JSON.parse(result.Value)) : group.values = [];
                    group.stats = [result.Streak_Num, result.Longest_Streak];
                    groupings.push(group)
                  })
                })
                .catch(err => console.log(err))
    
    return habits.map(habit => {
        groupings.forEach(group => (habit.id === group.hid) ? habit.addGroup(group) : null);
        return habit;
    });
} 

// FR8. Creat Habit Grouping, FR9. Create Habit, FR10. View Habit, FR11. Delete Habit, FR12. Edit Habit,
// FR15. Share Public Habit with Friends, FR18. Update Streak
const HabitPage = (props) => {
    // Display options for users to create a habit and its groupings (FR8 and FR9)
    const createScreen = () => {
        setActive(() => {
            return (<MainCreate submitCreate={createHabit}/>)}
        )
    }
    // Display selected habit to the user with options to complete, edit or delete the habit (FR10, FR11, FR12)
    const viewScreen = habit => {
        setActive(() => {
            return (<MainView key={`Selected-${habit.name}`} habit={habit} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>)}
        )
    }

    // FR8. Creat Habit Grouping
    // Backend portion to add a new habit and its groupings (FR8 and FR9)
    const createHabit = async created => {
        await axios.post('http://localhost:5001/api/habits/create', created.getHabitInfo(auth.currentUser.email))
                .then(res => {
                    created.id = res.data.insertId
                })
                .catch(err => console.log(err));

        await axios.post('http://localhost:5001/api/habits/create/groupings', created.getGroupsInfo())
                .then(res => console.log(res))
                .catch(err => console.log(err))

        setList(oldList => {
            const newList = [...oldList];
            newList.push(created);
            viewScreen(newList[newList.length - 1]);
            return newList;
        })
    }
    // FR11. Delete Habit
    // Backend portion to delete a habit (FR11)
    const deleteHabit = async deleted => {
        await axios.delete(`http://localhost:5001/api/habits/delete/groupings/${deleted.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.delete(`http://localhost:5001/api/habits/delete/posts/${deleted.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.delete(`http://localhost:5001/api/habits/delete/${deleted.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        setList(oldList => {
            const newList = oldList.filter(habit => habit.name != deleted.name);
            (newList != 0) ? viewScreen(newList[0]) : createScreen();
            return newList;
        })
    }
    // FR12. Edit Habit, FR15. Share Public Habit with Friends, FR18. Update Streak
    // Backend portion to update an edited habit in the database and post a habit if public (FR12, FR15, FR18)
    const updateHabit = async (previous, updated, completed=false) => {
        await axios.put(`http://localhost:5001/api/habits/update/${previous.id}`, updated.getHabitInfo())
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.delete(`http://localhost:5001/api/habits/delete/groupings/${previous.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.post('http://localhost:5001/api/habits/create/groupings', updated.getGroupsInfo())
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
        
        // Create a post if habit is public (FR15)
        if (completed && updated.privacy === "Public") {
            const date = (new Date()).toISOString().split("T");
            await axios.post("http://localhost:5001/api/habits/create/post", {"time":`${date[0]}`, "hid":previous.id, "email":auth.currentUser.email})
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
        }

        setList(oldList => {
            const newList = oldList.map(habit => (habit === previous) ? updated : habit);
            viewScreen(updated);
            return newList;
        })
    }

    const [list, setList] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        const retrieve = async () => {
            let response = await getHabits(auth.currentUser.email);
            setList(() => response);
            setActive(() => (response.length > 0) ?
                <MainView key={`Selected-${response[0].name}`} habit={response[0]} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>
                : <MainCreate submitCreate={createHabit}/>)
        }
        retrieve();
    }, []);

    return (
        <div className="flex-habit">
            <section className="sidebar">
                {/* Button to create a new habit and its groupings (FR8 and FR9) */}
                <button name="createHabit" onClick={createScreen}>+</button>
                <hr />
                {/* Buttons for users to select a specific habit (FR10) */}
                {(list.length > 0) ? <ListHabits key={"List-Habits"} habits={list} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/> : null}
            </section>
            <section className="habit">
                {/* Display a selected a habit to the user with options to complete, edit or delete the habit (FR10, FR11, FR12, FR18) */}
                {active}
            </section>            
        </div>
    )
};

export default HabitPage
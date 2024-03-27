import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from "../firebase.jsx";

import { MainCreate } from './CreateHabit.jsx';
import MainView from './ViewHabit.jsx';
import ListHabits from './ListHabits.jsx';

import Habit from "../habits/classes/Habit.jsx";
import HabitGrouping from "../habits/classes/HabitGrouping.jsx";

import './stylesheet/habits.css';

const getHabitsData = () => {
    axios
    .get("https://dear-habits-c60eea4fae63.herokuapp.com/api/habits")
    .then(data => {
      console.log("received: \n", data.data);
      data.data.forEach((result) => {
        console.log("result: ", result);
        console.log("name: ", result["Name"]);
        habits.push(new Habit(result["Name"], result["Frequency"], result["Privacy"], result["Streak_Num"]));
        // console.log("habits: ", habits);
      });
    })
    .catch(error => console.log(error));
};

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

const HabitPage = (props) => {
    const createScreen = () => {
        setActive(() => {
            return (<MainCreate submitCreate={createHabit}/>)}
        )
    }
    const viewScreen = habit => {
        setActive(() => {
            return (<MainView key={`Selected-${habit.name}`} habit={habit} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>)}
        )
    }

    const createHabit = async created => {
        //TODO: Database logic to create habit and groupings in database
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
    const deleteHabit = async deleted => {
        //TODO: Database logic to delete habit and groupings from database
        await axios.delete(`http://localhost:5001/api/habits/delete/groupings/${deleted.id}`)
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
    const updateHabit = async (previous, updated) => {
        //TODO: Database logic to update habit and grouping in database
        await axios.put(`http://localhost:5001/api/habits/update/${previous.id}`, updated.getHabitInfo())
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.delete(`http://localhost:5001/api/habits/delete/groupings/${previous.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

        await axios.post('http://localhost:5001/api/habits/create/groupings', updated.getGroupsInfo())
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

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
            console.log(auth.currentUser.email);
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
                <button name="createHabit" onClick={createScreen}>+</button>
                <hr />
                {(list.length > 0) ? <ListHabits key={"List-Habits"} habits={list} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/> : null}
            </section>
            <section className="habit">
                {active}
            </section>            
        </div>
    )
};

export default HabitPage
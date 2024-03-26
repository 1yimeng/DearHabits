import { useState, useEffect } from 'react';
import axios from 'axios';

import { MainCreate } from './CreateHabit.jsx';
import MainView from './ViewHabit.jsx';
import ListHabits from './ListHabits.jsx';

import './stylesheet/habits.css';

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

const HabitPage = ({habits, ...props}) => {
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

    const createHabit = created => {
        //TODO: Database logic to create habit and groupings in database
        // get habit
        getHabits();
        let result = created.getHabitInfo();
        // console.log("habit_json:", habit_json);
        console.log("created: ", created);
        console.log("result: ", result);
        let grouping = created.group;
        console.log("group: ", grouping);
        // get groupings
        // let groups = created.getGroupsInfo();

        // const requestOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({habit: created.getHabitInfo(), groupings: groups})
        // };
        // fetch("https://dear-habits-c60eea4fae63.herokuapp.com/", requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        // https://dear-habits-c60eea4fae63.herokuapp.com/
        fetch("http://localhost:5001",)
            .then((res) => {
                console.log("res: ", res);
            });
        // useEffect(() => {
        //     makeAPICall();
        // }, []);
            // .then(data => console.log(data));

        setList(oldList => {
            const newList = [...oldList];
            newList.push(created);
            viewScreen(newList[newList.length - 1]);
            return newList;
        })
    }
    const deleteHabit = deleted => {
        //TODO: Database logic to delete habit and groupings from database
        setList(oldList => {
            const newList = oldList.filter(habit => habit.name != deleted.name);
            viewScreen(newList[0]);
            console.log(newList);
            return newList;
        })

    }
    const updateHabit = (previous, updated) => {
        //TODO: Database logic to update habit and grouping in database
        setList(oldList => {
            const newList = oldList.map(habit => (habit === previous) ? updated : habit);
            viewScreen(updated);
            console.log(newList);
            return newList;
        })
    }

    const [list, setList] = useState(habits);
    const [active, setActive] = useState((<MainView key={`Selected-${habits[0].name}`} habit={habits[0]} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>));

    return (
        <div className="flex-habit">
            <section className="sidebar">
                <button name="createHabit" onClick={createScreen}>+</button>
                <hr />
                <ListHabits key={"List-Habits"} habits={list} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>
            </section>
            <section className="habit">
                {active}
            </section>            
        </div>
    )
};

export default HabitPage
import { useState } from 'react'

import { MainCreate } from './CreateHabit';
import MainView from './ViewHabit';
import ListHabits from './ListHabits';

import './stylesheet/habits.css'

const HabitPage = ({habits, ...props}) => {
    const createScreen = () => {
        setActive(() => {
            return (<MainCreate submitCreate={createHabit}/>)}
        )
    }
    const viewScreen = habit => {
        setActive(() => {
            return (<MainView habit={habit} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>)}
        )
    }

    const createHabit = created => {
        //TODO: Database logic to create habit and groupings in database
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
    const [active, setActive] = useState((<MainView habit={habits[0]} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>));

    return (
        <div className="flex-habit">
            <section className="sidebar">
                <button name="createHabit" onClick={createScreen}>+</button>
                <hr />
                <ListHabits habits={list} buttonFunc={viewScreen} submitDelete={deleteHabit} submitUpdate={updateHabit}/>
            </section>
            <section className="habit">
                {active}
            </section>            
        </div>
    )
};

export default HabitPage
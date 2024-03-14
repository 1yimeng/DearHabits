import { useState } from 'react'
import Slot from '../utility/Slot.jsx'

const ListHabits = ({habits, buttonFunc, ...props}) => {
    const readHabit = habit => {
        console.log(habit.name);
    }
    return (
        <>
            {habits.map(habit => {
                return (
                <Slot key={habit.name} label={habit.name}>
                    <button onClick={e => buttonFunc(habit)}>View</button>
                </Slot>)
            })}
        </>
    )
};

export default ListHabits
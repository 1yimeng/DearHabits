import Slot from '../utility/Slot.jsx'

import './stylesheet/habits.css'

const ListHabits = ({habits, buttonFunc, ...props}) => {
    const readHabit = habit => {
        console.log(habit.name);
    }
    return (
        <>
            {habits.map((habit, index) => {
                return (
                <Slot key={`${habit.name}-${index}`} label={""}>
                    <button onClick={() => buttonFunc(habit)} className="sidebar-button">{habit.name}</button>
                </Slot>)
            })}
        </>
    )
};

export default ListHabits
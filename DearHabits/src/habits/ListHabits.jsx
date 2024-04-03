import Slot from '../utility/Slot.jsx'

import './stylesheet/habits.css'

// FR10. View Habit
const ListHabits = ({habits, buttonFunc, ...props}) => {
    return (
        <>
            {habits.map((habit, index) => {
                return (
                <Slot key={`${habit.name}-${index}`} label={""}>
                    {/* Button to allow user to select a habit to view (FR10) */}
                    <button onClick={() => buttonFunc(habit)} className="sidebar-button">{habit.name}</button>
                </Slot>)
            })}
        </>
    )
};

export default ListHabits
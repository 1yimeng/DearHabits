import { useState } from 'react'
import Habit from './classes/Habit.jsx'
// import HabitGrouping from './classes/HabitGrouping.jsx'


blankHabit = Habit("", "Daily", "Private");

const CreateHabit = props => {
    console.log("Hello");
    const [habit, setHabit] = useState(blankHabit);

    const formHandler = e => {
        const newHabit = Habit(e.target.name, e.target.freq, e.target.privacy);
        setHabit(() => newHabit);
    };

    const submitHandler = e => {

    }

    return (
        <>
            <h1>Create Habit</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Name
                    <input type="text" 
                     required 
                     name="name"
                     value={habit.Name()}
                     onChange={formHandler}
                    />
                </label>
                <hr />
                <label>
                    Frequency
                    <select
                     required
                     name="freq"
                     value={habit.Frequency()}
                     onChange={formHandler}>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </label>
                <hr />
                <label>
                    Privacy
                    <select
                     required
                     name="privacy"
                     value={Habit.Privacy()}
                     onChange={formHandler}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </label>

                <input type="submit" />
            </form>
        </>
    )
}

export default CreateHabit;
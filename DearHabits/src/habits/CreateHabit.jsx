import { useState } from 'react'
import Habit from './classes/Habit.jsx'
import HabitGrouping from './classes/HabitGrouping.jsx'

import './stylesheet/habits.css'

// FR8. Creat Habit Grouping, FR9. Create Habit
export const MainCreate = props => {
    const [err, setErr] = useState(false);
    let [habit, setHabit] = useState(new Habit("", "Daily", "Private"))  // Create a fresh Habit
    let grouping = [new HabitGrouping("", "Text")];  // Create a fresh Grouping

    const updateHabit = newHabit => { habit = newHabit; }  // Replace fresh Habit with created Habit
    const updateGrouping = newGrouping => { grouping = newGrouping; }  // Replace fresh Grouping with created Grouping

    const submissionHandler = e => {
        // Check if new Habit is correctly filled out
        // If verified then submit new Habit to the database
        // If not then inform User of their errors
        habit.updateGroup(grouping);
        console.log(habit);
        if (habit.verifyHabit()) { props.submitCreate(habit); }
        else {
            setHabit(() => habit);
            setErr(() => true);
        }
        e.preventDefault();
    }

    return (
        <>
            <h2>Create a Habit</h2>
            {(err) ? (<h3 className="error">Please fill in all Fields</h3>) : null}
            <form onSubmit={e => submissionHandler(e)}>
                {/* Create a new Habit with the fresh Habit as a base (FR9)*/}
                <HabitCreate key={"Create-Habit"} initial={habit} updateFunc={updateHabit} error={err}/>
                <hr />
                <h3>Activities</h3>
                <hr />
                {/* Create a new Grouping with the fresh Grouping as a base (FR8)*/}
                <GroupingCreate key={"Create-Habit-Grouping"} initial={grouping} updateFunc={updateGrouping} error={err}/>
                <hr />
                <button onClick={e => submissionHandler(e)} type="button">Submit</button>
            </form>
        </>
    )
}

// FR9. Create Habit
export const HabitCreate = ({initial, updateFunc, ...props}) => {
    const [habit, setHabit] = useState(initial);  // Habit being created

    const habitHandler = e => {
        setHabit(oldHabit => {
            // Create new Habit with User's input included
            const newHabit = new Habit(
                (e.target.name === "habitName") ? e.target.value : oldHabit.name, 
                (e.target.name === "habitFreq") ? e.target.value : oldHabit.frequency, 
                (e.target.name === "habitPrivacy") ? e.target.value : oldHabit.privacy,
                oldHabit.streak,
                oldHabit.completed,
                oldHabit.id
            )
            updateFunc(newHabit);  // Send new Habit back to parent
            return newHabit;
        });
    };

    return (
        <>
            <label>
                <h2>
                    {/* Input field for the Habit's name */}
                    <input type="text" 
                        required 
                        name="habitName"
                        placeholder="Habit Name"
                        className={(props.error && habit.name === "") ? "error-field" : null}
                        value={habit.name}
                        onChange={habitHandler}
                    />
                </h2>
            </label>
            <label>
                <h4>
                    {"Frequency: "} 
                    {/* Options for how frequent the User wants to do the Habit */}
                    <select
                        required
                        name="habitFreq"
                        value={habit.frequency}
                        onChange={habitHandler}>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </h4>
            </label>
            <label>
                <h4>
                    {"Privacy: "} 
                    {/* Options to let the User decide if they want to share this Habit or not */}
                    <select
                        required
                        name="habitPrivacy"
                        value={habit.privacy}
                        onChange={habitHandler}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </h4>
            </label>
        </>
    );
};

// FR8. Creat Habit Grouping
export const GroupingCreate = ({initial, updateFunc, ... props}) => {
    const [grouping, setGrouping] = useState(initial);  // Grouping being created

    const addHandler = e => {
        // A Habit can have a max of 20 Groupings
        if (grouping.length === 20) {
            alert("Maximum Habit Groupings reached");
        } else {
            setGrouping(oldGrouping => {
                const newGrouping = [...oldGrouping];
                newGrouping.push(new HabitGrouping("", "Text"));  // Add new Grouping to existing Grouping(s)
                updateFunc(newGrouping);  // Send Grouping(s) back to parent
                return newGrouping;
            });
        }
    };

    const removeHandler = (e, index) => {
        // A Habit must have at least one Grouping
        if (grouping.length === 1) {
            alert("Must have at least One Activity")
        } else {
            setGrouping(oldGrouping => {
                const newGrouping = oldGrouping.filter((_, idx) => idx != index);  // Remove selected Grouping
                updateFunc(newGrouping);  // Send updated Grouping(s) back to parent
                return newGrouping
            })
        }
    }

    const groupHandler = (e, index) => {
        setGrouping(oldGrouping => {
            const oldGroup = oldGrouping[index];  // Get Grouping that was changed
            // Create new Grouping with User input included
            const newGroup = new HabitGrouping(
                (e.target.name === "groupLabel") ? e.target.value : oldGroup.label,
                (e.target.name === "groupType") ? e.target.value : oldGroup.type,
                (e.target.name === "groupHigh") ? e.target.value : oldGroup.high,
                (e.target.name === "groupLow") ? e.target.value : oldGroup.low,
                (e.target.name === "groupInter") ? e.target.value : oldGroup.interval,
                oldGroup.hid
            );
            // Add back in existing values if Grouping is the same type
            if (newGroup.type === oldGroup.type) { newGroup.values = [...oldGroup.values]; }
            newGroup.stats = [...oldGroup.stats];  // Retain the Groupings stats
            
            const newGrouping = [...oldGrouping];
            newGrouping[index] = newGroup;  // Replace old Grouping with new Grouping
            updateFunc(newGrouping);  // Send Grouping(s) back to parent
            return newGrouping;
        })
    }

    return (
        <>
            {/* List all existing Groupings */}
            {grouping.map((group, index) => {
                return(<section key={index.toString()}>
                    <label>
                        {/* Input field for Grouping's label */}
                        <input 
                        type="text" 
                        required
                        name="groupLabel"
                        placeholder="Activity Name"
                        className={(props.error && group.label === "") ? "error-field" : null}
                        value={group.label}
                        onChange={e => groupHandler(e, index)} />
                    </label>
                    <br />
                    <label>
                        Type
                        {/* Options for a Grouping's type */}
                        <select
                        required
                        name="groupType"
                        value={group.type}
                        onChange={e => groupHandler(e, index)} >
                            {["Text", "Numerical", "Scale", "Checkmark"].map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </label>
                    {/* Input field for the upper, lower and interval when type Scale is selected */}
                    {(group.type === "Scale") ? (
                        <section>
                            <label>
                                <input 
                                type="text" 
                                required
                                name="groupHigh"
                                placeholder="Upper Bound"
                                className={(props.error && group.high === "") ? "error-field" : null}
                                value={group.high}
                                onChange={e => groupHandler(e, index)} />
                            </label>
                            <br />
                            <label>
                                <input 
                                type="text" 
                                required
                                name="groupLow"
                                placeholder="Lower Bound"
                                className={(props.error && group.low === "") ? "error-field" : null}
                                value={group.low}
                                onChange={e => groupHandler(e, index)} />
                            </label>
                            <br />
                            <label>
                                Number of Intervals
                                <input 
                                type="number" 
                                required
                                name="groupInter"
                                className={(props.error && group.interval < 2) ? "error-field" : null}
                                value={group.interval}
                                min="2"
                                max="10"
                                step="1"
                                onChange={e => groupHandler(e, index)} />
                            </label>
                        </section>
                    ) : null}
                    <br />
                    {/* Button to remove selected Grouping */}
                    <button onClick={e => removeHandler(e, index)} type="button">-</button>
                    <hr />
                </section>)
            })}
            {/* Button to add another Grouping */}
            <button onClick={addHandler} type="button">+</button>
        </>
    )
};


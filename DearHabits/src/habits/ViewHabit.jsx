import { useState } from 'react'
import { HabitCreate, GroupingCreate } from './CreateHabit.jsx'
import { Stats, Visual, Text } from './Calculations.jsx'

import './stylesheet/habits.css'

const EditMode = ({original, switchFunc, ...props}) => {
    const [err, setErr] = useState(false);
    let [updated, setUpdated] = useState(original);
    let grouping = updated.group;
    
    const updateHabit = newHabit => {
        updated = newHabit;  // Replace original Habit with updated Habit
    }

    const updateGrouping = newGrouping => {
        grouping = newGrouping;  // Replace original Groupings with updated Groupings
    }

    const deleteHabit = (e, habit) => {
        // Get User confirmation
        if (confirm(`Remove ${habit.name}\nAre You Sure?`)) {
            switchFunc() // Switch back to Viewing mode
            props.submitDelete(habit)  // Delete Habit from the database
        }
        e.preventDefault();
    }

    const submissionHandler = (e, previous) => {
        updated.updateGroup(grouping);  // Merge updated Habit with updated Grouping(s)
        if (updated.verifyHabit()) {
            props.submitUpdate(previous, updated);  // Update Habit in the database
            switchFunc() // Return to Viewing mode
        } 
        else {
            setUpdated(() => updated);
            setErr(() => true);
            e.preventDefault();
        }
        e.preventDefault();
    }

    return (
        <>
            {/* Button to switch back to Viewing mode */}
            <button type="button" onClick={switchFunc}>Cancel</button>
            {/* Error message if a field is incomplete */}
            {(err) ? (<h3 className="error">Please fill in all Fields</h3>) : null}
            {/* Create a new Habit with the old Habit as a base */}
            <HabitCreate key={`Edit-Habit-${original.name}`} initial={updated} updateFunc={updateHabit} error={err}/>
            <hr />
            <h3>{(updated.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            {/* Create new Grouping(s) with the old Grouping(s) as a base */}
            <GroupingCreate key={`Edit-Grouping-${original.name}`} initial={updated.group} updateFunc={updateGrouping} error={err}/>
            <hr />
            {/* Button to delete the Habit */}
            <button onClick={e => deleteHabit(e, original)}>Delete</button>
            {/* Button to save changed Habit to database */}
            <button onClick={e => submissionHandler(e, original)}>Save</button>
        </>
    )
};

const ViewMode = ({habit, switchFunc, ...props}) => {
    const today = new Date();  // Get today's date to add to value array
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // Format today's date

    // Create a new value for each Grouping
    const [activity, setActivity] = useState(() => habit.group.map(g => [date, (g.type === "Scale") ? 1 : ""]));

    const updateActivity = (e, index) => {
        setActivity(oldActivity => {
            const newActivity = [...oldActivity];
            // Update value for selected Grouping
            newActivity[index] = [date, (e.target.type === "checkbox") ? 1 : e.target.value];
            return newActivity;
        })
    }

    const submissionHandler = (e, habit) => {
        const newHabit = habit; // Copy original Habit's details
        // Add Groupings to new Habit
        newHabit.updateGroup(habit.group.map((g, index) => {
            // Check if a Grouping was completed and increment it's Streak if it was
            if (activity[index][1]) { g.incrementStreak(); }
            // Add new value to Grouping
            g.incrementValue(activity[index]);
            return g;
        }));
        newHabit.complete();  // Flag Habit as completed
        newHabit.incrementStreak();  // Increment Habit's Streak
        props.submitUpdate(habit, newHabit);  // Submit new Habit to database
        e.preventDefault();
    }

    return (
        <>
            {/* Button to switch between Viewing and Editing the Habit */}
            <button type="button" onClick={switchFunc}>Edit</button>
            {/* Habit's details */}
            <h2>{habit.name}</h2>
            <h3>{"Streak: " + habit.streak}</h3>
            <h4>{"Frequency: " + habit.frequency}</h4>
            <h4>{"Privacy: " + habit.privacy}</h4>
            <hr />
            <h3>{(habit.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            {/* List each of the Habit's Groupings */}
            {habit.group.map((group, index) => {
                return (
                    <section key={group.label}>
                        <h4>{group.label}</h4>
                        {(group.type === "Text") ? (
                            <label>
                                <textarea value={activity[index][1]} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                            </label>
                        ) : null}
                        {(group.type === "Numerical") ? (
                            <label>
                                <input type="number" value={activity[index][1]} step="0.1" onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                            </label>
                        ) : null}
                        {(group.type === "Scale") ? (
                            <label>
                                {group.low}
                                <input type="range" min="1" max={group.interval} step="1" value={activity[index][1]} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                                {group.high}
                            </label>
                        ) : null}
                        {(group.type === "Checkmark") ? (
                            <label>
                                <input type="checkbox" value={activity[index][1]} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                            </label>
                        ) : null}
                        <br />
                        {/* Statistics available to Grouping dependant on its type */}
                        {(group.type === "Text" || group.type === "Checkmark") ? <Stats key={`Stats-${habit.name}-${group.label}`} options={["Longest Streak"]} group={group}/> : <Stats key={`Stats-${habit.name}-${group.label}`} options={["Longest Streak", "Highest", "Lowest", "Average"]} group={group} />}
                        <br />
                        {/* Visualizations available to Grouping dependant on its type */}
                        {(group.type === "Text") ? <Text key={`Visual-${habit.name}-${group.label}`} group={group}/> : <Visual key={`Visual-${habit.name}-${group.label}`} options={group.visual} group={group}/>}
                        <hr />
                    </section>
                )
            })}
            {/* Submit Habit to the database with new values */}
            {(habit.completed) ? (<button onClick={e => submissionHandler(e, habit)} type="button" disabled={true}>Submit</button>) : (<button onClick={e => submissionHandler(e, habit)} type="button">Submit</button>)}
        </>
    );
};

const MainView = ({habit, ...props}) => {
    const [mode, setMode] = useState(false);  // Switch between Viewing and Editing the Habit

    const switchMode = e => {
        setMode(() => !mode);
    };

    return (
        <>
            <form>
                {mode ? (<EditMode key={`View-${habit.name}`} original={habit} switchFunc={switchMode} {...props}/>) : (<ViewMode key={`Edit-${habit.name}`} habit={habit} switchFunc={switchMode} {...props}/>)}
            </form>
        </>
    )
};

export default MainView;
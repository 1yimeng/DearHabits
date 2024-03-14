import { useState } from 'react'
import Habit from './classes/Habit.jsx'
import HabitGrouping from './classes/HabitGrouping.jsx'
import {HabitCreate, GroupingCreate} from './CreateHabit.jsx'

const EditMode = ({original, switchFunc, ...props}) => {
    let oldHabit = original;
    let oldGroup = original.group;
    
    const updateHabit = newHabit => {
        oldHabit = newHabit;
    }

    const updateGrouping = newGrouping => {
        oldGroup = newGrouping;
    }

    const deleteHabit = (e, habit) => {
        if (confirm(`Remove ${habit.name}\nAre You Sure?`)) {
            switchFunc()
            props.submitDelete(habit)
        }
        e.preventDefault();
    }

    const submissionHandler = (e, old, updatedHabit, updatedGroup) => {
        updatedHabit.updateGroup(updatedGroup);
        switchFunc()
        props.submitUpdate(old, updatedHabit);
        e.preventDefault();
    }

    return (
        <>
            <button type="button" onClick={switchFunc}>Cancel</button>
            <HabitCreate initial={oldHabit} updateFunc={updateHabit} />
            <hr />
            <h3>{(oldHabit.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            <GroupingCreate initial={oldHabit.group} updateFunc={updateGrouping} />
            <hr />
            <button onClick={e => (deleteHabit(e, original))}>Delete</button>
            <button onClick={e => submissionHandler(e, original, oldHabit, oldGroup)}>Save</button>
        </>
    )
};

const ViewMode = ({habit, switchFunc, ...props}) => {
    const [activity, setActivity] = useState(() => {
        return habit.group.map(g => {
            if (g.values.length > 0) { g.values.push(null); }
            return g.values;
        });
    });

    const updateActivity = (e, index) => {
        setActivity(oldActivity => {
            const newActivity = [...oldActivity];
            newActivity[index].pop();
            newActivity[index].push(e.target.value);
            return newActivity;
        })
    }

    const submissionHandler = (e, habit) => {
        const newHabit = habit;
        newHabit.updateGroup(habit.group.map((g, index) =>{
            if (activity[index][activity[index].length - 1] === null) { activity[index].pop(); }
            g.values = activity[index];
            return g;
        }));
        props.submitUpdate(habit, newHabit);
        e.preventDefault();
    }

    return (
        <>
            <button type="button" onClick={switchFunc}>Edit</button>
            <h2>{habit.name}</h2>
            <h4>{"Frequency: " + habit.frequency}</h4>
            <h4>{"Privacy: " + habit.privacy}</h4>
            <hr />
            <h3>{(habit.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            {habit.group.map((group, index) => {
                return (
                    <section key={group.label}>
                        <h4>{group.label}</h4>
                        {(group.type === "Text") ? (<textarea value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)}/>) : null}
                        {(group.type === "Numerical") ? (<input type="number" value={activity[index].slice(-1)} step="0.1" onChange={e => updateActivity(e, index)}/>) : null}
                        {(group.type === "Scale") ? (
                            <label>
                                {group.low}
                                <input type="range" min="1" max={group.interval} step="1" value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)}/>
                                {group.high}
                            </label>
                        ) : null}
                        {(group.type === "Checkmark") ? (<input type="checkbox" value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)}/>) : null}
                        <hr />
                    </section>
                )
            })}
            <button onClick={e => submissionHandler(e, habit)} type="button">Submit</button>
        </>
    );
};

const MainView = ({habit, ...props}) => {
    const [mode, setMode] = useState(false);

    const switchMode = e => {
        setMode(() => !mode);
    };

    return (
        <>
            <form>
                {mode ? (<EditMode original={habit} switchFunc={switchMode} {...props}/>) : (<ViewMode habit={habit} switchFunc={switchMode} {...props}/>)}
            </form>
        </>
    )
};

export default MainView;
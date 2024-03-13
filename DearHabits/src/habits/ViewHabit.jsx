import { useState } from 'react'
import Habit from './classes/Habit.jsx'
import HabitGrouping from './classes/HabitGrouping.jsx'
import {HabitCreate, GroupingCreate} from './CreateHabit.jsx'

const EditMode = ({habit, switchFunc, ...props}) => {
    let newHabit = new Habit("", "Daily", "Private");
    const updateHabit = newHabit => {
        newHabit = newHabit;
    }

    const updateGrouping = newGrouping => {
        newHabit.updateGroup(newGrouping);
    }

    const submissionHandler = e => {
        console.log(newHabit);
    }

    return (
        <>
            <button type="button" onClick={switchFunc}>Cancel</button>
            <HabitCreate initial={habit} updateFunc={updateHabit} />
            <hr />
            <h3>{(habit.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            <GroupingCreate initial={habit.group} updateFunc={updateGrouping} />
            <hr />
            <button onClick={e => submissionHandler()} type="button">Save</button>
        </>
    )
};

const ViewMode = ({habit, switchFunc, ...props}) => {
    const [activity, setActivity] = useState(() => {
        return habit.group.map(g => {
            g.values.push(null);
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

    const submissionHandler = e => {
        const newHabit = new Habit(habit.name, habit.frequency, habit.privacy);
        newHabit.updateGroup(habit.group.map((g, index) =>{
            if (activity[index].splice(-1) === null) { activity[index].pop(); }
            g.values = activity[index];
            return g;
        }));
        console.log(newHabit);
    }

    return (
        <>
            <button type="button" onClick={switchFunc}>Edit</button>
            <h2>{habit.name}</h2>
            <h4>{habit.frequency}</h4>
            <h4>{habit.privacy}</h4>
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
            <button onClick={e => submissionHandler(e)} type="button">Submit</button>
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
                {mode ? (<EditMode habit={habit} switchFunc={switchMode}/>) : (<ViewMode habit={habit} switchFunc={switchMode}/>)}
            </form>
        </>
    )
};

export default MainView;
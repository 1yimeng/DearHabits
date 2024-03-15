import { useState } from 'react'
import Habit from './classes/Habit.jsx'
import HabitGrouping from './classes/HabitGrouping.jsx'
import {HabitCreate, GroupingCreate} from './CreateHabit.jsx'

const Stats = ({options, group, ...props}) => {
    const [stat, setStat] = useState(options[0]);

    const changeStat = e => setStat(() => e.target.value);

    const calculateStat = type => {
        const numbers = group.values.map(num => parseFloat(num));
        if (type === "Longest Streak") { return group.stats[1]; }
        if (group.values.length === 0) { return 0; }
        if (type === "Highest") { return numbers.reduce((largest, cur) => (cur > largest) ? cur : largest); }
        if (type === "Lowest") { return numbers.reduce((lowest, cur) => (cur < lowest) ? cur : lowest); }
        if (type === "Average") { return (numbers.reduce((total, cur) => total + cur) / group.values.length); }
    }

    return (
        <>
            <select value={stat} onChange={changeStat}>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {calculateStat(stat)}
        </>
    );
};

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
        props.submitUpdate(old, updatedHabit);
        switchFunc()
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
            const temp = [...g.values]
            if (temp.length > 0) { temp.push(null); }
            return temp;
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
            (activity[index][activity[index].length - 1] === void(0)) ? activity[index].pop() : g.incrementStreak();
            g.values = activity[index];
            return g;
        }));
        newHabit.complete();
        newHabit.incrementStreak();
        props.submitUpdate(habit, newHabit);
        e.preventDefault();
    }

    return (
        <>
            <button type="button" onClick={switchFunc}>Edit</button>
            <h2>{habit.name}</h2>
            <h3>{"Streak: " + habit.streak}</h3>
            <h4>{"Frequency: " + habit.frequency}</h4>
            <h4>{"Privacy: " + habit.privacy}</h4>
            <hr />
            <h3>{(habit.group.length > 1) ? "Activities" : "Activity"}</h3>
            <hr />
            {habit.group.map((group, index) => {
                return (
                    <section key={group.label}>
                        <h4>{group.label}</h4>
                        {(group.type === "Text") ? (
                            <label>
                                <textarea value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                                <br />
                                <Stats options={["Longest Streak"]} group={group}/>
                            </label>
                        ) : null}
                        {(group.type === "Numerical") ? (
                            <label>
                                <input type="number" value={activity[index].slice(-1)} step="0.1" onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                                <br />
                                <Stats options={["Longest Streak", "Highest", "Lowest", "Average"]} group={group} />
                            </label>
                        ) : null}
                        {(group.type === "Scale") ? (
                            <label>
                                {group.low}
                                <input type="range" min="1" max={group.interval} step="1" value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                                {group.high}
                                <br />
                                <Stats options={["Longest Streak", "Highest", "Lowest", "Average"]} group={group} />
                            </label>
                        ) : null}
                        {(group.type === "Checkmark") ? (
                            <label>
                                <input type="checkbox" value={activity[index].slice(-1)} onChange={e => updateActivity(e, index)} disabled={(habit.completed) ? true : false}/>
                                <br />
                                <Stats options={["Longest Streak"]} group={group}/>
                            </label>
                        ) : null}
                        <hr />
                    </section>
                )
            })}
            {(habit.completed) ? (<button onClick={e => submissionHandler(e, habit)} type="button" disabled={true}>Submit</button>) : (<button onClick={e => submissionHandler(e, habit)} type="button">Submit</button>)}
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
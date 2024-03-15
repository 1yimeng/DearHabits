import { useState } from 'react'
import Habit from './classes/Habit.jsx'
import HabitGrouping from './classes/HabitGrouping.jsx'


const blankHabit = new Habit("", "Daily", "Private");
const blankGroup = [new HabitGrouping("", "Text")];

export const MainCreate = props => {
    let habit = new Habit("", "Daily", "Private");
    let grouping = [new HabitGrouping("", "Text")];

    const updateHabit = newHabit => {
        habit = newHabit;
    }

    const updateGrouping = newGrouping => {
        habit.updateGroup(newGrouping);
    }

    const submissionHandler = e => {
        console.log(habit);
        props.submitCreate(habit);
        e.preventDefault();
    }

    return (
        <>
            <h2>Create a Habit</h2>
            <form onSubmit={e => submissionHandler(e)}>
                <HabitCreate initial={habit} updateFunc={updateHabit} />
                <hr />
                <h3>Activities</h3>
                <hr />
                <GroupingCreate initial={grouping} updateFunc={updateGrouping} />
                <hr />
                <button onClick={e => submissionHandler()} type="button">Submit</button>
            </form>
        </>
    )
}

export const HabitCreate = ({initial, updateFunc, ...props}) => {
    const [habit, setHabit] = useState(initial);

    const formHandler = e => {
        setHabit(oldHabit => {
            const newHabit = new Habit(
                (e.target.name === "habitName") ? e.target.value : oldHabit.name, 
                (e.target.name === "habitFreq") ? e.target.value : oldHabit.frequency, 
                (e.target.name === "habitPrivacy") ? e.target.value : oldHabit.privacy,
                oldHabit.streak,
                oldHabit.completed
            )
            updateFunc(newHabit);
            return newHabit;
        });
    };

    return (
        <>
            <label>
                <h2>
                    <input type="text" 
                        required 
                        name="habitName"
                        placeholder="Habit Name"
                        value={habit.name}
                        onChange={formHandler}
                    />
                </h2>
            </label>
            <label>
                <h4>
                    {"Frequency: "} 
                    <select
                        required
                        name="habitFreq"
                        value={habit.frequency}
                        onChange={formHandler}>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </h4>
            </label>
            <label>
                <h4>
                    {"Privacy: "} 
                    <select
                        required
                        name="habitPrivacy"
                        value={Habit.privacy}
                        onChange={formHandler}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </h4>
            </label>
        </>
    );
};

export const GroupingCreate = ({initial, updateFunc, ... props}) => {
    const [grouping, setGrouping] = useState(initial);

    const addHandler = e => {
        if (grouping.length === 20) {
            alert("Maximum Habit Groupings reached");
        } else {
            setGrouping(oldGroup => {
                const newGroup = [...oldGroup];
                newGroup.push(new HabitGrouping("", "Text"));
                updateFunc(newGroup);
                return newGroup;
            });
        }
    };

    const removeHandler = (e, index) => {
        if (grouping.length === 1) {
            alert("Must have at least One Activity")
        } else {
            setGrouping(oldGrouping => {
                const newGrouping = oldGrouping.filter((_, idx) => idx != index);
                updateFunc(newGrouping);
                return newGrouping
            })
        }
    }

    const indiHandler = (e, index) => {
        setGrouping(oldGrouping => {
            const oldGroup = oldGrouping[index];
            const newGroup = new HabitGrouping(
                (e.target.name === "groupLabel") ? e.target.value : oldGroup.label,
                (e.target.name === "groupType") ? e.target.value : oldGroup.type,
                (e.target.name === "groupHigh") ? e.target.value : oldGroup.high,
                (e.target.name === "groupLow") ? e.target.value : oldGroup.low,
                (e.target.name === "groupInter") ? e.target.value : oldGroup.interval
            );
            newGroup.values = [...oldGroup.values];
            newGroup.stats = [...oldGroup.stats];
            
            const newGrouping = [...oldGrouping];
            newGrouping[index] = newGroup;
            updateFunc(newGrouping);
            return newGrouping;
        })
    }

    return (
        <>
            {grouping.map((group, index) => {
                return(<section key={index.toString()}>
                    <label>
                        <input 
                        type="text" 
                        required
                        name="groupLabel"
                        placeholder="Activity Name"
                        value={group.label}
                        onChange={e => indiHandler(e, index)} />
                    </label>
                    <br />
                    <label>
                        Type
                        <select
                        required
                        name="groupType"
                        value={group.type}
                        onChange={e => indiHandler(e, index)} >
                            <option value="Text">Text</option>
                            <option value="Numerical">Numerical</option>
                            <option value="Scale">Scale</option>
                            <option value="Checkmark">Checkmark</option>
                        </select>
                    </label>
                    {(group.type === "Scale") ? (
                        <section>
                            <label>
                                <input 
                                type="text" 
                                required
                                name="groupHigh"
                                placeholder="Upper Bound"
                                value={group.high}
                                onChange={e => indiHandler(e, index)} />
                            </label>
                            <br />
                            <label>
                                <input 
                                type="text" 
                                required
                                name="groupLow"
                                placeholder="Lower Bound"
                                value={group.low}
                                onChange={e => indiHandler(e, index)} />
                            </label>
                            <br />
                            <label>
                                Number of Intervals
                                <input 
                                type="number" 
                                required
                                name="groupInter"
                                value={group.interval}
                                min="2"
                                max="10"
                                step="1"
                                onChange={e => indiHandler(e, index)} />
                            </label>
                        </section>
                    ) : null}
                    <br />
                    <button onClick={e => removeHandler(e, index)} type="button">-</button>
                    <hr />
                </section>)
            })}
            <button onClick={addHandler} type="button">+</button>
        </>
    )
};

const CreateHabit = props => {
    const [habit, setHabit] = useState(blankHabit);
    const [grouping, setGrouping] = useState(blankGroup);

    const formHandler = e => {
        setHabit(oldHabit => new Habit(
            (e.target.name === "habitName") ? e.target.value : oldHabit.name, 
            (e.target.name === "habitFreq") ? e.target.value : oldHabit.frequency, 
            (e.target.name === "habitPrivacy") ? e.target.value : oldHabit.privacy
        ));
    };

    const groupHandler = e => {
        if (grouping.length === 20) {
            alert("Maximum Habit Groupings reached");
        } else {
            setGrouping(oldGroup => {
                const newGroup = [...oldGroup];
                newGroup.push(new HabitGrouping("", "Text"));
                return newGroup;
            });
        }
    };

    const indiHandler = (e, index) => {
        setGrouping(oldGrouping => {
            const oldGroup = oldGrouping[index];
            const newGroup = new HabitGrouping(
                (e.target.name === "groupLabel") ? e.target.value : oldGroup.label,
                (e.target.name === "groupType") ? e.target.value : oldGroup.type,
                (e.target.name === "groupHigh") ? e.target.value : oldGroup.high,
                (e.target.name === "groupLow") ? e.target.value : oldGroup.low,
                (e.target.name === "groupInter") ? e.target.value : oldGroup.interval
            );
            
            const newGrouping = [...oldGrouping];
            newGrouping[index] = newGroup;
            return newGrouping;
        })
    }

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
                     name="habitName"
                     value={habit.name}
                     onChange={formHandler}
                    />
                </label>
                <hr />
                <label>
                    Frequency 
                    <select
                     required
                     name="habitFreq"
                     value={habit.frequency}
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
                     name="habitPrivacy"
                     value={Habit.privacy}
                     onChange={formHandler}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </label>
                <hr />
                {grouping.map((group, index) => {
                    return(<section key={index.toString()}>
                        <label>
                            Label
                            <input 
                             type="text" 
                             required
                             name="groupLabel"
                             value={group.label}
                             onChange={e => indiHandler(e, index)} />
                        </label>
                        <br />
                        <label>
                            Type
                            <select
                             required
                             name="groupType"
                             value={group.type}
                             onChange={e => indiHandler(e, index)} >
                                <option value="Text">Text</option>
                                <option value="Numerical">Numerical</option>
                                <option value="Scale">Scale</option>
                                <option value="Checkmark">Checkmark</option>
                            </select>
                        </label>
                        {(group.type === "Scale") ? (
                            <section>
                                <label>
                                    Upper Bound
                                    <input 
                                    type="text" 
                                    required
                                    name="groupHigh"
                                    value={group.high}
                                    onChange={e => indiHandler(e, index)} />
                                </label>
                                <br />
                                <label>
                                    Lower Bound
                                    <input 
                                    type="text" 
                                    required
                                    name="groupLow"
                                    value={group.low}
                                    onChange={e => indiHandler(e, index)} />
                                </label>
                                <br />
                                <label>
                                    Number of Intervals
                                    <input 
                                    type="text" 
                                    required
                                    name="groupInter"
                                    value={group.interval}
                                    onChange={e => indiHandler(e, index)} />
                                </label>
                            </section>
                        ) : null}
                        <hr />
                    </section>)
                })}
                <button onClick={groupHandler}>+</button>
                <hr />
                <input type="submit" />
            </form>
        </>
    )
}

const HabitPost = ({habit, ...props}) => {
    // Snapshot of a completed Habit that is set to be shared with friends
    // Only shows the latest value, not any older values
    return (
        <>
            <h2>{habit.name}</h2>
            <h3>{"Streak: " + habit.streak}</h3>
            <h4>{"Frequency: " + habit.frequency}</h4>
            <hr />
            <h3>{(habit.group.length > 1) ? "Activities" : "Activity"}</h3>
            {habit.group.map((group, index) => {
                return (
                    <section key={group.label}>
                        <h4>{group.label}</h4>
                        {(group.type === "Text") ? (
                            <label>
                                <textarea value={group.value.at(-1)[1]} disabled={true}/>
                            </label>
                        ) : null}
                        {(group.type === "Numerical") ? (
                            <label>
                                <input type="number" value={group.value.at(-1)[1]} disabled={true}/>
                            </label>
                        ) : null}
                        {(group.type === "Scale") ? (
                            <label>
                                {group.low}
                                <input type="range" min="1" max={group.interval} step="1" value={group.value.at(-1)[1]} disabled={true}/>
                                {group.high}
                            </label>
                        ) : null}
                        {(group.type === "Checkmark") ? (
                            <label>
                                <input type="checkbox" value={group.value.at(-1)[1]} disabled={true}/>
                            </label>
                        ) : null}
                        <hr />
                    </section>
                )
            })}
        </>
    );
}

export default HabitPost;
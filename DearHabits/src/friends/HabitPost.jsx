import { useState } from "react";
import Facebook from "./ReactionCounter.jsx";

// FR16. View Feed
export const HabitPost = ({ habit, ...props }) => {
  // Snapshot of a completed Habit that is set to be shared with friends (FR16)
  // Only shows the latest value, not any older values
  return (
    <>
      <h2>{habit.name}</h2>
      {(habit.streak >= 3) ? <h3>{"Streak: " + habit.streak}</h3> : null}
      <h4>{"Frequency: " + habit.frequency}</h4>
      <hr />
      <h3>{habit.group.length > 1 ? "Activities" : "Activity"}</h3>
      {habit.group.map((group, index) => {
        return (
          <section key={`${group.label}-${index}`}>
            <h4>{group.label}</h4>
            {group.type === "Text" ? (
              <label>
                <textarea
                  value={
                    group.values.length === 0 ? "" : group.values.at(-1)[1]
                  }
                  disabled={true}
                />
              </label>
            ) : null}
            {group.type === "Numerical" ? (
              <label>
                <input
                  type="number"
                  value={
                    group.values.length === 0 ? "0" : group.values.at(-1)[1]
                  }
                  disabled={true}
                />
              </label>
            ) : null}
            {group.type === "Scale" ? (
              <label>
                {group.high}
                <input
                  type="range"
                  min="1"
                  max={group.interval}
                  step="1"
                  value={group.values.length === 0 ? 1 : group.values.at(-1)[1]}
                  disabled={true}
                />
                {group.low}
              </label>
            ) : null}
            {group.type === "Checkmark" ? (
              <label>
                <input
                  type="checkbox"
                  value={
                    group.values.length === 0 ? "" : group.values.at(-1)[1]
                  }
                  disabled={true}
                />
              </label>
            ) : null}
            <hr />
          </section>
        );
      })}
    </>
  );
};

// FR16. View Feed, FR17. React to Friend's Post
export const Feed = ({ shared, ...props }) => {
  // Map all Posts to a HabitPost (FR16)
  const [feed, setFeed] = useState(() => {
    return shared.map((habit) => {
      return (
        <section
          key={`${habit[0]}-${habit[1].name}`}
          className={props.className}
        >
          <h3>{habit[0]}</h3>
          <HabitPost habit={habit[1]} />
          <br />
          {/* Display all reactions to Post and allow Users to add their own reactions (FR17) */}
          <Facebook counters={habit[2]} pid={habit[3]}></Facebook>
        </section>
      );
    });
  });

  // Display all Posts (FR16)
  return <>{feed}</>;
};

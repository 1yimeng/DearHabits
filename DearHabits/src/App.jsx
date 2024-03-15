import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import CreateHabit from './habits/CreateHabit'
import { MainCreate } from './habits/CreateHabit'
import MainView from './habits/ViewHabit'

import Habit from './habits/classes/Habit'
import HabitGrouping from './habits/classes/HabitGrouping'
import ListHabits from './habits/ListHabits'
import Home from './Home'

const group = [new HabitGrouping("Running", "Numerical"), 
               new HabitGrouping("Mood", "Scale", "Good", "Bad", 3), 
               new HabitGrouping("Weights", "Text"),
               new HabitGrouping("Plank", "Checkmark")];
const habit = new Habit("Exercise", "Weekly", "Private");
const habits = [habit, new Habit("Sleep", "Daily", "Private"), new Habit("Eating", "Daily", "Public")];
group[0].values = ["2", "5", "3", "6"];
habit.updateGroup(group);

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <section>
        {/* <MainCreate />
        <MainView habit={habit} /> */}
        {/* <ListHabits habits={habits} /> */}
        <Home habits={habits} />
      </section>
    </>
  )
}

export default App

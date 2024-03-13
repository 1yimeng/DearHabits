import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import CreateHabit from './habits/CreateHabit'
import { MainCreate } from './habits/CreateHabit'
import MainView from './habits/ViewHabit'

import Habit from './habits/classes/Habit'
import HabitGrouping from './habits/classes/HabitGrouping'

const group = [new HabitGrouping("Running", "Numerical"), 
               new HabitGrouping("Mood", "Scale", "Good", "Bad", 3), 
               new HabitGrouping("Weights", "Text"),
               new HabitGrouping("Plank", "Checkmark")];
const habit = new Habit("Exercise", "Daily", "Private");
habit.updateGroup(group);

const ServerConnector = props => {
  const [data, setData] = useState([])
  useEffect(()=>{
    // see server.jsx in Backend - this port is hardcoded
    // to access localhost database
    fetch('http://localhost:8081/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setData(data)
    })
    .catch(err => console.log(err));
  }, [])
  return (
    <div>
      {/* inline style used during testing - can be moved later
          see Databases.md for an idea of what this comes up with
      */}
      <table style={{margin:"50px", width: "50%", border: "1px solid black", textAlign: "center"}}>
        <thead>
          <tr>
            <th style={{width: "25%", border: "1px solid black"}}>Email</th>
            <th style={{width: "25%", border: "1px solid black"}}>Password</th>
            <th style={{width: "25%", border: "1px solid black"}}>Notification Time</th>
            <th style={{width: "25%", border: "1px solid black"}}>Notification Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry => 
            <tr key={entry.id}>
              <td style={{border: "1px solid black"}}>{entry.Email}</td>
              <td style={{border: "1px solid black"}}>{entry.PasswordHash}</td>
              <td style={{border: "1px solid black"}}>{entry.Notif_Send_Time}</td>
              <td style={{border: "1px solid black"}}>{entry.Notif_Frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 

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
        {/* <CreateHabit /> */}
        <MainCreate />
        <MainView habit={habit} />
      </section>
      {/* Comment this part out for now */}
      <section>
        <ServerConnector/>
      </section>
    </>
  )
}

export default App

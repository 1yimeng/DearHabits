import { useState } from 'react'
import HabitPage from './habits/HabitPage';
import Profile from './profile/Profile';

import './Hotbar.css'

const Hotbar = props => {
    const [page, setPage] = useState("Habits");
    const changePage = e => setPage(() => e.target.name);

    const showPage = selected => {
        console.log(selected);
        if (selected === "Habits") {return (<HabitPage key={"Habits"} habits={props.habits} className="flex-body"/>); }
        if (selected === "Friends") { return (<>Friends</>); }
        if (selected === "Feed") { return (<>Feed</>); }
        if (selected === "Profile") { return (<Profile />); }
    }

    return (
        <div className="flex appearance">
            <section className="flex-header">
                <div className='hotbar'>
                    {["Habits", "Friends", "Profile"].map(cur => <button key={cur} name={cur} onClick={e => changePage(e)}>{cur}</button>)}
                </div>
            </section>
            <section className="flex-body">
                {showPage(page)}
            </section>
        </div>

    )
}

export default Hotbar;
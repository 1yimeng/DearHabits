import { useState } from 'react'
import HabitPage from './habits/HabitPage.jsx';
import FriendPage from './friends/FriendPage.jsx';
import Profile from './profile/Profile.jsx';

import './Hotbar.css'

const Hotbar = props => {
    const [page, setPage] = useState("Habits");
    const changePage = e => setPage(() => e.target.name);

    const showPage = selected => {
        if (selected === "Habits") {return (<HabitPage key={"Habits"} className="flex-body"/>); }
        if (selected === "Friends") { return (<FriendPage key={"Friends"} friends={[["Ralph", 1], ["Yi Meng", 1], ["Jordan", 0]]} requests={["Josh", "Alphonso", "Harrison"]} className="flex-body"/>); }
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
import { useState } from 'react'
import HabitPage from './habits/HabitPage.jsx';
import FriendPage from './friends/FriendPage.jsx'
import Profile from './profile/Profile.jsx';

import './Hotbar.css'

const Hotbar = props => {
    const [page, setPage] = useState("Habits");
    const changePage = e => setPage(() => e.target.name);

    const showPage = selected => {
        // Responsible for displaying FR8. Creat Habit Grouping, FR9. Create Habit, FR10. View Habit, FR11. Delete Habit, FR12. Edit Habit,
        // FR13. Toggle Statistics, FR14. Select Visualization, FR15. Share Public Habit with Friends, FR18. Update Streak
        if (selected === "Habits") {return (<HabitPage key={"Habits"} className="flex-body"/>); }
        // Responsible for displaying FR4. Search Friends, FR5. Send Friends Request, FR6. Decide Friends Request, FR7. Remove Friend,
        // FR16. View Feed, FR17. React to Friend's Post
        if (selected === "Friends") { return (<FriendPage key={"Friends"} className="flex-body"/>); }
        // Responsible for displaying FR3. Change Password and FR20. Set Notifications
        if (selected === "Profile") { return (<Profile key={"Profile"}/>); }
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
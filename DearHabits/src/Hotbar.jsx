import { useState } from 'react'
import Home from './Home';

const Hotbar = props => {
    const [page, setPage] = useState("Habits");
    const changePage = e => setPage(() => e.target.name);

    const showPage = selected => {
        console.log(selected);
        if (selected === "Habits") {return (<Home habits={props.habits} />); }
        if (selected === "Friends") { return (<>Friends</>); }
        if (selected === "Feed") { return (<>Feed</>); }
        if (selected === "Profile") { return (<>Profile</>); }
    }

    return (
        <>
            <section>
                {["Habits", "Friends", "Profile"].map(cur => <button key={cur} name={cur} onClick={e => changePage(e)}>{cur}</button>)}
            </section>
            <section>
                {showPage(page)}
            </section>
        </>

    )
}

export default Hotbar;
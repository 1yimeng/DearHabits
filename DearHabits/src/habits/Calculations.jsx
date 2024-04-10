import { useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

import './stylesheet/habits.css'

Chart.register(CategoryScale);

// FR10. View Habit, FR13. Toggle Statistics
export const Stats = ({options, group, ...props}) => {
    const [stat, setStat] = useState(options[0]);  // Set which state to display

    const changeStat = e => setStat(() => e.target.value);

    // Output the stat determined by input (FR13)
    const calculateStat = type => {
        const numbers = group.values.map(num => parseFloat(num[1]));
        if (type === "Longest Streak") { return group.stats[1]; }
        if (group.values.length === 0) { return 0; }
        if (type === "Highest") { return numbers.reduce((largest, cur) => (cur > largest) ? cur : largest); }
        if (type === "Lowest") { return numbers.reduce((lowest, cur) => (cur < lowest) ? cur : lowest); }
        if (type === "Average") { return (numbers.reduce((total, cur) => total + cur) / group.values.length).toFixed(2); }
    }

    // Display option to switch statistics and output the selected statistic (FR10)
    return (
        <>
            {/* List available stats for this habit grouping (FR13)*/}
            <select value={stat} onChange={changeStat} className="inputs">
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {/* Output the chosen stat (FR10 and FR13)*/}
            {calculateStat(stat)}
        </>
    );
};

// FR10. View Habit, FR14. Select Visualization
export const Visual = ({options, group, ...props}) => {
    const [visual, setVisual] = useState(options[0]);  // Set which type of visualization to display
    const [freq, setFreq] = useState("Daily");  // Set which time frame of visualization

    const calculateData = type => {
        let data = [];
        // Get the data of each day
        if (type === "Daily") {
            data = [...group.values];
        // Get the sum of the data for each week
        } else if (type === "Weekly") {
            const week = 1000*60*60*24*7;  // The number of milliseconds in a week
            let day = new Date();  // Define the variable
            const timezone = day.getTimezoneOffset();
            group.values.forEach((value, index) => {
                const date = new Date((new Date(value[0])).getTime() + timezone*60*1000);  // Get the day of the value
                // Add new week if it's the beginning of the list or if more than 7 days have passed
                if (index === 0 || (date - day >= week)) { 
                    // Get the start of the week
                    day = new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)));
                    // Get the end of the week
                    const end = new Date(date.setDate(date.getDate() + 6));
                    // Add the new week to the data
                    data.push([`${day.toLocaleDateString('en-CA')}/${end.getDate()}`, parseFloat(value[1])])
                } else {
                    data.at(-1)[1] += parseFloat(value[1]);
                }
            });
        // Get the sum of the data for each month
        } else {
            group.values.forEach(value => {
                const month = value[0].slice(0, value[0].lastIndexOf('-'));
                // Check if month is already in dataset, if not then add it to dataset
                if (data.length === 0 || month != data.at(-1)[0]) {
                    data.push([month, parseFloat(value[1])]);
                // Add value to the month's total
                } else {
                    data.at(-1)[1] += parseFloat(value[1]);
                }
            });
        }

        // Dataset for visualization
        return {
            labels: data.map(value => value[0]),
            datasets: [{
                label: `${group.label}`, 
                data: data.map(value => (value[1]) ? parseFloat(value[1]) : 0),
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    }

    const calculateVisual = (type, time) => { 
        const data = calculateData(time);  // Get dataset in the proper time frame
        // Output the visualization in the selected type (FR14)
        if (type === "Line") { return (<Line data={data} />); }
        if (type === "Bar") { return (<Bar data={data} />); }
        if (type === "Pie") { return (<Pie data={data} />)}
    }

    const changeVisual = e => setVisual(() => e.target.value);
    const changeFreq = e => setFreq(() => e.target.value);

    // Display option to switch visualizations and output the selected visualization (FR10)
    return (
        <>
            {/* Visualization options available to Grouping (FR14)*/}
            <select onChange={changeVisual} className="inputs">
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {/* Time frame options for the visualization (FR14)*/}
            <select onChange={changeFreq} className="inputs">
                {["Daily", "Weekly", "Monthly"].map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <br />
            {/* Output the selected visualization in the selected time frame (FR10 and FR14)*/}
            <div className="graphs">
                {calculateVisual(visual, freq)}
            </div>
        </>
    );
};

// FR10. View Habit
export const Text = ({group, ...props}) => {
    // List all messages for a Text type of Grouping
    const data = [...group.values].filter(value => value[1]);  // Only show days where a message was recorded
    return (
        <>
            <table className="graphs">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(value => {
                        return (
                            <tr key={value[0]}>
                                <td>{value[0]}</td>
                                <td>{value[1]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}
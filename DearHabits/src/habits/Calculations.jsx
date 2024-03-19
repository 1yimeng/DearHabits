import { useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

import './stylesheet/habits.css'

Chart.register(CategoryScale);

export const Stats = ({options, group, ...props}) => {
    const [stat, setStat] = useState(options[0]);  // Set which state to display

    const changeStat = e => setStat(() => e.target.value);

    // Output the stat determined by input
    const calculateStat = type => {
        const numbers = group.values.map(num => parseFloat(num[1]));
        if (type === "Longest Streak") { return group.stats[1]; }
        if (group.values.length === 0) { return 0; }
        if (type === "Highest") { return numbers.reduce((largest, cur) => (cur > largest) ? cur : largest); }
        if (type === "Lowest") { return numbers.reduce((lowest, cur) => (cur < lowest) ? cur : lowest); }
        if (type === "Average") { return (numbers.reduce((total, cur) => total + cur) / group.values.length); }
    }

    return (
        <>
            {/* List available stats for this habit grouping */}
            <select value={stat} onChange={changeStat} className="inputs">
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {/* Output the chosen stat */}
            {calculateStat(stat)}
        </>
    );
};

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
            let day = 0;
            group.values.forEach(value => {
                // Start of a week
                if (day === 0) { data.push([value[0], parseFloat(value[1])]);} 
                // End of a week
                else if (day === 6) {
                    data.at(-1)[1] += parseFloat(value[1]);
                    data.at(-1)[0] += `/${value[0].slice(value[0].lastIndexOf('-') + 1)}`;
                    day = -1; } 
                // Between start and end of a week
                else { data.at(-1)[1] += parseFloat(value[1]); }
                day++;  // Move through each a week
            });
            if (data.length > 0) { data.at(-1)[0] += "/Today"; }
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
        // Output the visualization in the selected type
        if (type === "Line") { return (<Line data={data} />); }
        if (type === "Bar") { return (<Bar data={data} />); }
        if (type === "Pie") { return (<Pie data={data} />)}
    }

    const changeVisual = e => setVisual(() => e.target.value);
    const changeFreq = e => setFreq(() => e.target.value);

    return (
        <>
            {/* Visualization options available to Grouping */}
            <select onChange={changeVisual} className="inputs">
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {/* Time frame options for the visualization */}
            <select onChange={changeFreq} className="inputs">
                {["Daily", "Weekly", "Monthly"].map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <br />
            {/* Output the selected visualization in the selected time frame */}
            <div className="graphs">
                {calculateVisual(visual, freq)}
            </div>
        </>
    );
};

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
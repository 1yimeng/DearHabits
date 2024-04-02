export default class HabitGrouping {
    #hid;
    #label;  // Name of the Grouping
    #type;  // What task the User wants to do for the Grouping

    #low;  // Lower end for the Scale type
    #high;  // Higher end for the Scale type
    #interval;  // How many steps between the Lower and Higher bound for the Scale type
    
    #visual = [];
    #stats = [0, 0];  // Current Streak and Highest Streak of consecutive completion
    #values = [];  // 2D array for User's data containing the date and inputted value

    constructor(label, type, high="", low="", interval=2, hid=-1) {
        this.#label = label;
        this.#type = type;
        this.#low = low;
        this.#high = high;
        this.#interval = interval;
        this.#hid = hid;
        this.determineVisual();
    }

    verifyGrouping = () => {
        if (this.#label === "") { return false; }
        else if (this.#type === "Scale") {
            if (this.#low === "" || this.#high === "" || this.#interval < 2) {
                return false;
            }
        }
        return true;
    };

    get hid() { return this.#hid; }

    get label() { return this.#label; }
    set label(label) { this.#label = label; }

    get type() { return this.#type; }
    set type(type) { 
        this.#type = type; 
        this.determineVisual();
    }

    get high() { return this.#high; }
    set high(high) { this.#high = high; }

    get low() { return this.#low; }
    set low(low) { this.#low = low; }

    get interval() { return this.#interval; }
    set interval(interval) { this.#interval = interval; }

    get visual() { return this.#visual; }
    // Determine which type(s) of visualization a Grouping can have dependent on it's typing
    determineVisual = () => {
        if (this.#type === "Numerical") { this.#visual = ["Line", "Bar"]; }
        else if (this.#type === "Scale") { this.#visual = ["Line", "Bar", "Pie"]; }
        else if (this.#type === "Checkmark") { this.#visual = ["Line"]; }
    }

    get stats() { return this.#stats; }
    set stats(stats) { this.#stats = stats; }
    // Increase the current Streak and check if it exceeds the maximum Streak
    incrementStreak() {
        this.#stats[0]++;
        if (this.#stats[0] > this.#stats[1]) { this.#stats[1] = this.#stats[0]; }
    }
    // Reset groupings streak if not completed
    resetStreak() { this.#stats[0] = 0; }

    get values() { return this.#values; }
    set values(values) { this.#values = values; }
    // Add a new value to existing value array
    incrementValue = value => this.#values.push(value);
    valueJSON = () => { 
        const json = {};
        this.#values.forEach(value => json[`${value[0]}`] = value[1]) 
        return json;
    };
    JSONValue = (json) => { this.#values = Object.keys(json).map(key => [key, json[key]]) };

    getGroupingInfo = id => {
        return {
            "Hid": (this.#hid === -1) ? id : this.#hid,
            "Label": this.#label,
            "Type": this.#type,
            "Lower_Bound": this.#low,
            "Upper_Bound": this.#high,
            "Num_Intervals": this.#interval,
            "Values": this.valueJSON(),
            "Streak_Num": this.#stats[0],
            "Longest_Streak": this.#stats[1]
        };
    }
}
export default class HabitGrouping {
    #label;  // Name of the Grouping
    #type;  // What task the User wants to do for the Grouping

    #low;  // Lower end for the Scale type
    #high;  // Higher end for the Scale type
    #interval;  // How many steps between the Lower and Higher bound for the Scale type
    
    #visual = [];
    #stats = [0, 0];  // Current Streak and Highest Streak of consecutive completion
    #values = [];  // 2D array for User's data containing the date and inputted value

    constructor(label, type, high="", low="", interval=2) {
        this.#label = label;
        this.#type = type;
        this.#low = low;
        this.#high = high;
        this.#interval = interval;
        this.determineVisual();
    }

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

    get values() { return this.#values; }
    set values(values) { this.#values = values; }
    // Add a new value to existing value array
    incrementValue = value => this.#values.push(value);
}
export default class Habit {
    #id;
    #name;  // Name of the Habit
    #freq;  // How often the User wants to complete the Habit
    #privacy;  // Who can see the Habit, only the User or also their Friends
    #streak;  // How many times the User has completed consecutively
    #completed;  // If the User has submitted the Habit
    #grouping = [];  // The tasks/activities of the Habit

    constructor(name, freq, privacy, streak=0, completed=false, id=-1) {
        this.#name = name;
        this.#freq = freq;
        this.#privacy = privacy;
        this.#streak = streak;
        this.#completed = completed;
        this.#id = id;
    }

    verifyHabit = () => {
        if (this.#name === "") { return false; }
        else if (this.#grouping.filter(group => !group.verifyGrouping()).length > 0) { return false; }
        return true;
    };

    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get name() { return this.#name; }
    set name(name) { this.#name = name; }

    get frequency() { return this.#freq; }
    set frequency(freq) { this.#freq = freq; }

    get privacy() { return this.#privacy; }
    set privacy(privacy) { this.#privacy = privacy; }

    get completed() { return this.#completed; }
    set completed(completed) { this.#completed = completed; }
    // Complete the Habit so that it can't be repeated until reset
    complete() { this.#completed = true; }

    get streak() { return this.#streak; }
    set streak(streak) { this.#streak = streak; }
    // Add one to the consecutive completions of the Habit
    incrementStreak = () => this.#streak++;
    // Resets Streak to zero when User misses completing the Habit
    resetStreak = () => this.#streak = 0;

    get group() { return this.#grouping; }
    // Adds a single grouping to the existing Habit
    addGroup = grouping => this.#grouping.push(grouping);
    // Remove the selected Grouping from the Habit
    delGroup = grouping => this.#grouping.filter(group => group.Label() != grouping.Label());
    // Replace the Habit's groupings entirely
    updateGroup = grouping => this.#grouping = grouping;

    getHabitInfo = (user) => {
        return {
            User_Name: user,
            Name: this.#name,
            Privacy: this.#privacy,
            Frequency: this.#freq,
            Streak_Num: this.#streak,
            Is_Completed: this.#completed,
            Id: this.#id
        };
    }
    getGroupsInfo = () => {
        let count = 1;
        let resp = {};
        this.#grouping.forEach( group => {
            resp[count] = group.getGroupingInfo(this.#id);
            count++;
        });
        resp["count"] = count;
        return resp;
    }
}
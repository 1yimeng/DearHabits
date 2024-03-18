export default class Habit {
    #name;  // Name of the Habit
    #freq;  // How often the User wants to complete the Habit
    #privacy;  // Who can see the Habit, only the User or also their Friends
    #streak;  // How many times the User has completed consecutively
    #completed;  // If the User has submitted the Habit
    #grouping = [];  // The tasks/activities of the Habit

    constructor(name, freq, privacy, streak=0, completed=false) {
        this.#name = name;
        this.#freq = freq;
        this.#privacy = privacy;
        this.#streak = streak;
        this.#completed = completed;
    }

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
}
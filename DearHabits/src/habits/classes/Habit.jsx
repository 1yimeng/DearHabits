export default class Habit {
    #name;
    #freq;
    #privacy;
    #streak = 0;
    #grouping = [];

    constructor(name, freq, privacy) {
        this.#name = name;
        this.#freq = freq;
        this.#privacy = privacy;
    }

    get name() { return this.#name; }
    set name(name) { this.#name = name; }

    get frequency() { return this.#freq; }
    set frequency(freq) { this.#freq = freq; }

    get privacy() { return this.#privacy; }
    set privacy(privacy) { this.#privacy = privacy; }

    get streak() { return this.#streak; }
    incrementStreak = () => this.#streak++;
    resetStreak = () => this.#streak = 0;

    get group() { return this.#grouping; }
    addGroup = grouping => this.#grouping.push(grouping);
    delGroup = grouping => this.#grouping.filter(group => group.Label() != grouping.Label());
    updateGroup = grouping => this.#grouping = grouping;
}
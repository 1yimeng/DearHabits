export default class Habit {
    constructor(name, freq, privacy) {
        this.name = name;
        this.freq = freq;
        this.privacy = privacy;
        
        this.streak = 0;
        this.grouping = [];
    }

    get Name() { return this.name; }
    set Name(name) { this.name = name; }

    get Frequency() { return this.freq; }
    set Frequency(freq) { this.freq = freq; }

    get Privacy() { return this.privacy; }
    set Privacy(privacy) { this.privacy = privacy; }

    get Streak() { return this.streak; }
    incrementStreak = () => this.streak++;
    resetStreak = () => this.streak = 0;

    get Group() { return this.grouping; }
    addGroup = grouping => this.grouping.push(grouping);
    delGroup = grouping => this.grouping.filter(group => group.Label() != grouping.Label());
    updateGroup = grouping => this.grouping = grouping;
}
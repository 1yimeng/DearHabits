export default class HabitGrouping {
    constructor(label, type, low=null, high=null, interval=null) {
        this.label = label;
        this.type = type;
        this.low = low;
        this.high = high;
        this.interval = interval;

        this.visual = null;
        this.stats = [];
        this.value = [];
    }

    get label() { return this.label; }
    set label(label) { this.label = label; }

    get type() { return this.type; }
    changeType = (type, low=null, high=null, interval=null) => {
        this.type = type;
        this.low = low;
        this.high = high;
        this.interval = interval;
    }

    get Visual() { return this.visual; }
    set Visual(visual) { this.visual = visual; }

    get Stats() { return this.stats; }
    set Stats(stats) { this.stats = stats; }

    get Value() { return this.value; }
    incrementValue = value => this.value.push(value);
}
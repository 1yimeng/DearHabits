export default class HabitGrouping {
    #label;
    #type;

    #low;
    #high;
    #interval;
    
    #visual;
    #stats = [0, 0];
    #values = [];
    constructor(label, type, high="", low="", interval=2) {
        this.#label = label;
        this.#type = type;
        this.#low = low;
        this.#high = high;
        this.#interval = interval;
    }

    get label() { return this.#label; }
    set label(label) { this.#label = label; }

    get type() { return this.#type; }
    set type(type) { this.#type = type; }

    get high() { return this.#high; }
    set high(high) { this.#high = high; }

    get low() { return this.#low; }
    set low(low) { this.#low = low; }

    get interval() { return this.#interval; }
    set interval(interval) { this.#interval = interval; }

    get visual() { return this.#visual; }
    set visual(visual) { this.#visual = visual; }

    get stats() { return this.#stats; }
    incrementStreak() {
        this.#stats[0]++;
        if (this.#stats[0] > this.#stats[1]) { this.#stats[1] = this.#stats[0]; }
    }

    get values() { return this.#values; }
    set values(values) { this.#values = values; }
    incrementValue = value => this.#values.push(value);
}
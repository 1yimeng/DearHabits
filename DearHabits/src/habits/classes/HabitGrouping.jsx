export default class HabitGrouping {
    #label;
    #type;

    #low;
    #high;
    #interval;
    
    #visual;
    #stats = [];
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
    set stats(stats) { this.#stats = stats; }

    get values() { return this.#values; }
    set values(values) { this.#values = values; }
    incrementValue = value => this.#values.push(value);
}
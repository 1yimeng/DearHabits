export default class HabitGrouping {
    #label;
    #type;

    #low;
    #high;
    #interval;
    
    #visual;
    #stats = [];
    #values = [];
    constructor(label, type, low=null, high=null, interval=null) {
        this.#label = label;
        this.#type = type;
        this.#low = low;
        this.#high = high;
        this.#interval = interval;
    }

    get label() { return this.#label; }
    set label(label) { this.#label = label; }

    get type() { return this.#type; }
    changeType = (type, low=null, high=null, interval=null) => {
        this.#type = type;
        this.#low = low;
        this.#high = high;
        this.#interval = interval;
    }
    getScale = () => [this.#low, this.#high, this.#interval];

    get visual() { return this.#visual; }
    set visual(visual) { this.#visual = visual; }

    get stats() { return this.#stats; }
    set stats(stats) { this.#stats = stats; }

    get values() { return this.#values; }
    incrementValue = value => this.#values.push(value);
}
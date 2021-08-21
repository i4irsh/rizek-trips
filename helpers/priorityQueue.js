class PriorityQueue {

    #locations = [];

    enqueue(location, weight) {
        this.#locations.push({ location, weight });
        this.sort();
    }
    dequeue() {
        return this.#locations.shift();
    }
    hasValue() {
        return this.#locations.length !== 0;
    }
    sort() {
        this.#locations.sort((a, b) => a.weight - b.weight);
    }
}

module.exports = PriorityQueue;

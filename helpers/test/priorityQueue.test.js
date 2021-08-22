const PriorityQueue = require('../priorityQueue')

it('Check if Queue is empty', () => {
    let pq = new PriorityQueue();
    expect(pq.hasValue()).toBe(false);
});

it('Check if Queue is not empty after adding single item', () => {
    let pq = new PriorityQueue();
    pq.enqueue("London", 2);
    expect(pq.hasValue()).toBe(true);
});

it('Check if Queue is empty after adding & then removing single item', () => {
    let pq = new PriorityQueue();
    pq.enqueue("London", 2);
    expect(pq.hasValue()).toBe(true);
    pq.dequeue();
    expect(pq.hasValue()).toBe(false);
});

it('Check if Queue is dequeued based on weight, after adding 2 items', () => {
    let pq = new PriorityQueue();
    pq.enqueue("London", 2);
    pq.enqueue("Amsterdam", 3);
    expect(pq.dequeue().location).toBe("London");
});

it('Check if Queue is dequeued based on weight, after adding more than 2 items', () => {
    let pq = new PriorityQueue();
    pq.enqueue("Chennai", 4);
    pq.enqueue("Amsterdam", 2);
    pq.enqueue("London", 1);
    pq.enqueue("Dubai", 5);
    expect(pq.dequeue().location).toBe("London");
});


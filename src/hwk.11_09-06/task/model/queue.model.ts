/**
 * FIFO principle
 * Usages: Kafka Topics, Function Call and Task Scheduling, Different Queues, BFS, Buffering
 */
// P1.2
export class Queue<T> {
	private items: T[];

	constructor() {
		this.items = [];
	}

	// Enqueue an element at the back of the queue
	public enqueue(item: T): void {
		this.items.push(item);
	}

	// Dequeue and return the front element from the queue
	public dequeue(): T | undefined {
		if (this.isEmpty()) {
			return undefined; // when Queue is empty
		}
		return this.items.shift();
	}

	// Peek at the front element without removing it
	public peek(): T | undefined {
		if (this.isEmpty()) {
			return undefined; // when Queue is empty
		}
		return this.items[0];
	}

	// Check if the queue is empty
	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	// Get the size of the queue
	public size(): number {
		return this.items.length;
	}

	// Clear the queue
	public clear(): void {
		this.items = [];
	}
}

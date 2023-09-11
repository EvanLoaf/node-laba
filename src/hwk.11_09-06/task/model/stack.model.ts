/**
 * LIFO principle
 * Usages: Function Call and Task Scheduling, Browser History, etc
 */
// P1.1
export class Stack<T> {
	private items: T[];

	constructor() {
		this.items = [];
	}

	// Push an element onto the stack
	public push(item: T): void {
		this.items.push(item);
	}

	// Pop the top element from the stack and return it
	public pop(): T | undefined {
		if (this.isEmpty()) {
			return undefined; // when Stack is empty
		}
		return this.items.pop();
	}

	// Peek at the top element without removing it
	public peek(): T | undefined {
		if (this.isEmpty()) {
			return undefined; // when Stack is empty
		}
		return this.items[this.items.length - 1];
	}

	// Check if the stack is empty
	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	// Get the size of the stack
	public size(): number {
		return this.items.length;
	}

	// Clear the stack
	public clear(): void {
		this.items = [];
	}
}

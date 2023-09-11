import { Stack } from '../model/stack.model';

/**
 * Purpose: O(1) to get Min/Max elements
 * Drawback: additional memory usage
 */
// P2.1
export class MinMaxStack {
	private readonly stack: Stack<number>;
	private readonly minStack: Stack<number>;
	private readonly maxStack: Stack<number>;

	constructor() {
		this.stack = new Stack<number>();
		this.minStack = new Stack<number>();
		this.maxStack = new Stack<number>();
	}

	// Push an element onto the stack
	public push(item: number): void {
		this.stack.push(item);
		// Update the min stack
		if (this.minStack.size() === 0 || item <= this.getMin()) {
			this.minStack.push(item);
		}
		// Update the max stack
		if (this.maxStack.size() === 0 || item >= this.getMax()) {
			this.maxStack.push(item);
		}
	}

	// Pop the top element from the stack
	public pop(): number | undefined {
		if (this.stack.isEmpty()) {
			return undefined;
		}
		const poppedItem: number = this.stack.pop();
		// Pop from the min stack if the item is the minimum
		if (poppedItem === this.getMin()) {
			this.minStack.pop();
		}
		// Pop from the max stack if the item is the maximum
		if (poppedItem === this.getMax()) {
			this.maxStack.pop();
		}
		return poppedItem;
	}

	// Get the minimum element in the stack
	public getMin(): number | undefined {
		return this.minStack.peek();
	}

	// Get the maximum element in the stack
	public getMax(): number | undefined {
		return this.maxStack.peek();
	}
}

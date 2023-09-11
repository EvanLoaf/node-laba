import { LinkedListNode } from './linked-list-node.model';

/**
 * Purposes: Efficient Insert and Delete, Dynamic Size, Efficient Memory Usage
 * Drawback: Slow Read
 */
// P1.5
export class LinkedList<T> {
	private head: LinkedListNode<T> | null;
	private tail: LinkedListNode<T> | null;

	constructor() {
		this.head = null;
		this.tail = null;
	}

	// Insert a new node at the end of the linked list
	insert(value: T): void {
		const newNode: LinkedListNode<T> = new LinkedListNode(value);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}

	// Delete a node with a specific value from the linked list
	delete(value: T): void {
		if (!this.head) {
			return; // when Linked list is empty
		}

		if (this.head.value === value) {
			this.head = this.head.next;
			if (!this.head) {
				this.tail = null;
			}
			return;
		}

		let current: LinkedListNode<T> = this.head;
		while (current.next) {
			if (current.next.value === value) {
				current.next = current.next.next;
				if (!current.next) {
					this.tail = current;
				}
				return;
			}
			current = current.next;
		}
	}

	// Search for a node with a specific value in the linked list
	search(value: T): boolean {
		let current: LinkedListNode<T> = this.head;
		while (current) {
			if (current.value === value) {
				return true; // Node found
			}
			current = current.next;
		}
		return false; // Node not found
	}

	// Print the linked list to display its contents in tests
	print(): void {
		let current: LinkedListNode<T> = this.head;
		while (current) {
			console.log(current.value);
			current = current.next;
		}
	}
}

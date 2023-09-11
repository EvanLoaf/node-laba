import { LinkedListNode } from '../model/linked-list-node.model';

// P2.4
export function hasCycle<T>(head: LinkedListNode<T> | null): boolean {
	if (!head || !head.next) {
		return false; // No cycle with 0 or 1 node
	}
	let slow: LinkedListNode<T> = head;
	let fast: LinkedListNode<T> = head;
	while (fast && fast.next) {
		// Until the end of the Linked List aka null is reached
		slow = slow.next; // Move 1 Node ahead
		fast = fast.next.next; // Move 2 Nodes ahead
		if (slow === fast) {
			return true; // Cycle detected
		}
	}
	return false; // No cycle detected
}

import { HashTableLinkedListNode } from './hash-table-linked-list-node.model';
import { theBestHashingAlgorithm } from './the-best-hashing-algorithm-function.util';

export class HashTable {
	private readonly size: number;
	private readonly table: Array<HashTableLinkedListNode | null>;

	constructor(size: number) {
		this.size = size;
		this.table = new Array(size).fill(null);
	}

	// custom hash function from a separate file
	public hash(input: string): number {
		const hashValue: number = theBestHashingAlgorithm(input);
		return Math.abs(hashValue) % this.size; // to make sure the hash value is within the table size and is a positive integer
	}

	// insert a key-value pair into the hash table or append to the linked list
	// collisions are handled with chaining
	// O(1) on average, absolutely worst not feasible case scenario – O(n) if every value ends up with the same hashed key
	public insert(key: string, value: any) {
		const index: number = this.hash(key);
		if (!this.table[index]) {
			this.table[index] = new HashTableLinkedListNode(key, value); // If the index is not occupied, add a first linked node
		} else {
			let currentNode: HashTableLinkedListNode = this.table[index]; // If the index is already occupied, add the K-V pair to the end
			while (currentNode.next) {
				currentNode = currentNode.next;
			}
			currentNode.next = new HashTableLinkedListNode(key, value);
		}
	}

	// retrieve the value by key
	// O(1) on average, absolutely worst not feasible case scenario – O(n) if every value ends up with the same hashed key
	// AND the desired element is the last in the chain
	public get(key: string): any {
		const index: number = this.hash(key);
		let currentNode: HashTableLinkedListNode = this.table[index];

		while (currentNode) {
			if (currentNode.key === key) {
				return currentNode.value;
			}
			currentNode = currentNode.next;
		}
		return null; // key is not found
	}

	// delete a K-V pair from the hash table
	// O(1) on average, absolutely worst not feasible case scenario – O(n) if every value ends up with the same hashed key
	// AND the element being deleted is the last in the chain
	public delete(key: string) {
		const index: number = this.hash(key);
		let currentNode: HashTableLinkedListNode = this.table[index];
		let previousNode = null;
		while (currentNode) {
			if (currentNode.key === key) {
				if (previousNode === null) {
					this.table[index] = currentNode.next; // if the deleted node is the first in the list
				} else {
					previousNode.next = currentNode.next; // if the deleted node is NOT the first in the list
				}
				return; // key is found and deleted
			}
			previousNode = currentNode;
			currentNode = currentNode.next;
		}
	}

	// iterate through all K-V pairs and apply a callback function
	public iterate(callback: Function) {
		for (let index = 0; index < this.size; index++) {
			let currentNode: HashTableLinkedListNode = this.table[index];
			while (currentNode) {
				callback(currentNode.key, currentNode.value);
				currentNode = currentNode.next;
			}
		}
	}
}

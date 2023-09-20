export class HashTableLinkedListNode {
	public key: string;
	public value: any;
	public next: HashTableLinkedListNode | null;

	constructor(key: string, value: any) {
		this.key = key;
		this.value = value;
		this.next = null;
	}
}

// Class representing individual books in the bookstore
export class Book {
	constructor(
		public title: string,
		public author: string,
		public isbn: string,
		public price: number,
		public availability: number
	) {}

	public getInfo(): string {
		return `Book: ${this.title}, Author: ${this.author}`;
	}
}

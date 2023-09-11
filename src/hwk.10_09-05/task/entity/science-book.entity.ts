import { Book } from './book.entity';

export class ScienceBook extends Book {
	constructor(
		public title: string,
		public author: string,
		public isbn: string,
		public price: number,
		public availability: number,
		public subject: string
	) {
		super(title, author, isbn, price, availability);
	}

	public getInfo(): string {
		return `Book: ${this.title}, Author: ${this.author}, Subjest: ${this.subject}`;
	}
}

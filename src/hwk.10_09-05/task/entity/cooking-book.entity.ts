import { Book } from './book.entity';

export class CookingBook extends Book {
	constructor(
		public title: string,
		public author: string,
		public isbn: string,
		public price: number,
		public availability: number,
		public cuisine: string
	) {
		super(title, author, isbn, price, availability);
	}

	public getInfo(): string {
		return `Book: ${this.title}, Author: ${this.author}, Cuisine: ${this.cuisine}`;
	}
}

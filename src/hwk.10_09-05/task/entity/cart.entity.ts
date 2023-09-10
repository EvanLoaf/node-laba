import { Book } from './book.entity';

// Class to simulate a shopping cart
export class Cart {
	private _items: Book[] = [];

	get items() {
		return this._items;
	}

	// Method to add a book to the cart
	addBook(book: Book) {
		if (book.availability > 0) {
			book.availability--;
			this._items.push(book);
		} else {
			console.error(`Sorry, the book ${book.title} is out of stock`);
		}
	}

	// Method to remove a book from the cart
	removeBook(book: Book) {
		const index: number = this._items.indexOf(book);
		if (index !== -1) {
			this._items.splice(index, 1);
		}
	}

	// Method to calculate the total price of books in the cart
	calculateTotalPrice(): number {
		return this._items.reduce((total: number, book: Book) => total + book.price, 0);
	}
}

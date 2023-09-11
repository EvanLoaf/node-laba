import { User } from './user.entity';
import { Book } from './book.entity';
import { Discount } from './discount.entity';

// Class to represent a user's order
export class Order {
	constructor(
		public user: User,
		public books: Book[],
		public discount?: Discount
	) {}

	// Method to calculate the total price of the books in the order, applying the discount if available
	public calculateTotalPrice(): number {
		let totalPrice: number = this.books.reduce((total: number, book: Book) => total + book.price, 0);
		if (this.discount) {
			totalPrice *= 1 - this.discount.percentage / 100;
		}
		return totalPrice;
	}
}

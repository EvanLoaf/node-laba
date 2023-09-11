import { Book } from './entity/book.entity';
import { User } from './entity/user.entity';
import { Cart } from './entity/cart.entity';
import { Order } from './entity/order.entity';
import { Discount } from './entity/discount.entity';
import { CookingBook } from './entity/cooking-book.entity';
import { ScienceBook } from './entity/science-book.entity';

// Instantiate Book objects
const book1: Book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '978-3-16-148410-0', 15.99, 10);
const book2: Book = new CookingBook('Top 50 Recipes', 'Harper Lee', '978-0-06-112008-4', 12.49, 15, 'Asian');
const book3: Book = new ScienceBook('Entropy', 'George Orwell', '978-0-452-28423-4', 10.99, 20, 'Physics');

console.log(`Book1 info: ${book1.getInfo()}`); // Outputs: Book title & Author
console.log(`Book2 info: ${book2.getInfo()}`); // Outputs: Book title, Author & Cuisine
console.log(`Book3 info: ${book3.getInfo()}`); // Outputs: Book title, Author & Subject

// Instantiate User objects
const john: User = new User('John Doe', 'johndoe@example.com', 'john123');
const alice: User = new User('Alice Smith', 'alicesmith@example.com', 'alice456');

// Simulate users adding books to their cart
// A book won't be added if its availability < 1
const johnsCart: Cart = new Cart();
johnsCart.addBook(book1);
johnsCart.addBook(book2);
johnsCart.addBook(book3);
johnsCart.removeBook(book3);

const alicesCart: Cart = new Cart();
alicesCart.addBook(book2);
alicesCart.addBook(book3);

console.log(`John's cart: ${JSON.stringify(johnsCart.items)}`);
console.log(`Alice's cart: ${JSON.stringify(alicesCart.items)}`);

// Create a discount code
const fallDiscountCode: Discount = new Discount('FALL2023', 15); // 15% discount

// Simulate users placing orders and apply discounts
// _items are accessed using a getter
const johnsOrder: Order = new Order(john, johnsCart.items, fallDiscountCode);
const alicesOrder: Order = new Order(alice, alicesCart.items, fallDiscountCode);

// Calculate order totals after discounts
const johnsTotal: number = johnsOrder.calculateTotalPrice();
const alicesTotal: number = alicesOrder.calculateTotalPrice();

console.log(`John's total after the discount: ${johnsTotal}`);
console.log(`Alice's total after the discount: ${alicesTotal}`);

console.log(`Resulting John's order with dependencies: \n${JSON.stringify(johnsOrder, null, 0)}`);
console.log(`Resulting Alice's order with dependencies: \n${JSON.stringify(alicesOrder, null, 0)}`);

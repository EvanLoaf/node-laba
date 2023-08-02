import { describe, it, assert } from '../util/jest-test-functions.util.js';
import { person } from './task1/object-property-manipulation.js';
import { product, deleteNonConfigurable, getTotalPrice } from './task2/object-property-enumeration-and-deletion.js';
import { bankAccount } from './task3/object-property-getters-and-setters.js';
import { createImmutableObject } from './task4/advanced-property-descriptors.js';
import { deepEqualWithAnyOrder, deepCopy } from '../util/object-functions.util.js';
import { observeObject, callback } from './task5/object-observation.js';
import { deepCloneObject } from './task6/object-deep-cloning.js';
import { validateObject } from './task7/object-property-validation.js';

describe('Homework 4 Tests', () => {
	describe('Task 1: Object Property Manipulation', () => {
		it('Should have non-writable firstName, lastName, age, email; non-enumerable and non-configurable address; updateInfo property', () => {
			assert(!Object.getOwnPropertyDescriptors(person).firstName.writable, 'Property "firstName" is not configured correctly');
			assert(!Object.getOwnPropertyDescriptors(person).lastName.writable, 'Property "lastName" is not configured correctly');
			assert(!Object.getOwnPropertyDescriptors(person).age.writable, 'Property "age" is not configured correctly');
			assert(!Object.getOwnPropertyDescriptors(person).email.writable, 'Property "email" is not configured correctly');
			assert(
				!Object.getOwnPropertyDescriptors(person).address.enumerable &&
					!Object.getOwnPropertyDescriptors(person).address.configurable &&
					deepEqualWithAnyOrder(Object.getOwnPropertyDescriptors(person).address.value, {}),
				'Property "address" is not configured correctly'
			);

			const updatedInfo = {
				firstName: 'Joe',
				lastName: 'Biden',
				age: 120,
				email: 'cool.joe@mail.gov',
			};
			assert(
				deepEqualWithAnyOrder(person.updateInfo(updatedInfo), updatedInfo),
				'Property function "updateInfo" is not implemented correctly'
			);
		});
	});

	describe('Task 2: Object Property Enumeration and Deletion', () => {
		it('Should calculate the total sum correctly', () => {
			assert(getTotalPrice(product) === 5000, 'Function "getTotal" is not implemented correctly');
		});

		it('Should delete a specified property', () => {
			assert(
				deepEqualWithAnyOrder(deleteNonConfigurable(product, 'price'), { name: 'Laptop' }),
				'Function "deleteNonConfigurable" is not implemented correctly'
			);
			assert(
				deepEqualWithAnyOrder(deleteNonConfigurable(product, 'name'), {}),
				'Function "deleteNonConfigurable" is not implemented correctly'
			);
		});
	});

	describe('Task 3: Object Property Getters and Setters', () => {
		it('Should return formatted balance', () => {
			assert(bankAccount.formattedBalance === '$1000', 'Getter "formattedBalance" is not implemented correctly');
		});

		it('Should update and return formatted balance', () => {
			bankAccount.balance = 1500;
			assert(bankAccount._balance === 1500, 'Setter "balance" is not implemented correctly');
			assert(bankAccount.formattedBalance === '$1500', 'Setter "balance" or Getter "formattedBalance" are not implemented correctly');
		});

		it('Should transfer funds from one account to another', () => {
			const targetBankAccount = deepCopy(bankAccount);
			bankAccount.transfer(targetBankAccount, 100);
			assert(bankAccount._balance === 1400, 'Source Bank Account balance is incorrect after transfer');
			assert(targetBankAccount._balance === 1600, 'Target Bank Account balance is incorrect after transfer');
			assert(bankAccount.formattedBalance === '$1400', 'Source Bank Account formatted balance is incorrect after transfer');
			assert(targetBankAccount.formattedBalance === '$1600', 'Target Bank Account formatted balance is incorrect after transfer');
		});
	});

	describe('Task 4: Advanced Property Descriptors', () => {
		it('Should create immutable object', () => {
			const immutableCopy = createImmutableObject(person);
			const keys = Object.keys(person);
			assert(
				!Object.isExtensible(immutableCopy) &&
					keys.filter(key => {
						if (!immutableCopy.hasOwnProperty(key)) {
							return false;
						} else {
							const descriptor = Object.getOwnPropertyDescriptor(immutableCopy, key);
							return !descriptor.writable && !descriptor.configurable;
						}
					}),
				'The resulting person object is not immutable or corrupted'
			);
		});

		it('Should handle nested objects and arrays recursively', () => {
			const sample = {
				personal: {
					name: 'John',
					age: 30,
					hobbies: ['coding', 'basketball', 'reading'],
				},
				address: {
					street: '123 Main St',
					city: 'Anytown',
					country: {
						name: 'USA',
						code: 'US',
					},
				},
			};
			const immutableCopy = createImmutableObject(sample);
			assert(deepEqualWithAnyOrder(sample, immutableCopy), 'The complex object and its immutable copy are not equal');
		});
	});

	describe('Task 5: Object Observation', () => {
		it('Should log results of actions on the object properties', () => {
			const proxy = observeObject(person, callback);

			proxy.firstName;
			proxy.lastName;
			proxy.middleName;

			proxy.firstName = 'Elon';
			proxy.lastName = 'Musk';

			proxy.firstName;
			proxy.lastName;
			proxy.middleName;

			assert(
				(() => {
					try {
						proxy['middleName'] = 'X';
						return false;
					} catch (e) {
						return e.message === "'set' on proxy: trap returned falsish for property 'middleName'";
					}
				})(),
				"Expected an Error: 'set' on proxy: trap returned falsish for property 'middleName'"
			);
		});
	});

	describe('Task 6: Object Deep Cloning', () => {
		it('Should create a deep clone of a complex object', () => {
			const sample = {
				name: 'Java',
				platforms: ['Windows', 'Mac', 'Linux', 'Solaris'],
				versions: [8, 11, 17],
				latestVersion: 17,
				frameworks: {
					popular: ['Spring', 'Hibernate', 'Struts'],
					modern: ['Spring Boot', 'Jakarta EE', 'Micronaut'],
				},
				getLatestFramework() {
					return this.frameworks.modern[0];
				},
				books: [
					{
						title: 'Head First Java',
						author: 'Kathy Sierra',
					},
					{
						title: 'Effective Java',
						author: 'Joshua Bloch',
					},
				],
			};
			const clone = deepCloneObject(sample);
			assert(deepEqualWithAnyOrder(sample, clone), 'Failed to create a deep clone of an object');
		});
	});

	describe('Task 7: Object Property Validation', () => {
		const schema = {
			name: {
				required: true,
				type: 'string',
				minLength: 1,
				maxLength: 50,
			},
			age: {
				required: true,
				type: 'number',
				min: 18,
				max: 60,
			},
			email: {
				required: true,
				type: 'string',
				pattern: /^.+@.+\..+$/,
			},
		};
		it('Should successfully validate a valid object', () => {
			const sample = {
				name: 'John Doe',
				age: 40,
				email: 'john.doe@mail.com',
			};
			assert(validateObject(sample, schema), 'Failed to validate a valid object');
		});

		it('Should invalidate an object with a long name', () => {
			const sample = {
				name: 'John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe',
				age: 40,
				email: 'john.doe@mail.com',
			};
			assert(!validateObject(sample, schema), 'Failed to invalidate an object with a long name');
		});

		it('Should invalidate an object with an age too young', () => {
			const sample = {
				name: 'John Doe',
				age: 17,
				email: 'john.doe@mail.com',
			};
			assert(!validateObject(sample, schema), 'Failed to invalidate an object with an age too young');
		});

		it('Should invalidate an object with an incorrect email', () => {
			const sample = {
				name: 'John Doe',
				age: 40,
				email: 'john.doe@mail.',
			};
			assert(!validateObject(sample, schema), 'Failed to invalidate an object with an incorrect email');
		});
	});
});

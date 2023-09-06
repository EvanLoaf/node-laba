import { promiseAll } from './task1/promise-all.function';
import { promiseAllSettled } from './task2/promise-all-settled.function';
import { chainPromises } from './task3/chain-promises.function';
import { promisify } from './task4/promisify.function';

describe('Homework 9', () => {
	describe('Task 1: Implement promiseAll Function', () => {
		it('should resolve the input', async () => {
			const promises: Promise<number>[] = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

			const output = await promiseAll(promises)
				.then((results: any[]) => {
					const response = `All promises resolved: ${results}`;
					console.log(response);
					return response;
				})
				.catch((e: Error) => {
					const response = `At least one promise rejected: ${e.message}`;
					console.log(response);
					return response;
				});
			expect(output).toBe('All promises resolved: 1,2,3');
		});

		it('should reject the input', async () => {
			const promises = [Promise.resolve(1), Promise.resolve(new Error('Something went wrong')), Promise.resolve(3)];

			const output = await promiseAll(promises)
				.then((results: any[]) => {
					const response = `All promises resolved: ${results}`;
					console.log(response);
					return response;
				})
				.catch((e: Error) => {
					const response = `At least one promise rejected: ${e.message}`;
					console.log(response);
					return response;
				});
			expect(output).toBe('At least one promise rejected: Something went wrong');
		});
	});

	describe('Task 2: Implement promiseAllSettled Function', () => {
		it('should settle the input', async () => {
			const promises = [Promise.resolve(1), Promise.reject('Error occurred'), Promise.resolve(3)];
			const expected: any[] = [
				{ status: 'fulfilled', value: 1 },
				{ status: 'rejected', reason: 'Error occurred' },
				{ status: 'fulfilled', value: 3 },
			];

			const actual: any[] = await promiseAllSettled(promises).then(results => {
				console.log('All promises settled:', results);
				return results;
			});
			expect(expected).toStrictEqual(actual);
		});

		it('should settle the input with timeouts', async () => {
			const promise1 = new Promise(resolve => {
				setTimeout(() => {
					resolve('Resolved after 50ms');
				}, 100);
			});

			const promise2 = new Promise((_, reject) => {
				setTimeout(() => {
					reject('Rejected after 30ms');
				}, 50);
			});

			const promises = [promise1, promise2];

			return promiseAllSettled(promises).then(results => {
				console.log(results);
				expect(results).toBe([
					{ status: 'fulfilled', value: 'Resolved after 100ms' },
					{ status: 'rejected', reason: 'Rejected after 50ms' },
				]);
			});
		});
	});

	describe('Task 3: Implement Chaining of Promises as a Separate Function', () => {
		it('should chain the input functions', async () => {
			function asyncFunction1(): Promise<string> {
				return Promise.resolve('Result from asyncFunction1');
			}
			function asyncFunction2(data: string): Promise<string> {
				return Promise.resolve(data + ' - Result from asyncFunction2');
			}
			function asyncFunction3(data: string): Promise<string> {
				return Promise.resolve(data + ' - Result from asyncFunction3');
			}
			const functions = [asyncFunction1, asyncFunction2, asyncFunction3];
			const expected = 'Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3';
			const actual: string | Error = await chainPromises(functions)
				.then((result: string) => {
					console.log('Chained promise result: ', result);
					return result;
				})
				.catch((e: Error) => {
					console.error('Chained promise error: ', e);
					return e;
				});
			expect(expected).toBe(actual);
		});
	});

	describe('Task 4: Implement promisify Function', () => {
		function callbackStyleFunction(value: number, callback: Function) {
			setTimeout(() => {
				if (value > 0) {
					callback(null, value * 2);
				} else {
					callback('Invalid value', null);
				}
			}, 1000);
		}

		it('should promisify the input function and return result', async () => {
			const promisedFunction: Function = promisify(callbackStyleFunction);
			expect(promisedFunction instanceof Function).toBe(true);

			const expected = 10;
			const actual: number = await promisedFunction(5)
				.then((result: number) => {
					console.log('Promised function result: ', result);
					return result;
				})
				.catch((e: Error) => {
					console.error('Promised function error: ', e);
					return e;
				});
			expect(actual).toBe(expected);
		});

		it('should promisify the input function and return error', async () => {
			const promisedFunction: Function = promisify(callbackStyleFunction);
			expect(promisedFunction instanceof Function).toBe(true);

			const expected = 'Invalid value';
			const actual: string = await promisedFunction(-5)
				.then((result: number) => {
					console.log('Promised function result: ', result);
					return result;
				})
				.catch((e: Error) => {
					console.error('Promised function error: ', e);
					return e;
				});
			expect(actual).toBe(expected);
		});
	});
});

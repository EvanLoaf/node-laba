import {
	customFilterUnique,
	isUniqueName,
} from './task1/advance_array_filtering';
import { chunkArray } from './task2/array_chunking';
import { customShuffle } from './task3/array_shuffling';
import { deepEqualWithAnyOrder } from '../util/object-functions.util';
import {
	getArrayIntersection,
	getArrayUnion,
} from './task4/array_intersection_and_union';
import { measureArrayPerformance } from './task5/array_performance_analysis';
import * as faker from 'faker';

describe('Homework 5', () => {
	describe('Task 1: Advanced Array Filtering', () => {
		it('should return only unique elements', () => {
			const input: object[] = [
				{ id: 1, name: 'Mikhail' },
				{ id: 2, name: 'Ilya' },
				{ id: 3, name: 'Alexandrina' },
				{ id: 4, name: 'Ilya' },
				{ id: 5, name: 'Mikhail' },
			];

			const expected: object[] = [
				{ id: 1, name: 'Mikhail' },
				{ id: 2, name: 'Ilya' },
				{ id: 3, name: 'Alexandrina' },
			];
			const actual: object[] = customFilterUnique(input, isUniqueName);

			expect(expected).toStrictEqual(actual);
		});
	});

	describe('Task 2: Array Chunking', () => {
		it('should return an array of arrays', () => {
			const input: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const expected: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
			const actual = chunkArray(input, 3);
			expect(expected).toStrictEqual(actual);
		});
	});

	describe('Task 3: Array Shuffling', () => {
		it('should perform a uniform shuffle', () => {
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const actual = customShuffle(input);
			console.log(actual);
			expect(input.length).toBe(actual.length);
			expect(deepEqualWithAnyOrder(input, actual)).toBe(true);
		});
	});

	describe('Task 4: Array Intersection and Union', () => {
		it('should return array intersection', () => {
			const input1: number[] = [4, 5, 6, 7, 8, 9, 10];
			const input2: number[] = [1, 2, 3, 4, 5, 6, 7];
			const expected: number[] = [4, 5, 6, 7];
			const actual: number[] = getArrayIntersection<number>(input1, input2);
			expect(deepEqualWithAnyOrder(expected, actual)).toBe(true);
		});

		it('should return array union', () => {
			const input1: number[] = [4, 5, 6, 7, 8, 9, 10];
			const input2: number[] = [1, 2, 3, 4, 5, 6, 7];
			const expected: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const actual: number[] = getArrayUnion<number>(input1, input2);
			expect(deepEqualWithAnyOrder(expected, actual)).toBe(true);
		});
	});

	describe('Task 5: Array Performance Analysis', () => {
		const generateInput = (size) => {
			const arr = [];
			for (let i = 0; i < size; i++) {
				arr.push({
					name: faker.name.firstName(),
				});
			}
			return arr;
		};

		const customFn = (array) => customFilterUnique(array, isUniqueName);
		const builtInFn = (array) => {
			const uniqueElements = [];
			array.filter((element) => {
				const contains = uniqueElements.some(
					(unique) => element.name === unique.name,
				);
				if (!contains) {
					uniqueElements.push(element);
				}
				return contains;
			});
			return uniqueElements;
		};

		it('Custom Fn should perform worse on smaller sample size', async () => {
			const elementsToGenerate = 5000;
			const input: any[] = generateInput(elementsToGenerate);

			const customFnTime = await measureArrayPerformance(customFn, input);
			const filterFnTime = await measureArrayPerformance(builtInFn, input);

			console.log(
				`Custom Fn execution time: ${customFnTime}, sample size: ${elementsToGenerate}`,
			);
			console.log(
				`Built-in Fn execution time: ${filterFnTime}, sample size: ${elementsToGenerate}`,
			);

			expect(customFnTime > filterFnTime).toBe(true);
		});

		it('Custom Fn should perform better on smaller sample size', async () => {
			const elementsToGenerate = 1000000;
			const input: any[] = generateInput(elementsToGenerate);

			const customFnTime = await measureArrayPerformance(customFn, input);
			const filterFnTime = await measureArrayPerformance(builtInFn, input);

			console.log(
				`Custom Fn execution time: ${customFnTime}, sample size: ${elementsToGenerate}`,
			);
			console.log(
				`Built-in Fn execution time: ${filterFnTime}, sample size: ${elementsToGenerate}`,
			);

			expect(customFnTime > filterFnTime).toBe(false);
		});
	});
});

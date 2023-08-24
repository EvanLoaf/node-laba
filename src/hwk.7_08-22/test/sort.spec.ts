import { analyze, generateRandomArray, runSort } from './performance.tracker';
import { runMergeSort } from '../mergesort/merge-sort';
import { runQuickSortPivotFirst } from '../quicksort/quick-sort-pivot-first';
import { bubbleSort } from '../bubblesort/bubble-sort';
import { runQuickSortPivotLast } from '../quicksort/quick-sort-pivot-last';
import { runQuickSortRandomizedPivot } from '../quicksort/quick-sort-pivot-random';

describe('Sorting Algorithms Performance Test', () => {
	it('should sort the array correctly with the Merge Sort', () => {
		const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		runMergeSort(input);
		expect(input).toEqual(expected);
	});

	it('should sort the array correctly with the Quick Sort Pivot First', () => {
		const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		runQuickSortPivotFirst(input);
		expect(input).toEqual(expected);
	});

	it('should sort the array correctly with the Quick Sort Pivot Last', () => {
		const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		runQuickSortPivotLast(input);
		expect(input).toEqual(expected);
	});

	it('should sort the array correctly with the Quick Sort Randomized Pivot', () => {
		const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		runQuickSortRandomizedPivot(input);
		expect(input).toEqual(expected);
	});

	it('should sort the array correctly with the Bubble Sort', () => {
		const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		bubbleSort(input);
		expect(input).toEqual(expected);
	});

	// TODO before running, add '--stack-size=10000' to the node options for this test
	const arrayLengths = [2, 5, 10, 20, 50, 200, 500, 2500, 9000, 20000, 40000];
	const arrays: number[][] = [];
	arrayLengths.forEach((length: number) => arrays.push(generateRandomArray(length)));
	const sortingAlgorithms = {
		QuickSortPF: (arr: number[]) => runSort(runQuickSortPivotFirst, arr),
		QuickSortPL: (arr: number[]) => runSort(runQuickSortPivotLast, arr),
		QuickSortRP: (arr: number[]) => runSort(runQuickSortRandomizedPivot, arr),
		BubbleSort: (arr: number[]) => runSort(bubbleSort, arr),
		MergeSort: (arr: number[]) => runSort(runMergeSort, arr),
	};

	it('should output sorting algorithms performance comparison with random arrays', () => {
		analyze(arrays, sortingAlgorithms, 'Random Array');
	});

	it('should output sorting algorithms performance comparison with sorted arrays', () => {
		arrays.forEach((arr: number[]) => runMergeSort(arr));
		analyze(arrays, sortingAlgorithms, 'Sorted Array');
	});

	it('should output sorting algorithms performance comparison with reversed arrays', () => {
		arrays.forEach((arr: number[]) => arr.reverse());
		analyze(arrays, sortingAlgorithms, 'Reversed Array');
	});
});

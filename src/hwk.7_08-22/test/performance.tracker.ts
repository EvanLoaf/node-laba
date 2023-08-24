import faker from 'faker';

export function analyze(arrays: number[][], sortingAlgorithms: any, arrayType: string): void {
	const times: Record<string, Record<string, number>> = {};

	// offset first run poor performance
	for (const alg in sortingAlgorithms) {
		sortingAlgorithms[alg]([5, 4, 3, 2, 1]);
	}

	for (const arr of arrays) {
		times[arr.length] = measureSortingTime(sortingAlgorithms, arr);
	}

	printComparisonTable(sortingAlgorithms, times, arrayType);
}

export function runSort(sortFn: (arr: number[]) => void, arr: number[]): void {
	const clonedArray: number[] = [...arr];
	sortFn(clonedArray);
}

export function measureSortingTime(sortingAlgorithms: Record<string, Function>, arr: number[]): Record<string, number> {
	const times: Record<string, number> = {};

	for (const algorithm in sortingAlgorithms) {
		const start: number = performance.now();
		sortingAlgorithms[algorithm](arr);
		const end: number = performance.now();
		times[algorithm] = Number(end - start);
	}

	return times;
}

export function printComparisonTable(
	sortingAlgorithms: Record<string, Function>,
	executionTimes: Record<string, Record<string, number>>,
	arrayType: string
): void {
	const algorithms: string[] = Object.keys(sortingAlgorithms);
	const columnHeader: string = ['Array Length', ...algorithms.map(algorithm => `${algorithm} Time`)].join(' | ') + '\n';
	const separator: string = '-'.repeat(columnHeader.length + 2) + '\n';
	const header = `Results for Sorting Algorithm Performance Analysis on [${arrayType}]\n`;
	const arrayLengths: string[] = Object.keys(executionTimes);

	const data: string[] = arrayLengths.map((length: string) => {
		return `${length.toString().padStart(12)} | ${algorithms
			.map(algorithm => {
				return `${executionTimes[length][algorithm]
					.toFixed(3)
					.padStart(algorithm === 'BubbleSort' ? 12 : algorithm !== 'MergeSort' ? 13 : 11)} ms`;
			})
			.join(' | ')}`;
	});
	const output: string = header + separator + columnHeader + separator + data.join('\n') + '\n' + separator;
	console.log(output);
}

export function generateRandomArray(length: number): number[] {
	const randomIntArray: number[] = [];
	for (let i = 0; i < length; i++) {
		randomIntArray.push(faker.datatype.number());
	}
	return randomIntArray;
}

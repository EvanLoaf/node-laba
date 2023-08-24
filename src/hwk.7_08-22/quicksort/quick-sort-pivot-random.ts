export function runQuickSortRandomizedPivot(input: number[]): void {
	QuickSortRandomizedPivot(input, 0, input.length - 1);
}

export function QuickSortRandomizedPivot(input: number[], low: number, high: number): void {
	if (low < high) {
		const pivotIndex: number = randomizedPartition(input, low, high);
		QuickSortRandomizedPivot(input, low, pivotIndex - 1);
		QuickSortRandomizedPivot(input, pivotIndex + 1, high);
	}
}

export function randomizedPartition(input: number[], low: number, high: number): number {
	const randomIndex: number = Math.floor(Math.random() * (high - low + 1)) + low;
	swap(input, randomIndex, high);
	return partition(input, low, high);
}

export function partition(input: number[], low: number, high: number): number {
	const pivot: number = input[high];
	let i: number = low - 1;

	for (let j = low; j < high; j++) {
		if (input[j] < pivot) {
			i++;
			swap(input, i, j);
		}
	}

	swap(input, i + 1, high);
	return i + 1;
}

export function swap(array: number[], firstIndex: number, secondIndex: number): void {
	if (firstIndex !== secondIndex) {
		const temp: number = array[firstIndex];
		array[firstIndex] = array[secondIndex];
		array[secondIndex] = temp;
	}
}

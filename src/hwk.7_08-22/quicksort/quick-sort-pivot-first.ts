export function runQuickSortPivotFirst(input: number[]): void {
	quickSortPivotFirst(input, 0, input.length - 1);
}

export function quickSortPivotFirst(input: number[], low: number, high: number): void {
	if (low < high) {
		const pivotIndex: number = partition(input, low, high);
		quickSortPivotFirst(input, low, pivotIndex - 1);
		quickSortPivotFirst(input, pivotIndex + 1, high);
	}
}

export function partition(input: number[], low: number, high: number): number {
	const pivot: number = input[low];
	let pivotIndex: number = low;

	for (let j = low + 1; j <= high; j++) {
		if (input[j] < pivot) {
			pivotIndex++;
			if (pivotIndex !== j) {
				swap(input, pivotIndex, j);
			}
		}
	}

	if (low !== pivotIndex) {
		swap(input, low, pivotIndex);
	}
	return pivotIndex;
}

export function swap(array: number[], firstIndex: number, secondIndex: number): void {
	if (firstIndex !== secondIndex) {
		const temp: number = array[firstIndex];
		array[firstIndex] = array[secondIndex];
		array[secondIndex] = temp;
	}
}

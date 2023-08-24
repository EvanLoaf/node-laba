export function runMergeSort(input: number[]): void {
	mergeSort(input, input.length);
}

export function mergeSort(input: number[], length: number): void {
	if (length < 2) {
		return;
	}
	const middle: number = Math.floor(length / 2);
	const left: number[] = input.slice(0, middle);
	const right: number[] = input.slice(middle);

	mergeSort(left, middle);
	mergeSort(right, length - middle);

	merge(input, left, right, middle, length - middle);
}

export function merge(input: number[], left: number[], right: number[], leftLength: number, rightLength: number): void {
	let i = 0,
		j = 0,
		k = 0;
	while (i < leftLength && j < rightLength) {
		if (left[i] <= right[j]) {
			input[k++] = left[i++];
		} else {
			input[k++] = right[j++];
		}
	}
	while (i < leftLength) {
		input[k++] = left[i++];
	}
	while (j < rightLength) {
		input[k++] = right[j++];
	}
}

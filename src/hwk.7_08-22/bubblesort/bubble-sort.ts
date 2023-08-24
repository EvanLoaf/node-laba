export function bubbleSort(input: number[]): void {
	let needIterations = true;
	while (needIterations) {
		needIterations = false;
		for (let i = 1; i < input.length; i++) {
			if (input[i] < input[i - 1]) {
				swap(input, i - 1, i);
				needIterations = true;
			}
		}
	}
}

export function swap(array: number[], firstIndex: number, secondIndex: number): void {
	if (firstIndex !== secondIndex) {
		const temp: number = array[firstIndex];
		array[firstIndex] = array[secondIndex];
		array[secondIndex] = temp;
	}
}

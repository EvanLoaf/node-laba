export function chunkArray(array, chunkSize) {
	const length: number = array.length;
	for (let i = 0; i < Math.ceil(length / chunkSize); i++) {
		const chunk = array.slice(i, i + chunkSize);
		array.splice(i, chunkSize, chunk);
	}
	return array;
}

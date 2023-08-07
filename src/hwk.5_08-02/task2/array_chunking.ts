export function chunkArray(array: any[], chunkSize: number) {
	const length: number = array.length;
	for (let i = 0; i < Math.ceil(length / chunkSize); i++) {
		const chunk: any[] = array.slice(i, i + chunkSize);
		array.splice(i, chunkSize, chunk);
	}
	return array;
}

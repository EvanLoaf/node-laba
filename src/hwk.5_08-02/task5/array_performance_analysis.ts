export async function measureArrayPerformance(
	fn: Function,
	array: any[],
): Promise<string> {
	const start = performance.now();
	await fn(array);
	const end = performance.now();
	const inSeconds = Number((end - start) / 1000).toFixed(3);
	console.log(`Execution of function ${fn.name} took: ${inSeconds}`);
	return inSeconds;
}

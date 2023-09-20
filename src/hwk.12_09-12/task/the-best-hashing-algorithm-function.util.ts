export function theBestHashingAlgorithm(input: string): number {
	const prime = 31; // commonly chosen prime number for hashing
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		const char: number = input.charCodeAt(i);
		hash = (hash * prime + char) & 0xffffffff; // bitwise AND used to ensure a 32-bit integer limit
		// 0xFFFFFFFF = 2^32 - 1 or 1111 1111 1111 1111 1111 1111 1111 1111
	}
	return hash;
}

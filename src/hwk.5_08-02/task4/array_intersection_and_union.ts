export function getArrayIntersection<T>(array1: T[], array2: T[]): T[] {
	return array1.filter((element: T) => array2.includes(element));
}

export function getArrayUnion<T>(array1: T[], array2: T[]): T[] {
	return [...new Set<T>([...array1, ...array2])];
}

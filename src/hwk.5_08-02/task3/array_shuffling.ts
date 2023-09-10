import { getRandomInt } from '../../util/generation.util';

export function customShuffle(array: any[]) {
	const shuffledArray: any[] = [...array];
	const length: number = array.length;
	for (let i = shuffledArray.length - 1; i >= 0; i--) {
		const randomIndex: number = getRandomInt(i, length - 1);
		[shuffledArray[i], shuffledArray[randomIndex]] = [
			shuffledArray[randomIndex],
			shuffledArray[i],
		];
	}
	return shuffledArray;
}

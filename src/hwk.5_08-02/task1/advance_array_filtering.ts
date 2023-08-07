export function customFilterUnique(array: any[], callback: Function): any[] {
	const uniqueElements: any[] = [];
	array.forEach((element) => {
		const isUnique = callback(element, uniqueElements);
		if (isUnique) {
			uniqueElements.push(element);
		}
	});
	return [...uniqueElements];
}

export const isUniqueName = (obj: any, uniqueElements: any[]) => {
	return !uniqueElements.some((el) => el.name === obj.name);
};

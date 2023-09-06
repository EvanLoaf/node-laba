export function chainPromises(functions: Function[], result: Promise<any> = Promise.resolve(), index = 0): Promise<any> {
	if (index > functions.length - 1) {
		return result;
	}
	const currentFunction: Function = functions[index];
	return currentFunction(result).then((result: any) => chainPromises(functions, result, index + 1));
}

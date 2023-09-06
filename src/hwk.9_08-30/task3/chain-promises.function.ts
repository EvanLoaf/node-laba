export function chainPromises(functions: Function[], result: Promise<any> = Promise.resolve()): Promise<any> {
	if (!functions.length) {
		return result;
	}
	const currentFunction: Function = functions.shift();
	return currentFunction(result).then((result: any) => chainPromises(functions, result));
}

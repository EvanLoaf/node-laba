export function promisify(fn: Function): Function {
	return function (...args: any[]) {
		return new Promise((resolve, reject) => {
			fn(...args, (error: any, result: any) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	};
}

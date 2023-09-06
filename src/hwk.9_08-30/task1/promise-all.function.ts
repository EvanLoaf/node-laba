export function promiseAll(promises: Promise<any>[]): Promise<any[]> {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			reject(new TypeError('Input must be an array of promises'));
			return;
		}

		if (promises.length === 0) {
			resolve([]);
			return;
		}

		const results: any[] = [];
		let completedCount = 0;
		for (let i = 0; i < promises.length; i++) {
			promises[i]
				.then((value: any) => {
					if (value instanceof Error) {
						throw value;
					}
					results[i] = value;
					completedCount++;

					if (completedCount === promises.length) {
						resolve(results);
					}
				})
				.catch((e: Error) => {
					reject(e);
				});
		}
	});
}

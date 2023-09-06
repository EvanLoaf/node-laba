export function promiseAllSettled(promises: Promise<any>[]): Promise<any[]> {
	const settled: object[] = [];
	function settlePromise(index: number): Promise<any> {
		if (index > promises.length - 1) {
			return;
		}
		return promises[index]
			.then((value: any) => {
				settled.push({ status: 'fulfilled', value: value });
			})
			.catch((e: Error) => {
				settled.push({ status: 'rejected', reason: e });
			})
			.then(() => settlePromise(index + 1));
	}
	return settlePromise(0).then(() => settled);
}

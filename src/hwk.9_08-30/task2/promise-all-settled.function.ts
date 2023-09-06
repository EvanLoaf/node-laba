export function promiseAllSettled(promises: Promise<any>[]): Promise<any[]> {
	return Promise.all(
		promises.map((promise: Promise<any>) =>
			promise.then((value: any) => ({ status: 'fulfilled', value: value })).catch((e: Error) => ({ status: 'rejected', reason: e }))
		)
	);
}

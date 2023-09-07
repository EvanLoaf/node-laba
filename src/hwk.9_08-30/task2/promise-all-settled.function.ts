import { promiseAll } from '../task1/promise-all.function';

export function promiseAllSettled(promises: Promise<any>[]): Promise<any[]> {
	return promiseAll(
		promises.map((promise: Promise<any>) =>
			promise.then((value: any) => ({ status: 'fulfilled', value: value })).catch((e: Error) => ({ status: 'rejected', reason: e }))
		)
	);
}

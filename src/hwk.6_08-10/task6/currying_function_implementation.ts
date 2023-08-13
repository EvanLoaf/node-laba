export function curry(func: (...args: any[]) => number, arity: number) {
	return function curried(...args: any[]) {
		if (args.length >= arity) {
			return func.apply(this, args);
		} else {
			return (...nextArgs: any[]) => curried.apply(this, [...args, ...nextArgs]);
		}
	};
}

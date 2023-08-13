export function curry(func: (...args: any[]) => number, arity: number) {
	return function curried(...args: any[]) {
		if (args.length >= arity) {
			return func.apply(this, args);
		} else {
			return (...nextArgs: any[]) => curried.apply(this, [...args, ...nextArgs]);
		}
	};
}

export const _ = Symbol('placeholder');

export function curryWithPlaceholders(func: (...args: any[]) => number, arity: number) {
	return function curried(...args: any[]) {
		while (args.length < arity) {
			args.push(_);
		}
		if (!args.includes(_)) {
			return func.apply(this, args);
		} else {
			return {
				args: args,
				fn: (...nextArgs: any[]): object => {
					const allArgs: any[] = args.map(arg => (arg === _ ? (nextArgs.length > 0 ? nextArgs.shift() : _) : arg));
					return curried.apply(this, allArgs);
				},
			};
		}
	};
}

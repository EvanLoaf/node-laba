export function throttle(fn: (event) => void, duration: number): (...args: any[]) => void {
	let shouldWait = false;
	return (...args: any[]): void => {
		if (!shouldWait) {
			fn.apply(this, args);
			shouldWait = true;
			setTimeout(() => {
				shouldWait = false;
			}, duration);
		}
	};
}

export function onScroll(event): void {
	console.log(`Scroll event: ${JSON.stringify(event)}`);
}

export function debounce(fn: (value: string) => void, delay: number): (...args: any[]) => void {
	let timeout: NodeJS.Timeout;
	return (...args: any[]): void => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}

export function debouncedSearch(query: string): void {
	console.log(`Searching for: ${query}`);
}

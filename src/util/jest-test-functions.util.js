export function assert(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage);
	}
}

export function describe(description, callback) {
	console.log(description);
	callback();
}

export function it(testDescription, testBody) {
	try {
		testBody();
		console.log(`\t✓ ${testDescription}`);
	} catch (error) {
		console.error(`\t✕ ${testDescription}`);
		console.error(`\t  ${error.message}`);
	}
}

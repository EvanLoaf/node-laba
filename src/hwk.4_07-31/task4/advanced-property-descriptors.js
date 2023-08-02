export function createImmutableObject(obj) {
	if (typeof obj !== 'object' || obj === null || obj instanceof Date) {
		return obj;
	}

	let immutableObject;

	if (Array.isArray(obj)) {
		immutableObject = [];

		for (let i = 0; i < obj.length; i++) {
			immutableObject[i] = createImmutableObject(obj[i]);
		}
	} else {
		immutableObject = {};

		Object.keys(obj).forEach(key => {
			const value = obj[key];
			if (typeof value === 'object' && value !== null) {
				immutableObject[key] = createImmutableObject(value);
			} else {
				Object.defineProperty(immutableObject, key, {
					value: value,
					writable: false,
					configurable: false,
					enumerable: true,
				});
			}
		});
	}

	Object.preventExtensions(immutableObject);
	return immutableObject;
}

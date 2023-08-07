export function deepEqualWithAnyOrder(obj1, obj2) {
	if (Array.isArray(obj1) && Array.isArray(obj2)) {
		if (obj1.length !== obj2.length) {
			return false;
		}
		if (!obj1.length) {
			return true;
		}

		const visited = new Array(obj2.length).fill(false);

		for (const item of obj1) {
			let foundMatch = false;
			for (let i = 0; i < obj2.length; i++) {
				if (!visited[i] && deepEqualWithAnyOrder(item, obj2[i])) {
					visited[i] = true;
					foundMatch = true;
					break;
				}
			}
			if (!foundMatch) {
				return false;
			}
		}

		return true;
	}

	if (typeof obj1 === 'object' && typeof obj2 === 'object') {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		if (keys1.length !== keys2.length) {
			return false;
		}

		keys1.sort();
		keys2.sort();
		for (const key of keys1) {
			if (
				!keys2.includes(key) ||
				!deepEqualWithAnyOrder(obj1[key], obj2[key])
			) {
				return false;
			}
		}

		return true;
	}

	if (obj1 instanceof Date) {
		obj1 = obj1.toISOString();
	}
	if (obj2 instanceof Date) {
		obj2 = obj2.toISOString();
	}

	return obj1 === obj2;
}

export function deepCopy(obj) {
	const cache = new WeakMap();

	function copy(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

		if (cache.has(obj)) {
			return cache.get(obj);
		}

		let clone;

		if (Array.isArray(obj)) {
			clone = [];
			cache.set(obj, clone);

			obj.forEach((item) => clone.push(copy(item)));
		} else {
			clone = {};
			cache.set(obj, clone);

			Object.keys(obj).forEach((key) => {
				if (typeof obj[key] === 'object') {
					clone[key] = copy(obj[key]);
				} else if (typeof obj[key] === 'function') {
					clone[key] = obj[key];
				} else {
					Object.defineProperty(
						clone,
						key,
						Object.getOwnPropertyDescriptor(obj, key),
					);
				}
			});
		}

		cache.set(obj, clone);
		return clone;
	}

	return copy(obj);
}

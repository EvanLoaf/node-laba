export function observeObject(obj, callback) {
	return new Proxy(obj, {
		get(entity, key) {
			callback(key, 'get');
			if (this.has(entity, key)) {
				return entity[key];
			}
		},
		set(entity, key, value) {
			callback(key, 'set');
			if (this.has(entity, key)) {
				Object.defineProperty(entity, key, {
					value: value,
				});
				return entity[key];
			}
		},
		has(entity, key) {
			const isPresent = entity.hasOwnProperty(key);
			console.log(`Property [${key}] is${isPresent ? '' : ' not'} present in object [${entity}]`);
			return isPresent;
		},
	});
}

export const callback = (key, action) => console.log(`Method [${action}] is performed on [${key}]`);

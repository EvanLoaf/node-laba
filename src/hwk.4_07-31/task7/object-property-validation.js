export function validateObject(obj, schema) {
	for (const key in schema) {
		if (schema[key].required && !obj[key]) {
			return false;
		}
		if (schema[key].type === 'string') {
			if (typeof obj[key] !== 'string') {
				return false;
			}
		}
		if (schema[key].type === 'number') {
			if (typeof obj[key] !== 'number') {
				return false;
			}
		}
		if (schema[key].min && obj[key] < schema[key].min) {
			return false;
		}
		if (schema[key].max && obj[key] > schema[key].max) {
			return false;
		}
		if (schema[key].minLength && obj[key].length < schema[key].minLength) {
			return false;
		}
		if (schema[key].maxLength && obj[key].length > schema[key].maxLength) {
			return false;
		}
		if (schema[key].pattern && !schema[key].pattern.test(obj[key])) {
			return false;
		}
	}

	return true;
}

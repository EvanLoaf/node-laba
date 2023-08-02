export const person = {
	firstName: 'John',
	lastName: 'Doe',
	age: 30,
	email: 'john.doe@example.com',
	updateInfo: function (info) {
		const keys = Object.keys(info).filter(key => {
			return Object.getOwnPropertyDescriptor(info, key).writable;
		});
		const properties = {};
		for (let key of keys) {
			const descriptor = { value: info[key] };
			if (!this.hasOwnProperty(key)) {
				descriptor.enumerable = true;
			}
			properties[key] = descriptor;
		}
		Object.defineProperties(this, {
			...properties,
		});
		return this;
	},
};

Object.defineProperties(person, {
	firstName: {
		writable: false,
	},
	lastName: {
		writable: false,
	},
	age: {
		writable: false,
	},
	email: {
		writable: false,
	},
	updateInfo: {
		enumerable: false,
		writable: false,
	},
});

Object.defineProperty(person, 'address', {
	value: {},
	enumerable: false,
	configurable: false,
});

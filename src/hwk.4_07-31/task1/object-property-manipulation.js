export const person = {
	firstName: 'John',
	lastName: 'Doe',
	age: 30,
	email: 'john.doe@example.com',
	updateInfo: function (info) {
		Object.defineProperties(this, {
			firstName: {
				value: info.firstName ?? this.firstName,
			},
			lastName: {
				value: info.lastName ?? this.lastName,
			},
			age: {
				value: info.age ?? this.age,
			},
			email: {
				value: info.email ?? this.email,
			},
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

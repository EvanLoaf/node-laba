export const product = {
	name: 'Laptop',
	price: 1000,
	quantity: 5,
};

Object.defineProperties(product, {
	price: {
		writable: false,
		enumerable: false,
	},
	quantity: {
		writable: false,
		enumerable: false,
	},
	product: {
		enumerable: false,
	},
});

export const getTotalPrice = product => {
	const descriptors = Object.getOwnPropertyDescriptors(product);
	const price = descriptors.price.value;
	const quantity = descriptors.quantity.value;
	return price * quantity;
};

export const deleteNonConfigurable = (obj, property) => {
	const descriptor = Object.getOwnPropertyDescriptor(obj, property);
	if (descriptor) {
		if (descriptor.configurable) {
			delete obj[property];
			return obj;
		} else {
			throw new Error('Cannot delete a non-configurable property');
		}
	}
};

const calculateDiscountedPrice = (products, discount) => {
  if (!Array.isArray(products)) {
    throw new Error('I want an array!');
  }
  if (typeof discount !== 'number' || 0 > discount || discount > 100) {
    throw new Error('Please enter valid discount %!');
  }
  return products
    .filter(product => product.price)
    .map(product => {
      const productCopy = { ...product };
      productCopy.price = product.price * ((100 - discount) / 100);
      return productCopy;
    });
}

module.exports = {
  calculateDiscountedPrice,
}

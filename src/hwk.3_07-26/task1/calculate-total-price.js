const calculateTotalPrice = products => {
  if (!Array.isArray(products)) {
    throw new Error('I want an array!');
  }
  return products.reduce((total, product) => total + product.price, 0);
}

module.exports = {
  calculateTotalPrice,
}

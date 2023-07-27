const calculateFactorial = (n, total = 1) => {
  if (n === 1) return total;
  return calculateFactorial(n - 1, total * n);
}

module.exports = {
  calculateFactorial,
}

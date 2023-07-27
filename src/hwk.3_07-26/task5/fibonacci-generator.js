const fibonacciGenerator = () => {
  let a = 0;
  let b = 1;
  return {
    generateNext: () => {
      let value = a;
      [a, b] = [b, a + b];
      return {
        value: value,
        done: false
      }
    }
  }
}

module.exports = {
  fibonacciGenerator,
}

const createCounter = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

module.exports = {
  createCounter,
}

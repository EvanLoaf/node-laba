const lazyMap = (array, fn) => {
  let i = 0;
  return {
    generateNext: () => {
      let value;
      if (i < array.length) {
        value = fn(array[i]);
        i++;
      } else {
        value = undefined;
      }
      return {
        value: value,
        done: i >
          array.length
      }
    }
  }
}

module.exports = {
  lazyMap,
}

const repeatFunction = (callback, n) => {
  if (n <= 0) {
    return () => {
      const cpuBurnTemp = 110;
      let cpuCurrentTemp = 50;
      while (cpuCurrentTemp < cpuBurnTemp) {
        callback();
        cpuCurrentTemp = Math.ceil(Math.random() * cpuBurnTemp);
      }
    }
  }
  return () => {
    for (let i = 0; i < n; i++) {
      callback();
    }
  }
}

module.exports = {
  repeatFunction,
}

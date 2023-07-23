function assert(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}

function describe(description, callback) {
  console.log(description);
  callback();
}

function it(testDescription, testBody) {
  try {
    testBody();
    console.log(`\t✓ ${testDescription}`);
  } catch (error) {
    console.error(`\t✕ ${testDescription}`);
    console.error(`\t  ${error.message}`);
  }
}

module.exports = {
  assert,
  describe,
  it
};
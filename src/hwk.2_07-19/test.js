const { describe, it, assert} = require('../util/jest-test-functions.util');
const dataTransformer = require('./data-transformers.util');

describe('Data Transformers Test', () => {
  it('Add Values function', () => {
    assert(dataTransformer.addValues(500, 1000) === 1500, 'Error Adding Numbers');
    assert(dataTransformer.addValues(dataTransformer.addValues('JS', ' is '), 'weird') === 'JS is weird', 'Error Adding Strings');
    assert((() => {
      try {
        dataTransformer.addValues(777, '1');
        return false;
      } catch (e) {
        return e.message === 'Only addition of numbers and strings is supported';
      }
    })(), 'Expected an Error: Only addition of numbers and strings is supported');
    assert((() => {
      try {
        dataTransformer.addValues('false', []);
        return false;
      } catch (e) {
        return e.message === 'Only addition of numbers and strings is supported';
      }
    })(), 'Expected an Error: Only addition of numbers and strings is supported');
    assert((() => {
      try {
        dataTransformer.addValues(true, 0);
        return false;
      } catch (e) {
        return e.message === 'Only addition of numbers and strings is supported';
      }
    })(), 'Expected an Error: Only addition of numbers and strings is supported');
  });

  it('Stringify Value function', () => {
    assert(dataTransformer.stringifyValue(909090) === '909090', 'Error stringifying a Number');
    assert(dataTransformer.stringifyValue(123123123789789789n) === '123123123789789789', 'Error stringifying a BigInt');
    assert(dataTransformer.stringifyValue(NaN) === 'NaN', 'Error stringifying a NaN number');
    assert(dataTransformer.stringifyValue(false) === 'false', 'Error stringifying a Boolean');
    assert(dataTransformer.stringifyValue([1, 2, 3]) === '[1,2,3]', 'Error stringifying an Array');
    assert(dataTransformer.stringifyValue(null) === 'null', 'Error stringifying a Null value');
    assert(dataTransformer.stringifyValue(undefined) === 'undefined', 'Error stringifying an Undefined value');
    assert(dataTransformer.stringifyValue(() => true) === '() => true', 'Error stringifying a Function');
    assert(dataTransformer.stringifyValue(Symbol('Java')) === 'Symbol(Java)', 'Error stringifying a Symbol');
  });

  it('Invert Boolean function', () => {
    assert(dataTransformer.invertBoolean(true) === false, 'Error inverting false');
    assert(dataTransformer.invertBoolean(false) === true, 'Error inverting true');
    assert((() => {
      try {
        dataTransformer.invertBoolean('false');
        return false;
      } catch (e) {
        return e.message === 'Boolean argument is required';
      }
    })(), 'Expected an Error: Boolean argument is required');
    assert((() => {
      try {
        dataTransformer.invertBoolean('true');
        return false;
      } catch (e) {
        return e.message === 'Boolean argument is required';
      }
    })(), 'Expected an Error: Boolean argument is required');
    assert((() => {
      try {
        dataTransformer.invertBoolean(783246528734652765);
        return false;
      } catch (e) {
        return e.message === 'Boolean argument is required';
      }
    })(), 'Expected an Error: Boolean argument is required');
    assert((() => {
      try {
        dataTransformer.invertBoolean([1, 2, 3]);
        return false;
      } catch (e) {
        return e.message === 'Boolean argument is required';
      }
    })(), 'Expected an Error: Boolean argument is required');
  });

  it('Convert to Number function', () => {
    assert(dataTransformer.convertToNumber(123) === 123, 'Error converting Number to Number');
    assert(dataTransformer.convertToNumber(123.45) === 123.45, 'Error converting Number with decimals to Number');
    assert(dataTransformer.convertToNumber('502') === 502, 'Error converting String to Number');
    assert(dataTransformer.convertToNumber('   1000abc') === 1000, 'Error converting Non-Number String to Number');
    assert(dataTransformer.convertToNumber([]) === 0, 'Error converting Empty Array to Number');
    assert(isNaN(dataTransformer.convertToNumber([1,2,3])), 'Error converting Non-Empty Array to Number');
    assert(dataTransformer.convertToNumber([11]) === 11, 'Error converting One-digit Array to Number');
    assert(dataTransformer.convertToNumber(null) === 0, 'Error converting Null to Number');
    assert(isNaN(dataTransformer.convertToNumber(undefined)), 'Error converting Undefined to Number');
    assert(dataTransformer.convertToNumber(new Date(Date.UTC(2023, 6, 23))) === 1690070400000, 'Error converting Date to Number');
    assert(isNaN(dataTransformer.convertToNumber(() => {})), 'Error converting Function to Number');
    assert(isNaN(dataTransformer.convertToNumber({ key: 'value' })), 'Error converting Object to Number');
    assert(dataTransformer.convertToNumber({
      valueOf: () => 100,
    }) === 100, 'Error converting Object with valueOf to Number');
    assert((() => {
      try {
        dataTransformer.convertToNumber(Symbol('Java'));
        return false;
      } catch (e) {
        return e.message === 'Cannot convert Symbol to Number';
      }
    })(), 'Expected an Error: Cannot convert Symbol to Number');
  });

  it('Convert to Number with NaN check function', () => {
    assert(dataTransformer.convertToNumberWithNanCheck(123) === 123, 'Error converting Number to Number with NaN check');
    assert(dataTransformer.convertToNumberWithNanCheck(123.45) === 123.45, 'Error converting Number with decimals to Number with NaN check');
    assert(dataTransformer.convertToNumberWithNanCheck('502') === 502, 'Error converting String to Number with NaN check');
    assert(dataTransformer.convertToNumberWithNanCheck('   1000abc') === 1000, 'Error converting Non-Number String to Number with NaN check');
    assert(dataTransformer.convertToNumberWithNanCheck([]) === 0, 'Error converting Empty Array to Number with NaN check');
    assert((() => {
      try {
        dataTransformer.convertToNumberWithNanCheck([1,2,3]);
        return false;
      } catch (e) {
        return e.message === 'Unable to convert value to Number';
      }
    })(), 'Expected an Error: Unable to convert value to Number');
    assert(dataTransformer.convertToNumberWithNanCheck([11]) === 11, 'Error converting One-digit Array to Number with NaN check');
    assert(dataTransformer.convertToNumberWithNanCheck(null) === 0, 'Error converting Null to Number with NaN check');
    assert((() => {
      try {
        dataTransformer.convertToNumberWithNanCheck(undefined);
        return false;
      } catch (e) {
        return e.message === 'Unable to convert value to Number';
      }
    })(), 'Expected an Error: Unable to convert value to Number');
    assert(dataTransformer.convertToNumberWithNanCheck(new Date(Date.UTC(2023, 6, 23))) === 1690070400000, 'Error converting Date to Number with NaN check');
    assert((() => {
      try {
        dataTransformer.convertToNumberWithNanCheck(() => {});
        return false;
      } catch (e) {
        return e.message === 'Unable to convert value to Number';
      }
    })(), 'Expected an Error: Unable to convert value to Number');
    assert(dataTransformer.convertToNumberWithNanCheck({
      valueOf: () => 100,
    }) === 100, 'Error converting Object with valueOf to Number with NaN check');
    assert((() => {
      try {
        dataTransformer.convertToNumberWithNanCheck(Symbol('Java'));
        return false;
      } catch (e) {
        return e.message === 'Cannot convert Symbol to Number';
      }
    })(), 'Expected an Error: Cannot convert Symbol to Number');
  });

  it('Coerce to Type function', () => {
    assert(dataTransformer.coerceToType(909090, 'string') === '909090', 'Error coercing a Number to string');
    assert(dataTransformer.coerceToType(123123123789789789n, 'string') === '123123123789789789', 'Error coercing a BigInt to string');
    assert(dataTransformer.coerceToType(NaN, 'string') === 'NaN', 'Error coercing a NaN number to string');
    assert(dataTransformer.coerceToType(false, 'string') === 'false', 'Error coercing a Boolean to string');
    assert(dataTransformer.coerceToType([1, 2, 3], 'string') === '[1,2,3]', 'Error coercing an Array to string');
    assert(dataTransformer.coerceToType(null, 'string') === 'null', 'Error coercing a Null value to string');
    assert(dataTransformer.coerceToType(undefined, 'string') === 'undefined', 'Error coercing an Undefined value to string');
    assert(dataTransformer.coerceToType(() => true, 'string') === '() => true', 'Error coercing a Function to string');
    assert(dataTransformer.coerceToType(Symbol('Java'), 'string') === 'Symbol(Java)', 'Error coercing a Symbol to string');

    assert(dataTransformer.coerceToType(123, 'number') === 123, 'Error coercing Number to Number');
    assert(dataTransformer.coerceToType(123.45, 'number') === 123.45, 'Error coercing Number with decimals to Number');
    assert(dataTransformer.coerceToType('502', 'number') === 502, 'Error coercing String to Number');
    assert(dataTransformer.coerceToType('   1000abc', 'number') === 1000, 'Error coercing Non-Number String to Number');
    assert(dataTransformer.coerceToType([], 'number') === 0, 'Error coercing Empty Array to Number');
    assert(isNaN(dataTransformer.coerceToType([1,2,3], 'number')), 'Error coercing Non-Empty Array to Number');
    assert(dataTransformer.coerceToType([11], 'number') === 11, 'Error coercing One-digit Array to Number');
    assert(dataTransformer.coerceToType(null, 'number') === 0, 'Error coercing Null to Number');
    assert(isNaN(dataTransformer.coerceToType(undefined, 'number')), 'Error coercing Undefined to Number');
    assert(dataTransformer.coerceToType(new Date(Date.UTC(2023, 6, 23)), 'number') === 1690070400000, 'Error coercing Date to Number');
    assert(isNaN(dataTransformer.coerceToType(() => {}, 'number')), 'Error coercing Function to Number');
    assert(isNaN(dataTransformer.coerceToType({ key: 'value' }, 'number')), 'Error coercing Object to Number');
    assert(dataTransformer.coerceToType({
      valueOf: () => 100,
    }, 'number') === 100, 'Error coercing Object with valueOf to Number');
    assert((() => {
      try {
        dataTransformer.coerceToType(Symbol('Java'), 'number');
        return false;
      } catch (e) {
        return e.message === 'Cannot convert Symbol to Number';
      }
    })(), 'Expected an Error: Cannot convert Symbol to Number');

    assert(dataTransformer.coerceToType('Hi', 'boolean') === true, 'Error coercing String to Boolean');
    assert(dataTransformer.coerceToType('', 'boolean') === false, 'Error coercing Empty String to Boolean');
    assert(dataTransformer.coerceToType(null, 'boolean') === false, 'Error coercing Null to Boolean');
    assert(dataTransformer.coerceToType(undefined, 'boolean') === false, 'Error coercing Undefined to Boolean');
    assert(dataTransformer.coerceToType(-0, 'boolean') === false, 'Error coercing Zero Number to Boolean');
    assert(dataTransformer.coerceToType(100, 'boolean') === true, 'Error coercing Number to Boolean');
    assert(dataTransformer.coerceToType({ key: 'value' }, 'boolean') === true, 'Error coercing Object to Boolean');
    assert(dataTransformer.coerceToType(() => false, 'boolean') === true, 'Error coercing Function to Boolean');
    assert(dataTransformer.coerceToType(Symbol('Java'), 'boolean') === true, 'Error coercing Symbol to Boolean');
    assert(dataTransformer.coerceToType([Symbol('Java')], 'boolean') === true, 'Error coercing Array to Boolean');
    assert(dataTransformer.coerceToType([], 'boolean') === true, 'Error coercing Empty Array to Boolean');

    assert((() => {
      try {
        dataTransformer.coerceToType(Symbol('Java'), 'object');
        return false;
      } catch (e) {
        return e.message === 'Only coercion to [string, number, boolean] is supported';
      }
    })(), 'Expected an Error: Only coercion to [string, number, boolean] is supported');
    assert((() => {
      try {
        dataTransformer.coerceToType([], 'function');
        return false;
      } catch (e) {
        return e.message === 'Only coercion to [string, number, boolean] is supported';
      }
    })(), 'Expected an Error: Only coercion to [string, number, boolean] is supported');
  });
});

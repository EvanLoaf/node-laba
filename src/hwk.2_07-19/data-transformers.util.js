function addValues(a, b) {
  if ((typeof a === 'number' && typeof b === 'number') || (typeof a === 'string' && typeof b === 'string')) {
    return a + b;
  } else {
    throw new Error('Only addition of numbers and strings is supported');
  }
}

function stringifyValue(value) {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  } else {
    return String(value);
  }
}

function invertBoolean(value) {
  if (typeof value === 'boolean') {
    return !value;
  } else {
    throw new Error('Boolean argument is required');
  }
}

function convertToNumber(value) {
  if (typeof value === 'symbol') {
    throw Error('Cannot convert Symbol to Number');
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return parseFloat(value) || parseInt(value, 10);
  }
  return Number(value);
}

function coerceToType(value, type) {
  switch(type) {
    case 'string': return stringifyValue(value);
    case 'number': return convertToNumber(value);
    case 'boolean': return Boolean(value);
    default:
      throw new Error('Only coercion to [string, number, boolean] is supported');
  }
}

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType
}
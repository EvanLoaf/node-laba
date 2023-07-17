String.prototype.plus = function (b) {
  return addStrings(this, b);
};

String.prototype.minus = function (b) {
  return subtractStrings(this, b);
};

String.prototype.divide = function (b) {
  return divideStrings(this, b);
};

String.prototype.multiply = function (b) {
  return multiplyStrings(this, b);
};

function addStrings(a, b) {
  const firstNumber = a.split('');
  const secondNumber = b.split('');

  const result = []
  let buffer;

  while (firstNumber.length > 0 || secondNumber.length > 0) {
    const firstDigit = firstNumber.length > 0 ? firstNumber.pop() - '0' : 0;
    const secondDigit = secondNumber.length > 0 ? secondNumber.pop() - '0' : 0;

    const effectiveBuffer = buffer ? buffer - '0' : '';

    const sum = (firstDigit + secondDigit + effectiveBuffer + '').split('');
    result.unshift(sum.pop());

    if (sum.length > 0) {
      buffer = sum[0];
    } else buffer = undefined;
  }

  if (buffer) {
    result.unshift(buffer);
  }

  return result.join('');
}

function subtractStrings(a, b) {
  const firstNumber = a - '0';
  const secondNumber = b - '0';
  if (firstNumber < secondNumber) {
    throw Error(`Operations with negative result are not supported, input: [${firstNumber} - ${secondNumber}]`);
  }

  const firstNumberDigits = a.split('');
  const secondNumberDigits = b.split('');

  const result = []
  let isBorrowed = false;

  while (firstNumberDigits.length > 0 || secondNumberDigits.length > 0) {
    let firstDigit = firstNumberDigits.length > 0 ? firstNumberDigits.pop() : '0';
    const secondDigit = secondNumberDigits.length > 0 ? secondNumberDigits.pop() : '0';

    if (isBorrowed) {
      if (firstDigit !== '0') {
        firstDigit = firstDigit.minus('1');
        if (firstDigit - '0' < secondDigit - '0') {
          firstDigit = firstDigit.plus('10');
          isBorrowed = true;
        } else {
          isBorrowed = false;
        }
      } else {
        firstDigit = firstDigit.plus('10');
        firstDigit = firstDigit.minus('1');
        isBorrowed = true;
      }
    } else {
      if (firstDigit - '0' < secondDigit - '0') {
        firstDigit = firstDigit.plus('10');
        isBorrowed = true;
      } else {
        isBorrowed = false;
      }
    }

    const difference = (firstDigit - '0') - (secondDigit - '0');
    result.unshift(difference);
  }

  while (result.length > 1 && result[0] === 0) {
    result.shift();
  }

  return result.join('');
}

function divideStrings(a, b) {
  const firstNumber = a - '0';
  const secondNumber = b - '0';

  let result = '';
  let remainder = '0';

  if (firstNumber < secondNumber) {
    return JSON.stringify({
      result: '0',
      remainder: firstNumber + '',
    });
  }

  const firstNumberDigits = a.split('');

  while (firstNumberDigits.length > 0) {
    const firstDigit = firstNumberDigits.shift();
    let firstDigitWithRemainder = remainder !== '0' ? remainder + firstDigit : firstDigit;

    let borrowed = '';

    while ((firstDigitWithRemainder - '0') < secondNumber && firstNumberDigits.length > 0) {
      firstDigitWithRemainder += firstNumberDigits.shift();
      if (!!result) {
        borrowed = borrowed + '0';
      }
    }

    let intermediateResult = '0';
    let difference = firstDigitWithRemainder;
    while (difference - '0' >= secondNumber) {
      difference = difference.minus(b);
      intermediateResult = intermediateResult.plus('1');
    }
    result = result + borrowed + intermediateResult;
    remainder = difference;
  }

  if (remainder.split('').every(char => char === '0')) {
    remainder = '0';
  }

  return JSON.stringify({
    result: result,
    remainder: remainder,
  });
}

function multiplyStrings(a, b) {
  const firstNumberDigits = a.split('').reverse();
  const secondNumberDigits = b.split('');

  const intermediateResults = []
  let buffer;

  while (secondNumberDigits.length > 0) {
    const multiplier = secondNumberDigits.pop() - '0';
    const resultForDigit = [];
    buffer = undefined;

    for (let digit of firstNumberDigits) {
      digit = digit - '0';
      const effectiveBuffer = !!buffer ? buffer - '0' : '';

      const product = ((digit * multiplier) + effectiveBuffer + '').split('');
      resultForDigit.unshift(product.pop());

      if (product.length > 0) {
        buffer = product[0];
      } else buffer = undefined;
    }

    if (buffer) {
      resultForDigit.unshift(buffer); //155845409424
    }

    intermediateResults.unshift(resultForDigit.join(''));
  }

  let order = 1;
  return intermediateResults.reverse().reduce((acc, current) => {
    let multiplier = 1;
    for (let i = 0; i < order; i++) {
      multiplier *= 10;
    }
    const result = acc.plus(((current - '0') * multiplier) + '');
    order++;
    return result;
  });
}

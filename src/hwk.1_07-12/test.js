require('./Task1.StringArithmeticOperations');
const { describe, it, assert} = require('../util/jest-test-functions.util');

describe('Arithmetic operations with string numbers', () => {
  it('addition', () => {
    assert('100'.plus('500') === '600', 'Addition Error');
    assert('999'.plus('999') === '1998', 'Addition Error');
    assert('234785623465'.plus('346826432764') === '581612056229', 'Addition Error');
  });

  it('subtraction', () => {
    assert('10000000000'.minus('5555555') === '9994444445', 'Subtraction Error');
    assert('298347627384618279346931782641983724681246'.minus('298347627384618279346931782641983724681245') === '1', 'Subtraction Error');
    assert('1000'.minus('111') === '889', 'Subtraction Error');
  });

  it('multiplication', () => {
    assert('123456'.multiply('777') === '95925312', 'Multiplication Error');
    assert('123'.multiply('3000') === '369000', 'Multiplication Error');
    assert('4536456'.multiply('34354') === '155845409424', 'Multiplication Error');
  });

  it('division', () => {
    assert('100000000000000000'.divide('100000') === '{"result":"1000000000000","remainder":"0"}', 'Division Error');
    assert('132412341234'.divide('32455') === '{"result":"4079874","remainder":"30564"}', 'Division Error');
    assert('5'.divide('3453453545463546646') === '{"result":"0","remainder":"5"}', 'Division Error');
  });
});

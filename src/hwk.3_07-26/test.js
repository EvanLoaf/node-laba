const { describe, it, assert } = require('../util/jest-test-functions.util');
const { deepEqualWithAnyOrder } = require('../util/object-comparator.util');
const { calculateDiscountedPrice } = require('./task1/calculate-discounted-price');
const { calculateTotalPrice } = require('./task1/calculate-total-price');
const { filterUniqueWords } = require('./task2/filter-unique-words');
const { getAverageGrade } = require('./task2/get-average-grade');
const { getFullName } = require('./task2/get-full-name');
const { createCounter } = require('./task3/create-counter');
const { repeatFunction } = require('./task3/repeat-function');
const { calculateFactorial } = require('./task4/calculate-factorial');
const { power } = require('./task4/power');
const { fibonacciGenerator } = require('./task5/fibonacci-generator');
const { lazyMap } = require('./task5/lazy-map');

describe('Homework 3 Tests', () => {

  describe('Task 1: Immutability and Pure Functions', () => {

    describe('Calculate Discounted Price', () => {
      it('Should be correct', () => {
        const products = [
          {
            price: 100,
          },
          {
            price: 200,
          },
          {
            price: 300,
          },
        ];
        const productsWith50Discount = [
          {
            price: 50,
          },
          {
            price: 100,
          },
          {
            price: 150,
          },
        ];
        assert(
          deepEqualWithAnyOrder(calculateDiscountedPrice(products, 50), productsWith50Discount) === true,
          'Error performing discounted price calculations'
        );
      })

      it('Should be incorrect', () => {
        const products = [
          {
            price: 100,
          },
          {
            price: 200,
          },
          {
            price: 300,
          },
        ];
        const productsWith50Discount = [
          {
            price: 50,
          },
          {
            price: 100,
          },
          {
            price: 150,
          },
        ];
        assert(
          deepEqualWithAnyOrder(calculateDiscountedPrice(products, 75), productsWith50Discount) === false,
          'Error performing discounted price calculations'
        );
      })
    })

    it('Should return error', () => {
      assert((() => {
          try {
            deepEqualWithAnyOrder(calculateDiscountedPrice([], -50), []);
            return false;
          } catch (e) {
            return e.message === 'Please enter valid discount %!';
          }
        })(), 'Expected an Error: Please enter valid discount %!'
      );
    })

    describe('Calculate Total Price', () => {
      it('Should be correct', () => {
        const products = [
          {
            price: 100,
          },
          {
            price: 200,
          },
          {
            price: 300,
          },
        ];
        assert(
          calculateTotalPrice(products) === 600,
          'Error performing total price calculations'
        );
      })

      it('Should be incorrect', () => {
        const products = [
          {
            price: 100,
          },
          {
            price: 200,
          },
          {
            price: 300,
          },
        ];
        assert(
          !(calculateTotalPrice(products) === 601),
          'Error performing total price calculations'
        );
      })

      it('Should return an Error', () => {
        assert((() => {
            try {
              calculateTotalPrice({});
              return false;
            } catch (e) {
              return e.message === 'I want an array!';
            }
          })(), 'Expected an Error: I want an array!'
        );
      })
    })
  })

  describe('Task 2: Function Composition and Point-Free Style', () => {

    describe('Get Full Name', () => {
      it('Should be correct', () => {
        const person = {
            firstName: 'George',
            lastName: 'Bush',
        };
        assert(
          getFullName(person) === 'George Bush',
          'Error performing full name concatenation'
        );
      })

      it('Should be incorrect', () => {
        const person = {
          firstName: 'Barrack',
          lastName: 'Obama',
        };
        assert(
          !(getFullName(person) === 'George Bush'),
          'Error performing full name concatenation'
        );
      })

      it('Should return an Error', () => {
        const person = {
          firstName: 'Barrack',
        };
        assert((() => {
            try {
              getFullName(person);
              return false;
            } catch (e) {
              return e.message === `Person ${person} does not have first and/or last name`;
            }
          })(), `Expected an Error: \`Person ${person} does not have first and/or last name\``
        );
      })
    })

    describe('Filter Unique Words', () => {
      it('Should be correct', () => {
        const sentence = 'I will never use LLMs to do my homework'
        const text = `${sentence} ${sentence} ${sentence} ${sentence} ${sentence}`;
        assert(
          deepEqualWithAnyOrder(filterUniqueWords(text), sentence.split(' ').map(word => word.toLowerCase()).sort()) === true,
          'Error performing unique word filtering'
        );
      })

      it('Should be incorrect', () => {
        const sentence = 'I will never use LLMs to do my homework'
        const text = `${sentence} ${sentence} ${sentence} ${sentence} ${sentence}`;
        assert(
          !deepEqualWithAnyOrder(filterUniqueWords(text), sentence.split(' ').sort().push('FAIL')) === true,
          'Error performing unique word filtering'
        );
      })

      it('Should return an Error', () => {
        assert((() => {
            try {
              filterUniqueWords([]);
              return false;
            } catch (e) {
              return e.message === 'Please provide a text!';
            }
          })(), 'Please provide a text!'
        );
      })
    })

    describe('Get Average Grade', () => {
      it('Should be correct', () => {
        const students = [
          {
            name: 'Mikhail',
            grades: [40, 30, 20],
          },
          {
            name: 'Alexandrina',
            grades: [100, 80, 90],
          },
          {
            name: 'Ilya',
            grades: [60, 70, 50],
          },
        ];
        assert(
          getAverageGrade(students) === 60,
          'Error performing average grade calculations'
        );
      })

      it('Should be incorrect', () => {
        const students = [
          {
            name: 'Mikhail',
            grades: [40, 30, 20],
          },
          {
            name: 'Alexandrina',
            grades: [100, 80, 90],
          },
          {
            name: 'Ilya',
            grades: [60, 70, 50],
          },
        ];
        assert(
          !(getAverageGrade(students) === 61),
          'Error performing average grade calculations'
        );
      })

      it('Should return an Error', () => {
        assert((() => {
            try {
              getAverageGrade({});
              return false;
            } catch (e) {
              return e.message === 'I want an array!';
            }
          })(), 'Expected an Error: I want an array!'
        );
      })
    })
  })

  describe('Task 3: Closures and Higher-Order Functions', () => {

    describe('Create Counter', () => {
      it('Should be correct', () => {
        const counter = createCounter();
        const counterMaxValue = 1000;
        for (let i = 1; i <= counterMaxValue; i++) {
          assert(
            counter() === i,
            'Error in counter'
          );
        }
      })

      it('Should be incorrect', () => {
        const counter = createCounter();
        assert(
          counter() === 1,
          'Error in counter'
        );
        assert(
          !(counter() === 3),
          'Error in counter'
        );
      })
    })

    describe('Repeat Function', () => {
      it('Should be correct', () => {
        const cache = [];
        const fn = () => cache.push(Math.random());
        const repeater = repeatFunction(fn, 100);
        repeater();
        assert(
          cache.length === 100,
          'Error in function repeater'
        );
      })

      it('Should be incorrect', () => {
        const cache = [];
        const fn = () => cache.push(Math.random());
        const repeater = repeatFunction(fn, 100);
        repeater();
        assert(
          !(cache.length === 101),
          'Error in function repeater'
        );
      })
    })
  })

  describe('Task 4: Recursion and Tail Call Optimization', () => {

    describe('Calculate Factorial', () => {
      it('Should be correct', () => {
        assert(
          calculateFactorial(13) === 6227020800,
          'Error in factorial calculator'
        );
      })

      it('Should be incorrect', () => {
        assert(
          !(calculateFactorial(5) === 119),
          'Error in factorial calculator'
        );
      })
    })

    describe('Power', () => {
      it('Should be correct', () => {
        assert(
          power(2, 15) === 32768,
          'Error in power calculator'
        );
      })

      it('Should be incorrect', () => {
        assert(
          !(power(15, 2) === 224),
          'Error in power calculator'
        );
      })
    })
  })

  describe('Task 5: Lazy Evaluation and Generators', () => {

    describe('Lazy Map', () => {
      it('Should be correct', () => {
        const array = [1,2,3,4,5];
        const testArray = [...array];
        const fn = x => x * 2;
        const generator = lazyMap(array, fn)
        assert(
          (() => {
            let output = generator.generateNext();
            while (!output?.done && output.value) {
              if (testArray.shift() * 2 !== output.value) {
                return false;
              }
              output = generator.generateNext()
            }
            return true;
          })(), 'Error in lazy mapper'
        );
      })

      it('Should be incorrect', () => {
        const array = [1,2,3,4,5];
        const testArray = [...array];
        array.push(6); // creating a mismatch
        const fn = x => x * 2;
        const generator = lazyMap(array, fn)
        assert(
          !(() => {
            let output = generator.generateNext();
            while (!output?.done) {
              if (testArray.shift() * 2 !== output.value) {
                return false;
              }
              output = generator.generateNext()
            }
            return true;
          })(), 'Error in lazy mapper'
        );
      })
    })

    describe('Fibonacci Generator', () => {
      const fibonacciNumbers = {
        0: 0,
        1: 1,
        2: 1,
        3: 2,
        4: 3,
        5: 5,
        6: 8,
        7: 13,
        8: 21,
        9: 34,
        10: 55,
        11: 89,
        12: 144,
        13: 233,
      }
      it('Should be correct', () => {
        const generator = fibonacciGenerator();
        for (let i = 0; i < 20; i++) {
          assert(
            (() => {
              let output = generator.generateNext();
              return fibonacciNumbers[i] ? fibonacciNumbers[i] === output.value : true;
            })(), 'Error in Fibonacci generator'
          );
        }
      })

      it('Should be incorrect', () => {
        const generator = fibonacciGenerator();
        const copy = { ...fibonacciNumbers };
        for (let fibonacciNumbersKey in copy) {
          fibonacciNumbers[fibonacciNumbersKey]++;
        }
        for (let i = 0; i < 20; i++) {
          assert(
            (() => {
              let output = generator.generateNext();
              return fibonacciNumbers[i] ? !(fibonacciNumbers[i] === output.value) : true;
            })(), 'Error in Fibonacci generator'
          );
        }
      })
    })
  })
});

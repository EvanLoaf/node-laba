const extractWords = text => {
  if (typeof text !== 'string') {
    throw new Error('Please provide a text!');
  }
  return text.split(' ');
};

const applyLowerCase = words => words.map(lowerCaseFn);

const lowerCaseFn = word => word.toLowerCase();

const removeDuplicates = words => words.filter(uniqueWordsFilter);

const uniqueWordsFilter = (word, index, words) => words.indexOf(word) === index;

const sort = arr => [...arr].sort();

const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

const filterUniqueWords = compose(
  extractWords,
  applyLowerCase,
  removeDuplicates,
  sort,
);

module.exports = {
  filterUniqueWords,
}

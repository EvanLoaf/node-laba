const getAverageGrade = students => {
  if (!Array.isArray(students)) {
    throw new Error('I want an array!');
  }
  return compose(
    getGrades,
    flattenGrades,
    getAverage,
  )(students);
}

const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

const getGrades = students => students.filter(gradesFilter).map(extractGrades);

const gradesFilter = student => Array.isArray(extractGrades(student));

const extractGrades = student => student['grades'];

const flattenGrades = gradesArrays => gradesArrays.reduce((a, b) => a.concat(b), []);

const getAverage = grades => grades.reduce((acc, grade) => acc + grade, 0) / grades.length;

module.exports = {
  getAverageGrade,
}

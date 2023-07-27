const getFullName = person => nameBuilder(person);

const nameBuilder = person => {
  if (person['firstName'] && person['lastName']) {
    return `${person['firstName']} ${person['lastName']}`;
  }
  throw new Error(`Person ${person} does not have first and/or last name`)
}

module.exports = {
  getFullName,
}

const { NotImplementedError } = require('../lib');

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  if (!Array.isArray(members)) {
    return false;
  }

  const initials = members
    .filter((member) => typeof member === 'string')
    .filter((member) => member.trim().length > 0)
    .filter((member) => /[a-zA-Z]/.test(member))
    .map((member) => member.trim()[0].toUpperCase())
    .sort()
    .join('');

  if (initials.length === 0) {
    return false;
  }

  return initials;
}

// console.log(createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']));
// console.log(createDreamTeam(['', null, '11']));

module.exports = {
  createDreamTeam
};

const { NotImplementedError } = require('../lib');

/**
 * Given a number, replace this number with
 * the sum of its digits until we get to a one digit number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For 100, the result should be 1 (1 + 0 + 0 = 1)
 * For 91, the result should be 1 (9 + 1 = 10, 1 + 0 = 1)
 *
 */
function getSumOfDigits(n) {
  if (typeof n !== 'number' || n < 0) {
    throw new NotImplementedError('Input must be a non-negative number');
  }

  while (n >= 10) {
    n = n.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

// console.log(getSumOfDigits(100)); // 1
// console.log(getSumOfDigits(91));  // 1
// console.log(getSumOfDigits(12345)); // 6

module.exports = {
  getSumOfDigits
};

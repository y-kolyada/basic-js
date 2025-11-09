const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new NotImplementedError('Input must be an array');
  }

  const result = [];
  const discardedIndices = new Set();
  const controlSequences = new Set(['--double-next', '--double-prev', '--discard-next', '--discard-prev']);

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '--double-next':
        if (i + 1 < arr.length && !discardedIndices.has(i + 1)) {
          result.push(arr[i + 1]);
        }
        break;
      case '--double-prev':
        if (i - 1 >= 0 && !discardedIndices.has(i - 1)) {
          result.push(arr[i - 1]);
        }
        break;
      case '--discard-next':
        if (i + 1 < arr.length) {
          discardedIndices.add(i + 1);
          if (!controlSequences.has(arr[i + 1])) {
            i++;
          }
        }
        break;
      case '--discard-prev':
        if (result.length > 0 && i - 1 >= 0 && !discardedIndices.has(i - 1)) {
          result.pop();
          discardedIndices.add(i - 1);
        }
        break;
      default:
        if (!discardedIndices.has(i)) {
          result.push(arr[i]);
        }
    }
  }
  return result;
}

// console.log(transform([1, 2, 3, '--double-next', 4, 5])); // [1, 2, 3, 4, 4, 5]
// console.log(transform([1, 2, 3, '--discard-prev', 4, 5])); // [1, 2, 4, 5]
// console.log(transform([1, 2, '--discard-prev', '--discard-prev', 4, 5]));
// console.log(transform([1, '--discard-prev', '--discard-prev', '--discard-prev', 4, 5]));
// console.log(transform([1, 2, 3, '--discard-next', 4, 5]));
// console.log(transform([1, 2, 3, '--discard-next', '--discard-next', 5]));

module.exports = {
  transform
};

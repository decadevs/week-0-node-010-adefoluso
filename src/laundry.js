/**
 * Laundry Problem
 *
 * @param {number} noOfWashes
 * @param {number[]} cleanPile
 * @param {number[]} dirtyPile
 *
 * @returns {number}
 */
function getMaxPairs(numberMachineCanWash, cleanPile, dirtyPile) {
  let cleanStorage = {};
  let dirtyStorage = {};
  // To statrt Create 2 Objects of Clean and Dirty socks
  for (const cleanSock of cleanPile) {
    cleanStorage[cleanSock] = cleanStorage[cleanSock] + 1 || 1;
  }
  for (const dirtySock of dirtyPile) {
    dirtyStorage[dirtySock] = dirtyStorage[dirtySock] + 1 || 1;
  }
  // Then Loop through to see if there's clean sock that need to be paired
  // and check if it's available in the dirty storage
  for (const sock of Object.keys(dirtyStorage)) {
    if (numberMachineCanWash) {
      if (cleanStorage[sock] % 2 === 1 && dirtyStorage[sock]) {
        dirtyStorage[sock] -= 1;
        cleanStorage[sock] += 1;
        numberMachineCanWash--;
      }
    }
  }
  // Now Do another loop to check if there's:
  for (const sock of Object.keys(dirtyStorage)) {
    // Check for Exact pair of dirty socks
    if (dirtyStorage[sock] % 2 === 0) {
      if (numberMachineCanWash > dirtyStorage[sock]) {
        let washes = dirtyStorage[sock];
        cleanStorage[sock] = cleanStorage[sock] + washes || washes;
        dirtyStorage[sock] -= washes;
        numberMachineCanWash -= washes;
      } else {
        let washes = Math.floor(numberMachineCanWash / 2) * 2;
        cleanStorage[sock] = cleanStorage[sock] + washes || washes;
        dirtyStorage[sock] -= washes;
        numberMachineCanWash -= washes;
      }
      // Do a pair or more
    } else if (dirtyStorage[sock] / 2 >= 1) {
      if (numberMachineCanWash > dirtyStorage[sock]) {
        let washes = Math.floor(dirtyStorage[sock] / 2) * 2;
        cleanStorage[sock] = cleanStorage[sock] + washes || washes;
        dirtyStorage[sock] -= washes;
        numberMachineCanWash -= washes;
      } else {
        let washes = Math.floor(numberMachineCanWash / 2) * 2;
        cleanStorage[sock] = cleanStorage[sock] + washes || washes;
        dirtyStorage[sock] -= washes;
        numberMachineCanWash -= washes;
      }
    }
  }
  let pairs = Object.values(cleanStorage);
  // Now get the total number of pair(s) by combining each  available pair(s)
  totalPair = pairs.reduce((pairs, sock) => {
    return pairs + Math.floor(sock / 2);
  }, 0);
  return totalPair;
}

const numberMachineCanWash = 2;
const cleanPile = [1, 2, 3, 1, 2, 3];
const dirtyPile = [3, 3, 4, 1, 2, 7, 9];
console.log(getMaxPairs(numberMachineCanWash, cleanPile, dirtyPile));

module.exports = getMaxPairs;

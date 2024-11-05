/*
// https://www.youtube.com/watch?v=DJ4a7cmjZY0
// Total Unique Ways To Make Change - Dynamic Programming ("Coin Change 2" on LeetCode)
// YT channel: Back to Back SWE

NOTE: UNLIKE COIN CHANGE 1, WE ARE NOT LOOKING AT FINDING THE MIN NUMBER OF COINS
BUT WANT TO KNOW THE NUMBER OF WAYS WE CAN MAKE UP THE AMOUNT GIVEN THAT WE CAN
USE EACH COIN INFINITE NUMBER OF TIMES

**Problem** (Medium)
You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

**Input/Output examples**
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Input: amount = 10, coins = [10]
Output: 1

**Approach**


**Analysis**
TC = O(amount * coins) // Scan through 2D matrix
SC = O(amount * coins) // DP matrix is of this size

*/

function change(amount, coins) {
  // First row is for empty set of coins (last is a set of all coins)
  // First column is for zero amount (last is for the total amount)
  // Hence, adding an extra row and an extra column
  const numberOfWaysDP = new Array(coins.length + 1)
    .fill(0)
    .map(() => new Array(amount + 1))

  // Base case 1:
  // 1st row: Matching every amount with zero coins:
  // ... matching amount zero has 1 way i.e do nothing
  // ... matching non-zero amount has 0 ways i.e no coins to match
  for (let column = 0; column < numberOfWaysDP[0].length; column++) {
    if (column === 0) {
      numberOfWaysDP[0][column] = 1
    } else {
      numberOfWaysDP[0][column] = 0
    }
  }

  // Base case 2:
  // 1st column: Matching zero amount with every coin set:
  // ... matching amount zero with any set of coins is 1 way i.e do nothing
  for (let row = 0; row < numberOfWaysDP.length; row++) {
    numberOfWaysDP[row][0] = 1
  }

  // Recursive formula for number of ways to get amount:
  // DP[i][j] = either take the coin + dont take it
  // DP[i][j] = DP[i][j - coins[i - 1]] + DP[i - 1][j] (Note: i is the coin, j is the amount)
  // j - coins[i - 1]: represents the remaining amount after taking the coin
  // Note: We need theck for out of bounds each time
  for (let row = 1; row < numberOfWaysDP.length; row++) {
    for (let column = 1; column < numberOfWaysDP[0].length; column++) {
      let notTakingCoinWay = row - 1 >= 0 ? numberOfWaysDP[row - 1][column] : 0
      let takingCoinWay =
        column - coins[row - 1] >= 0
          ? numberOfWaysDP[row][column - coins[row - 1]]
          : 0

      numberOfWaysDP[row][column] = notTakingCoinWay + takingCoinWay
    }
  }

  return numberOfWaysDP[numberOfWaysDP.length - 1][numberOfWaysDP[0].length - 1]
}

console.log(change(5, [1, 2, 5])) // 4
console.log(change(3, [2])) // 0

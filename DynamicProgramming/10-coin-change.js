/*
https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Medium)
You are given an integer array coins representing coins of different 
denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

**Input/Output examples**
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Input: coins = [2], amount = 3
Output: -1

Input: coins = [1], amount = 0
Output: 0

**Approach**
(NOTE: TIP is to not create a DP corresponding to the coins array but to make a DP enumerating 
all the amounts ranging from nothing (0) to the given amount in the problem)

1. To make a selection of a coin for an amount, we must first make sure it is less than equal to the amount
2. Hence, if coinValue <= amount, then:
    minCoins = Min(1 + minCoins[remaining amount], minCoins[amount]) // i.e min of adding the coin vs not adding it

// Base case:
// minCoin(0) = 0 since we need 0 coins to reach an amount of 0 (i.e DP[0] = 0 in bottom up DP)

We have the base case and recursive formula with repeating sub-problem, 
so we can employ the bottom-up approach to solve the problem!

**Analysis:
TC = O(amount * length of coins) // For each amount, we traverse the list of coins
SC = O(amount)                   // Our DP Matrix length is from 0 to amount value

*/

function coinChange(coins, amount) {
  // Take DP from amount 0 to amount N (i.e N + 1 indices)
  // For each index, make the number of coins = max value
  const dpMatrix = new Array(amount + 1).fill(Infinity)

  // Base case
  dpMatrix[0] = 0 // To get amount of 0, we need 0 coins

  for (let i = 1; i < amount + 1; i++) {
    const currentAmount = i

    for (let j = 0; j < coins.length; j++) {
      const coin = coins[j]

      if (coin <= currentAmount) {
        dpMatrix[i] = Math.min(
          1 + dpMatrix[currentAmount - coin],
          dpMatrix[currentAmount]
        )
      }
    }
  }

  if (dpMatrix[amount] !== Infinity) {
    return dpMatrix[amount]
  }

  return -1
}

console.log(coinChange([1, 2, 5], 11)) // 3 (i.e 5, 5, 1)
console.log(coinChange([2], 3)) // -1
console.log(coinChange([1], 0)) // 0

/*

**Problem** (Medium)
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like 
(i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously 
(i.e., you must sell the stock before you buy again).

**Input/Output examples**
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]

Input: prices = [1]
Output: 0

**Approach**
Instead of bottom-up, this problem is easy to solve using the top-down 
(recursion with memoization approach)

**Analysis**
TC = O(N) // only one iteration of the prices list
SC = O(N) // Maintaining a DP to memoize / cache results

*/

function maxProfit(prices) {
  // We can be in either state - Buy or Sell
  // Mark buy with (true) and sell with (false) [i.e binary states]

  // Conditions:
  // If we buy => We can move to the next price to sell i.e (i + 1)th
  // If we sell => We cannot move to the next price tp sell since
  // we have a mandatory cooldown step. Hence move to (i + 2)th index

  const cache = {} // At each step, we can have a (i, buy flag) as a decision.
  // Hence, a combo of these can be our key

  const dfs = (i, buying) => {
    if (i >= prices.length) {
      return 0
    }

    if (cache[`${i} ${buying}`]) {
      return cache[`${i} ${buying}`]
    }

    if (buying) {
      // There are two options: buy the stock at current price or cooldown (move to the next)
      // After buying you need to first sell before the next buy
      cache[`${i} ${buying}`] = Math.max(
        dfs(i + 1, !buying) - prices[i], // Buying: reduce profit by stock price since we are buying
        dfs(i + 1, buying) // Cooldown: Doing nothing, moving to the next only - profit not affected
      )
    } else {
      // selling
      // There are two options again: Sell or cooldown -
      // ***if you sell, you need to cooldown the next day!*** i.e i + 2
      // After selling you need to first buy before the next sell
      cache[`${i} ${buying}`] = Math.max(
        dfs(i + 2, !buying) + prices[i], // Selling: increase profit by stock price since we are selling
        dfs(i + 1, buying) // Cooldown: Doing nothing, moving to the next only - profit not affected
      )
    }

    return cache[`${i} ${buying}`]
  }

  return dfs(0, true) // We first have to buy before selling
}

console.log(maxProfit([1, 2, 3, 0, 2])) // 3
console.log(maxProfit([1])) // 0

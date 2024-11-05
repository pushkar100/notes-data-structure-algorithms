/*
// https://www.youtube.com/watch?v=E2-heUEnZKU
// (Best Time To Buy & Sell Stock 1 | Nikhil Lohia YT channel)

**Problem** (Easy)
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a 
different day in the future to sell that stock.

**Input/Output examples**
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

**Approach**

**Analysis**
TC = O(N) // since we are doing only one iteration of the prices
SC = O(1) // since we only maintain a few fixed number of variables for any given price list size

*/

function maxProfit(prices) {
  // Initially, explore buying on the first day (in order to sell later)
  let buyPrice = prices[0]

  // Initially, no profit has been made
  let maxProfit = 0

  for (let i = 0; i < prices.length; i++) {
    // Rules:
    // 1. Only buy when the price is lower than the current buy price
    // 2. Sell if new price > buy price
    // 3. Update max price if current profit (i.e today's price - buy price) is more than it

    if (prices[i] < buyPrice) {
      buyPrice = prices[i]
    } else {
      // Case: prices[i] >= buyPrice
      const currentProfit = prices[i] - buyPrice
      maxProfit = Math.max(maxProfit, currentProfit)
    }
  }

  return maxProfit
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 5
console.log(maxProfit([7, 6, 4, 3, 1])) // 0

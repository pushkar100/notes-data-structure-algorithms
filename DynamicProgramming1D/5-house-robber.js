/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Medium)
You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed, the only constraint 
stopping you from robbing each of them is that adjacent houses have 
security systems connected and it will automatically contact the police 
if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

**Input/Output examples**
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

**Approach**
We can rob only one house among every two adjacent ones.
1. To find the maximum amount of robbing a house until the end,
we have to find the max of robbing that house plus the max amount of robbing 
from the house after the next (since the next cannot be included)
2. The other choice is to find the max amount of robbing the house from the 
next house onwards (i.e we do not include the current house)

Hence,
Recursive formula: DP[n] = Max(n + DP[n + 2], DP[n + 1])

Base case:
DP[last element] = Max(cost[last element], 0) // We either include it or not (while robbing from the last house to the last house)
DP[last but one element] = Max(cost[last but one element], DP[last element]) // If we take the last but one, we cannot take the last 
& vice versa

Using the base case and recursive formula, we can move backwards in pure DP i.e bottom-up approach to solve it

Note: We can keep two variables instead of the entire DP to optiomize SC to O(1)

**Analysis**
TC = O(n) --> either DFS + Memoization / True DP (Bottom Up i.e work backwards from smallest sub-problem)
SC = O(1) --> We don't require entire DP array. Just two variables!

*/

// Formula: DP[n] = Math.max(cost[n] + DP[n + 2], DP[n + 1])
// Base cases:
// DP[last element] = Math.max(Include last element, do not include last element)
// DP[last but one element] = Math.max(cost[last but one element], DP[last element])

function houseRobber(nums) {
  const costMatrix = new Array(nums.length)

  if (nums.length === 0) {
    return 0
  }

  if (nums.length === 1) {
    return nums[0]
  }

  costMatrix[costMatrix.length - 1] = Math.max(nums[nums.length - 1], 0)
  costMatrix[costMatrix.length - 2] = Math.max(
    nums[nums.length - 2],
    costMatrix[costMatrix.length - 1]
  )

  for (let i = costMatrix.length - 3; i >= 0; i--) {
    costMatrix[i] = Math.max(nums[i] + costMatrix[i + 2], costMatrix[i + 1])
  }

  return costMatrix[0]
}

console.log(houseRobber([1, 2, 3, 1])) // 4
console.log(houseRobber([2, 7, 9, 3, 1])) // 12

// --------------------------------------------------

function houseRobberSpaceOptimized(nums) {
  if (nums.length === 0) {
    return 0
  }

  if (nums.length === 1) {
    return nums[0]
  }
 
  let last = Math.max(nums[nums.length - 1], 0) // either take it or do not
  let lastButOne = Math.max(nums[nums.length - 2], last) // either take it or take the last

  for (let i = nums.length - 3; i >= 0; i--) {
    // costMatrix[i] = Math.max(nums[i] + costMatrix[i + 2], costMatrix[i + 1])
    const lastButTwo = Math.max(nums[i] + last, lastButOne)
    last = lastButOne
    lastButOne = lastButTwo
  }

  return lastButOne
}

console.log(houseRobber([1, 2, 3, 1])) // 4
console.log(houseRobber([2, 7, 9, 3, 1])) // 12

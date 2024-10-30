/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Medium)
You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed. 
All houses at this place are arranged in a circle. 
That means the first house is the neighbor of the last one. 
Meanwhile, adjacent houses have a security system connected, and it will automatically 
contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

**Input/Output examples**
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Input: nums = [1,2,3]
Output: 3

**Approach**
This problem is similar to "House Robber" problem
The additional constraint is that the houses are in a circle
This means that the last and the first houses are adjacent!

In house robber, we had a DP solution based on:
Recursive formula: DP[n] = Max(n + DP[n + 2], DP[n + 1])
DP[last element] = Max(cost[last element], 0) // We either include it or not (while robbing from the last house to the last house)
DP[last but one element] = Max(cost[last but one element], DP[last element]) // If we take the last but one, we cannot take the last 
& vice versa

Here, we can reuse the same solution but we need to apply it to two lists and get the max:
1. Apply to 0...N-1
2. Apply to 1...N
When we do this, we ensure that the last and first houses (adjacent) are not considered
In the end, the max maybe in either of the computations 1 & 2. 
Hence, we return the max of the computations

**Analysis**
TC = O(n) --> either DFS + Memoization / True DP (Bottom Up i.e work backwards from smallest sub-problem)
SC = O(1) --> We don't require entire DP array. Just two variables!

*/

function houseRobberII(nums) {
  return Math.max(
    houseRobberHelper(nums.slice(0, nums.length - 1)),
    houseRobberHelper(nums.slice(1, nums.length))
  )
}

function houseRobberHelper(nums) {
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

console.log(houseRobberII([2, 3, 2])) // 3
console.log(houseRobberII([1, 2, 3, 1])) // 4
console.log(houseRobberII([1, 2, 3])) // 3

// --------------------------------------------------

function houseRobberIISpaceOptimized(nums) {
  return Math.max(
    houseRobberHelperSpaceOptimized(nums.slice(0, nums.length - 1)),
    houseRobberHelperSpaceOptimized(nums.slice(1, nums.length))
  )
}

function houseRobberHelperSpaceOptimized(nums) {
  if (nums.length === 0) {
    return 0
  }
  if (nums.length === 1) {
    return nums[0]
  }
  let last = Math.max(nums[nums.length - 1], 0)
  let lastButOne = Math.max(nums[nums.length - 2], last)
  for (let i = nums.length - 3; i >= 0; i--) {
    // costMatrix[i] = Math.max(nums[i] + costMatrix[i + 2], costMatrix[i + 1])
    const lastButTwo = Math.max(nums[i] + last, lastButOne)
    last = lastButOne
    lastButOne = lastButTwo
  }
  return lastButOne
}

console.log(houseRobberIISpaceOptimized([2, 3, 2])) // 3
console.log(houseRobberIISpaceOptimized([1, 2, 3, 1])) // 4
console.log(houseRobberIISpaceOptimized([1, 2, 3])) // 3

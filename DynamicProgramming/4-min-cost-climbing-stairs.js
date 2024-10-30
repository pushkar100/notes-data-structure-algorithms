/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Easy)
You are given an integer array cost where cost[i] is the cost of ith step on a staircase. 
Once you pay the cost, you can either climb one or two steps.
You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

**Input/Output examples**
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.

Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.

**Approach**
The problem array only mentions the steps and not the top step!!
Hence, the actual array is [...steps from 1 to n, top step]

For every step, we need to find the min cost of reaching the top from
the one step ahead and two steps ahead. 
minCost(N) = cost of N + min(minCost(N + 1), minCost(N + 2))

The base cases are: 
1. Last step (top): min cost is 0 since we do not need to move at all
2. Last step before top: min cost is the cost of the step since we move by 1 step to the top 
(so we need to take into account the cost of the step when we move ahead from it)
(Note: Last step before to + 2 it out of bounds so we do not need to take it)

Now that we have a recursive formula that contains repeating subproblems
and the base cases, we can work backwards using the bottom-up approach i.e from the end
- Maintain a DP array (0...N i.e append 1 to signify the top)
- Use the base case to define top and last step min costs
- Traverse backwards from last but one step towards 0 (start)
  - Fill in the DP values as per the formula
- Since we can either start from index 0 (step 1) or index 1 (step 2), return the min DP value of the two!

Note: We can space optimize by removing the DP array and maintaining two variables!

**Analysis**
TC = O(n) --> either DFS + Memoization / True DP (Bottom Up i.e work backwards from smallest sub-problem)
SC = O(1) --> We don't require entire DP array. Just two variables!

*/

function minCostClimbingStairs(stepCosts) {
  const dpMinCost = new Array(stepCosts.length + 1) // Adding one since that signifies the top

  // Add base cases
  dpMinCost[dpMinCost.length - 1] = 0 // No cost required to reach the top from the top
  dpMinCost[dpMinCost.length - 2] = stepCosts[stepCosts.length - 1] // Cost to reach top from last step by taking 1 step
  // Cost to reach top from last step by taking 2 steps => out of bounds so not considered

  for (let i = dpMinCost.length - 3; i >= 0; i--) {
    // Add current step cost + min of (cached min costs from next step and next plus one step)
    dpMinCost[i] = stepCosts[i] + Math.min(dpMinCost[i + 1], dpMinCost[i + 2])
  }

  // Since we have the option to start from 1st or the 2nd step, check min of the two and return
  return Math.min(dpMinCost[0], dpMinCost[1])
}

console.log(minCostClimbingStairs([10, 15, 20])) // 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])) // 6

// --------------------------------------------------------

// We need not maintain DP array. So, SC = O(1) by using just two variables
function minCostClimbingStairsSpaceOptimized(stepCosts) {
  // Base cases:
  let firstCost = 0 // Cost to reach the top from the top
  let secondCost = stepCosts[stepCosts.length - 1] // Cost to reach the top from the last step

  for (let i = stepCosts.length - 2; i >= 0; i--) {
    // Starting from second last step
    newStepCost = stepCosts[i] + Math.min(firstCost, secondCost)
    firstCost = secondCost
    secondCost = newStepCost
  }

  return Math.min(secondCost, firstCost) // since we can start from 0 (=> secondCost) or 1 (=> firstCost)
}

console.log(minCostClimbingStairsSpaceOptimized([10, 15, 20])) // 15
console.log(
  minCostClimbingStairsSpaceOptimized([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
) // 6

/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Easy)
You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. 
In how many distinct ways can you climb to the top?

**Input/Output examples**
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Approach**
At every step, we have 2 choices i.e either take one more step or two more steps
So, our DP formula is climb(n) = climb(n + 1) + climb(n + 2)
The base case is when n = last, only one way i.e stay there (so climb(1) = 1)
Another base case is when n = last but one, only one way i.e climb one stair else out of bounds 
if we try to climb two (so climb(2) = 1).

Now that we know the (A) recursive formula that involves a repeatable sub-problem and
(B) the base case(s), we can try to solve this bottom-up

Keep a DP array from 0 to N (i.e total N + 1 indices since DP[0] represents starting the climb 
before taking any step) and perform operations
Base cases
DP[last] = 1
DP[last but one] = 1
Operations:
  Iterate from last but two backwards until we reach 0
    DP[i] = DP[i + 1] + DP[i + 2]
Return DP[0] as the answer

Note: We can optimize space to O(1) but eliminating the DP array and maintaining only the 
first and second number of ways (lookahead) (Note: this problem is essentially "Fibonacci series"!)

**Analysis**
TC = O(n) --> either DFS + Memoization / True DP (Bottom Up)
SC = O(1) --> We don't require entire DP array. Just two variables!
*/

function climbStairsWithOofNSpace(numSteps) {
  if (numSteps === 1 || numSteps === 2) {
    return 1
  }

  const dp = new Array(numSteps + 1) // 0...N

  // Always true for the last two stairs of any staircase
  dp[dp.length - 1] = 1
  dp[dp.length - 2] = 1

  for (let i = dp.length - 3; i >= 0; i--) {
    dp[i] = dp[i + 1] + dp[i + 2]
  }

  return dp[0]
}

console.log(climbStairsWithOofNSpace(5)) // 8

// --------------------------------------------------------------

// Space optimized solution (O(1)) using only first & second
function climbStairsSpaceOptimized(numSteps) {
  if (numSteps === 1 || numSteps === 2) {
    return 1
  }

  let first = 1 // #Ways to reach the end from the last but one step
  let second = 1 // #Ways to reach the end from the last step

  for (let i = numSteps - 2; i >= 0; i--) {
    const newStep = first + second
    second = first
    first = newStep
  }

  return first
}

console.log(climbStairsSpaceOptimized(5)) // 8

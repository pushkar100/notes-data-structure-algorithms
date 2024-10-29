/*

**Problem**
Find the length of the Longest Increasing Subsequence (LIS) of an array of numbers.

(A subsequence of an array is an ordered subset of the array's elements having the same 
sequential ordering as the original array)

**Input**
values: [1, 9, 19, 17, 32, 15, 99]

**Output**
LIS Length = 5
(LIS values = [1, 9, 17, 32, 99])

**Approach** (Bottom Up DP)
1. Create a DP list with length equal to the list of values

2. For every value, the "base case" is that we can create a subsequence with just that value
  i.e DP[i] = 1 for all values initially (where i is the value's index or position)

3. Work with two pointers (nested for loop):
  1. One to scan the list of values (i)
  2. One to scan the values from 0 to the above pointer (j). 
    Why? Because to add the earlier values to a substring, each of those values must be smaller 
    than the ith value 
  Condition: Add a value (ith) to the sequence only if the jth value is smaller than it!
  i.e Strictly increasing!

4. DP "formula" then is: 
  DP[i] = 1 + Maximum(All DP[j]s) 
  (Note: we are adding one since including a value means one addition to the subsequence list)
  (Note: Why use "Maximum" it with dp[i]?
   Reason: We might have updated the dp[i] by adding some other values earlier and increased the
   sequence length - so we want to add the new sequence only if it is longer!)
   How the formula looks in code during iteration: dp[i] = Max(dp[i], dp[j] + 1)
  
5. Return the max of the dp array (Note: why not return dp[last index] ? Because the max subsequence 
  might not contain the last index element)

**Walkthrough**
values  : [1, 9, 19, 17, 32, 15, 99]
indices : [0, 1,  2,  3,  4,  5,  6]
dp      : [1, 1,  1,  1,  1,  1,  1] // i = 0, j = 0, do nothing
          [1, 1,  1,  1,  1,  1,  1] // i = 1, j = 0, values[i] > values[j] (i.e 9 > 1)
          Hence, dp[i] = Max(dp[i], dp[j] + 1)

          [1, 2,  1,  1,  1,  1,  1] // i = 2, j = 0, values[2] > values[0] (i.e 19 > 1) (Hence, dp[2] = Max(dp[2], dp[0] + 1))
          [1, 2,  2,  1,  1,  1,  1] // i = 2, j = 1, values[2] > values[1] (i.e 19 > 9) (Hence, dp[2] = Max(dp[2], dp[1] + 1))

          [1, 2,  3,  1,  1,  1,  1] // i = 3, j = 0, values[3] > values[0] (i.e 17 > 1) (Hence, dp[3] = Max(dp[3], dp[0] + 1))
          [1, 2,  3,  2,  1,  1,  1] // i = 3, j = 1, values[3] > values[1] (i.e 17 > 9) (Hence, dp[3] = Max(dp[3], dp[1] + 1))
          [1, 2,  3,  2,  1,  1,  1] // i = 3, j = 2, values[3] < values[1] (i.e 17 < 19), do nothing

          [1, 2,  3,  2,  1,  1,  1] // i = 4, j = 0, values[4] > values[0] (i.e 32 > 1), (Hence, dp[4] = Max(dp[4], dp[0] + 1))
          [1, 2,  3,  2,  2,  1,  1] // i = 4, j = 1, values[4] > values[1] (i.e 32 > 9), (Hence, dp[4] = Max(dp[4], dp[1] + 1))
          [1, 2,  3,  2,  3,  1,  1] // i = 4, j = 2, values[4] > values[2] (i.e 32 > 19), (Hence, dp[4] = Max(dp[4], dp[2] + 1))
          [1, 2,  3,  2,  4,  1,  1] // i = 4, j = 3, values[4] > values[3] (i.e 32 > 17), (Hence, dp[4] = Max(dp[4], dp[3] + 1))
          
          [1, 2,  3,  2,  4,  1,  1] // i = 5, j = 0, values[5] > values[0] (i.e 15 > 1), (Hence, dp[5] = Max(dp[5], dp[0] + 1))
          [1, 2,  3,  2,  4,  2,  1] // i = 5, j = 1, values[5] > values[1] (i.e 15 > 9), (Hence, dp[5] = Max(dp[5], dp[1] + 1))
          [1, 2,  3,  2,  4,  3,  1] // i = 5, j = 2, values[5] < values[2] (i.e 15 < 19), do nothing
          [1, 2,  3,  2,  4,  3,  1] // i = 5, j = 3, values[5] < values[3] (i.e 15 < 17), do nothing
          [1, 2,  3,  2,  4,  3,  1] // i = 5, j = 4, values[5] < values[4] (i.e 15 < 32), do nothing

          [1, 2,  3,  2,  4,  3,  1] // i = 6, j = 0, values[6] > values[0] (i.e 99 > 1), (Hence, dp[6] = Max(dp[6], dp[0] + 1))
          [1, 2,  3,  2,  4,  3,  2] // i = 6, j = 1, values[6] > values[1] (i.e 99 > 9), (Hence, dp[6] = Max(dp[6], dp[1] + 1))
          [1, 2,  3,  2,  4,  3,  3] // i = 6, j = 2, values[6] > values[2] (i.e 99 > 19), (Hence, dp[6] = Max(dp[6], dp[2] + 1))
          [1, 2,  3,  2,  4,  3,  4] // i = 6, j = 3, values[6] > values[3] (i.e 99 > 17), (Hence, dp[6] = Max(dp[6], dp[3] + 1))
          [1, 2,  3,  2,  4,  3,  4] // i = 6, j = 4, values[6] > values[4] (i.e 99 > 32), (Hence, dp[6] = Max(dp[6], dp[4] + 1))
          [1, 2,  3,  2,  4,  3,  5] // i = 6, j = 5, values[6] > values[5] (i.e 99 > 15), (Hence, dp[6] = Max(dp[6], dp[5] + 1))
          [1, 2,  3,  2,  4,  3,  5]

Return max(dp) = 5

**Analysis**
TC: O(n^2) --> Nested loops
SC: O(n) --> For the DP array

*/

function lengthOfLIS(values) {
  const dp = new Array(values.length).fill(1)

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < i; j++) {
      if (values[i] > values[j]) {
        // Strictly increasing
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

console.log(lengthOfLIS([1, 9, 19, 17, 32, 15, 99])) // 5

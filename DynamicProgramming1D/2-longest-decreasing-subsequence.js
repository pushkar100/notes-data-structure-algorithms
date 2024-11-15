/*

**Problem** (Medium)
Find the length of the Longest Decreasing Subsequence (LDS) of an array of numbers.

(A subsequence of an array is an ordered subset of the array's elements having the same 
sequential ordering as the original array)

**Input**
values: [10, -1, 4, 7, 0, 5, 2, -1]

**Output**
LDS Length = 5
(LDS values = [10, 7, 5, 2, -1])

**Approach** (Bottom Up DP)
1. Create a DP list with length equal to the list of values

2. For every value, the "base case" is that we can create a subsequence with just that value
  i.e DP[i] = 1 for all values initially (where i is the value's index or position)

3. Work with two pointers (nested for loop):
  1. One to scan the list of values (i)
  2. One to scan the values from 0 to the above pointer (j). 
    Why? Because to add the earlier values to a substring, each of those values must be LARGER 
    than the ith value 
  Condition: Add a value (ith) to the sequence only if the jth value is LARGER than it!
  i.e Strictly decreasing!

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
values  : [10, -1, 4,  7,  0,  5,  2, -1]
indices : [0,  1,  2,  3,  4,  5,  6, 7]
dp      : [1,  1,  1,  1,  1,  1,  1, 1] // i = 0, j = 0, do nothing
          [1,  1,  1,  1,  1,  1,  1, 1] // i = 1, j = 0, values[i] < values[j] (i.e -1 < 10)
          Hence, dp[i] = Max(dp[i], dp[j] + 1) 
          i.e dp[1] = Max(dp[1], dp[0] + 1)

          [1,  2,  1,  1,  1,  1,  1, 1] // i = 2, j = 0, values[i] < values[j] (i.e 4 < 10), (Hence, dp[2] = Max(dp[2], dp[0] + 1))
          [1,  2,  2,  1,  1,  1,  1, 1] // i = 2, j = 1, values[i] > values[j] (i.e 4 > -1), do nothing

          [1,  2,  2,  1,  1,  1,  1, 1] // i = 3, j = 0, values[i] < values[j] (i.e 7 < 10), (Hence, dp[3] = Max(dp[3], dp[0] + 1))
          [1,  2,  2,  2,  1,  1,  1, 1] // i = 3, j = 1, values[i] > values[j] (i.e 7 > -1), do nothing
          [1,  2,  2,  2,  1,  1,  1, 1] // i = 3, j = 2, values[i] > values[j] (i.e 7 > 4), do nothing

          [1,  2,  2,  2,  1,  1,  1, 1] // i = 4, j = 0, values[i] < values[j] (i.e 0 < 10), (Hence, dp[4] = Max(dp[4], dp[0] + 1))
          [1,  2,  2,  2,  2,  1,  1, 1] // i = 4, j = 1, values[i] > values[j] (i.e 0 > -1), do nothing 
          [1,  2,  2,  2,  2,  1,  1, 1] // i = 4, j = 2, values[i] < values[j] (i.e 0 < 4), (Hence, dp[4] = Max(dp[4], dp[2] + 1))
          [1,  2,  2,  2,  3,  1,  1, 1] // i = 4, j = 3, values[i] < values[j] (i.e 0 < 7), (Hence, dp[4] = Max(dp[4], dp[3] + 1))
          
          [1,  2,  2,  2,  3,  1,  1, 1] // i = 5, j = 0, values[i] < values[j] (i.e 5 < 10), (Hence, dp[5] = Max(dp[5], dp[0] + 1))
          [1,  2,  2,  2,  3,  2,  1, 1] // i = 5, j = 1, values[i] > values[j] (i.e 5 > -1), do nothing 
          [1,  2,  2,  2,  3,  2,  1, 1] // i = 5, j = 2, values[i] > values[j] (i.e 5 > 4), do nothing
          [1,  2,  2,  2,  3,  2,  1, 1] // i = 5, j = 3, values[i] < values[j] (i.e 5 < 7), (Hence, dp[5] = Max(dp[5], dp[3] + 1))
          [1,  2,  2,  2,  3,  3,  1, 1] // i = 5, j = 4, values[i] > values[j] (i.e 5 > 0), do nothing
          
          [1,  2,  2,  2,  3,  3,  1, 1] // i = 6, j = 0, values[i] < values[j] (i.e 2 < 10), (Hence, dp[6] = Max(dp[6], dp[0] + 1))
          [1,  2,  2,  2,  3,  3,  2, 1] // i = 6, j = 1, values[i] > values[j] (i.e 2 > -1), do nothing
          [1,  2,  2,  2,  3,  3,  2, 1] // i = 6, j = 2, values[i] < values[j] (i.e 2 < 4), (Hence, dp[6] = Max(dp[6], dp[2] + 1))
          [1,  2,  2,  2,  3,  3,  3, 1] // i = 6, j = 3, values[i] < values[j] (i.e 2 < 7), (Hence, dp[6] = Max(dp[6], dp[3] + 1))
          [1,  2,  2,  2,  3,  3,  3, 1] // i = 6, j = 4, values[i] > values[j] (i.e 2 > 0), do nothing
          [1,  2,  2,  2,  3,  3,  3, 1] // i = 6, j = 5, values[i] < values[j] (i.e 2 < 5), (Hence, dp[6] = Max(dp[6], dp[5] + 1))

          [1,  2,  2,  2,  3,  3,  4, 1] // i = 7, j = 0, values[i] < values[j] (i.e -1 < 10), (Hence, dp[7] = Max(dp[7], dp[0] + 1))
          [1,  2,  2,  2,  3,  3,  4, 2] // i = 7, j = 1, values[i] = values[j] (i.e -1 = -1), do nothing
          [1,  2,  2,  2,  3,  3,  4, 2] // i = 7, j = 2, values[i] < values[j] (i.e -1 < 4), (Hence, dp[7] = Max(dp[7], dp[2] + 1))
          [1,  2,  2,  2,  3,  3,  4, 3] // i = 7, j = 3, values[i] < values[j] (i.e -1 < 7), (Hence, dp[7] = Max(dp[7], dp[3] + 1))
          [1,  2,  2,  2,  3,  3,  4, 3] // i = 7, j = 4, values[i] < values[j] (i.e -1 < 0), (Hence, dp[7] = Max(dp[7], dp[4] + 1))
          [1,  2,  2,  2,  3,  3,  4, 4] // i = 7, j = 5, values[i] < values[j] (i.e -1 < 5), (Hence, dp[7] = Max(dp[7], dp[5] + 1))
          [1,  2,  2,  2,  3,  3,  4, 4] // i = 7, j = 6, values[i] < values[j] (i.e -1 < 2), (Hence, dp[7] = Max(dp[7], dp[6] + 1))
          [1,  2,  2,  2,  3,  3,  4, 5]
          
Return max(dp) = 5

**Analysis**
TC: O(n^2) --> Nested loops
SC: O(n) --> For the DP array

*/

function lengthOfLDS(values) {
  const dp = new Array(values.length).fill(1)

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < i; j++) {
      if (values[i] < values[j]) {
        // Strictly decreasing
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

console.log(lengthOfLDS([10, -1, 4, 7, 0, 5, 2, -1])) // 5

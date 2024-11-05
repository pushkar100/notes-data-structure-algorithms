/*
// https://www.youtube.com/watch?v=qMky6D6YtXU&t=55s

**Problem** (medium)
Given two strings text1 and text2, return the length of their longest common subsequence. 
If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some 
characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

**Input/Output examples**
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

**Approach**

**Analysis**
TC = O(M * N) where m = text 1 length, n = text 2 length // Since we are traversing the matrix m x n
SC = O(M * N) where m = text 1 length, n = text 2 length // Since we build a matrix of m x n

*/

// Recursive formula:
// If chars match then DP[i][j] = 1 (add char to subsequence) + diagonal next DP = 1 + DP[i + 1][j + 1]
// If chars do not match then DP[i][j] = Max(right DP, bottom DP) = Max(DP[i][j + 1], DP[i + 1][j])
// Why max of right dp & bottom dp? Because we try to match the rest of the substring of text1 with
// current substring of text2 (bottom dp) and vice-versa (right dp)

function longestCommonSubsequence(text1, text2) {
  // Keeping one extra row and column towards the end to indicate empty string
  const subsequenceLengthDP = new Array(text1.length + 1)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0))

  // Base cases: matching any character with an empty string will lead to 0 common subsequence length
  // Last column = 0s
  for (let i = 0; i < subsequenceLengthDP.length; i++) {
    subsequenceLengthDP[i][subsequenceLengthDP[0].length - 1] = 0
  }
  // Last row = 0s
  for (let j = 0; j < subsequenceLengthDP[0].length; j++) {
    subsequenceLengthDP[subsequenceLengthDP.length - 1][j] = 0
  }

  // DP iterations: (bottom up - backwards from last cell to first)
  for (let i = subsequenceLengthDP.length - 2; i >= 0; i--) {
    for (let j = subsequenceLengthDP[0].length - 2; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        subsequenceLengthDP[i][j] = 1 + subsequenceLengthDP[i + 1][j + 1]
      } else {
        subsequenceLengthDP[i][j] = Math.max(
          subsequenceLengthDP[i][j + 1],
          subsequenceLengthDP[i + 1][j]
        )
      }
    }
  }

  return subsequenceLengthDP[0][0]
}

console.log(longestCommonSubsequence('abcde', 'ace')) // 3 (i.e "ace")
console.log(longestCommonSubsequence('abc', 'abc')) // 3 (i.e "abc")
console.log(longestCommonSubsequence('abc', 'def')) // 0
console.log(longestCommonSubsequence('abcba', 'abcbcba')) // 5 (i.e "abcba")

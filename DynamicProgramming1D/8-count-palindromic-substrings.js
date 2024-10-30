/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem** (Medium)
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

**Input/Output examples**
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

**Approach**
Similar to solving for the longest palindromic substring!

Brute force approach involves generating every permutation of the array i.e get all 
substrings and then checking if each of them is a palindrome (and mark the longest)
But to get all permutations, TC = O(N^2) and to check if palindrome, TC = O(N)
Hence, overall Brute Force TC = O(N^3) which is quite bad and can be improved!

(NOTE: WE ARE NOT DOING A TRADITIONAL DP APPROACH FOR THIS SOLUTION.
IF YOU WANT TO LEARN A PROPER DP APPROACH USING A DP MATRIX ETC, CHECK LEETCODE)

The optimized approach tries to break the problem into TC = O(N^2)
by performing the palindrome check while scanning the array once!

There are two ways to check if a string is a palindrome:
1. Move inwards from the edges towards the center and check if the characters match
2. Move outwards from the center towards the edges and check if the characters match

In this problem, we will use way #2 as whenever we are at a particular character
during the scan, we can extend outwards from it to check if the string being a palindrome
we can identify with it being the center element of it!
Similar to longest palindromic substring but we count the palindromes instead of finding
the longest!

Catch: What about odd length palindromes without a single center?
We need to accomodate for this by extending out from i (Left), i + 1 (Right) instead
of having both Left and Right extend from i (single center)
Hence, we will have a similar second loop for even length palindromes but the TC does not change!

**Analysis**
TC = O(N^2) // Scan the array (O(N)) and for each iteration, try to check the palindrome (O(N))
SC = O(1)   // Only need a few fixed number of variables . Ex: left, right, longestPalindrome and its length...

*/

function countPalindromicSubstrings(s) {
  const palindromes = []
  let countOfPalindromes = 0

  for (let i = 0; i < s.length; i++) {
    // Odd length palindromes
    let left = i
    let right = i
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      palindromes.push(palindromes)
      countOfPalindromes++
      left--
      right++
    }

    // Even length palindromes
    left = i
    right = i + 1
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // Same while logic as above (can be put inside a function)
      palindromes.push(palindromes)
      countOfPalindromes++
      left--
      right++
    }
  }

  return countOfPalindromes
}

console.log(countPalindromicSubstrings('abc')) // 3 (i.e a, b, and c)
console.log(countPalindromicSubstrings('aaa')) // 6 (i.e a, a, a, aa, aa, aaa)

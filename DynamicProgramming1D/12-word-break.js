/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s

**Problem**
Given a string s and a dictionary of strings wordDict, 
return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Input/Output examples**
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

**Approach**
Brute force approach is to start from each position and compare every word from every new string index!

In the optimized DP solution, we can move a "pointer" to the end of the word length inside the string
once a match has been found amongst all the dictionar words!

Ex: s = "leetcode" and wordDict = ["leet", "code"]
then once we match the first 4 characters of s with "leet", we can move the pointer to the 5th (next) 
character.
i.e "leetcode"
         ^

The recursive formula would be: 
DP[i] = current pos in string + word length <= end of string AND word equals string[current pos...wordlength]
? DP[current pos in string + word length]
: false

i.e If we can match a set of chars with a word and reach the next character location, we only
need to check if we can do the same for the same set of words for the substring of s[next char...end of string]
This is a repeating sub-problem or optimal substructure

Base case is for an empty string we automatically match it since we don't even need to move there (i.e true)
Hence, with a Bottom Up DP we can replicate the space for the string and place an extra item in the end 
to signify the end of the string. If we can reach this, we we successful in breaking the string into words
So, DP[empty string] = true is our base case

From here, move backwards, filling up the DP values one by one based on the recursive formula

**Analysis**
TC = O(N * M * N) = O(N^2 * M) // One iteration of string (N) and loop over each word in 
that iteration (M). Within this, we may have to compare upto N characters (N) while comparing a word 
with a substring of the string
SC = O(N) // since we maintain a DP of booleans of the length the string itself

*/

function wordBreak(s, wordDict) {
  const canWordBreakDP = new Array(s.length + 1).fill(false) // initially, nothing has been broken up
  // +1 because the last element signifies the end of the string

  // Base case:
  canWordBreakDP[canWordBreakDP.length - 1] = true // If we manage to reach the end of the string,
  // we were able to successfully break it into words

  for (let i = canWordBreakDP.length - 2; i >= 0; i--) {
    for (let j = 0; j < wordDict.length; j++) {
      const word = wordDict[j]
      const wordLength = word.length

      if (i + wordLength <= s.length && word === s.slice(i, i + wordLength)) {
        // .slice(start, end) => [start, end) i.e end is exclusive (not included)
        canWordBreakDP[i] = canWordBreakDP[i + wordLength]
      }

      // Optional: Short circuiting once DP[i] has been found to be true
      if (canWordBreakDP[i]) {
        break
      }
    }
  }

  return canWordBreakDP[0]
}

console.log(wordBreak('leetcode', ['leet', 'code'])) // true (leet + code)
console.log(wordBreak('applepenapple', ['apple', 'pen'])) // true (apple + pen + apple) [word reuse example]
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])) // false

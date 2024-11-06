/*

// https://www.youtube.com/watch?v=qMky6D6YtXU&t=55s

**Very similar to Longest common subsequence problem!!**

**Problem** (Medium)
Given two strings word1 and word2, return the minimum number of 
operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character

**Input/Output examples**
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

**Approach**
If the characters are equal, the problem reduces to one where 
where we need to match the remaining parts of each of the words
i.e if equal chars => 
  fn(word1 from next char onwards, word2 from next char onwards)

If the  characters are not equal, we need to make 1 edit (one of 
remove, replace, or insert) and accordingly match the remainings

Base case 1: Word2 is empty. Ex: "ABC" and ""
Remove all characters from Word1. Hence, Word1 length = edit distance

Base case 2: Word1 is empty. Ex: "" and "ABC"
Insert all characters from Word2 to Word1. Hence, Word2 length = edit distance

Recursive formula:
- If equal chars: DP[i][j] =DP[i + 1][j + 1] since no edit but move by 1 char
in each word
- If not equal chars: DP[i][j] = 1 + min(DP[i + 1][j], DP[i][j + 1], DP[i + 1][j + 1])
since we make an edit (remove, insert, or replace) and check the remaining strings
accordingly - minimum edits from those sub-strings is to be considered.

DP bottm-up with base cases filled in: (rows -> word1, cols -> word2)
    a   c   d   -
a [ - , - , - , 3 ] // 3 means "abd" conversion to "" takes 3 edits
b [ - , - , - , 2 ] // 2 means "bd" conversion to "" takes 2 edits
d [ - , - , - , 1 ] // 2 means "d" conversion to "" takes 1 edit
- [ 3 , 2 , 1 , 0 ] // 0 means "" conversion to "" takes 0 edits
Vertically,
3 means "" conversion to "acd" takes 3 edits
2 means "" conversion to "cd" takes 2 edits
1 means "" conversion to "d" takes 1 edit
1 means "" conversion to "" takes 0 edits

Now fill DP from last to DP[0][0]

**Analysis**
TC = O(word1 length * word2 length) // traverses each DP cell
SC = O(word1 length * word2 length) // builds a DP of this size

*/

function minDistance(word1, word2) {
  // 2D matrix -> rows : word1 characters, cols -> word2 characters
  // One extra row and column to indicate end of string for each
  // Intuition: row i means taking from char at index i till the end of the string (empty)
  // and vice versa for columns too! Ex: word1 = "abc" and DP[1] represent row
  // that is considering the string "bc" since word1[i] === 'b'
  const editDistanceDP = new Array(word1.length + 1)
    .fill(0)
    .map(() => new Array(word2.length + 1))

  // Base cases
  for (let row = 0; row < editDistanceDP.length; row++) {
    editDistanceDP[row][editDistanceDP[0].length - 1] = word1.length - row
  }

  for (let column = 0; column < editDistanceDP[0].length; column++) {
    editDistanceDP[editDistanceDP.length - 1][column] = word2.length - column
  }

  // apply recursive formula to sub problems in bottom up fashion
  for (let row = editDistanceDP.length - 2; row >= 0; row--) {
    for (let column = editDistanceDP[0].length - 2; column >= 0; column--) {
      if (word1[row] === word2[column]) {
        editDistanceDP[row][column] = editDistanceDP[row + 1][column + 1]
      } else {
        editDistanceDP[row][column] =
          1 +
          Math.min(
            editDistanceDP[row + 1][column + 1], // replace char in word1
            editDistanceDP[row + 1][column], // delete char from word1
            editDistanceDP[row][column + 1] // insert char into word1
          )
      }
    }
  }

  return editDistanceDP[0][0]
}

console.log(minDistance('abd', 'acd')) // 1
console.log(minDistance('horse', 'ros')) // 3
console.log(minDistance('intention', 'execution')) // 5

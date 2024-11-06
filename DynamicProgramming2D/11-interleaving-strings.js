/*
// https://www.youtube.com/watch?v=qMky6D6YtXU&t=55s

**Problem** (Medium)
Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
substrings
 respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

**Input/Output examples**
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.

Input: s1 = "", s2 = "", s3 = ""
Output: true

**Approach**
Tips to form a recursive formula:
Case 1: target string char matches str1 char but not str2
--- only 1 way to match: increment str1 pointer

Case 2: target string char matches str2 char but not str1
--- only 1 eay to match: increment str2 pointer

Case 3: target string char matches both str1 char and str2
--- 2 ways to match: check both (i.e inc str1 ptr OR inc str2 ptr)

Case 4: target string char does not match both str1 char nor str2 char
--- No way to match. Return false!

Decision tree for recursion is 2^n. 
However, there are repeating sub-problem (optimal substructure)
Hence, we can cache the sub problem solutions!

Base case(s): 
1. If both the string's characters reach the end, then the interleaving
was a success!

True DP solution:
Construct a 2D array. One string for the rows, one for the columns
Add an extra row and column (last) -> signfies reaching the end of 
that particular string

Ex: S1 = aabcc, s2 = dbbca, s3 (target) = aadbbcbcac
    d  b  b  c  a  -
a [ -, -, -, -, -, - ]
a [ -, -, -, -, -, - ]
b [ -, -, -, -, -, - ]
c [ -, -, -, -, -, - ]
c [ -, -, -, -, -, - ]
- [ -, -, -, -, -, - ]

Base case(s): 
1. Corner value [-][-] is true! Why? Matching end of string with end of string
will be true by default!
    d  b  b  c  a  -
2. Initially everything else is false (Intuitive since only the corner cell is the success case)
a [ F, F, F, F, F, F ]
a [ F, F, F, F, F, F ]
b [ F, F, F, F, F, F ]
c [ F, F, F, F, F, F ]
c [ F, F, F, F, F, F ]
- [ F, F, F, F, F, T ]

Now work backwards (bottom-up) - to the top left (answer)!

**Analysis**
TC = O(len(str1) * len(str2)) // Since we iterate over these many cells
SC = O(len(str1) * len(str2)) // Since we build a DP of this size

*/

function isInterleave(s1, s2, s3) {
  // Add an extra row and column (last) -> signfies reaching the
  // end of that particular string
  const interleavableMatrix = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(false)) // Mark all cells
  // except the corner as false by default!

  // short-circuit
  if (s1.length + s2.length !== s3.length) {
    return false
  }

  // Base case:
  // End of both strings have been reached
  interleavableMatrix[interleavableMatrix.length - 1][
    interleavableMatrix[0].length - 1
  ] = true

  for (let s1Idx = interleavableMatrix.length - 1; s1Idx >= 0; s1Idx--) {
    for (let s2Idx = interleavableMatrix[0].length - 1; s2Idx >= 0; s2Idx--) {
      if (s1Idx < s1.length) {
        // Char matching (case 1 or 3)
        if (
          s1[s1Idx] === s3[s1Idx + s2Idx] &&
          interleavableMatrix[s1Idx + 1][s2Idx]
        ) {
          interleavableMatrix[s1Idx][s2Idx] = true
        } // Else: char is not equal (case 2 or 4) [Cell is false by default]
      }

      if (s2Idx < s2.length) {
        // Char matching (case 2 or 3)
        if (
          s2[s2Idx] === s3[s1Idx + s2Idx] &&
          interleavableMatrix[s1Idx][s2Idx + 1]
        ) {
          interleavableMatrix[s1Idx][s2Idx] = true
        } // Else: char is not equal (case 1 or 4) [Cell is false by default]
      }
    }
  }

  return interleavableMatrix[0][0]
}

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac')) // true
console.log(isInterleave('aabcc', 'dbbca', 'aadbbbaccc')) // false
console.log(isInterleave('', '', '')) // true

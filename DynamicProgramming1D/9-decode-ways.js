/*
// https://www.youtube.com/watch?v=W4rYz-kd-cY
// "Coding Interview Problem - Decode Ways" by channel "Knapsack" on YT

**Problem** (Medium)
You have intercepted a secret message encoded as a string of numbers. 
The message is decoded via the following mapping:

"1" -> 'A'

"2" -> 'B'

...

"25" -> 'Y'

"26" -> 'Z'

However, while decoding the message, you realize that there are many different ways you can 
decode the message because some codes are contained in other codes ("2" and "5" vs "25").

For example, "11106" can be decoded into:

"AAJF" with the grouping (1, 1, 10, 6)
"KJF" with the grouping (11, 10, 6)
The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it.
If the entire string cannot be decoded in any valid way, return 0.

**Input/Ouput examples**
Input: s = "12"
Output: 2
Explanation:
"12" could be decoded as "AB" (1 2) or "L" (12).

Input: s = "226"
Output: 3
Explanation:
"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Input: s = "06"
Output: 0
Explanation:
"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). 
In this case, the string is not a valid encoding, so return 0.

**Approach**
If there were no restrictions on selecting 1 digit and 2 digits, respectively
then the number of ways DP would be:
DP[i] = DP[i - 1] + DP[i - 2] (Recursive formula with optimal substructure i.e repeating subproblem)
// NOTE: Think backwards from the last digit! (Right to left)
// i.e one way = selecting this digit and finding how to fill the previous i - 1 digits & 
// second way = selecting this and the prev digit and finding how to fill the previous i - 2 digits

(Note^: For this problem, we scan left to right (i) and look back from i (Right to left) --- 
instead of starting from the end and filling the DP backwards like in many other DP questions.
Hence, DP base cases are also populated at the front of the DP array)

However, we do have "constraints" on the selection:

Case 1: Digits[i] and Digits[i - 1] form a number between 10 & 26 (inclusive)
Here NumWays DP is : DP[i] = DP[i - 1] + DP[i - 2] since we can take either 
current digit or current digit and the prev

Case 2: Digits[i] and Digits[i - 1] form a number above 26 (Ex: '27', '31', ...)
Here DP[i] = dp[i - 1] since we can only take the previous digit but not the current

Case 3: Digits[i] = 0 and Digits[i - 1] = 1 or 2 (Ex: ONLY '10', '20' are possible!!)
Here DP[i] = DP[i - 2] since we have to take the two numbers together

Case 4: Digits[i] = 0 and Digits[i - 1] != 1 or 2 (Ex: '30', '40', '00', ...)
---Invalid sequence--- ! Stop and return 0

Therefore, we have a recursive relationship and base cases so we can do a bottom-up DP:
NumWays DP = length of string + 1 where the 0th index indicates empty string and all other indices 
map to the digit location in string (1 indexed)

NumWays DP[emptyString] => NumWays DP[0] = 1 (1 way to decode empty string - do nothing)
NumWays DP[first digit] => NumWays DP[1] = 1 (1 way to decode single digit - decode that digit)

Every other case can be filled by looking and constraints as per the 4 cases and filling in the values

In the end, return the last value filled in the NumWays DP as it accounts for the entire code string.

**Analysis**
TC = O(N) // Since we only do one scan of the input string
SC = O(N) // since we maintain a numWays dp matrix: but we reduce it to O(1) by 
not taking the entire DP matrix but maintaining the two variables needed for 
DP[i - 1] and DP[i - 2] and updating them each scan

*/

function numDecodings(codeString) {
  // Edge case(s):
  // String cannot start with a leading 0
  if (codeString[0] === '0') {
    return 0
  }

  // NumWays DP = length of string + 1 where the 0th index indicates empty string and
  // all other indices map to the digit location in string (1 indexed)
  const numWaysDP = new Array(codeString.length + 1)
  // Ex: codeString = [1, 2, 4, 3]
  //     numWaysDP  = [x, x, x, x, x]

  // Base case
  numWaysDP[0] = 1 // 1 way to decode empty string - do nothing
  numWaysDP[1] = 1 // 1 way to decode single digit - decode that digit
  // Ex: codeString = [1, 2, 4, 3]
  //     numWaysDP  = [1, 1, x, x, x]

  for (let i = 2; i < numWaysDP.length; i++) {
    // Important! (Note): codeString at i - 1 corresponds to numWaysDP at i (since offset is 1)
    // Ex: codeString = [1,  2,  4,  3]
    //                     \   \   \   \
    //     numWaysDP  = [1,  1,  x,  x,  x]

    if (codeString[i - 1] === '0') {
      if ('12'.includes(codeString[i - 2])) {
        // (Case 3) take the two digits together
        numWaysDP[i] = numWaysDP[i - 2]
      } else {
        // (Case 4) invalid sequence
        return 0
      }
    } else {
      // (Case 1) Take either one digit or two digits together
      if (
        codeString[i - 2] === '1' ||
        (codeString[i - 2] === '2' && '0123456'.includes(codeString[i - 1]))
      ) {
        numWaysDP[i] = numWaysDP[i - 1] + numWaysDP[i - 2]
      } else {
        // (Case 2) Consider only the current digit (cannot take both current & prev)
        numWaysDP[i] = numWaysDP[i - 1]
      }
    }
  }

  return numWaysDP[numWaysDP.length - 1]
}

console.log(numDecodings('12')) // 2
console.log(numDecodings('226')) // 3
console.log(numDecodings('06')) // 0
console.log(numDecodings('10')) // 1
console.log(numDecodings('27')) // 1
console.log(numDecodings('12021')) // 2

/*
DRY RUNS FOR EXPLANATION:

Ex: "01" Leading 0
return 0 (shirtcuit)


Ex: "12721"
codeString = [1, 2, 7, 2, 1]
               \  \  \  \  \
numWaysDP  = [1, 1, x, x, x, x] // after adding base cases
numWaysDP  = [1, 1, 2, x, x, x] // after Case 1: dp[i - 1] + dp[i - 2]
numWaysDP  = [1, 1, 2, 2, x, x] // after Case 2: dp[i - 1]
numWaysDP  = [1, 1, 2, 2, 2, x] // after Case 2: dp[i - 1]
numWaysDP  = [1, 1, 2, 2, 2, 4] // after Case 1: dp[i - 1] + dp[i - 2]


Ex: "12021"
codeString = [1, 2, 0, 2, 1]
               \  \  \  \  \
numWaysDP  = [1, 1, x, x, x, x] // after adding base cases
numWaysDP  = [1, 1, 2, x, x, x] // after Case 1: dp[i - 1] + dp[i - 2]
numWaysDP  = [1, 1, 2, 1, x, x] // after Case 3: dp[i - 2]
numWaysDP  = [1, 1, 2, 1, 1, x] // after Case 2: dp[i - 1]
numWaysDP  = [1, 1, 2, 1, 1, 2] // after Case 1: dp[i - 1] + dp[i - 2]

*/

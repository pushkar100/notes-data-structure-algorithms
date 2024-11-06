/*
// https://www.youtube.com/watch?v=hqGa65Rp5LQ
Target Sum | Dynamic Problem | Leetcode #494 (YT Channel: Techdose)

**Problem** (Medium)
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

**Input/Output examples**
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

Input: nums = [1], target = 1
Output: 1

**Approach**
At each point, we can either assign a +ve to the number or a -ve
i.e two choices in the decision tree

To solve this problem, we need to create 2 buckets:
Bucket 1: All +ve numbers
Bucket 2: All -ve numbers 
Goal: In order to reach the target sum, the condition to be 
satisfied is SUM(Bucket 1) - SUM(Bucket 2) = target sum
Once a path in the decision tree reaches this sum , we can add it to the count
of number of ways we can reach the target
Ex: [1, 1, 1, 1, 1], target = 3
then B1 = [1], B2 = [1, 1, 1, 1], and 
SUM(B1) - SUM(B2) = 4 - 1 = 3 = target sum

Clever math:
SUM(B1) - SUM(B2) = TARGET
SUM(B1) - (TOTAL SUM - SUM(B1)) = TARGET
2 * SUM(B1) - TOTAL SUM = TARGET
SUM(B1) = (TARGET + TOTAL SUM) / 2

The target & total sum are constants!
Therefore, this problem has been reduced to finding a subset sum!
(Refer to subset sum problem)

Subset sum problem: 
(https://www.youtube.com/watch?v=34l1kTIQCIA)

Given a set of non-negative integers and a target sum K
find out if there exists a subset in the given set such that 
sum of the integers of that subset equals to the target sum K 
Ex: set = (2, 2, 3) and K = 5 then TRUE since (2, 3) is a subset
that adds up to K

Recursive formula for subset sum is: (backtracking + recursion)
isSubsetSum(set, n, sum) = 
  isSubsetSum(set, n - 1, sum) ||             // not incl. current integer 
  isSubsetSum(set, n - 1, sum - value of nth) // incl. current integer 

Base cases:
1. To form a sum = 0, not including any set integer is possible - True for any set
2. To form a sum without any set values is not possible, hence - False for any set

Bottom-Up DP visualisation for base cases: 
Using example set (2, 2, 3) and target sum 5.

(Take one extra row for 0 elements in set, one extra column for 0 sum)
                       Sum:  0  1  2  3  4  5
set index 0                 [T, F, F, F, F, F ]
set index 1 (i.e (2))       [T, -, -, -, -, - ]
set index 2 (i.e (2, 2))    [T, -, -, -, -, - ]
set index 2 (i.e (2, 2, 3)) [T, -, -, -, -, - ]

Row => adds a particular set element
Col => amount

Apply the recursive formula on the remaining elements

Ex: for [1][1] .. We can either exclude it ([0][1])
or we can include it by subtracting itself from the sum 
([0][1 - value of set at index 0] = [0][1 - 2] = [0][-1] which
is out of bounds so not possible!)

^ The above is for checking if subset sum exists - but we need to
find the number of ways it is possible to find a subset sum:

Base cases: 
- 1 way to reach sum 0 i.e no elements taken
- 0 ways to reach non-zero sum with zero elements

(Take one extra row for 0 elements in set, one extra column for 0 sum)
                       Sum:  0  1  2  3  4  5
set index 0                 [1, 0, 0, 0, 0, 0 ]
set index 1 (i.e (2))       [1, -, -, -, -, - ]
set index 2 (i.e (2, 2))    [1, -, -, -, -, - ]
set index 2 (i.e (2, 2, 3)) [1, -, -, -, -, - ]

However, when performing the cell calculation (i,e the recursive formula is used)
make sure you start with j (i.e column) = 0 and not 1 even though 0 has been filled
because we need to **recompute the first column**!
**Why?**
It is because for the first column, we have only added one case of matching the
empty sum - exclude element! However, we need to also figure in the case of including
the element! If the element is 0 then this makes a difference in the count. Hence,
it is just easier to recompute it in the iteration!

Formula for cell [i][j]:
i -> element
j -> sum
DP[i][j] = number of ways by excluding + number of ways by including
         = DP[i - 1][j] + DP[i - 1][j - value of element @ position i]
         = DP[i - 1][j] + DP[i - 1][j - nums[i - 1]]

**Analysis**
TC = O(subset size * sum) // Since we traverse these many cells
SC = O(subset size * sum) // Since we need a 2D DP of this size

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

function findTargetSumWays(nums, target) {
  let absoluteTarget = Math.abs(target)
  const totalSum = nums.reduce((acc, num) => acc + num, 0)
  const subsetTargetSum = (absoluteTarget + totalSum) / 2

  // Base condition
  if (totalSum < target || (totalSum + absoluteTarget) % 2 !== 0) {
    return 0
  }

  return countSubsets(nums, subsetTargetSum)
}

function countSubsets(nums, sum) {
  // One extra row (1st row) -> Signifies empty set i.e no integers
  // One extra column (1st column) -> Signifies zero sum
  const possibleWays = new Array(nums.length + 1)
    .fill(0)
    .map(() => new Array(sum + 1))

  for (let row = 0; row < possibleWays.length; row++) {
    // zero sum is possible with any number of elements (i.eexclude all of them)
    possibleWays[row][0] = 1
  }

  for (let column = 0; column < possibleWays[0].length; column++) {
    // non-zero sum is not possible with zero elements
    possibleWays[0][column] = 0
  }

  // zero sum is possible with any zero elements
  possibleWays[0][0] = 1

  for (let row = 1; row < possibleWays.length; row++) {
    // **NOTE!!** -- TAKE COLUMN FROM 0 INSTEAD OF 1!!
    // EVEN THOUGH WE HAVE FILLED THE FIRST COLUMN, WE NEED TO RE-COMPUTE
    // IT FOR EXCLUDING EACH NUMBER IN THE SET!! (Remember this tip, not intuitive)!
    // ... ex case which fails when column = 1 :
    // ....... findTargetSumWays([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)) -> returns 1 instead of 256 (correct)
    for (let column = 0; column < possibleWays[0].length; column++) {
      if (nums[row - 1] <= column) {
        // Can be included. Hence, check both include & exclude sub-problem
        possibleWays[row][column] =
          possibleWays[row - 1][column] +
          possibleWays[row - 1][column - nums[row - 1]]
      } else {
        // Cannot be included. Hence, only exclude num
        possibleWays[row][column] = possibleWays[row - 1][column]
      }
    }
  }

  return possibleWays[possibleWays.length - 1][possibleWays[0].length - 1]
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3)) // 5
console.log(findTargetSumWays([1], 1)) // 1
console.log(findTargetSumWays([1000], 1000)) // 1
console.log(findTargetSumWays([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)) // 256

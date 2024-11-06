/*
// https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=5s
// Also check out target sum

**Problem** (Medium)
Given an integer array nums, return true if you can partition the array into two subsets 
such that the sum of the elements in both subsets is equal or false otherwise.

**Input/Output examples**
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

**Approach**
This problem is the same as the subset sum problem except that
we need some tweaks:
1. If the sum of the elements is odd, we can never equal-sum-partition it!
2. If the sum of the elements is even, we can calculate subset sum by checking
if there is a subset that matches half the total sum 

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

**Analysis**
TC = O(subset size * sum) // Since we traverse these many cells
SC = O(subset size * sum) // Since we need a 2D DP of this size

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const totalSum = nums.reduce((acc, num) => acc + num, 0)

  if (totalSum % 2 !== 0) {
    return false
  }

  return containsSubsetForSum(nums, totalSum / 2)
}

function containsSubsetForSum(nums, sum) {
  // One extra row (1st row) -> Signifies empty set i.e no integers
  // One extra column (1st column) -> Signifies zero sum
  const containsSubset = new Array(nums.length + 1)
    .fill(0)
    .map(() => new Array(sum + 1))

  for (let row = 0; row < containsSubset.length; row++) {
    // zero sum is possible with any number of elements (i.eexclude all of them)
    containsSubset[row][0] = true
  }

  for (let column = 0; column < containsSubset[0].length; column++) {
    // non-zero sum is not possible with zero elements
    containsSubset[0][column] = false
  }

  // zero sum is possible with any zero elements
  containsSubset[0][0] = true

  for (let row = 1; row < containsSubset.length; row++) {
    for (let column = 1; column < containsSubset[0].length; column++) {
      if (nums[row - 1] <= column) {
        // Can be included. Hence, check both include & exclude sub-problem
        containsSubset[row][column] =
          containsSubset[row - 1][column] ||
          containsSubset[row - 1][column - nums[row - 1]]
      } else {
        // Cannot be included. Hence, only exclude num
        containsSubset[row][column] = containsSubset[row - 1][column]
      }
    }
  }

  return containsSubset[containsSubset.length - 1][containsSubset[0].length - 1]
}

console.log(canPartition([1, 5, 11, 5])) // true
console.log(canPartition([1, 2, 3, 5])) // false

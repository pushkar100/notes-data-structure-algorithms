/*
// For DP solution: https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s
// For optimized solution: https://www.youtube.com/watch?v=Y6B-7ZctiW8

**Problem** (Medium)
Given an integer array nums, find a subarray
that has the largest product, and return the product.
 
**Input/Output examples**
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

**Approach**
When do we get the max product of a subarray?
1. All the sub array numbers are positive integers 
Ex: [1, 2, 4, 3] => Max: 1 * 2 * 4 * 3 = 24

2. The subarray has event count of -ve numbers (Since -ve * -ve = +ve)
Ex: [5, 2, -1, 3, -4] => 5 * 2 * -1 * 3 * -4 = 120

These 2 cases for maximizing a product are handled by default
whenever we multiply one number with the next one!

When do we not get the max product of a subarray?
1. The subarray has event count of -ve numbers (Since -ve * +ve = -ve)
Ex: [5, 2, -1, 3, 4] =>  5 * 2 * -1 * 3 * 4 = -120

2. The subarray has a zero somewhere: In this case, we cannot take the entire
array but will have to find the max of (array product before 0, array product after 0)

Handling case #2 is easy. Whenever we come across a 0, we reset the  
product so far to 1. (And, if we are maintaining the max product every iteration then 
that max is still preserved)

Handling case #1 is tricky: We need to ensure that only even number of -ve values are
there in the subarray!
To do this, there are two ways:
1. Proper DP solution: (Neetcode) https://www.youtube.com/watch?v=_i4Yxeh5ceQ&t=59s
2. Another optimized solution: Explained here: https://www.youtube.com/watch?v=Y6B-7ZctiW8

Using the second way (not proper DP),
we need to convert the odd number of negative numbers to even by removing one of them!
- Remove first occurrence of -ve (prefix) : YES
- Remove last occurrence of -ve (suffix) : YES
- Remove a middle occurrence of -ve : NO! (Why? Because subarrays are contiguous and 
removing a middle element means that set is no longer a subarray!)

Technique: (Practice)
Keep a maxProductSoFar and compute:
1. Prefix product : start from left and move to right
2. Suffic product : start from right and move to left

Each time update the max product so far:
maxProductSoFar = Max(maxProductSoFar, LeftProduct, RightProduct)

Each time the prefix / suffix product becomes 0, mark it as 1 (Since, we want to start 
calculating the product of a new subarray after that 0 but if we multiply it with 0, we
won't get the right product - hence, keep 1) 

**Analysis**
TC = O(N) // Since we need only one iteration of the array  
SC = O(1) // Since we do not use anything other than a few fixed set of variables

*/

function maxProductSubArray(nums) {
  let leftProduct = 1
  let rightProduct = 1
  let maxProductSoFar = nums[0] // A list may contain just one number: this can be the default max prod!

  for (let i = 0; i < nums.length; i++) {
    if (leftProduct === 0) {
      leftProduct = 1
    }

    if (rightProduct === 0) {
      rightProduct = 1
    }

    // **(Imp)** Question: : How do we get a middle sub-array when we are actually
    // calculating the prefix (always containing the start element) and the
    // suffix products (always containing the end element)?
   
    // Answer: The above two conditions for 0 are the ones that enable
    // use to find a prefix from the middle instead of always containing
    // the first element (the reset to 1 means we are starting the sub-array 
    // afresh from the ith element)
    // Similarly for the suffix product

    // Prefix array product
    leftProduct = leftProduct * nums[i]

    // Suffix array product
    const lastIndexOfNums = nums.length - 1
    rightProduct = rightProduct * nums[lastIndexOfNums - i]

    maxProductSoFar = Math.max(
      maxProductSoFar,
      Math.max(leftProduct, rightProduct)
    )
  }

  // JS quirk: Stores 0 and -0 differently
  if (maxProductSoFar === -0) {
    maxProductSoFar = 0
  }

  return maxProductSoFar
}

console.log(maxProductSubArray([2, 3, -2, 4])) // 6
console.log(maxProductSubArray([-2, 0, -1])) // 0
console.log(maxProductSubArray([-2])) // -2

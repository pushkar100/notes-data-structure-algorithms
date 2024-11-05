/*
// https://www.youtube.com/watch?v=rBAxUTqvlQA (Video by Techdose)

**Problem** (Medium)
There is a robot on an m x n grid. 
The robot is initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). 
The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths 
that the robot can take to reach the bottom-right corner.

**Input/Output examples**
Input: m = 3, n = 7
Output: 28

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to 
reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down

**Approach**

**Analysis**
TC = O(M * N) // since we have to scan the entire matrix once
SC = O(M * N) // since we need to maintain a DP the size of the matrix

*/

function uniquePaths(m, n) {
  const rows = m
  const columns = n
  const waysDPMatrix = new Array(m).fill(new Array(n))

  // Base cases
  // First row can only be reached in one way (i.e only right movements)
  for (let j = 0; j < columns; j++) {
    waysDPMatrix[0][j] = 1
  }

  // First column can only be reached in one way (i.e only down movements)
  for (let i = 0; i < rows; i++) {
    waysDPMatrix[i][0] = 1
  }

  // Perform DP:
  // Move forwards but from second row and second column (non-base cases)
  // We use the recursive formula but rather than looking at the next cells
  // we look back at the filled cells to figure out how many ways it took to
  // get to the current cell!
  // Formula: DP[i] = DP[i - 1][j+ DP[i][j - 1]
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      waysDPMatrix[i][j] = waysDPMatrix[i - 1][j] + waysDPMatrix[i][j - 1]
    }
  }

  return waysDPMatrix[rows - 1][columns - 1]
}

console.log(uniquePaths(3, 7)) // 28
console.log(uniquePaths(3, 2)) // 3

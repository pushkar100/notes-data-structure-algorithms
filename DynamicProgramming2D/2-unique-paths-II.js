/*
// https://www.youtube.com/watch?v=z6kelCB0ww4 (Video by Techdose)

**Problem** (Medium)
You are given an m x n integer array grid. 
There is a robot initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). 
The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. 
A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

**Input/Output examples**
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

Input: obstacleGrid = [[0,1],[0,0]]
Output: 1

**Approach**


**Analysis**
TC = O(M * N) // since we have to scan the entire matrix once
SC = O(M * N) // since we need to maintain a DP the size of the matrix

*/

function uniquePathsWithObstacles(obstacleGrid) {
  const rows = obstacleGrid.length
  const columns = obstacleGrid[0].length
  const obstacleIdentifier = 1
  const waysDPMatrix = []

  // Let the ways to reach each cell be 0 each time
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!waysDPMatrix[i]) {
        waysDPMatrix[i] = []
      }
      waysDPMatrix[i][j] = 0
    }
  }

  // Base cases:
  // Only one way to reach 1st column cells - but if obstacle
  // is present then that and the rest are unreachable
  let obstacleFound = false
  for (let j = 0; j < columns; j++) {
    if (obstacleGrid[0][j] === obstacleIdentifier || obstacleFound) {
      obstacleFound = true
      waysDPMatrix[0][j] = 0
    } else {
      waysDPMatrix[0][j] = 1
    }
  }

  // Only one way to reach 1st row cells - but if obstacle
  // is present then that and the rest are unreachable
  obstacleFound = false
  for (let i = 0; i < rows; i++) {
    if (obstacleGrid[i][0] === obstacleIdentifier || obstacleFound) {
      obstacleFound = true
      waysDPMatrix[i][0] = 0
    } else {
      waysDPMatrix[i][0] = 1
    }
  }

  // Perform DP:
  // Move forwards but from second row and second column (non-base cases)
  // We use the recursive formula but rather than looking at the next cells
  // we look back at the filled cells to figure out how many ways it took to
  // get to the current cell!
  // Formula: DP[i] = DP[i - 1][j+ DP[i][j - 1]
  // **Note (Important)**
  // If the data cell is an obstacle - override and mark number of ways as 0!
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      if (obstacleGrid[i][j] === obstacleIdentifier) {
        waysDPMatrix[i][j] = 0
      } else {
        waysDPMatrix[i][j] = waysDPMatrix[i - 1][j] + waysDPMatrix[i][j - 1]
      }
    }
  }

  return waysDPMatrix[rows - 1][columns - 1]
}

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
) // 2
console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0],
  ])
) // 1
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
  ])
) // 2

const depthFirstSearch = (matrix) => {
  // 1. Get rows and columns & create a visited map of the matrix size
  // 2. Create a stack
  // 3. Push first cell (or source) on to stack
  // 4. While the stack is not empty:
  // ... 4(a) Pop the stack
  // ... 4(b) If the cell indices are out of bounds, "continue" the loop (i.e skip)!
  // ... 4(c) NOTE (Exception): Stack may contain the same cell TWICE, so:
  // ...... 4(c)(1) If cell is not visited before: Mark it visited
  // ...... 4(c)(2) If cell is not visited before: Process it
  // ... 4(d) For any adjacent cell, push it to the stack if it has not been visited before!

  const ROWS = matrix.length
  const COLUMNS = matrix[0].length
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLUMNS).fill(false)) // 1.
  const stack = [] // 2.
  stack.push([0, 0]) // 3.

  while (stack.length > 0) {
    const [i, j] = stack.pop() // 4(a)

    if (i >= ROWS || i < 0 || j >= COLUMNS || j < 0) {
      //4(b)
      continue
    }

    if (!visited[i][j]) {
      visited[i][j] = true // 4(c)(1)
      console.log(matrix[i][j]) // 4(c)(2)
    }

    // 4(d)
    if (!(visited[i - 1] && visited[i - 1][j])) {
      stack.push([i - 1, j])
    }
    if (!(visited[i + 1] && visited[i + 1][j])) {
      stack.push([i + 1, j])
    }
    if (!(visited[i] && visited[i][j - 1])) {
      stack.push([i, j - 1])
    }
    if (!(visited[i] && visited[i][j + 1])) {
      stack.push([i, j + 1])
    }
  }
}

// --------
// Testing:
// --------

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

depthFirstSearch(matrix)
/*
1
2
3
6
5
4
7
8
9

Note: Not unique
*/

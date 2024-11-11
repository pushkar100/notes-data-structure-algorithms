const breadthFirstSearch = (matrix) => {
  // 1. Get rows and columns & create a visited map of the matrix size
  // 2. Create a queue
  // 3. Enqueu first cell (or source) on to queue
  // 4. While the queue is not empty:
  // ... 4(a) Dequeue the front element of the queue
  // ... 4(b) If the cell indices are out of bounds, "continue" the loop (i.e skip)!
  // ... 4(c) NOTE (Exception): Queue may contain the same cell TWICE, so:
  // ...... 4(c)(1) If cell is not visited before: Mark it visited
  // ...... 4(c)(2) If cell is not visited before: Process it
  // ... 4(d) For any adjacent cell, enqueue it to the queue if it has not been visited before!

  const ROWS = matrix.length
  const COLUMNS = matrix[0].length
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLUMNS).fill(false)) // 1.
  const queue = [] // 2.
  queue.push([0, 0]) // 3.

  while (queue.length > 0) {
    const [i, j] = queue.shift() // 4(a)

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
      queue.push([i - 1, j])
    }
    if (!(visited[i + 1] && visited[i + 1][j])) {
      queue.push([i + 1, j])
    }
    if (!(visited[i] && visited[i][j - 1])) {
      queue.push([i, j - 1])
    }
    if (!(visited[i] && visited[i][j + 1])) {
      queue.push([i, j + 1])
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

breadthFirstSearch(matrix)
/*
1
4
2
7
5
3
8
6
9

Note: Not unique
*/

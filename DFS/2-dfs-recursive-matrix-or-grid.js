const depthFirstSearch = (matrix) => {
  // 1. Get rows and counts of matrix and build a visited matrix of the same size
  // 2. Create an INNER dfs helper method (Having access to closure vars helps!)
  // 3. Within the dfs helper:
  // ... 3(a) Before marking the cell i,j as visited -> check if it is within bounds!
  // ... 3(b) Mark the cell as visited if within bounds
  // ... 3(c) Process the cell (whatever is required to be done with it)
  // ... 3(d) Recursively visit the adjacent cells that have not been visited yet!
  // Obvious: Invoke the DFS helper!

  // 1.
  const ROWS = matrix.length
  const COLUMNS = matrix[0].length
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLUMNS).fill(false))

  // 2.
  const dfsHelper = (i, j) => {
    // 3(a)
    if (i >= ROWS || i < 0 || j >= COLUMNS || j < 0) {
      return
    }

    // 3(b)
    visited[i][j] = true

    // 3(c)
    console.log(matrix[i][j])

    // 3(d)
    if (!(visited[i - 1] && visited[i - 1][j])) {
      dfsHelper(i - 1, j)
    }
    if (!(visited[i + 1] && visited[i + 1][j])) {
      dfsHelper(i + 1, j)
    }
    if (!(visited[i] && visited[i][j - 1])) {
      dfsHelper(i, j - 1)
    }
    if (!(visited[i] && visited[i][j + 1])) {
      dfsHelper(i, j + 1)
    }
  }

  dfsHelper(0, 0)
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
4
7
8
5
2
3
6
9

Note: Not unique
*/

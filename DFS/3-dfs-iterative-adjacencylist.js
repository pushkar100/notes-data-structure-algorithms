// Adjacency list graph representation
class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  addEdge(source, destination) {
    // Add edge from source vertex to destination vertex
    this.adjacencyList[source] = this.adjacencyList[source] || []
    this.adjacencyList[source].push(destination)

    // Due to undirected Graph
    this.adjacencyList[destination] = this.adjacencyList[destination] || []
    this.adjacencyList[destination].push(source)
  }

  depthFirstSearch(source) {
    // 1. Maintain a visited map
    // 2. Create a STACK for DFS
    // 3. Push current source to stack
    // 4. While stack was not empty:
    // ... 4(a) Pop the top of the stack -> this is the current vertex
    // ... 4(b) NOTE (Exception): Stack may contain the same vertex TWICE, so:
    // ...    (1) If not visited before: Mark the vertex as visited
    // ...    (2) If not visited before: Process the vertex
    // ... 4(c) For each adjacent vertex, push it to stack if it hasn't been visited!

    const visited = {} // 1.
    const stack = [] // 2.
    stack.push(source) // 3.

    while (stack.length > 0) {
      const currentVertex = stack.pop() // 4(a)

      if (!visited[currentVertex]) {
        visited[currentVertex] = true // 4(b)(1)
        console.log('Node visited', currentVertex) // 4(b)(2)
      }

      for (let adjacentVertex of this.adjacencyList[currentVertex]) {
        if (!visited[adjacentVertex]) {
          stack.push(adjacentVertex) // 4(c)
        }
      }
    }
  }
}

// --------
// Testing:
// --------

const graph = new Graph()
const edges = [
  [1, 2],
  [1, 0],
  [2, 0],
  [2, 3],
  [2, 4],
]

// Populate the adjacency list with edges
for (let e of edges) {
  graph.addEdge(e[0], e[1])
}

graph.depthFirstSearch(1)

/*
Node visited 1
Node visited 0
Node visited 2
Node visited 4
Node visited 3

(note: DFS is not unique always! other ans possible!)
*/

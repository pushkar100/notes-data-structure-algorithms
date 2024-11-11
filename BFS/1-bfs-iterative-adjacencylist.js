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

  breadthFirstSearch(source) {
    // 1. Maintain a visited map
    // 2. Create a QUEUE for BFS
    // 3. Enqueue current source to queue
    // 4. While queue was not empty:
    // ... 4(a) Shift the queue to dequeue the front -> this is the current vertex
    // ... 4(b) NOTE (Exception): Queue may contain the same vertex TWICE, so:
    // ...... 4(b)(1) If not visited before: Process the vertex
    // ...... 4(b)(2) If not visited before: Mark the vertex as visited
    // ... 4(c) For each adjacent vertex, enqueue it if it hasn't been visited!

    const visited = {} // 1.
    const queue = [] // 2.
    queue.push(source) // 3.

    while (queue.length > 0) {
      const currentVertex = queue.shift() // 4(a)

      if (!visited[currentVertex]) {
        visited[currentVertex] = true // 4(b)(1)
        console.log(currentVertex) // 4(b)(2)
      }

      for (let adjacentVertex of this.adjacencyList[currentVertex]) {
        if (!visited[adjacentVertex]) {
          queue.push(adjacentVertex) // 4(c)
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

graph.breadthFirstSearch(1)

/*
1
2
0
3
4

(note: BFS is not unique always! other ans possible!)
*/

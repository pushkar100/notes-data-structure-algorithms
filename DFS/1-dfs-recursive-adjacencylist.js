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
    // 2. Create an INNER dfs helper method (Having access to closure vars helps!)
    // 3. Within the dfs helper:
    // ... 3(a) Mark the vertex as visited
    // ... 3(b) Process the vertex (whatever is required to be done with it)
    // ... 3(c) Recursively visit the adjacent/child vertices not visited yet!
    // Obvious: Invoke the DFS helper!

    const visited = {} // 1.

    // 2.
    const dfsHelper = (vertex) => {
      visited[vertex] = true // 3(a)

      console.log('Node visited: ', vertex) // 3(b)

      for (let adjacentVertex of this.adjacencyList[vertex]) {
        if (!visited[adjacentVertex]) {
          dfsHelper(adjacentVertex) // 3(c)
        }
      }
    }

    return dfsHelper(source) // Initially, send first node in list
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

graph.depthFirstSearch(1) // 1 2 0 3 4 (note: DFS is not unique always! other ans possible!)

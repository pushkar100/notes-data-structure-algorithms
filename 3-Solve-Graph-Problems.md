# Graph Leetcode problems

## 133 Clone Graph 

I will break down "Clone Graph" with the depth expected of a Senior (L5) or Staff (L6) engineer. At this level, the focus shifts from "just getting code to pass" to understanding the underlying data structures, handling edge cases gracefully, and writing clean, maintainable code.

---

### 1. Problem Explanation

**The Core Task**
We are given a reference to a node in a **connected undirected graph**. Each node has a value (`val`) and a list of neighbors (`neighbors`). We need to return a **deep copy** (clone) of the graph.

**What is a Deep Copy?**
This is the critical "non-trivial" part to understand first.

* **Shallow Copy:** You create a new container, but the elements inside are references to the *original* objects. If you modify a neighbor in the copy, it affects the original.
* **Deep Copy:** You create entirely new objects for every single node. The new graph looks exactly the same structurally, but it occupies a completely different space in memory. No pointers in the "Clone" should point to the "Original."

**The Input Structure**
The input is given as an adjacency list, but programmatically you receive a single `Node` object. You must traverse from this node to find all others.

**Visualizing the Challenge**

Imagine the graph looks like this:

```text
Original Graph in Memory (Address Space A)

    [Node 1] ----------- [Node 2]
       |                    |
       |                    |
    [Node 4] ----------- [Node 3]

```

A **Deep Copy** must look like this:

```text
Cloned Graph in Memory (Address Space B)

    [Node 1'] ----------- [Node 2']
       |                     |
       |                     |
    [Node 4'] ----------- [Node 3']

```

**Crucial Constraints & Edge Cases (The "Senior" Checklist):**

1. **Cycles:** Graphs contain loops. If Node 1 points to Node 2, and Node 2 points back to Node 1, a naive copy algorithm might loop infinitely creating copies forever. We *must* track what we've already copied.
2. **Empty Graph:** Input node could be `null`.
3. **Single Node:** A graph with just one node and no neighbors.

---

### 2. Solution Explanation

To solve this, we can use standard Graph Traversal algorithms: **DFS (Depth-First Search)** or **BFS (Breadth-First Search)**.

A Senior Engineer would likely choose **DFS** for its clean recursive implementation or **BFS** for iterative clarity (preventing stack overflow on massive linear graphs, though recursion is fine for typical constraints). Let's stick to the recursive DFS approach as it maps very naturally to the definition of a deep copy.

#### The "HashMap" Strategy (The Secret Sauce)

The biggest challenge is handling **Cycles** and **Shared Neighbors**.

* *Scenario:* Node 1 connects to Node 2 and Node 4. Node 2 *also* connects to Node 4.
* *Problem:* When we clone Node 1, we clone Node 2 and Node 4. When we later process Node 2, we must NOT clone Node 4 again. We must link to the *already cloned* Node 4.

**The Solution:** Use a Hash Map (or Dictionary) to map `Original Node -> Cloned Node`.

**ASCII Visualization of the Algorithm**

Let's Trace `DFS(Node 1)` on the square graph above.

**Step 1: Start with Node 1.**
Check Map: Is `1` in the map? No.
Action: Create `1'`. Add `1 -> 1'` to Map.
Task: Clone neighbors of 1 (which are 2 and 4).

```text
Map: { 1: 1' }

Processing 1...
   -> Call DFS(2)

```

**Step 2: Inside DFS(2).**
Check Map: Is `2` in the map? No.
Action: Create `2'`. Add `2 -> 2'` to Map.
Task: Clone neighbors of 2 (which are 1 and 3).

```text
Map: { 1: 1', 2: 2' }

Processing 2...
   -> Neighbors of 2: [1, 3]
   -> 1 is already in Map! Return 1' immediately. Link 2' -> 1'.
   -> 3 is NOT in Map. Call DFS(3).

```

**Step 3: Inside DFS(3).**
Check Map: Is `3` in the map? No.
Action: Create `3'`. Add `3 -> 3'` to Map.
Task: Clone neighbors of 3 (which are 2 and 4).

```text
Map: { 1: 1', 2: 2', 3: 3' }

Processing 3...
   -> Neighbors of 3: [2, 4]
   -> 2 is already in Map! Return 2'. Link 3' -> 2'.
   -> 4 is NOT in Map. Call DFS(4).

```

**Step 4: Inside DFS(4).**
Check Map: Is `4` in the map? No.
Action: Create `4'`. Add `4 -> 4'` to Map.
Task: Clone neighbors of 4 (which are 1 and 3).

```text
Map: { 1: 1', 2: 2', 3: 3', 4: 4' }

Processing 4...
   -> Neighbors of 4: [1, 3]
   -> 1 is in Map! Link 4' -> 1'.
   -> 3 is in Map! Link 4' -> 3'.
   -> Return 4'.

```

**Step 5: Unwind.**
DFS(4) returns `4'` to DFS(3).
DFS(3) links `3' -> 4'` and returns `3'` to DFS(2).
DFS(2) links `2' -> 3'` and returns `2'` to DFS(1).
DFS(1) resumes... it was waiting on 2. Now it processes neighbor 4.
-> 4 is in Map! Return `4'`. Link `1' -> 4'`.

**Result:** A perfectly cloned graph with all connections preserved and no infinite loops.

---

### 3. Time and Space Complexity Analysis

**Time Complexity: **

*  = Number of Vertices (Nodes)
*  = Number of Edges
* **Why?** We visit every node exactly once (thanks to the HashMap check). During the visit of each node, we iterate through its neighbors. Across the entire process, we iterate through every edge in the graph exactly once (technically twice, once from each end, but constants drop).

**Space Complexity: **

* **Why?**
1. **HashMap:** Stores  entries (one for each node).
2. **Recursion Stack:** In the worst case (a long line of nodes like a linked list), the recursion depth will be . In a balanced graph, it is the height of the graph.



---

### 4. Solution Code

Here is how an L5+ engineer would implement this. Note the clear variable naming, edge case handling, and helper function usage.

#### Python Solution (DFS)

```python
"""
Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        # Edge Case 1: Empty graph
        if not node:
            return None
        
        # This dictionary maps the original node to its clone.
        # It acts as our "Visited" set and our storage for clones.
        old_to_new = {}

        def dfs(original_node):
            # Base Case: If this node has already been visited/cloned,
            # return the clone immediately to avoid cycles.
            if original_node in old_to_new:
                return old_to_new[original_node]
            
            # 1. Create the clone (Copy)
            copy = Node(original_node.val)
            
            # 2. Register it in the map immediately
            # (Critically important to do this BEFORE recursive calls)
            old_to_new[original_node] = copy
            
            # 3. Iterate through neighbors and connect them
            for neighbor in original_node.neighbors:
                # We append the result of the DFS call.
                # If the neighbor was visited, we get the existing clone.
                # If not, the DFS creates it and returns it.
                clone_neighbor = dfs(neighbor)
                copy.neighbors.append(clone_neighbor)
            
            return copy

        return dfs(node)

```

#### Javascript Solution (DFS)

```javascript
/**
 * Definition for a Node.
 * function Node(val, neighbors) {
 * this.val = val === undefined ? 0 : val;
 * this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    // Edge Case: Sanity check for empty input
    if (!node) return null;

    // Map to store Original Node -> Cloned Node
    const visited = new Map();

    const dfs = (originalNode) => {
        // If we have seen this node, return the stored clone
        if (visited.has(originalNode)) {
            return visited.get(originalNode);
        }

        // 1. Create new node
        const clone = new Node(originalNode.val);

        // 2. Add to map immediately to handle cycles
        visited.set(originalNode, clone);

        // 3. Process all neighbors
        for (const neighbor of originalNode.neighbors) {
            // Recursively find/create neighbors and attach to current clone
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    };

    return dfs(node);
};

```

#### Breadth-First Search (BFS) Approach (Alternative)

For an L6 interview, mentioning the iterative BFS approach is a bonus because it demonstrates awareness of stack overflow risks in recursion for very deep graphs.

**Quick Concept:**

1. Use a `Queue` for nodes to visit.
2. Use the same `Map` to track visited nodes.
3. Clone the start node and put it in Queue + Map.
4. While Queue is not empty:
* Pop `curr`.
* Loop neighbors.
* If neighbor NOT in map: Clone it, Add to Map, Add to Queue.
* Link `map[curr].neighbors.append(map[neighbor])`.



---

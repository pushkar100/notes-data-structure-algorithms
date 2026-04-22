# Linked Lists

# 206. Reverse Linked List

Reversing a linked list is the "bread and butter" of technical interviews. For a senior engineer (L5/L6), the focus isn't just on making the code work—it's about managing pointers without losing data and understanding the trade-offs between iterative and recursive patterns.

### 1. Problem Explanation

**The Goal:**
You are given the `head` of a singly linked list. You need to reverse the list so that the nodes point in the opposite direction, and return the new `head`.

**What is a Linked List?**
Unlike an array where items sit side-by-side in memory, a linked list is a chain of "Nodes." Each node has two parts:
1.  **Value:** The data it holds (e.g., 1, 2, 3).
2.  **Next:** A pointer/reference to the next node in the chain.

**The Challenge:**
In a singly linked list, you can only move forward. Once you move from Node A to Node B, you have no "Back" button to get to Node A. To reverse it, you have to carefully flip the pointers without "breaking the chain" and losing the rest of your list in memory.

**Example:**
Input:  1 -> 2 -> 3 -> 4 -> 5 -> NULL
Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL

---

### 2. Solution Explanation

**The Intuition (The "Why"):**
Imagine you are standing in a line of people, each holding the shoulder of the person in front of them. To reverse the line, everyone needs to turn around and grab the shoulder of the person who *was* behind them. 

The problem is: if you let go of the person in front of you before you know who is behind you, you lose your place. You need a "Temporary Friend" to hold the spot in front while you flip your hands.

**The Iterative Algorithm (The "How"):**
We use three pointers to navigate:
1.  **prev:** The person behind me (starts as NULL).
2.  **curr:** Me (starts at the head).
3.  **next_node:** The person in front of me (used as a bookmark).

**Step-by-Step Visualization:**
List: [1] -> [2] -> [3] -> NULL



```text
[ INITIAL STATE ]
curr points to 1
prev is NULL
1 -> 2 -> 3 -> NULL

--------------------------------------------------
[ STEP 1: Processing Node 1 ]
1. Bookmark the next: next_node = curr.next (which is 2)
2. Flip the pointer: curr.next = prev (1 now points to NULL)
3. Move prev: prev = curr (prev is now 1)
4. Move curr: curr = next_node (curr is now 2)

ASCII Map:
NULL <- [1]    [2] -> [3] -> NULL
         ^      ^
        prev   curr

--------------------------------------------------
[ STEP 2: Processing Node 2 ]
1. Bookmark: next_node = 3
2. Flip: curr.next = prev (2 now points to 1)
3. Move prev: prev = 2
4. Move curr: curr = 3

ASCII Map:
NULL <- [1] <- [2]    [3] -> NULL
                ^      ^
               prev   curr

--------------------------------------------------
[ STEP 3: Processing Node 3 ]
1. Bookmark: next_node = NULL
2. Flip: curr.next = prev (3 now points to 2)
3. Move prev: prev = 3
4. Move curr: curr = NULL

ASCII Map:
NULL <- [1] <- [2] <- [3]    (NULL)
                       ^       ^
                      prev    curr

--------------------------------------------------
[ FINAL STEP ]
curr is now NULL. The loop ends.
We return 'prev' because it is now pointing to the new head (3).
Result: 3 -> 2 -> 1 -> NULL
```

---

### 3. Time and Space Complexity Analysis

```text
TIME COMPLEXITY: O(N)
--------------------------------------------------
- We visit each node in the linked list exactly once.
- Inside the loop, we perform 4 pointer assignments.
- Each assignment is an O(1) constant time operation.
- Therefore, total time is N * 4, which simplifies to O(N).

[ Visualization of Time ]
Node 1 -> Node 2 -> Node 3 ... -> Node N
  |         |         |             |
 [O(1)]    [O(1)]    [O(1)]        [O(1)]
--------------------------------------------------

SPACE COMPLEXITY: O(1)
--------------------------------------------------
- We only use three extra variables (prev, curr, next_node).
- These variables take the same amount of memory regardless 
  of how long the list is.
- We are rearranging existing nodes, not creating new ones.

[ Visualization of Space ]
Memory used: [prev_ptr][curr_ptr][next_ptr] 
(This block stays the same size for any N)
--------------------------------------------------
```

---

### 4. Solution Code

A senior engineer will almost always provide the iterative solution first because it is memory-efficient. However, they may discuss the recursive solution to show depth.

#### Python Snippets

```python
# Iterative Solution: The Production-Standard Approach
# Time: O(N), Space: O(1)
def reverseList_Iterative(head):
    # 'prev' will eventually become the new head of the reversed list
    prev = None
    curr = head
    
    while curr:
        # 1. Store the next node so we don't lose the rest of the list
        next_node = curr.next
        
        # 2. Reverse the current node's pointer to point backwards
        curr.next = prev
        
        # 3. Move 'prev' and 'curr' one step forward for the next iteration
        prev = curr
        curr = next_node
        
    return prev

# Recursive Solution: The "Elegant" but riskier approach (Risk of Stack Overflow)
# Time: O(N), Space: O(N) due to call stack
def reverseList_Recursive(head):
    # Base case: if list is empty or has only one node
    if not head or not head.next:
        return head
    
    # Recursively reverse the rest of the list
    new_head = reverseList_Recursive(head.next)
    
    # Make the next node point back to the current node
    head.next.next = head
    # Set current node's next to None to avoid cycles
    head.next = None
    
    return new_head
```

#### JavaScript Snippets

```javascript
// Iterative Solution
function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        // Bookmark the next part of the chain
        const nextNode = curr.next;
        
        // Point current node backwards
        curr.next = prev;
        
        // Shift pointers forward
        prev = curr;
        curr = nextNode;
    }

    // Prev is the new head
    return prev;
}

// Recursive Solution
function reverseListRecursive(head) {
    if (head === null || head.next === null) {
        return head;
    }

    const newHead = reverseListRecursive(head.next);
    
    // Flip the pointer of the next node to point to 'this' node
    head.next.next = head;
    head.next = null;

    return newHead;
}
```

---

### Note 1: Terminology Addendum

**Pointer Manipulation:**
* **What it is:** Changing the "address" that a variable points to. In `curr.next = prev`, we aren't changing the data inside the node; we are just changing which node it points to next.
* **Why it helps:** It allows us to restructure complex data in-place without copying large amounts of data.

**In-Place Algorithm:**
* **What it is:** An algorithm that transforms the input without using extra memory that grows with the input size.
* **How it applies:** We reverse the list within the existing nodes rather than creating a new list.

---

### Note 2: Real-World Interview Variations

**1. Google: "Reverse a Linked List in Groups of K" (LeetCode 25)**
* **Prompt:** Reverse every `k` nodes (e.g., if k=2, 1->2->3->4 becomes 2->1->4->3).
* **The L5 Solve:** You treat each "k" group as a mini-reverse problem. You reverse the first k nodes using the standard iterative logic, then use recursion to handle the next group and connect the tail of your current group to the head of the next.

**2. Meta: "Palindrome Linked List" (LeetCode 234)**
* **Prompt:** Check if a linked list reads the same forward and backward.
* **The L5 Solve:** You can't index a linked list like an array. The optimal solution is: 1) Use a "Fast and Slow" pointer to find the middle. 2) **Reverse the second half** of the list using the logic above. 3) Compare the first half and the reversed second half.

**3. Bloomberg: "Add Two Numbers Represented by Linked Lists" (LeetCode 2/445)**
* **Prompt:** Numbers are stored as 1->2->3 (123). Add them.
* **The L5 Solve:** If the numbers are stored in "most significant digit first" order, you often have to **Reverse both lists** first to align the "ones" column, perform the addition with a carry, and then **Reverse the result** back to the original order.

# 141. Linked List Cycle

This is a classic "bread and butter" problem for Senior Engineers (L5/L6). While a junior might just memorize the answer, a senior engineer focuses on the physical intuition of the algorithm and the memory constraints that make one solution superior to another.

### 1. Problem Explanation

**The Premise:**
You are given the `head` of a Linked List. You need to determine if the list has a "cycle" in it.

**What is a Cycle?**
A cycle occurs when a node's `next` pointer doesn't point to `null` (the end of the list) but instead points back to a node that was already visited. This creates an infinite loop. If you were to traverse this list, you would never reach the end.

**The Intuition (The "Why"):**
Imagine you are walking down a hallway. 
- If the hallway is a straight line, you will eventually hit a wall (the `null` terminator).
- If the hallway is a circular track, you will keep passing the same doors over and over again.

In a computer's memory, you can't easily tell if you've "seen" a door before unless you either:
1. Keep a notebook and write down every door's address (using a Hash Set).
2. Have two people running at different speeds and see if the fast person laps the slow person.

---

### 2. Solution Explanation

I will present the two ways a Google L5/L6 would discuss this.

#### Approach 1: The Hash Set (The "Notebook" Approach)
As we walk through the list, we store the memory address of each node in a Hash Set. Before moving to the next node, we check: "Is this node already in my notebook?"
- If yes: There is a cycle.
- If we hit `null`: There is no cycle.

*Why Seniors usually move past this:* It's easy to write but uses extra memory. In high-performance systems (like Google's search indexer), using extra memory for every node in a massive list is expensive.

#### Approach 2: Floyd's Tortoise and Hare (The "Racing" Approach)
This is the gold standard. We use two pointers:
* **Slow Pointer (Tortoise):** Moves 1 step at a time.
* **Fast Pointer (Hare):** Moves 2 steps at a time.

**The Physics of the Race:**
If there is no cycle, the Hare will hit the end of the list (`null`) very quickly.
If there IS a cycle, the Hare will eventually enter the loop. Once the Tortoise also enters the loop, the distance between them changes by exactly 1 node every turn. Because the gap closes by 1 each time, the Hare is **guaranteed** to eventually land on the exact same node as the Tortoise.



#### Detailed ASCII Walkthrough (Racing Approach)

Let's trace a list with a cycle: `3 -> 2 -> 0 -> -4` (where -4 points back to 2).

```text
STEP 1: Initial State
3 -> 2 -> 0 -> -4
^               |
S, F            |_ (back to 2)

S: 3, F: 3 (Both start at head)

---------------------------------------------------------
STEP 2: First Jump
3 -> 2 -> 0 -> -4
     ^    ^     |
     S    F     |_ 

S moves 1 step to 2.
F moves 2 steps (3 -> 2 -> 0). F is at 0.
S != F, keep going.

---------------------------------------------------------
STEP 3: Second Jump
3 -> 2 -> 0 -> -4
          ^     ^
          S     F

S moves 1 step to 0.
F moves 2 steps (0 -> -4 -> 2). F is at 2.
S != F, keep going.

---------------------------------------------------------
STEP 4: Third Jump
3 -> 2 -> 0 -> -4
          |     ^
          |____ S, F

S moves 1 step to -4.
F moves 2 steps (2 -> 0 -> -4). F is at -4.
S == F! (MATCH FOUND)
Result: TRUE (Cycle exists)
```

---

### 3. Time and Space Complexity Analysis

**Time Complexity: O(N)**
Where N is the number of nodes in the Linked List.

```text
Visual Derivation of Time Complexity:

Case A: No Cycle
F -> -> -> -> -> [NULL]
The fast pointer reaches the end in N/2 steps.
O(N/2) simplifies to O(N).

Case B: Cycle exists
Part 1: S and F enter the cycle. This takes at most N steps.
Part 2: Once inside, F 'catches up' to S. 
        If the cycle length is C, F catches S in at most C steps.
Since C is always less than or equal to N:
Total Time = O(N + C) = O(N).
```

**Space Complexity: O(1)**

```text
Visual Derivation of Space Complexity:

We only create two pointer variables:
[ Pointer S ] 
[ Pointer F ]

Regardless of whether the list has 10 nodes or 10 billion nodes, 
we only ever use these two pointers. 
We do not store the nodes in a list or set.

Memory used = Constant
Space = O(1)
```

---

### 4. Solution Code

#### Python Implementation

```python
# --- OPTIMIZED: Floyd's Tortoise and Hare (O(N) Time, O(1) Space) ---
def hasCycle(head):
    if not head or not head.next:
        return False
    
    # Initialize slow and fast pointers
    slow = head
    fast = head
    
    # If there's no cycle, fast will eventually hit None
    while fast and fast.next:
        slow = slow.next          # Move 1 step
        fast = fast.next.next     # Move 2 steps
        
        # If they meet, a cycle exists
        if slow == fast:
            return True
            
    return False

# --- ALTERNATIVE: Hash Set (O(N) Time, O(N) Space) ---
def hasCycle_HashSet(head):
    seen = set()
    curr = head
    while curr:
        # Check if we have physically seen this node object before
        if curr in seen:
            return True
        seen.add(curr)
        curr = curr.next
    return False
```

#### JavaScript Implementation

```javascript
/**
 * OPTIMIZED: Floyd's Tortoise and Hare
 * O(N) Time, O(1) Space
 */
var hasCycle = function(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;             // Move 1 step
        fast = fast.next.next;        // Move 2 steps

        // Standard comparison of object references
        if (slow === fast) {
            return true;
        }
    }

    return false;
};

/**
 * ALTERNATIVE: Hash Set
 * O(N) Time, O(N) Space
 */
var hasCycleHashSet = function(head) {
    let seen = new Set();
    let curr = head;
    
    while (curr !== null) {
        if (seen.has(curr)) {
            return true;
        }
        seen.add(curr);
        curr = curr.next;
    }
    
    return false;
};
```

---

### Note 1: Terms and Techniques

* **Floyd’s Cycle-Finding Algorithm:** Often called the "Tortoise and the Hare" algorithm. It’s a pointer-based technique used to detect loops in sequences or linked structures. It works on the mathematical certainty that two entities moving at different speeds within a closed loop must eventually occupy the same position.
* **Pointer Reference Comparison:** In the code, `slow == fast` (or `===` in JS) is not comparing the *values* inside the nodes (like the number 3 or 2). It is comparing the *memory address*. Even if two nodes have the value "3", they are only the same node if they occupy the same spot in memory.

---

### Note 2: Real-World Interview Variations

**1. Meta (Facebook): "Linked List Cycle II" (LeetCode 142)**
* **The Twist:** Don't just say if there is a cycle; return the **exact node** where the cycle begins.
* **L5 Solution:** First, find the meeting point using the Tortoise and Hare. Once they meet, leave `fast` at the meeting point and move `slow` back to the `head`. Now, move BOTH 1 step at a time. The node where they meet again is the start of the cycle. (This is based on a geometric proof: $L1 = L3$, where $L1$ is distance to the cycle and $L3$ is distance from meeting point to cycle start).

**2. Google: "Concurrency Deadlock Detection"**
* **The Twist:** You have multiple processes waiting on each other. Process A waits for B, B waits for C, C waits for A. Determine if the system is deadlocked.
* **L5 Solution:** This is a graph problem, but it’s essentially cycle detection. If each process only waits on ONE other process, it’s exactly like a Linked List cycle. You would use a version of this algorithm to detect the circular dependency and break it.

**3. Bloomberg: "Identifying Repetitive Patterns in Ticker Streams"**
* **The Twist:** A stream of financial data starts repeating in an exact loop. You need to detect this without storing the entire history of the stream.
* **L5 Solution:** Since storing the whole history is $O(N)$ space (too expensive for a high-speed ticker), you treat the data states as "nodes". You run two "simulations" of the data stream—one at double speed—to see if the states ever sync up, indicating a cycle in the data pattern.

# 21. Merge Two Sorted Lists

A senior engineer at Google approaches this problem with a focus on **pointer management** and **memory efficiency**. While it might seem simple, the "L5/L6 way" is to handle edge cases gracefully and ensure the solution is "in-place" (reusing existing nodes) rather than creating a whole new list.

---

### 1. Problem Explanation

**The Goal:** You are given two sorted linked lists. You need to "zip" them together into a single, combined linked list that is also sorted.

**What is a Linked List?**
Unlike an array where elements sit next to each other in memory, a linked list is a chain of "Nodes." Each node has:
* **Val:** The number it holds.
* **Next:** A pointer (a reference) to the next node in the chain.

**The Challenge:**
You cannot just sort the lists using a standard sorting algorithm. You must weave the existing nodes together by changing where their `next` pointers point.

---

### 2. Solution Explanation

**The Core Insight: The "Dummy Node" and the "Tail" Pointer**
The hardest part of merging linked lists is deciding which node is the *head* (the start) of the new list. To avoid a mess of `if/else` statements at the very beginning, we use a **Dummy Node**.

1.  **Dummy Node:** A temporary, fake node that acts as the starting anchor.
2.  **Tail Pointer:** A "current" pointer that always stays at the end of our new, growing list.
3.  **Comparison:** We look at the heads of List 1 and List 2. We take the smaller value, attach it to our `tail.next`, and move the pointer for that list forward.
4.  **Cleanup:** Once one list runs out, we simply attach the remainder of the other list to the end.



#### ASCII Diagram Walkthrough
Let's trace `list1 = [1, 3]` and `list2 = [1, 2, 4]`.

**Step 0: Initialization**
We create a `dummy` node and a `tail` that points to it.
```text
list1: [1] -> [3] -> null
        ^
list2: [1] -> [2] -> [4] -> null
        ^

New List: [Dummy] 
            ^
          tail
```

**Step 1: Compare heads**
`list1.val (1)` vs `list2.val (1)`. They are equal, so we'll just pick `list1`.
```text
Action: tail.next = list1; Move list1; Move tail.

list1: [1] -> [3] -> null
               ^
list2: [1] -> [2] -> [4] -> null
        ^

New List: [Dummy] -> [1]
                      ^
                    tail
```

**Step 2: Compare heads**
`list1.val (3)` vs `list2.val (1)`. `1` is smaller.
```text
Action: tail.next = list2; Move list2; Move tail.

list1: [1] -> [3] -> null
               ^
list2: [1] -> [2] -> [4] -> null
               ^

New List: [Dummy] -> [1] -> [1]
                             ^
                           tail
```

**Step 3: Compare heads**
`list1.val (3)` vs `list2.val (2)`. `2` is smaller.
```text
Action: tail.next = list2; Move list2; Move tail.

list1: [1] -> [3] -> null
               ^
list2: [1] -> [2] -> [4] -> null
                      ^

New List: [Dummy] -> [1] -> [1] -> [2]
                                    ^
                                  tail
```

**Step 4: Compare heads**
`list1.val (3)` vs `list2.val (4)`. `3` is smaller.
```text
Action: tail.next = list1; Move list1; Move tail.

list1: [1] -> [3] -> null
                      ^ (is null now)
list2: [1] -> [2] -> [4] -> null
                      ^

New List: [Dummy] -> [1] -> [1] -> [2] -> [3]
                                           ^
                                         tail
```

**Step 5: The Remainder**
`list1` is now empty (null). We don't need to loop anymore. We just point `tail.next` to whatever is left of `list2`.
```text
Action: tail.next = list2

New List: [Dummy] -> [1] -> [1] -> [2] -> [3] -> [4] -> null
```
**Final Result:** Return `dummy.next` (which is the first real node, `1`).

---

### 3. Time and Space Complexity Analysis

```text
+-----------------------------------------------------------------------+
| TIME COMPLEXITY DERIVATION: O(N + M)                                  |
+-----------------------------------------------------------------------+
| N = Length of list1, M = Length of list2                              |
|                                                                       |
| 1. The loop runs until one list is exhausted.                         |
| 2. Each iteration, we process exactly one node from either list1      |
|    or list2.                                                          |
| 3. In the worst case, we visit every node in both lists once.         |
|                                                                       |
| TOTAL TIME: O(N + M)                                                  |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| SPACE COMPLEXITY DERIVATION: O(1)                                     |
+-----------------------------------------------------------------------+
| 1. We only create a single "dummy" node.                              |
| 2. We use a "tail" pointer to track our progress.                     |
| 3. We are NOT creating new nodes for the values; we are re-linking    |
|    the existing nodes from the input lists.                           |
|                                                                       |
| TOTAL SPACE: O(1) auxiliary space                                     |
+-----------------------------------------------------------------------+
```

---

### 4. Solution Code

Below is the iterative approach (preferred in interviews for space efficiency) and the recursive approach (shorter, but uses stack space).

#### Iterative Solution (O(1) Space) - Recommended

**Python**
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1, list2):
    # Create a dummy node to act as the head of the merged list
    dummy = ListNode()
    tail = dummy
    
    # Iterate as long as both lists have nodes
    while list1 and list2:
        if list1.val < list2.val:
            # Attach list1's node and move list1's pointer
            tail.next = list1
            list1 = list1.next
        else:
            # Attach list2's node and move list2's pointer
            tail.next = list2
            list2 = list2.next
        
        # Always move the tail forward to the newly attached node
        tail = tail.next
        
    # If one list is empty, attach the remainder of the other list
    # This is a constant time operation (O(1)) in linked lists
    tail.next = list1 if list1 else list2
    
    return dummy.next
```

**JavaScript**
```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

var mergeTwoLists = function(list1, list2) {
    // Create a dummy node to anchor the result
    let dummy = new ListNode();
    let tail = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    // Attach the surviving list
    tail.next = list1 !== null ? list1 : list2;

    return dummy.next;
};
```

---

### Note 1: Terminology and Techniques

* **Dummy Node:** A common linked list pattern. It simplifies code by ensuring the "result list" always has a node to point to, preventing `null` pointer exceptions when you first start building the list.
* **Two Pointers:** Here, we use two pointers (`list1` and `list2`) to traverse the lists simultaneously.
* **In-Place:** This means we don't use extra memory proportional to the input size. We just rearrange the existing "arrows" (pointers) in memory.

---

### Note 2: Real-World Interview Variations

**1. Meta: "Merging K Sorted Lists"**
* **Scenario:** You have 100 sorted lists instead of 2. 
* **Solution:** You use a **Min-Priority Queue (Heap)**. Put the first node of every list into the heap. Extract the smallest, attach it to your result, and put the *next* node from that extracted node's list back into the heap.

**2. Google: "Merging Sorted Log Streams"**
* **Scenario:** You have two server log files, both sorted by timestamp. You need to print a single combined log file sorted by time.
* **Solution:** This is exactly the same logic, but instead of `val`, you compare `timestamp`. Because logs can be massive, you use the "dummy/tail" logic to stream the data out without loading both files into RAM at once.

**3. Bloomberg: "The Undo/Redo Merge"**
* **Scenario:** You have two separate branches of user actions (like in Git) that are sorted by "importance" or "timestamp." Merge them.
* **Solution:** Usually solved with the same pointer weaving technique. If the nodes are heavy (large objects), the O(1) space complexity of this solution is critical for performance.

# 23. Merge k Sorted Lists

At the L5/L6 level at Google, "Merge k Sorted Lists" is a classic assessment of your ability to handle complex data structures and optimize for scale. While a junior engineer might try to merge lists one by one, a senior engineer thinks about **bottlenecks** and **efficient data movement**.

The bottleneck here is constantly finding the smallest element across many lists. A senior engineer will immediately lean toward a **Min-Priority Queue (Min-Heap)** or a **Divide and Conquer** strategy.

---

### 1. Problem Explanation

**The Core Question:** You are given an array of `k` linked lists, each of which is already sorted in ascending order. You need to merge all these lists into one single, sorted linked list.

**The Constraints:**
* Each list is a "Linked List" (Nodes with `val` and `next`).
* The lists can be of different lengths.
* Some lists might be empty.
* There could be thousands of lists.

**Visualizing the Input:**
Input: `lists = [[1, 4, 5], [1, 3, 4], [2, 6]]`

```text
List 1: (1) -> (4) -> (5) -> NULL
List 2: (1) -> (3) -> (4) -> NULL
List 3: (2) -> (6) -> NULL
```

We need to pluck the smallest value available at the head of any of these lists and move it to our new result list.

---

### 2. Solution Explanation

#### The Optimized Strategy: The Min-Heap (Priority Queue)
Imagine you have `k` runners. They are all standing at the starting line of their own track. You want to pick the runner who is closest to the finish line, let them take one step, and then re-evaluate who is now the closest.

**Step-by-Step Walkthrough:**

1.  **Initialize:** Create a "Dummy" node to act as the start of your result list.
2.  **Seeding:** Put the first node of every non-empty list into a **Min-Heap**. The Heap will automatically keep the smallest value at the very top.
3.  **Process:**
    * Pop the smallest node from the Heap.
    * Attach it to your result list.
    * **Crucial Step:** If the node you just popped has a "next" node in its original list, push that next node into the Heap.
4.  **Repeat:** Keep doing this until the Heap is empty.

**ASCII Visualization of the Process:**

```text
Initial State:
Heap: [(1, from List1), (1, from List2), (2, from List3)]
Result: (Dummy)

--- STEP 1 ---
Pop smallest: (1) from List 1.
Result: (Dummy) -> (1)
List 1 now starts at (4). Push (4) into Heap.
Heap: [(1, from List2), (2, from List3), (4, from List1)]

--- STEP 2 ---
Pop smallest: (1) from List 2.
Result: (Dummy) -> (1) -> (1)
List 2 now starts at (3). Push (3) into Heap.
Heap: [(2, from List3), (3, from List2), (4, from List1)]

--- STEP 3 ---
Pop smallest: (2) from List 3.
Result: (Dummy) -> (1) -> (1) -> (2)
List 3 now starts at (6). Push (6) into Heap.
Heap: [(3, from List2), (4, from List1), (6, from List3)]
```


---

### 3. Time and Space Complexity Analysis

Let **N** be the total number of nodes across all lists and **k** be the number of linked lists.

```text
========================================================================
TIME COMPLEXITY: O(N * log k)
========================================================================
Derivation Diagram:

Every single node (N total) must be:
1. Pushed into the Heap.
2. Popped from the Heap.

[ Node 1 ] --- (Push/Pop) --- [ Heap ]
[ Node 2 ] --- (Push/Pop) --- [ Heap ]
...
[ Node N ] --- (Push/Pop) --- [ Heap ]

The size of the Heap never exceeds 'k' (the number of lists).
A Push or Pop operation on a Heap of size k takes: log k time.

Total Time = (Number of Nodes) * (Cost of Heap Operation)
Total Time = N * log k
========================================================================

========================================================================
SPACE COMPLEXITY: O(k)
========================================================================
Derivation Diagram:

[ Heap Storage ]
| (Node from List 1) |
| (Node from List 2) |
| ...                |
| (Node from List k) |

We only store one node from each list in the Heap at any given time.
Regardless of how many total nodes (N) exist, the extra space 
is proportional only to k.

Total Space = O(k)
========================================================================
```

---

### 4. Solution Code

#### Python

Python's `heapq` module makes this very efficient. Note: In Python 3, we often need to include a unique ID in the heap tuple to prevent the heap from trying to compare the `ListNode` objects themselves if their values are equal.

```python
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists):
    # Create a dummy head to simplify list construction
    dummy = ListNode(0)
    current = dummy
    
    # The heap will store tuples: (node_value, list_index, node_object)
    # We include list_index so that if two values are the same, 
    # the heap compares the index (which is unique) instead of the node.
    min_heap = []
    
    # Step 1: Push the head of each list into the heap
    for i in range(len(lists)):
        if lists[i]:
            heapq.heappush(min_heap, (lists[i].val, i, lists[i]))
            
    # Step 2: Extract smallest and add next node from that list
    while min_heap:
        val, i, node = heapq.heappop(min_heap)
        
        # Attach the popped node to our result list
        current.next = node
        current = current.next
        
        # If this list has more nodes, push the next one into the heap
        if node.next:
            heapq.heappush(min_heap, (node.next.val, i, node.next))
            
    return dummy.next
```

#### JavaScript

JavaScript does not have a built-in Priority Queue, so in an interview, you might explain the logic and then use a simple `sort` based approach or implement a basic Heap. Here is the **Divide and Conquer** approach, which is equally optimized (O(N log k)) and often preferred in JS interviews.

```javascript
/**
 * L5 Approach: Divide and Conquer
 * Instead of merging 1-by-1, we merge in pairs.
 * Pairs of 1 -> 2 lists. Pairs of 2 -> 4 lists.
 * This creates a log k merging depth.
 */
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        let mergedLists = [];
        // Merge lists in pairs
        for (let i = 0; i < lists.length; i += 2) {
            let l1 = lists[i];
            let l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        lists = mergedLists;
    }
    return lists[0];
}

/**
 * Standard helper to merge two sorted linked lists
 */
function mergeTwoLists(l1, l2) {
    let dummy = { val: 0, next: null };
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    current.next = l1 || l2;
    return dummy.next;
}
```

---

### Note 1: Terms and Techniques

* **Min-Heap (Priority Queue):** A tree-based structure that allows you to find and remove the smallest element in logarithmic time. It is the most efficient way to keep track of "the next smallest thing" in a dynamic set of values.
* **Divide and Conquer:** A strategy of breaking a large problem into smaller sub-problems (merging pairs), solving them, and combining the results. In this problem, it reduces the number of merge operations from `k` to `log k`.

---

### Note 2: Real Interview / Real World Variations

**1. Google: "Merge k Sorted Iterators"**
* **The Problem:** Instead of lists, you have `k` API streams or Iterators that yield one number at a time. You can't see the whole list at once.
* **The Solution:** Use the **Min-Heap** approach. Because the heap only needs the "current" head of each list, it is perfectly suited for streaming data where you don't have the full dataset in memory.

**2. Meta: "Merge Large Log Files"**
* **The Problem:** You have 500 sorted log files (sorted by timestamp), each 10GB. You need to create one giant sorted log file. 
* **The Solution:** This is **External Merge Sort**. You cannot load 5TB of logs into memory. You open a "file pointer" for each of the 500 files, put the first line of each into a Min-Heap, and write the smallest to a new file. This is the exact algorithm used by database engines (like BigQuery or RocksDB) to sort massive datasets.

**3. Bloomberg: "Top K Trending Tickers"**
* **The Problem:** You have multiple streams of stock trades. You need to find the top 5 most traded stocks.
* **The Solution:** While similar, this often uses a **Max-Heap** or a fixed-size Min-Heap of size `k` to track the "largest" elements across multiple sorted or unsorted inputs.

# 19. Remove Nth Node From End of List

To a Senior (L5) or Staff (L6) engineer at Google, this problem isn't just about deleting a node; it’s about **One-Pass Optimization** and **Edge Case Resilience**. 

While a junior might suggest counting the length of the list first and then doing a second pass, a top-tier engineer will immediately reach for the **Two-Pointer (Fast & Slow)** approach. This allows the problem to be solved in a single traversal, which is critical for performance when dealing with massive, streaming data or distributed systems.

---

### 1. Problem Explanation

**The Goal:**
You are given a linked list. You need to remove the "Nth" node from the *end* of the list.

**The Complexity of Linked Lists:**
Unlike an array, you cannot jump to an index. You only know where the `Head` is. To find the 3rd node from the end, you don't know where the "end" is until you reach it. 

**The Challenges:**
* **Single Pass:** Can we do it without counting the total length first?
* **The Head Removal:** What if N is the length of the list? (e.g., removing the 1st node).
* **The Single Item List:** What if there is only 1 node and we remove it?

---

### 2. Solution Explanation

We use two pointers, `Fast` and `Slow`, and a **Dummy Node**.

#### The "Why" behind the Two-Pointers:
Imagine two people running a race. If Runner A starts 10 meters ahead of Runner B, and they run at the exact same speed, when Runner A hits the finish line, Runner B will be exactly 10 meters behind them.
We use this "Fixed Gap" to find the end.

#### Step-by-Step Visualization
Example: List = `[1, 2, 3, 4, 5]`, N = 2 (Remove the 4)

**Step 1: The Dummy Node & Initial State**
We create a `Dummy` node that points to `Head`. This is an L5/L6 best practice because it handles the edge case of deleting the `Head` node gracefully.



```text
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
 S
 F
```

**Step 2: Move the "Fast" pointer N steps ahead**
Since N = 2, we move `Fast` forward twice. Now there is a gap of 2 nodes between `Slow` and `Fast`.

```text
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
 S            F
```

**Step 3: Move both pointers until "Fast" reaches the end**
We move both one step at a time. The gap stays exactly 2.

```text
Move 1:
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
      S            F

Move 2:
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
           S            F

Move 3:
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
                S            F (Fast hits the last node)
```

**Step 4: The Deletion**
Because of our gap, `Slow` is now pointing to the node **immediately before** the one we want to delete.
We want to remove `4`. `Slow` is at `3`. 
We tell `3` to point to `5`, skipping `4` entirely.

```text
           (Target)
              |
Dummy -> 1 -> 2 -> 3      4 -> 5 -> NULL
                   |___________^
                       (Next)
```

**Step 5: Return `Dummy.next`**

---

### 3. Time and Space Complexity Analysis

Let L be the number of nodes in the Linked List.

```text
TIME COMPLEXITY DERIVATION: Order of L
--------------------------------------------------------------
Step 1: Move Fast pointer N steps      ---> Order of N
Step 2: Move both pointers to the end  ---> Order of (L - N)

Total Operations = N + (L - N) = L
Since we only visit each node exactly once:
OVERALL TIME: Order of L


SPACE COMPLEXITY DERIVATION: Order of 1
--------------------------------------------------------------
What are we storing?
1. Dummy Node                          ---> 1 node
2. Fast Pointer                        ---> 1 reference
3. Slow Pointer                        ---> 1 reference

Regardless of if the list has 10 nodes or 10 million nodes, 
we only ever use these 3 extra variables.
OVERALL SPACE: Order of 1 (Constant)
```

---

### 4. Solution Code

#### Python Implementation

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head, n):
    # L5/L6 approach: Use a dummy node to handle head-removal edge cases
    dummy = ListNode(0)
    dummy.next = head
    fast = dummy
    slow = dummy
    
    # Step 1: Create the gap of N between fast and slow
    for _ in range(n):
        fast = fast.next
        
    # Step 2: Move both until fast reaches the last node
    # Note: we check fast.next because we want slow to stop 
    # BEFORE the target node.
    while fast.next:
        fast = fast.next
        slow = slow.next
        
    # Step 3: Skip the target node
    # slow.next is the node to be removed
    slow.next = slow.next.next
    
    # Return dummy.next (not head, because head might have been removed)
    return dummy.next
```

#### JavaScript Implementation

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Dummy node is essential for clean code
    let dummy = new ListNode(0);
    dummy.next = head;
    
    let fast = dummy;
    let slow = dummy;
    
    // Move fast N nodes ahead
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast is at the tail
    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Perform the deletion by re-routing the 'next' pointer
    slow.next = slow.next.next;
    
    return dummy.next;
};
```

---

### Note 1: Terminology and Techniques

* **Two-Pointer Technique:** A common pattern for Linked Lists or Arrays where two pointers move at different speeds or starting positions. In this case, the "Fast" pointer acts as a scout to find the end, allowing the "Slow" pointer to find a relative position.
* **Dummy Node:** A sentinel node placed at the start of a list. It simplifies logic by ensuring that every "real" node (including the head) has a node preceding it. This avoids `if (node == head)` checks.

---

### Note 2: Real-World Interview Variations

**1. Variation: Find the Middle of a Linked List (Google)**
* **The Twist:** Find the middle node in one pass.
* **Solution:** Use Fast and Slow pointers. `Fast` moves 2 steps for every 1 step `Slow` moves. When `Fast` hits the end, `Slow` will be exactly at the middle.

**2. Variation: Linked List Cycle Detection (Meta)**
* **The Twist:** Determine if a list has a loop (a node points back to a previous one).
* **Solution:** "Floyd’s Tortoise and Hare." `Fast` moves 2 steps, `Slow` moves 1. If there is a cycle, the `Fast` pointer will eventually "lap" the `Slow` pointer and they will meet at the same node.

**3. Variation: Memory Management in Caching (Bloomberg)**
* **The Twist:** You are implementing an LRU (Least Recently Used) Cache. You need to remove the "oldest" item which is at the end of a list.
* **Solution:** Use a **Doubly Linked List**. This allows you to have a `Tail` pointer, making the removal of the last node an Order of 1 (instant) operation because you can look "backwards" from the tail to the previous node. This is more efficient than the two-pointer approach for constant removals.

# 143. Reorder List

Solving "Reorder List" at an L5/L6 level is about recognizing that a complex linked list problem is often just three simple problems joined together. A senior engineer won't try to solve this in one pass with messy pointers; they will decompose it into modular, proven sub-problems to ensure the code is bug-free and readable.

---

### 1. Problem Explanation

**The Goal:**
You are given a singly linked list: `L0 -> L1 -> L2 -> ... -> Ln-1 -> Ln`.
You need to reorder it to: `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`

**The Visual Intuition:**
Think of the list as a deck of cards. You are taking the second half of the deck, reversing it, and then performing a "zipper merge" (interleaving) with the first half.

*Example:*
Input:  `1 -> 2 -> 3 -> 4 -> 5`
Output: `1 -> 5 -> 2 -> 4 -> 3`

---

### 2. Solution Explanation

The L5/L6 approach breaks this into three distinct, non-trivial phases. We do this because linked lists are notoriously difficult to debug, and modularity saves lives.

#### Phase 1: Find the Middle of the List
We use the **Fast and Slow Pointer** technique (also known as Hare and Tortoise). 
* The `slow` pointer moves 1 step.
* The `fast` pointer moves 2 steps.
* When `fast` reaches the end, `slow` will be exactly at the middle.

#### Phase 2: Reverse the Second Half
Once we have the middle, we split the list in two. We take the second half and reverse it in-place.
* Why? Because to get the nodes from the end (Ln, Ln-1...), we need them to point backward. Since it's a singly linked list, we must reverse them to access them in that order.

#### Phase 3: Merge the Two Halves (The Zipper Merge)
We now have two lists. We interleave them by picking one from the first, then one from the reversed second, and so on.



**Step-by-Step ASCII Visualization:**

```text
INITIAL LIST: 1 -> 2 -> 3 -> 4 -> 5 -> 6

========================================================================
PHASE 1: FIND MIDDLE
========================================================================
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL
S    F

1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL
     S         F

1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL
          S                   F

Middle found at Node 3.
List 1: 1 -> 2 -> 3 -> NULL
List 2: 4 -> 5 -> 6 -> NULL

========================================================================
PHASE 2: REVERSE SECOND HALF (List 2)
========================================================================
Original List 2: 4 -> 5 -> 6 -> NULL
Reversing...
Reversed List 2: 6 -> 5 -> 4 -> NULL

Current state:
List 1 (Head1): 1 -> 2 -> 3 -> NULL
List 2 (Head2): 6 -> 5 -> 4 -> NULL

========================================================================
PHASE 3: ZIPPER MERGE
========================================================================
L1: 1 -> 2 -> 3
L2: 6 -> 5 -> 4

Step A: Connect 1 to 6
1 -> 6
Next in L1 was 2. Next in L2 was 5.

Step B: Connect 6 to 2
1 -> 6 -> 2
Next in L1 was 3. Next in L2 was 5.

Step C: Connect 2 to 5
1 -> 6 -> 2 -> 5
Next in L1 was 3. Next in L2 was 4.

Step D: Connect 5 to 3
1 -> 6 -> 2 -> 5 -> 3

Step E: Connect 3 to 4
1 -> 6 -> 2 -> 5 -> 3 -> 4 -> NULL

FINAL RESULT: 1 -> 6 -> 2 -> 5 -> 3 -> 4
```

---

### 3. Time and Space Complexity Analysis

```text
TIME COMPLEXITY DERIVATION: Order of N
--------------------------------------------------------------
1. Finding Middle: 
   We traverse the list once with two pointers. 
   Fast pointer touches N nodes.             ---> O(N)

2. Reversing Second Half:
   We traverse roughly N/2 nodes once.       ---> O(N)

3. Zipper Merge:
   We traverse all N nodes once to re-link.  ---> O(N)

Total Time = O(N) + O(N) + O(N) = O(3N)
In Big O notation, we drop constants:        ---> Order of N


SPACE COMPLEXITY DERIVATION: Order of 1
--------------------------------------------------------------
We only use a few pointer variables:
- slow, fast
- prev, curr, nextTemp (for reversal)
- p1, p2, tmp1, tmp2 (for merging)

We do NOT use any extra data structures like 
Arrays, Stacks, or Recursion (which uses the call stack).
Everything is done by changing the .next pointers 
of the existing nodes in-place.

Total Space = Order of 1 (Constant Space)
```

---

### 4. Solution Code

#### Python Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorderList(head):
    if not head or not head.next:
        return

    # PHASE 1: Find middle using slow/fast pointers
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # PHASE 2: Reverse the second half
    # slow is the start of the second half
    prev, curr = None, slow.next
    # Very important: Disconnect the first half from the second
    slow.next = None 
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    # After reversal, 'prev' is the head of the reversed second half
    head1, head2 = head, prev
    
    # PHASE 3: Zipper Merge
    while head2:
        # Save next pointers
        tmp1 = head1.next
        tmp2 = head2.next
        
        # Connect head1 to head2
        head1.next = head2
        # Connect head2 to the original next of head1
        head2.next = tmp1
        
        # Move pointers forward
        head1 = tmp1
        head2 = tmp2
```

#### JavaScript Solution

```javascript
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if (!head || !head.next) return;

    // PHASE 1: Find middle
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // PHASE 2: Reverse second half
    let prev = null;
    let curr = slow.next;
    // Disconnect halves
    slow.next = null;

    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    // PHASE 3: Zipper Merge
    let head1 = head;
    let head2 = prev; // head of reversed part

    while (head2) {
        let tmp1 = head1.next;
        let tmp2 = head2.next;

        head1.next = head2;
        head2.next = tmp1;

        head1 = tmp1;
        head2 = tmp2;
    }
};
```

---

### Note 1: Terminology and Techniques

* **Fast and Slow Pointers:** A strategy used to find the middle, cycles, or the k-th element from the end of a linked list in a single pass. It avoids the need to first count the total length of the list.
* **In-Place Reversal:** Modifying the `next` pointers of nodes to flip the direction of the list without allocating new memory. This is a "bread and butter" linked list skill.
* **Zipper Merge:** A specific type of merge where elements are interleaved. It requires careful management of "temporary" pointers because once you change `node.next`, you lose the reference to the rest of the original list.

---

### Note 2: Real-World / Interview Variations

**1. Variation: Palindrome Linked List (Meta / Google)**
* **The Problem:** Check if a linked list is a palindrome (`1->2->2->1`).
* **The L5 Solution:** This is almost identical to Reorder List! 
    1. Find middle. 
    2. Reverse the second half. 
    3. Instead of merging, compare the values of the first half and the reversed second half. If all match, it's a palindrome.

**2. Variation: Fold a List / Media Playlists (Bloomberg)**
* **The Context:** Imagine a music playlist where you want to hear the first song, then the last, then the second, then the second-to-last.
* **The L5 Solution:** This is exactly "Reorder List." In a real-world system, you might implement this to balance "fresh" content with "classic" content in a feed.

**3. Variation: Memory-Constrained Systems (Google / Embedded)**
* **The Context:** Why not just put everything in an array and reorder it?
* **The L5 Solution:** An L5 engineer will explain that putting nodes into an array takes `O(N)` extra space. In a system handling millions of objects or running on low-power hardware, `O(1)` space (the pointer approach) is the only acceptable solution to prevent memory exhaustion (OOM) errors.

# 146. LRU Cache

This is a classic "Senior Engineer" interview question. At the L5/L6 level, the interviewer isn't just looking for code that works; they are looking for an understanding of **composition**—how to combine two different data structures to cancel out each other's weaknesses.

---

### 1. Problem Explanation

**The Goal:**
Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**.
1. **Fixed Capacity:** It can only hold a certain number of items.
2. **Fast Access:** `get(key)` and `put(key, value)` must be very fast (Constant Time).
3. **Eviction Policy:** When the cache is full and you want to add something new, you must remove the item that hasn't been touched (read or written) for the longest time.

**The "Why" of the Challenge:**
* To make `get` fast, we need a **Hash Map**.
* To keep track of "recency" (order), we need a **List**.
* **The Conflict:** If we use a regular Array/List, moving an item to the "front" (marking it as recently used) takes O(n) time because we have to shift all other elements. We need a way to move items in O(1) time.

---

### 2. Solution Explanation

To solve this, an L5/L6 engineer uses a **Doubly Linked List** combined with a **Hash Map**.



#### The "Recency" Engine: Doubly Linked List (DLL)
We use a DLL with two dummy nodes: `head` (most recent) and `tail` (least recent). 
* Why **Doubly**? Because if we have a reference to a node, we can remove it from the middle of the list in O(1) time by connecting its neighbors to each other.
* Why **Dummy nodes**? To avoid "null pointer" checks. They act as permanent boundaries.

#### The "Lookup" Engine: Hash Map
The Hash Map stores the `key` as the key, and the **pointer to the DLL node** as the value. This allows us to jump straight to any node in the list without searching.

---

#### Step-by-Step Execution Walkthrough
Let's assume **Capacity = 2**.

```text
========================================================================
 INITIAL STATE
========================================================================
Capacity: 2
Map: {}
DLL: [Head] <-> [Tail]

========================================================================
 STEP 1: put(1, 10)
========================================================================
1. Add to Map: {1: node1}
2. Add node1 to DLL right after Head (Most Recent).

DLL: [Head] <-> [1:10] <-> [Tail]

========================================================================
 STEP 2: put(2, 20)
========================================================================
1. Add to Map: {1: node1, 2: node2}
2. Add node2 to DLL right after Head.

DLL: [Head] <-> [2:20] <-> [1:10] <-> [Tail]

========================================================================
 STEP 3: get(1) 
========================================================================
1. Lookup 1 in Map -> found node1.
2. Update Recency: 
   a. Remove node1 from its current spot.
   b. Move node1 to the front (after Head).

DLL: [Head] <-> [1:10] <-> [2:20] <-> [Tail]
Order changed: 1 is now most recent, 2 is least recent.

========================================================================
 STEP 4: put(3, 30) -- EVICTION CASE
========================================================================
1. Capacity is full (2/2). Must evict Least Recently Used.
2. Find LRU: It's the node before [Tail] -> node2.
3. Remove node2 from Map and DLL.
4. Add new node3:
   a. Add to Map: {1: node1, 3: node3}
   b. Add node3 to DLL after Head.

DLL: [Head] <-> [3:30] <-> [1:10] <-> [Tail]
========================================================================
```

---

### 3. Time and Space Complexity Analysis

```text
TIME COMPLEXITY DERIVATION: O(1)
--------------------------------------------------------------
Operation: get(key)
1. Hash Map Lookup:             Order of 1
2. Move node to front of DLL:   Order of 1 (just pointer changes)
Total: Order of 1

Operation: put(key, value)
1. Hash Map Lookup:             Order of 1
2. If exists, update & move:    Order of 1
3. If new, add to DLL & Map:    Order of 1
4. If over capacity, evict:     Order of 1 (remove node before Tail)
Total: Order of 1


SPACE COMPLEXITY DERIVATION: O(Capacity)
--------------------------------------------------------------
What is stored?
1. Hash Map: Stores N keys and N pointers (N = Capacity).
2. DLL: Stores N nodes, each with key, value, prev, and next.

Total Space = Order of (2 * Capacity)
In notation, we simplify this to: Order of Capacity
```

---

### 4. Solution Code

#### Python Implementation
Using a manual Doubly Linked List (the preferred way in an L5/L6 interview to show data structure depth).

```python
class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {} # Map: key -> Node
        
        # Dummy nodes for boundary safety
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    # --- Helper: Remove node from middle of list ---
    def _remove(self, node):
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    # --- Helper: Add node to front (Most Recent) ---
    def _add(self, node):
        after_head = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = after_head
        after_head.prev = node

    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.value
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        
        new_node = Node(key, value)
        self.cache[key] = new_node
        self._add(new_node)
        
        if len(self.cache) > self.cap:
            # Evict from Tail (Least Recent)
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
```

#### JavaScript Implementation

```javascript
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _add(node) {
        const nextNode = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        node.next = nextNode;
        nextNode.prev = node;
    }

    get(key) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            this._remove(node);
            this._add(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        
        const newNode = new Node(key, value);
        this.map.set(key, newNode);
        this._add(newNode);
        
        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}
```

---

### Note 1: Terminology

* **Dummy Nodes (Sentinels):** These are placeholder nodes at the start and end of a list that don't contain real data. They eliminate the need to check `if (node.next == null)` repeatedly, making the code cleaner and less error-prone.
* **Eviction Policy:** The logic used to decide which item to remove when a cache is full. LRU is the most common, but others include MRU (Most Recently Used) and LFU (Least Frequently Used).

---

### Note 2: Real-World Interview Variations

**1. Variation: LFU Cache (Google/Meta)**
* **The Twist:** Evict the item used the *least number of times* overall.
* **How to solve:** This is much harder. You need a map of frequencies and a DLL for *each frequency count*. If multiple items have the same frequency, you use LRU logic within that frequency group.

**2. Variation: Time-Based Expiration (Bloomberg)**
* **The Twist:** Items shouldn't just be evicted when the cache is full, but also if they've been in the cache for longer than X seconds (TTL - Time To Live).
* **How to solve:** Use a Min-Heap based on "Expiration Time" alongside the Hash Map, or a sorted DLL where nodes are ordered by timestamp.

**3. Variation: Thread-Safe LRU (System Design Focus)**
* **The Twist:** How do you handle multiple users calling `get` and `put` at the same time?
* **How to solve:** Talk about **Locks (Mutexes)**. In a high-performance system, a single lock on the whole cache creates a bottleneck. You would use **Sharding**, where you split the cache into 16 "buckets," each with its own lock, to reduce contention.

# 24. Swap Nodes in Pairs

This is an end-to-end, L5/L6 level walkthrough for "Swap Nodes in Pairs."

At a top tech company, a Senior or Staff Engineer views Linked List problems as "Pointer Management" challenges. The most common pitfall is losing the reference to the rest of the list while swapping nodes. An L6 engineer will focus on making the solution **robust** and **readable**, typically opting for an iterative approach with a "Dummy Node" to handle the head of the list gracefully.

---

### 1. Problem Explanation

**The Goal:**
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only the nodes themselves can be changed).

**The Challenge:**
If you have `1 -> 2 -> 3 -> 4`, you need to transform it into `2 -> 1 -> 4 -> 3`.
The difficulty lies in the "connections":
* `2` must point to `1`.
* `1` must point to `4` (not `3`!).
* The previous pair's end must point to the new pair's start.



---

### 2. Solution Explanation

To solve this iteratively, we use a **Dummy Node**. This is a fake node placed before the actual head. It simplifies the logic because the "first" node now has a "previous" node, just like every other node in the list.

#### The Three-Step Swap Logic
For any pair of nodes `A` and `B` that we want to swap, we need a pointer to the node **before** them (let's call it `Prev`).

1.  **Point Prev to B:** `Prev -> B`
2.  **Point A to whatever was after B:** `A -> B.next`
3.  **Point B to A:** `B -> A`

Let's visualize this with `1 -> 2 -> 3 -> 4`.

```text
========================================================================
 INITIAL STATE
========================================================================
Dummy -> 1 -> 2 -> 3 -> 4
  ^
 Prev (Start here)

========================================================================
 STEP 1: Identify the Pair
========================================================================
Prev is at Dummy.
Node A = Prev.next (1)
Node B = Prev.next.next (2)

Current layout:
[Dummy] -> [1] -> [2] -> [3] -> [4]
   ^        ^      ^
  Prev      A      B

========================================================================
 STEP 2: The Swap (3 Pointer Changes)
========================================================================

Change 1: Prev.next = B
[Dummy] ------> [2]
          |     [1] -> [2] (Wait, we need to fix this!)

Change 2: A.next = B.next
[Dummy] ------> [2]
                [1] ------> [3] -> [4]

Change 3: B.next = A
[Dummy] -> [2] -> [1] -> [3] -> [4]

Result of Step 2:
Dummy -> 2 -> 1 -> 3 -> 4
              ^
             New Prev position! 
             We move Prev to Node A because A is now the end of the pair.

========================================================================
 STEP 3: Identify the Next Pair
========================================================================
Prev is now at 1.
Node A = 3
Node B = 4

Repeat the swap logic...

FINAL RESULT:
Dummy -> 2 -> 1 -> 4 -> 3 -> null
```

---

### 3. Time and Space Complexity Analysis

Let N be the number of nodes in the linked list.

```text
TIME COMPLEXITY DERIVATION: O(N)
--------------------------------------------------------------
We traverse the list exactly once.
In each step of the loop, we process 2 nodes.

Total Iterations = N / 2
Work per Iteration = Constant pointer re-assignments (O(1))

Total Time = (N / 2) * O(1)
This simplifies to O(N).


SPACE COMPLEXITY DERIVATION: O(1)
--------------------------------------------------------------
We only create a few extra pointers:
- Dummy node
- Prev pointer
- Temporary A and B pointers

These take up a fixed amount of memory regardless of how 
long the linked list is. No recursion is used in the 
optimal iterative approach, so there is no stack overhead.

Total Space = O(1) Constant Space
```

---

### 4. Solution Code

#### Python Solution (Iterative)

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def swapPairs(head):
    # Dummy node handles the head swap and empty list cases
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    # We need at least two nodes to perform a swap
    while prev.next and prev.next.next:
        # Identify the nodes to be swapped
        first = prev.next
        second = prev.next.next
        
        # -------------------------------------------------
        # NON-TRIVIAL POINTER SWAP:
        # We must re-order the 'next' pointers carefully 
        # so we don't lose the reference to the rest of the list.
        # -------------------------------------------------
        
        # 1. Point the previous node/dummy to the second node
        prev.next = second
        
        # 2. Point the first node to whatever comes after the pair
        first.next = second.next
        
        # 3. Complete the swap by pointing the second node back to the first
        second.next = first
        
        # Move the 'prev' pointer forward by two nodes for the next iteration
        # After swapping, 'first' is now the second node in the pair
        prev = first
        
    return dummy.next
```

#### JavaScript Solution (Iterative)

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (prev.next !== null && prev.next.next !== null) {
        let first = prev.next;
        let second = prev.next.next;
        
        // Re-pointing logic
        // Dummy/Prev -> Second
        prev.next = second;
        
        // First -> Node after pair (the '3' in 1-2-3-4)
        first.next = second.next;
        
        // Second -> First
        second.next = first;
        
        // Prepare for next loop: jump prev to the end of the current swapped pair
        prev = first;
    }
    
    return dummy.next;
};
```

---

### Note 1: Terminology & Techniques

* **Dummy Node:** A placeholder node used to simplify edge cases. In linked list problems, it prevents you from having to write a separate `if` statement to handle the "Head" of the list differently than the "Middle" of the list.
* **In-Place Modification:** This means we are rearranging existing memory (nodes) rather than creating new copies of the data. This is why the space complexity is O(1).

---

### Note 2: Real World / Interview Variations

**1. Variation: Reverse Nodes in K-Group (Google/Meta)**
* *The Twist:* Instead of swapping in pairs (K=2), swap in groups of K (e.g., K=3).
* *Solution:* This is a direct escalation of the same logic. You check if K nodes exist; if they do, you reverse that segment and connect it back to the `prev` and `next` parts of the list.

**2. Variation: Swap Nodes in Pairs - Values Only (Bloomberg)**
* *The Twist:* Some interviewers might ask if you can just swap `node.val`.
* *How to answer:* You should explain that while `node.first.val, node.second.val = node.second.val, node.first.val` works, it is generally **frowned upon** in real-world systems. Why? Because in a real production environment, a "Node" might be a massive object with many properties or tied to specific memory addresses. Swapping values can be expensive and violates the principle of preserving object identity.

**3. Variation: Reorder List (Meta)**
* *The Twist:* Given `1-2-3-4`, rearrange to `1-4-2-3`.
* *Solution:* This combines "Find Middle," "Reverse Second Half," and "Merge Two Lists." Even though the pattern is different, the core skill is the same: manipulating `next` pointers without losing the chain.

# 61. Rotate List

Solving "Rotate List" at a Senior (L5) or Staff (L6) level involves more than just moving pointers. It requires identifying that a linked list rotation is actually a **ring transformation**. Instead of performing "k" individual rotations (which is slow), we perform a single surgical cut on a circular version of the list.

---

### 1. Problem Explanation

**The Goal:**
Given the head of a linked list, rotate the list to the right by `k` places.

**What is a Rotation?**
Imagine a line of people. To rotate right by 1, the person at the very back walks to the very front. 
If the list is `[1, 2, 3, 4, 5]` and `k = 2`:
* Rotate 1: `[5, 1, 2, 3, 4]`
* Rotate 2: `[4, 5, 1, 2, 3]`

**The "Aha!" Moment (Why it's tricky):**
1.  **Large K:** If the list has 5 nodes and `k = 100`, rotating 100 times is the same as rotating 0 times. We must use `k % length` to avoid redundant work.
2.  **The Cut:** Rotating a list is essentially finding a new tail and a new head. The "old tail" must point to the "old head" (making a circle), and the "new tail" must point to `null` (breaking the circle).

---

### 2. Solution Explanation

An L5 engineer uses the **"Circular Connection"** strategy. It is the most robust and mathematically clean way to solve this.

#### Step 1: Handle Edge Cases
If the list is empty, has one node, or `k = 0`, return the head immediately.

#### Step 2: Measure Length & Link the Tail
Traverse the list to find the total length and the last node. Connect the last node to the head to form a circle.

#### Step 3: Find the New Tail
If the length is `L`, rotating right by `k` is equivalent to moving the "cut point" `L - (k % L)` steps from the start.

#### Step 4: Break the Circle
Identify the new head (the node after the new tail) and set the new tail's `next` to `null`.



**Visualization Walkthrough:**
`List = [1, 2, 3, 4, 5]`, `k = 2`

```text
========================================================================
 STEP 1: INITIAL STATE & MEASURE
========================================================================
List: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
      ^                   ^
     head                tail

1. Count nodes: Length = 5.
2. Actual rotations needed: k = 2 % 5 = 2.

========================================================================
 STEP 2: MAKE IT CIRCULAR
========================================================================
Connect tail (5) to head (1).

      -------------------
      |                 |
      v                 |
      1 -> 2 -> 3 -> 4 -> 5
      ^
     head/tail

========================================================================
 STEP 3: FIND THE NEW TAIL
========================================================================
The new tail is at position: (Length - k) = 5 - 2 = 3rd node.

Start at head (1), move 2 more steps (to reach the 3rd node):
Step 0: Node 1
Step 1: Node 2
Step 2: Node 3  <-- NEW TAIL FOUND

      -------------------
      |                 |
      v                 |
      1 -> 2 -> 3       4 -> 5
                ^       ^
             New Tail  New Head

========================================================================
 STEP 4: BREAK THE CIRCLE
========================================================================
1. New Head = New Tail.next (which is 4).
2. New Tail.next = NULL.

Result: 4 -> 5 -> 1 -> 2 -> 3 -> NULL
```

---

### 3. Time and Space Complexity Analysis

Let N be the number of nodes in the linked list.

```text
TIME COMPLEXITY DERIVATION: O(N)
--------------------------------------------------------------
1. First traversal to find length/tail: 
   We visit every node exactly once.             ---> N steps

2. Second traversal to find new tail:
   In the worst case (k=1), we move N-1 steps.   ---> N steps

Total Time = N + N = 2N
In Big O notation, constants are dropped.
Final Time Complexity: O(N)


SPACE COMPLEXITY DERIVATION: O(1)
--------------------------------------------------------------
What are we storing?
- length (integer)
- k (integer)
- tail pointer
- newHead pointer

No matter how large the list is, we only use a fixed 
amount of pointer variables. No recursion (stack) or 
extra arrays are used.

Final Space Complexity: O(1)
```

---

### 4. Solution Code

#### Python Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def rotateRight(head, k):
    # Edge case: Empty list or single node
    if not head or not head.next or k == 0:
        return head
    
    # Step 1: Find length and original tail
    length = 1
    old_tail = head
    while old_tail.next:
        old_tail = old_tail.next
        length += 1
    
    # Step 2: Handle k > length
    k = k % length
    if k == 0:
        return head
    
    # Step 3: Close the loop (make it circular)
    old_tail.next = head
    
    # Step 4: Find the new tail
    # New tail is at (length - k - 1) steps from the head
    new_tail = head
    for _ in range(length - k - 1):
        new_tail = new_tail.next
    
    # Step 5: Break the loop
    new_head = new_tail.next
    new_tail.next = None
    
    return new_head
```

#### JavaScript Solution

```javascript
function rotateRight(head, k) {
    // Edge case: Empty list, single node, or no rotation
    if (!head || !head.next || k === 0) {
        return head;
    }

    // Step 1: Calculate length and find the current tail
    let length = 1;
    let oldTail = head;
    while (oldTail.next) {
        oldTail = oldTail.next;
        length++;
    }

    // Step 2: Clean up k
    k = k % length;
    if (k === 0) return head;

    // Step 3: Link tail to head to form a circle
    oldTail.next = head;

    // Step 4: Locate the new tail
    // We need to move (length - k) steps from the start to find the new head.
    // So we move (length - k - 1) to find the new tail.
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }

    // Step 5: Break the circle and set the new head
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}
```

---

### Note 1: Terminology and Techniques

* **Circular Linked List:** A linked list where the last node points to the first node. Converting a linear list to a circular one is a powerful technique for "rotation" or "cycling" problems because it allows you to reach the "start" from the "end" in one step.
* **Modulo Operator (%):** Used to handle "wrap-around" logic. If `k` is a multiple of `length`, the list remains unchanged. `k % length` gives us the *effective* number of rotations.

---

### Note 2: Real-World / Interview Variations

**1. Variation: Rotate a 2D Matrix (Google)**
* *The Twist:* Instead of a list, rotate a square matrix 90 degrees.
* *Solution:* An L5 would explain that you can't just move pointers here. You perform a **Transpose** (swap rows and columns) followed by a **Reverse** of each row.

**2. Variation: Circular Buffer / Queue (Bloomberg)**
* *The Twist:* Design a data structure that has a fixed size and "overwrites" old data when it gets full.
* *Solution:* You use an array and two pointers (`head` and `tail`). When a pointer reaches the end of the array, you use `(i + 1) % size` to jump back to index 0, effectively turning the linear array into a circle.

**3. Variation: Linked List Cycle Detection (Meta)**
* *The Twist:* Given a list, does it have a cycle?
* *Solution:* Use **Floyd's Tortoise and Hare**. Two pointers move at different speeds. If there is a cycle (like our circular connection), the fast one will eventually lap the slow one. This is a common follow-up to "Rotate List."

# 138. Copy List with Random Pointer

This problem is a classic favorite for L5/L6 interviews because it tests your ability to handle complex pointer manipulation and your knowledge of space-time trade-offs. A Senior Engineer won't just solve it with a Hash Map; they will provide the "In-Place" solution that requires zero extra memory, demonstrating deep optimization skills.

---

### 1. Problem Explanation

**The Goal:**
You are given a linked list where each node has two pointers:
1. `next`: Points to the next node in the sequence (Standard).
2. `random`: Points to any node in the list, or `null` (The Twist).

You need to create a **Deep Copy**. This means you cannot just copy the pointers; you must create entirely new objects in memory that mirror the structure of the original list.

**The "Why" it is Hard:**
In a normal linked list, you can copy nodes one by one as you move forward. But with a `random` pointer, a node at the start might point to a node at the very end that hasn't been created yet. Or, it might point to a node you already passed.

How do you "find" the corresponding new node for a random pointer without searching the whole list every time?

---

### 2. Solution Explanation

We will look at the two industry-standard ways to solve this.

#### Approach A: The Hash Map (The "Intuitive" Way)
We use a dictionary to create a "Translation Table."
* **Key:** The original node address.
* **Value:** The newly created clone node address.

**The Process:**
1. Loop once to create all new nodes and store them in the map.
2. Loop again to set the `next` and `random` pointers of the new nodes by looking up the "clones" in our map.

#### Approach B: Interweaving (The "L6 Staff Engineer" Way)
This is the most impressive solution because it uses **O(1) extra space**. We temporarily modify the original list to store the clones inside it.



**Step 1: Interweave (Clone and Insert)**
For every node in the original list, create a clone and insert it right next to the original.
```text
Original:  [A] -> [B] -> [C]
Interwoven: [A] -> [A'] -> [B] -> [B'] -> [C] -> [C']
(A' is the clone of A)
```

**Step 2: Copy Random Pointers**
Because the clone is always exactly one step behind the original, we know where the clone's random pointer should go.
If `A.random` points to `C`, then `A'.random` must point to `C'`. Where is `C'`? It is just `C.next`!
`A.next.random = A.random.next`

**Step 3: Separate the Lists**
Restore the original list and extract the clones into their own list.

**Detailed ASCII Walkthrough of Approach B:**

```text
========================================================================
 INITIAL STATE
========================================================================
(1) -> (2) -> (3) -> null
 |      ^      |
 |______|      |   (1.random points to 2)
        |______|   (3.random points to 3 - self)

========================================================================
 STEP 1: INTERWEAVE
========================================================================
We create a clone of each node and put it immediately after the original.

(1) -> [1'] -> (2) -> [2'] -> (3) -> [3'] -> null

Why? Now every original node "knows" where its clone is (it's right next to it).

========================================================================
 STEP 2: CONNECT RANDOM POINTERS
========================================================================
Look at Original Node (1). 
Its random points to (2).
So, its clone [1'] should point to (2)'s clone, which is [2'].

Formula: curr.next.random = curr.random.next

Interwoven state with randoms set:
(1) ----> (2) ----> (3) --|
 |  |      ^  |      ^    | (Random pointers)
 |  |______|  |______|____|
 |            |      |
 v            v      v
[1'] ----> [2'] ----> [3'] --|
    |__________________|     |
                       |_____|

========================================================================
 STEP 3: SEPARATE THE LISTS
========================================================================
We fix the 'next' pointers to unbind the clones from the originals.

Original: (1) -> (2) -> (3) -> null
Clone:    [1'] -> [2'] -> [3'] -> null

Result: [1'] -> [2'] -> [3'] is returned.
```

---

### 3. Time and Space Complexity Analysis

#### Approach B (Interweaving)

```text
TIME COMPLEXITY: O(N)
--------------------------------------------------------------
Phase 1: Interweaving      -> 1 pass through N nodes
Phase 2: Setting Randoms   -> 1 pass through N nodes
Phase 3: Separating Lists  -> 1 pass through N nodes

Total Time = N + N + N = 3N
In Big O notation, we drop constants: O(N)


SPACE COMPLEXITY: O(1)
--------------------------------------------------------------
Are we using extra data structures (Maps, Arrays, Sets)?
- No. 

We only use a few pointers (curr, copy, temp).
Note: We do not count the memory used for the output list itself 
as "extra space" because it is required by the problem.

Total Extra Space = O(1)
```

---

### 4. Solution Code

#### Python Implementation (Interweaving)

```python
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

def copyRandomList(head):
    if not head:
        return None

    # Step 1: Create clones and interweave
    curr = head
    while curr:
        # Create clone
        new_node = Node(curr.val, curr.next)
        # Insert clone right after original
        curr.next = new_node
        # Move to the next original node
        curr = new_node.next

    # Step 2: Assign random pointers to the clones
    curr = head
    while curr:
        if curr.random:
            # The clone's random is the original's random's clone
            curr.next.random = curr.random.next
        curr = curr.next.next

    # Step 3: Separate the interweaved list
    curr = head
    copy_head = head.next
    while curr:
        temp = curr.next
        curr.next = temp.next
        if temp.next:
            temp.next = temp.next.next
        curr = curr.next
        
    return copy_head
```

#### JavaScript Implementation (Interweaving)

```javascript
function copyRandomList(head) {
    if (!head) return null;

    // Step 1: Interweave clones
    let curr = head;
    while (curr) {
        let newNode = new Node(curr.val, curr.next, null);
        curr.next = newNode;
        curr = newNode.next;
    }

    // Step 2: Copy random pointers
    curr = head;
    while (curr) {
        if (curr.random) {
            // curr.next is the clone. curr.random.next is the clone of the target.
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // Step 3: Separate original and clone lists
    curr = head;
    let copyHead = head.next;
    let copyCurr = copyHead;

    while (curr) {
        curr.next = curr.next.next;
        if (copyCurr.next) {
            copyCurr.next = copyCurr.next.next;
        }
        curr = curr.next;
        copyCurr = copyCurr.next;
    }

    return copyHead;
}
```

---

### Note 1: Terms & Techniques

* **Deep Copy:** Creating a completely independent duplicate of a data structure. If you change a value in the copy, the original remains unchanged.
* **Interweaving:** A clever pointer manipulation technique where you temporarily merge two data structures to maintain a relationship between nodes (like "original to clone") without using an external Hash Map.
* **In-Place Algorithm:** An algorithm that operates directly on the input data structure and uses only a tiny, constant amount of extra helper memory.

---

### Note 2: Real-World Interview Variations

**1. Clone a Directed Graph (Meta / Google)**
* **The Problem:** Instead of a list, you have a graph where each node has a list of neighbors.
* **The Solution:** You cannot "interweave" in a graph easily. You must use a Hash Map and a Traversal (BFS or DFS). As you visit each node, you clone it and store it in the map: `Map<OriginalNode, CloneNode>`.

**2. Copying a Binary Tree with "Parent" Pointers (Bloomberg)**
* **The Problem:** Every node has `left`, `right`, and `parent`.
* **The Solution:** Similar to the random pointer problem. You can use the Hash Map approach or, if you're clever, a similar interweaving-style logic using the `left` or `right` child slots temporarily.

**3. Deep Copy of a Database Record with Foreign Keys (System Design)**
* **The Problem:** You need to duplicate a User record in a SQL database that has links to "Profile," "Settings," and "Orders."
* **The Solution:** This is a "Distributed" version of the problem. You usually have to perform this in a "Topological Sort" order (copying the independent records first) or use a "Two-Pass" approach where you insert the rows with null foreign keys first, then update the keys once all new IDs are generated.

# 287. Find the Duplicate Number

For an L5 or L6 engineer at Google, the "Find the Duplicate Number" problem is a classic test of constraint management. While most candidates can solve this with a Hash Map or by sorting, the senior-level challenge is solving it under the **strict constraints**: you must not modify the array (no sorting) and you must use only constant (O(1)) extra space.

### 1. Problem Explanation

**The Setup:**
You have an array containing `n + 1` integers. Each integer is between `1` and `n` (inclusive). 

**The Guarantee:**
According to the Pigeonhole Principle, if you have `n` holes and `n + 1` pigeons, at least one hole must have two pigeons. Here, it means there is **at least one** duplicate number.

**The Rules:**
1. You **cannot** modify the array (it is read-only).
2. You must use only **constant extra space** (no Sets, no Maps).
3. There is only one duplicate number, but it could be repeated more than twice.

**The Example:**
Input: `nums = [1, 3, 4, 2, 2]`
Here, `n = 4`. Numbers are between 1 and 4. The duplicate is `2`.

---

### 2. Solution Explanation

**The Intuition (The "Why"):**
A senior engineer recognizes that an array where values are in the same range as the indices can be treated as a **Directed Graph**.

Imagine each index `i` points to the value `nums[i]`. 
If `nums = [1, 3, 4, 2, 2]`:
* Index 0 points to value 1
* Index 1 points to value 3
* Index 3 points to value 2
* Index 2 points to value 4
* Index 4 points to value 2

Because there is a duplicate number, two different indices will point to the same value. In graph terms, this means two different paths lead to the same node. This creates a **cycle**. 



**The Algorithm: Floyd's Tortoise and Hare (Cycle Detection)**
This is the same algorithm used to find a cycle in a Linked List. It has two phases.

**Phase 1: Finding the Intersection**
1. We use two pointers, a `tortoise` (slow) and a `hare` (fast).
2. Both start at index 0.
3. `tortoise` moves 1 step: `tortoise = nums[tortoise]`
4. `hare` moves 2 steps: `hare = nums[nums[hare]]`
5. They will eventually meet inside the cycle.

**Phase 2: Finding the Entrance (The Duplicate)**
1. Keep `hare` at the meeting point.
2. Reset `tortoise` to index 0.
3. Move both 1 step at a time.
4. The exact point where they meet again is the entrance to the cycle, which is our **duplicate number**.

**ASCII Visualization Walkthrough:**
Input: `[1, 3, 4, 2, 2]`

```text
STEP 1: Phase 1 (Find the meeting point)
---------------------------------------
Index:   0   1   2   3   4
Value: [ 1,  3,  4,  2,  2 ]

Start: Tortoise = 0, Hare = 0

Move 1:
Tortoise = nums[0] = 1
Hare = nums[nums[0]] = nums[1] = 3
T is at 1, H is at 3

Move 2:
Tortoise = nums[1] = 3
Hare = nums[nums[3]] = nums[2] = 4
T is at 3, H is at 4

Move 3:
Tortoise = nums[3] = 2
Hare = nums[nums[4]] = nums[2] = 4
T is at 2, H is at 4

Move 4:
Tortoise = nums[2] = 4
Hare = nums[nums[4]] = nums[2] = 4
MEETING! Both at value 4.

STEP 2: Phase 2 (Find the entrance)
-----------------------------------
Reset Tortoise to 0. 
Hare stays at 4 (the meeting point).

Move 1:
Tortoise = nums[0] = 1
Hare = nums[4] = 2
T is at 1, H is at 2

Move 2:
Tortoise = nums[1] = 3
Hare = nums[2] = 4
T is at 3, H is at 4 (Wait, indices are moving towards the duplicate value)

Actually, let's look at the "Value" they point to:
T = 0 -> 1 -> 3 -> 2
H = 4 -> 2
When H is at index 4, value is 2.
When T moves from 1 to index 3, value is 2.
They meet at value 2!

RESULT: 2
```

---

### 3. Time and Space Complexity Analysis

```text
TIME COMPLEXITY: O(N)
--------------------------------------------------
Phase 1: In the worst case, the fast pointer traverses 
the cycle twice before meeting the slow pointer. 
This is linear relative to the array length.

Phase 2: The pointers move from the start and meeting 
point to the cycle entrance. This is also linear.

Total Time: O(N) + O(N) = O(N)

[ Visualization of Time ]
-------------------------
Traversal 1: [====================] (Hare/Tortoise meet)
Traversal 2: [=========] (Find duplicate)
Cumulative: Linear work.
--------------------------------------------------

SPACE COMPLEXITY: O(1)
--------------------------------------------------
We only store two integer variables: 'tortoise' and 'hare'.
Regardless of whether the array has 10 or 10,000,000 
elements, we only ever use these two pointers.

[ Visualization of Space ]
--------------------------
Memory: [ Tortoise (int) ] [ Hare (int) ]
(Fixed size memory block, does not grow with N)
--------------------------------------------------
```

---

### 4. Solution Code

#### Python Snippet

```python
def findDuplicate(nums):
    # Initialize both pointers at the start
    # Note: We use the values as 'next' pointers
    tortoise = nums[0]
    hare = nums[nums[0]]
    
    # Phase 1: Finding the intersection point in the cycle
    # The hare moves twice as fast as the tortoise
    while tortoise != hare:
        tortoise = nums[tortoise]
        hare = nums[nums[hare]]
        
    # Phase 2: Finding the entrance to the cycle (the duplicate)
    # Reset one pointer to start; move both at same speed
    tortoise = 0
    while tortoise != hare:
        tortoise = nums[tortoise]
        hare = nums[hare]
        
    return hare
```

#### JavaScript Snippet

```javascript
function findDuplicate(nums) {
    // Phase 1: Use Floyd's Cycle-Finding to find meeting point
    // We treat the array values as pointers to indices
    let tortoise = nums[0];
    let hare = nums[nums[0]];
    
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    }
    
    // Phase 2: Find the duplicate (cycle entrance)
    // Keep 'hare' at meeting point, reset 'tortoise' to index 0
    tortoise = 0;
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }
    
    return hare;
}
```

---

### Note 1: Terminology Addendum

**Floyd's Cycle-Finding Algorithm (Tortoise and Hare):**
* **What it is:** A pointer-based algorithm that uses two pointers moving at different speeds to detect cycles in a sequence of values.
* **Why it helps:** It allows you to find cycles and the "start" of a cycle in O(N) time with zero extra space (O(1)).
* **Application:** In this problem, because numbers are between 1 and `n`, and indices are 0 to `n`, every value is a valid index. This allows us to "jump" through the array like a linked list.

---

### Note 2: Real-World Interview Variations

**Variation 1: "Linked List Cycle II" (Google/Meta/Bloomberg)**
* *The Prompt:* Given a linked list, return the node where the cycle begins.
* *The L5 Solve:* This is the identical logic but with `node.next` instead of `nums[i]`. A senior engineer should mention that the "Find Duplicate Number" problem is essentially the linked list problem in disguise.

**Variation 2: "First Missing Positive" (Google/Meta)**
* *The Prompt:* Given an unsorted integer array, find the smallest missing positive integer in O(N) time and O(1) space.
* *The L5 Solve:* While this uses "Cyclic Sort" rather than "Cycle Detection," it relies on the same senior-level insight: **treating the array values as indices**. You swap elements into their "correct" spots (e.g., the number 1 goes to index 0, number 2 to index 1). After swapping, the first index `i` that doesn't contain `i+1` is the missing number.

**Variation 3: "Detecting Redirect Loops in URL Shorteners" (System Design Context)**
* *The Prompt:* How would you detect if a series of URL redirects (A -> B -> C -> A) will cause a browser crash?
* *The L5 Solve:* In a distributed system, you could use a version of this logic or a TTL (Time to Live) counter. If you were processing a chain of redirects in a single request, keeping a "fast" and "slow" crawler through the redirect metadata would detect the loop without storing every visited URL in a massive set.

# 2. Add Two Numbers

This problem is a quintessential "bread and butter" interview question. While the logic seems simple—adding numbers—an L5/L6 engineer at Google focuses on the **cleanliness of the edge-case handling** and the **efficiency of pointer manipulation**. 

### 1. Problem Explanation

**The Premise:**
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. You need to add the two numbers and return the sum as a linked list.

**The "Why" of the Reverse Order:**
Storing digits in reverse order (ones place first, then tens, then hundreds) is actually a **gift**. In standard elementary school addition, you start from the right (the ones place) and move left, carrying over values as you go. 



Because the linked list starts with the ones place at the `head`, we can just walk through both lists simultaneously and build our answer list from left to right.

**Example:**
List 1: `2 -> 4 -> 3` (represents 342)
List 2: `5 -> 6 -> 4` (represents 465)
Result: `7 -> 0 -> 8` (represents 807)

---

### 2. Solution Explanation

To solve this like a Senior Engineer, we use the **Dummy Head** technique. 

#### The Strategy:
1.  **Initialize a Dummy Head:** This is a "fake" starting node that makes it easier to return the final list and avoids writing special code just to handle the very first node.
2.  **Use a Carry Variable:** Just like pen-and-paper addition, if the sum of two digits is 10 or more, we keep the ones digit and "carry" the 1 to the next position.
3.  **The Simultaneous Walk:** We move through both lists at once. If one list is shorter than the other, we treat the missing digits as 0.
4.  **The Final Carry:** A common mistake is forgetting that after both lists are exhausted, there might still be a carry (e.g., 50 + 50 = 100). We must check for this at the very end.

#### Detailed ASCII Walkthrough

Input: `L1: [2 -> 4 -> 3]`, `L2: [5 -> 6 -> 4]`

```text
STEP 1: Initialize
Dummy: [0]
Curr: points to Dummy
Carry: 0

---------------------------------------------------------
STEP 2: Ones Place
L1: (2) -> 4 -> 3
L2: (5) -> 6 -> 4
Sum = L1.val + L2.val + Carry = 2 + 5 + 0 = 7
New Carry = 7 / 10 = 0
New Digit = 7 % 10 = 7

Dummy -> [7]
          ^
         Curr
---------------------------------------------------------
STEP 3: Tens Place
L1: 2 -> (4) -> 3
L2: 5 -> (6) -> 4
Sum = 4 + 6 + 0 = 10
New Carry = 10 / 10 = 1
New Digit = 10 % 10 = 0

Dummy -> [7] -> [0]
                 ^
                Curr
---------------------------------------------------------
STEP 4: Hundreds Place
L1: 2 -> 4 -> (3)
L2: 5 -> 6 -> (4)
Sum = 3 + 4 + 1 = 8
New Carry = 8 / 10 = 0
New Digit = 8 % 10 = 8

Dummy -> [7] -> [0] -> [8]
                        ^
                       Curr
---------------------------------------------------------
STEP 5: Check Carry
Both lists are empty. Carry is 0. We stop.
Return Dummy.next -> [7, 0, 8]
```

**Non-Trivial Edge Case: Different Lengths**
If we have `9 -> 9` (99) + `1` (1):
- Ones: 9 + 1 = 10 (Digit 0, Carry 1)
- Tens: 9 + (no digit) + 1 = 10 (Digit 0, Carry 1)
- Final: Carry 1 remains. Add new node `[1]`.
- Result: `0 -> 0 -> 1` (100).

---

### 3. Time and Space Complexity Analysis

**Time Complexity: O(max(N, M))**
Where N is the length of `L1` and M is the length of `L2`.

```text
TC Derivation:
We iterate through the nodes of both lists exactly once. 
The number of iterations is determined by the longer list.

L1: [ * * * * ] (Length N)
L2: [ * * ]     (Length M)

Loop: 1 -> 2 -> 3 -> 4 (Continues until the longest list is done)

Total Work: O(max(N, M))
```

**Space Complexity: O(max(N, M))**

```text
SC Derivation:
We are creating a new linked list for the result.
The length of this new list will be at most max(N, M) + 1 
(the '+1' is for a potential final carry).

Memory used for new nodes:
[7] -> [0] -> [8] -> ...

Total Space: O(max(N, M))
```

---

### 4. Solution Code

#### Python Implementation

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    # 1. The 'Dummy Head' simplifies list construction.
    # We build the result after this node.
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    
    # 2. Continue while there are digits left OR a carry to process
    while l1 or l2 or carry:
        # Extract values, defaulting to 0 if we reached the end of a list
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        # Calculate sum and new carry
        total = val1 + val2 + carry
        carry = total // 10
        new_digit = total % 10
        
        # 3. Create new node and move the result pointer forward
        curr.next = ListNode(new_digit)
        curr = curr.next
        
        # Move input pointers forward if possible
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
        
    # Return the list starting AFTER the dummy head
    return dummy.next
```

#### JavaScript Implementation

```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

var addTwoNumbers = function(l1, l2) {
    // 1. Create a dummy head to act as a placeholder.
    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;

    // 2. Loop until both lists are empty and no carry remains.
    while (l1 !== null || l2 !== null || carry !== 0) {
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;

        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        let digit = sum % 10;

        // 3. Append new digit to our result list.
        curr.next = new ListNode(digit);
        curr = curr.next;

        // Progress the input list pointers.
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummy.next;
};
```

---

### Note 1: Terms and Techniques

* **Dummy Head:** A sentinel node used to simplify linked list operations. By having a guaranteed node at the start, you don't have to write an `if (head == null)` check inside your loop to handle the first element.
* **Carry-Forward Logic:** This is a basic form of an "Arbitrary-Precision Arithmetic" algorithm, which allows computers to add numbers much larger than what a standard 64-bit integer can hold.

---

### Note 2: Real-World Interview Variations

**1. Bloomberg: "Add Two Numbers II" (LeetCode 445)**
* **The Twist:** The digits are stored in **forward order** (e.g., `3 -> 4 -> 2` for 342).
* **L5 Solution:** Since you can't easily add from the head (the most significant digit), you use two **Stacks**. Push all nodes of `L1` onto Stack 1 and `L2` onto Stack 2. Pop them to add from the ones-place up. Alternatively, you could reverse both lists, add them using the original algorithm, and reverse the result.

**2. Meta: "BigInt Addition with Strings"**
* **The Twist:** Instead of linked lists, you are given two strings representing massive numbers.
* **L5 Solution:** Use the same "Carry" logic but use two pointers starting at the **end** of the strings. Move the pointers toward the beginning, appending digits to an array, and finally reverse the array and join it back into a string.

**3. Google: "Streaming Addition"**
* **The Twist:** The numbers are so large they don't fit in memory. They are being streamed to you one digit at a time from a network.
* **L5 Solution:** This requires a "State Machine" approach. You maintain a `carry` in memory and process the incoming digit pair immediately. This demonstrates an understanding of memory-constrained environments where you cannot "look ahead" or "reverse" the input.

# 25. Reverse Nodes in k-Group

This is a classic "Hard" LeetCode problem because it combines basic pointer manipulation with complex bookkeeping. An L5/L6 engineer doesn't solve this by trying to track every pointer at once; they solve it by **decomposing** the problem into a repeatable "sub-problem."

The secret is seeing this as a loop: **Find a group -> Reverse that group -> Connect it to the previous part -> Repeat.**

---

### 1. Problem Explanation

**The Goal:** You are given a linked list. You need to reverse the nodes of the list `k` at a time and return the modified list.

**The Constraints:**
* If the number of nodes is not a multiple of `k`, the left-over nodes at the end should remain in their original order.
* You must use **O(1) extra space** (you can't just put everything in an array, reverse the array, and rebuild the list). You must physically move the pointers.

**Visualizing the Goal:**
Let `List = [1, 2, 3, 4, 5]` and `k = 2`.

```text
Step 1: Look at the first 2 nodes [1, 2]. Reverse them.
Result: [2, 1] ...

Step 2: Look at the next 2 nodes [3, 4]. Reverse them.
Result: [2, 1] -> [4, 3] ...

Step 3: Look at the next 2 nodes. There is only [5] left. 
Since 1 < k, leave it as is.
Final Result: [2, 1, 4, 3, 5]
```

---

### 2. Solution Explanation

To solve this like a senior engineer, we use a **Dummy Node** to simplify the start and a **GroupPrev** pointer to keep track of the node immediately before the group we are currently reversing.

#### The Sub-Problem: "Reverse a specific range"

Before moving forward, you must understand how to reverse a small segment. If we have `A -> B -> C`, and we want to reverse `A` and `B`, we are essentially doing a "hand-off": 
1. Save `C`.
2. Make `B` point to `A`.
3. Make `A` point to `C`.

#### The Macro-Step Strategy:
1. **Find the Kth node:** Check if there are even `k` nodes left. If not, we are done.
2. **Isolate the group:** Identify the node *before* the group (`groupPrev`) and the node *after* the group (`nextGroup`).
3. **Reverse:** Reverse the `k` nodes.
4. **Reconnect:** Connect `groupPrev` to the new head of the reversed group, and connect the new tail of the reversed group to `nextGroup`.
5. **Shift:** Move `groupPrev` to the tail of the group we just reversed.

#### ASCII Diagram Walkthrough: `k=3`, `List: 1->2->3->4->5`

**Initial State:**
```text
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  ^      ^         ^
gp(L)   curr      kth
```
* `gp` (groupPrev) is at Dummy.
* We count `k` nodes and find `kth` is node `3`.
* `nextGroup` is node `4`.

**During Reversal (of 1, 2, 3):**
The internal pointers are flipped. `3` now points to `2`, `2` points to `1`.
```text
          +-----------+
          |           v
Dummy     3 -> 2 -> 1   4 -> 5 -> null
  ^       ^         ^   ^
  gp     kth      tail nextGroup
```

**After Reconnection:**
We must connect `gp.next` to `kth` (which is 3) and `tail.next` to `nextGroup` (which is 4).
```text
Dummy -> 3 -> 2 -> 1 -> 4 -> 5 -> null
                   ^    ^
                 tail  nextGroup
```

**Shift for next iteration:**
Now, our `groupPrev` becomes node `1`. We look for the next `k` nodes starting from node `4`.
```text
Dummy -> 3 -> 2 -> 1 -> 4 -> 5 -> null
                   ^    ^
                 new gp curr
```
We try to find the `kth` node after `1`. We count 4, 5... but then we hit `null`. We only found 2 nodes. Since 2 < 3, we stop.

---

### 3. Time and Space Complexity Analysis

```text
+-----------------------------------------------------------------------+
| TIME COMPLEXITY: O(N)                                                 |
+-----------------------------------------------------------------------+
| N = Total number of nodes in the list.                                |
|                                                                       |
| 1. Finding kth node: We traverse each node once per group.            |
| 2. Reversing nodes: We flip the pointers for each node once.          |
|                                                                       |
| Each node is visited exactly twice:                                   |
|   Once to check if the group is long enough.                          |
|   Once to perform the pointer reversal.                               |
|                                                                       |
| TOTAL: 2 * N operations  =======>  O(N)                               |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| SPACE COMPLEXITY: O(1)                                                |
+-----------------------------------------------------------------------+
| 1. We only use a few pointer variables (dummy, gp, kth, curr, prev).  |
| 2. No recursion is used (iterative approach).                         |
| 3. No auxiliary data structures (like arrays or stacks) are used.     |
|                                                                       |
| TOTAL: Constant space  =======>  O(1)                                 |
+-----------------------------------------------------------------------+
```

---

### 4. Solution Code

**Python Snippet**
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseKGroup(head, k):
    dummy = ListNode(0, head)
    groupPrev = dummy

    while True:
        # 1. Find the kth node of the current group
        kth = getKth(groupPrev, k)
        if not kth:
            break
        nextGroup = kth.next

        # 2. Reverse the group
        # We start with 'curr' at the first node of the group
        # and 'prev' at the node after the group
        prev, curr = kth.next, groupPrev.next
        
        # Standard reversal logic for k iterations
        for _ in range(k):
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp

        # 3. Reconnect
        # Save the node that will become the new groupPrev (the old head)
        tmp = groupPrev.next
        groupPrev.next = kth
        groupPrev = tmp
        
    return dummy.next

# Helper function to find the kth node after a given node
def getKth(curr, k):
    while curr and k > 0:
        curr = curr.next
        k -= 1
    return curr
```

**JavaScript Snippet**
```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

var reverseKGroup = function(head, k) {
    let dummy = new ListNode(0, head);
    let groupPrev = dummy;

    while (true) {
        let kth = getKth(groupPrev, k);
        if (!kth) break;
        
        let nextGroup = kth.next;

        // Start of the actual reversal process
        // 'prev' starts at the beginning of the NEXT group
        // 'curr' starts at the beginning of the CURRENT group
        let prev = kth.next;
        let curr = groupPrev.next;

        for (let i = 0; i < k; i++) {
            let tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        // Connect the groupPrev to the new head of the reversed group
        let tmp = groupPrev.next;
        groupPrev.next = kth;
        // Move groupPrev to the tail of the just-reversed group
        groupPrev = tmp;
    }

    return dummy.next;
};

function getKth(curr, k) {
    while (curr && k > 0) {
        curr = curr.next;
        k--;
    }
    return curr;
}
```

---

### Note 1: Terminology and Techniques

* **Dummy Node:** We use this so that the `head` of the list doesn't need special treatment. If the first `k` nodes are reversed, the `dummy.next` will automatically point to the new head.
* **In-place Reversal:** This is the act of reversing the list by only changing `next` pointers. It is the gold standard for memory efficiency.
* **Bookkeeping:** In hard linked-list problems, "bookkeeping" refers to saving pointers (like `nextGroup`) before you overwrite them, so you don't lose access to the rest of the list.

---

### Note 2: Real-World Interview Variations

**1. Google: "Reversing Streamed Data Packets"**
* **Scenario:** Data packets arrive in a stream. You need to process them in chunks of `k`. If a chunk is complete, reverse the processing order for security/validation. If the last chunk is incomplete, keep it as is until more data arrives.
* **Solution:** You would use the `k-group` logic. Since the data is a stream (linked list structure), you only trigger the reversal function once your "counter" hits `k`.

**2. Meta: "Friend Suggestion Chain Shuffle"**
* **Scenario:** You have a list of suggested friends. To avoid bias, you want to reverse the order of every 5 people in the list, but if there are fewer than 5 at the end, leave them in the order they were ranked.
* **Solution:** This is exactly LC 25 with `k=5`. The focus here is on ensuring the "ranking" (the original pointers) is preserved for the tail end of the list.

**3. Bloomberg: "Trade Batch Reversal"**
* **Scenario:** A series of trades are logged. For a specific regulatory audit, trades must be grouped into batches of size `k` and reversed within those batches to check for specific arbitrage patterns.
* **Solution:** Using the iterative O(1) space solution is vital here because Bloomberg handles massive volumes of trade data. An O(N) space solution would risk a memory overflow if the trade list is millions of nodes long.

# 92. Reverse Linked List II

In a high-level interview at Google or Meta, "Reverse Linked List II" is a test of your **pointer management** and ability to handle **sub-segment manipulation** without losing data. 

While reversing a whole list is a "standard" task, reversing a middle portion requires surgical precision. An L5/L6 engineer doesn't just "move nodes"; they identify the specific "hinge" nodes that keep the list from falling apart.

---

### 1. Problem Explanation

**The Goal:** Given the head of a singly linked list and two integers `left` and `right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.

**The Constraints:**
* You must do it in one pass.
* You should not just swap values; you must change the actual pointers (links).

**Visualizing the Target:**
Input: `1 -> 2 -> 3 -> 4 -> 5`, `left = 2`, `right = 4`

```text
BEFORE:
(1) -> [ (2) -> (3) -> (4) ] -> (5)
 ^        ^           ^          ^
Head    Left        Right       Tail

AFTER:
(1) -> [ (4) -> (3) -> (2) ] -> (5)
```

**The "Hard" Part:**
If we simply reverse the middle, we end up with three disconnected pieces:
1. The prefix: `(1)`
2. The reversed chunk: `(4 -> 3 -> 2)`
3. The suffix: `(5)`
We must ensure we keep track of the node *before* the reverse starts and the node *at the start* of the reverse (which becomes the new end of that section).

---

### 2. Solution Explanation



#### The "Surgical" Strategy: Three-Step Reversal

We use a **Dummy Node** to handle the edge case where `left = 1` (reversing from the very start).

**Step 1: Reach the Hinge**
Move a pointer (`prev`) to the node immediately before the reversal zone.
```text
Dummy -> (1) -> (2) -> (3) -> (4) -> (5)
  ^       ^
 prev    curr (at left position)
```

**Step 2: The "Leapfrog" Reversal**
Instead of a traditional reversal, we use a technique where we "pluck" the node after our `curr` node and move it to the front of the reversed section. 

* `curr` stays the same node throughout (it just slides further right).
* `then` is the node we are moving.

**Detailed Step-by-Step for `2 -> 3 -> 4`:**

```text
Initial (left=2, right=4):
(1) -> (2) -> (3) -> (4) -> (5)
 P      C      T
(P=prev, C=curr, T=then)

Iteration 1: Move (3) to the front of (2)
1. C.next = T.next (2 points to 4)
2. T.next = P.next (3 points to 2)
3. P.next = T      (1 points to 3)

Result 1:
(1) -> (3) -> (2) -> (4) -> (5)
 P             C      T

Iteration 2: Move (4) to the front of (3)
1. C.next = T.next (2 points to 5)
2. T.next = P.next (4 points to 3)
3. P.next = T      (1 points to 4)

Final Result:
(1) -> (4) -> (3) -> (2) -> (5)
```

**Why this is elegant:** We don't need a separate "reverse" function. We simply "leapfrog" nodes one by one.

---

### 3. Time and Space Complexity Analysis

```text
========================================================================
TIME COMPLEXITY: O(N)
========================================================================
Derivation Diagram:

[ (1) -> (2) -> (3) -> (4) -> (5) ]
   |      |      |      |      |
   v      v      v      v      v
 (Step 1: Move to 'left')
 (Step 2: Loop from 'left' to 'right')

Total nodes visited = exactly N.
Each node is processed at most once.
Inside the loop, all pointer assignments are O(1).

Total Time = N * O(1) = O(N).

========================================================================
SPACE COMPLEXITY: O(1)
========================================================================
Derivation Diagram:

Memory usage:
- dummy: Pointer
- prev:  Pointer
- curr:  Pointer
- then:  Pointer

Total pointers = 4.
Whether the list has 5 nodes or 5 million nodes, 
we only ever use these 4 pointers.
No extra arrays or recursion stacks are used.

Total Space = O(1).
========================================================================
```

---

### 4. Solution Code

#### Python

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseBetween(head: ListNode, left: int, right: int) -> ListNode:
    if not head or left == right:
        return head
    
    # Use a dummy node to simplify cases where left = 1
    dummy = ListNode(0)
    dummy.next = head
    pre = dummy
    
    # Step 1: Move 'pre' to the node just before the reversal section
    for _ in range(left - 1):
        pre = pre.next
    
    # 'start' is the first node of the section to be reversed
    # 'then' is the node that will be moved to the front
    start = pre.next
    then = start.next
    
    # Step 2: The Leapfrog Reversal
    # We perform (right - left) swaps
    for _ in range(right - left):
        # 1. Connect 'start' to the node after 'then' (skipping 'then')
        start.next = then.next
        # 2. Point 'then' to the current front of the reversed section
        then.next = pre.next
        # 3. Connect 'pre' to 'then' (making 'then' the new front)
        pre.next = then
        # 4. Update 'then' to the next node to be moved
        then = start.next
        
    return dummy.next
```

#### JavaScript

```javascript
function reverseBetween(head, left, right) {
    if (!head || left === right) return head;

    const dummy = { val: 0, next: head };
    let pre = dummy;

    // Step 1: Reach the hinge
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }

    let start = pre.next;
    let then = start.next;

    // Step 2: Leapfrog Reversal
    for (let i = 0; i < right - left; i++) {
        // Connect start to the node after then
        start.next = then.next;
        // Move then to the front of the sub-list
        then.next = pre.next;
        // Fix the hinge connection
        pre.next = then;
        // Advance then
        then = start.next;
    }

    return dummy.next;
}
```

---

### Note 1: Terms and Techniques

* **Dummy Node:** A placeholder node created at the beginning of a linked list. It ensures that the `head` of the list can be treated just like any other node, preventing `null pointer` errors when `left = 1`.
* **Pointer Re-assignment:** The process of changing the `next` attribute of a node. It is the fundamental way to "move" items in a linked list without creating new objects in memory.

---

### Note 2: Real-World & Interview Variations

**1. Google: "Reverse Nodes in k-Group" (LeetCode 25)**
* **The Problem:** Reverse the list in blocks of size `k`.
* **The Solution:** This is "Reverse Linked List II" on loop. You count if `k` nodes exist; if they do, you apply the reversal logic we used here, then move your `pre` pointer to the end of that reversed block and repeat.

**2. Meta: "Add Two Numbers as Lists" (LeetCode 2)**
* **The Problem:** Represent numbers as linked lists and add them.
* **The Solution:** While not a direct reversal, Meta often asks you to reverse the *result* or reverse the *inputs* first if they are provided in a non-standard order (like most-significant digit first).

**3. Bloomberg: "Palindrome Linked List" (LeetCode 234)**
* **The Problem:** Check if a linked list is a palindrome.
* **The Solution:** Use the "Slow/Fast Pointer" technique to find the middle. Then, **reverse the second half** of the list (using the logic from this problem). Finally, compare the first half and the reversed second half node-by-node.

# 86. Partition List

An L5 (Senior) or L6 (Staff) engineer at Google doesn't view this as a "shuffling" problem. They view it as a **Stream Processing** problem. The goal is to avoid complex swaps and instead "filter" the single input stream into two separate buckets, then merge them back together. 

This approach is more robust because it maintains the **Relative Order** of nodes, which is a key requirement of the problem that many candidates miss.

---

### 1. Problem Explanation

**The Goal:**
You are given a linked list and a value `x`. You must rearrange the list so that all nodes with values **less than** `x` come before nodes with values **greater than or equal to** `x`.

**The Strict Constraint:**
You **must** preserve the original relative order of the nodes in each of the two partitions. 
*Example:* If the list is `[2, 1]` and `x = 2`, the `1` must stay *after* the `2`? No, the `1` (less than 2) must move to the front, but if you had `[1, 0]` and `x = 2`, the `1` must still appear before the `0` in the final result.

**The "Why" this is tricky:**
In a standard array, you might use "QuickSort Partitioning" where you swap elements. However, swapping in a linked list is a nightmare of pointer management. If you just swap values, you might satisfy the "less than x" part but destroy the "relative order" part.

---

### 2. Solution Explanation

The most intuitive and "clean" engineering solution is the **Two-Queue / Two-Bucket** approach.

1.  Create two "Dummy" nodes: one for a `Small` list and one for a `Large` list.
2.  Iterate through the original list.
3.  If a node is `< x`, attach it to the `Small` list.
4.  If a node is `>= x`, attach it to the `Large` list.
5.  After the loop, connect the end of the `Small` list to the start of the `Large` list.



#### Step-by-Step Visualization
Input: `head = [1, 4, 3, 2, 5, 2]`, `x = 3`

```text
========================================================================
 INITIAL STATE
========================================================================
Original: 1 -> 4 -> 3 -> 2 -> 5 -> 2 -> NULL
          ^
          curr

Small Chain:  DummyS -> NULL
              ^
              pSmall

Large Chain:  DummyL -> NULL
              ^
              pLarge

========================================================================
 STEP 1: Process '1' (1 < 3)
========================================================================
Action: Attach to Small. Move pSmall.
Small: DummyS -> 1
                 ^ pSmall
Large: DummyL -> NULL

========================================================================
 STEP 2: Process '4' (4 >= 3)
========================================================================
Action: Attach to Large. Move pLarge.
Small: DummyS -> 1
Large: DummyL -> 4
                 ^ pLarge

========================================================================
 STEP 3: Process '3' (3 >= 3)
========================================================================
Small: DummyS -> 1
Large: DummyL -> 4 -> 3
                      ^ pLarge

========================================================================
 STEP 4: Process '2' (2 < 3)
========================================================================
Small: DummyS -> 1 -> 2
                      ^ pSmall
Large: DummyL -> 4 -> 3

========================================================================
 STEP 5: Process '5' (5 >= 3)
========================================================================
Small: DummyS -> 1 -> 2
Large: DummyL -> 4 -> 3 -> 5
                           ^ pLarge

========================================================================
 STEP 6: Process '2' (2 < 3)
========================================================================
Small: DummyS -> 1 -> 2 -> 2
                           ^ pSmall
Large: DummyL -> 4 -> 3 -> 5

========================================================================
 FINAL MERGE: Connect Small to Large
========================================================================
1. IMPORTANT: Set pLarge.next = NULL 
   (Otherwise, the last node '5' might still point to '2', creating a cycle!)
   
2. Connect: pSmall.next = DummyL.next (the first real node of Large)

Result: 1 -> 2 -> 2 -> 4 -> 3 -> 5 -> NULL
```

---

### 3. Time and Space Complexity Analysis

Let N be the number of nodes in the Linked List.

```text
TIME COMPLEXITY DERIVATION: Order of N
--------------------------------------------------------------
Operation: 
We traverse the input list exactly once from head to tail.
Inside the loop, we perform:
  - Comparison (if val < x)      ---> Order of 1
  - Pointer assignment           ---> Order of 1
  - Move current pointer         ---> Order of 1

Total Time = N nodes * Order of 1
Total Time = Order of N


SPACE COMPLEXITY DERIVATION: Order of 1
--------------------------------------------------------------
Crucial Insight: 
We are NOT creating new nodes. We are simply taking existing 
nodes and changing their '.next' pointers to point to 
different neighbors. 

We only created:
  - 2 Dummy Nodes                ---> Constant
  - 4 Pointer variables          ---> Constant

Since the memory used for pointers does not grow as the 
list gets longer:
Total Space = Order of 1 (Constant)
```

---

### 4. Solution Code

#### Python Implementation

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def partition(head, x):
    # Two dummy nodes act as the 'heads' of our two new chains
    # This prevents having to check 'if head is None' constantly
    before_head = ListNode(0)
    after_head = ListNode(0)
    
    # These pointers will move as we add nodes to the chains
    before = before_head
    after = after_head
    
    curr = head
    while curr:
        if curr.val < x:
            # Attach the CURRENT node to the 'before' chain
            before.next = curr
            before = before.next
        else:
            # Attach the CURRENT node to the 'after' chain
            after.next = curr
            after = after.next
        
        # Move to the next node in the original list
        curr = curr.next
    
    # CRITICAL STEP: The last node in the 'after' chain might 
    # still point to a node that moved to the 'before' chain.
    # We must cut this link to avoid a cycle in the list.
    after.next = None
    
    # Connect the end of the 'before' chain to the start of the 'after' chain
    before.next = after_head.next
    
    return before_head.next
```

#### JavaScript Implementation

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // Initialize dummy heads
    let beforeHead = new ListNode(0);
    let afterHead = new ListNode(0);
    
    // Pointers for current tail of each list
    let before = beforeHead;
    let after = afterHead;
    
    let curr = head;
    while (curr !== null) {
        if (curr.val < x) {
            before.next = curr;
            before = before.next;
        } else {
            after.next = curr;
            after = after.next;
        }
        curr = curr.next;
    }
    
    // Terminate the 'after' list to prevent cycles
    after.next = null;
    
    // Combine the two lists
    before.next = afterHead.next;
    
    return beforeHead.next;
};
```

---

### Note 1: Terminology and Techniques

* **Sentinel / Dummy Nodes:** These are extra nodes used at the beginning of a list. They are never meant to hold data; they just provide a fixed "handle" to point to the start of a list. This is an L5/L6 favorite because it eliminates "if/else" logic for empty lists or inserting at the head.
* **Pointer Re-wiring:** Instead of copying data, we move the actual objects. This is the difference between a Junior (copying values to a new list) and a Senior (moving the actual nodes to save memory).

---

### Note 2: Real-World Interview Variations

**1. Variation: Sort a Linked List that only contains 0s, 1s, and 2s (Google)**
* **The Twist:** You have a list like `[2, 1, 0, 2, 1]`. Sort it in one pass.
* **How to solve:** Use **Three** dummy nodes (`zeroHead`, `oneHead`, `twoHead`). As you iterate, attach nodes to their respective bucket. At the end, link `zeros -> ones -> twos`.

**2. Variation: Rearrange List around a Pivot (Bloomberg)**
* **The Twist:** Similar to Partition, but the pivot value `x` must be placed *exactly* between the smaller and larger values if it exists in the list.
* **How to solve:** Use **Three** buckets: `Small`, `Equal`, and `Large`. This ensures that all instances of `x` are grouped together in the middle.

**3. Variation: Odd-Even Linked List (Meta)**
* **The Twist:** Group all nodes at odd *indices* together followed by nodes at even *indices* (not values).
* **How to solve:** Same technique! Maintain an `Odd` pointer and an `Even` pointer. In each step, skip a node to link odd to odd and even to even.

---
**Follow-up Question:** We solved this by using extra pointers but keeping the original nodes. If the list was stored in a "read-only" memory where you couldn't change `.next` pointers, how would that change your space complexity requirements?

# 138. Copy List with Random Pointer

This is a classic "Deep Copy" problem. An L5/L6 engineer at Google wouldn't just solve this with a Hash Map; they would highlight the **Interweaving Strategy**. This strategy is the "gold standard" because it achieves the copy in constant extra space (excluding the output itself), which is a major win for memory-constrained systems.

---

### 1. Problem Explanation

**The Challenge:**
You are given a linked list where each node has two pointers:
1.  `next`: Points to the next node in the sequence (Standard).
2.  `random`: Points to any node in the list, or `null`.

If you try to copy the list in one pass, you will run into a "chicken and egg" problem. 
*Example:* Node A's `random` points to Node C. But when you are creating the copy of Node A, Node C doesn't exist yet!

**The Goal:**
Create a "Deep Copy." This means the new list must be a entirely separate set of objects in memory, but with the exact same structure and values as the original.

---

### 2. Solution Explanation

We will use the **Interweaving Strategy**. Instead of using a Hash Map to remember which old node corresponds to which new node, we will physically "stitch" the new nodes into the original list.

#### Phase 1: Interweave
For every node in the original list, create a copy and place it immediately after the original.



```text
ORIGINAL: [A] -> [B] -> [C]

INTERWEAVED:
[A] -> [A'] -> [B] -> [B'] -> [C] -> [C']
 ^      ^       ^      ^       ^      ^
old    copy    old    copy    old    copy
```

#### Phase 2: Connect Random Pointers
Now, for any original node `curr`, its copy is `curr.next`.
The original `curr.random` points to some node `X`. 
Therefore, the copy's random (`curr.next.random`) should point to `X.next` (which is the copy of `X`).

#### Phase 3: Separate the Lists
We un-stitch the lists to restore the original and extract our perfect copy.

---

**Step-by-Step ASCII Visualization:**

```text
INPUT:
Node A (random -> C)
Node B (random -> A)
Node C (random -> B)

========================================================================
PHASE 1: INTERWEAVE (Create copies and insert them)
========================================================================
Original: A -> B -> C -> NULL

1. Create A', insert after A:
   A -> A' -> B -> C

2. Create B', insert after B:
   A -> A' -> B -> B' -> C

3. Create C', insert after C:
   A -> A' -> B -> B' -> C -> C' -> NULL

========================================================================
PHASE 2: SET RANDOM POINTERS
========================================================================
Look at A. A.random is C. 
So, A's copy (A') should have its random point to C's copy (C').

Logic: curr.next.random = curr.random.next

Diagram:
(A).random = C  ==>  (A').random = (C')
(B).random = A  ==>  (B').random = (A')
(C).random = B  ==>  (C').random = (B')

========================================================================
PHASE 3: SEPARATE (The "Un-zipper")
========================================================================
We need to turn:
A -> A' -> B -> B' -> C -> C'

Back into:
Original: A -> B -> C
Copy:     A' -> B' -> C'

We do this by updating the .next pointers:
A.next = B
A'.next = B'
...and so on.
```

---

### 3. Time and Space Complexity Analysis

```text
TIME COMPLEXITY: O(N)
--------------------------------------------------------------
Phase 1: Iterate N nodes to create copies  ---> O(N)
Phase 2: Iterate N nodes to set randoms    ---> O(N)
Phase 3: Iterate N nodes to separate       ---> O(N)

Total Time = O(N) + O(N) + O(N)
Final = O(N) (Linear Time)


SPACE COMPLEXITY: O(1)
--------------------------------------------------------------
Note: We do not count the memory of the new list itself, 
as that is the required output.

- Hash Map Approach: Uses O(N) extra space to store 
  mappings of {OldNode: NewNode}.
- Interweaving Approach: Uses NO extra data structures.
  We use the original list's .next pointers to store 
  the relationship temporarily.

Total Extra Space = O(1) (Constant Space)
```

---

### 4. Solution Code

#### Optimized Solution: Interweaving (Approach B)

```python
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

def copyRandomList(head):
    if not head:
        return None

    # PHASE 1: Create interleaved copies
    curr = head
    while curr:
        # Create a new node with the same value
        new_node = Node(curr.val)
        # Point new_node.next to the original's next
        new_node.next = curr.next
        # Point original's next to the new_node
        curr.next = new_node
        # Move to the next ORIGINAL node
        curr = new_node.next

    # PHASE 2: Set random pointers
    curr = head
    while curr:
        if curr.random:
            # The copy's random is the original's random's next
            curr.next.random = curr.random.next
        curr = curr.next.next

    # PHASE 3: Separate the lists
    curr = head
    copy_head = head.next
    curr_copy = copy_head
    
    while curr:
        # Restore original list
        curr.next = curr.next.next
        # Link copy list
        if curr_copy.next:
            curr_copy.next = curr_copy.next.next
        
        curr = curr.next
        curr_copy = curr_copy.next
        
    return copy_head
```

```javascript
function copyRandomList(head) {
    if (!head) return null;

    // PHASE 1: Interweave
    let curr = head;
    while (curr) {
        let newNode = new Node(curr.val, curr.next, null);
        curr.next = newNode;
        curr = newNode.next;
    }

    // PHASE 2: Connect Randoms
    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // PHASE 3: Separate
    curr = head;
    let copyHead = head.next;
    let currCopy = copyHead;

    while (curr) {
        curr.next = curr.next.next;
        if (currCopy.next) {
            currCopy.next = currCopy.next.next;
        }
        curr = curr.next;
        currCopy = currCopy.next;
    }

    return copyHead;
}
```

---

### Note 1: Terminology and Techniques

* **Deep Copy:** Creating a duplicate of a structure where the new structure does not share any memory addresses with the original. Modifying the copy should never affect the original.
* **Interweaving:** A technique to establish a relationship between two sets of data without using an external Hash Map. By placing the "answer" inside the "problem," we use the existing structure as temporary memory.

---

### Note 2: Real-World / Interview Variations

**1. Copy a Graph with Neighbors (Meta / Google)**
* **The Context:** You have a Graph where each node has a list of neighbors.
* **How to solve:** Unlike a list, you can't "interweave" a complex graph easily. Here, the L5 engineer uses a **Hash Map + DFS/BFS**. The Hash Map stores `original_node: copied_node`. If you encounter a neighbor you've already copied, you just link it. If not, you create it and add it to the map.

**2. Serialization of Object Trees (Bloomberg)**
* **The Context:** How do you save an object to a file if it has "circular references" (e.g., A points to B, B points back to A)?
* **How to solve:** This is the real-world version of the Random Pointer. You use a "Seen" set or map. When serializing, if you see an object you've already processed, you write a "Reference ID" instead of the whole object again. This prevents infinite loops.

**3. Cloning a Git Repository (Systems/Google)**
* **The Context:** How do you efficiently copy a project that has many pointers to shared "blobs" of data?
* **How to solve:** This relates to **Copy-on-Write (CoW)**. Instead of doing a deep copy immediately, the system lets both "lists" point to the same data. Only when someone tries to *change* a node do you actually perform the "Deep Copy" for that specific node. This is how high-performance systems save massive amounts of memory.


# Data Structures To Know For Interviews

# Stack 

A **Stack** is one of the most fundamental data structures in computer science. If you’ve ever stacked a pile of cafeteria trays or used the "Undo" button in a text editor, you’ve already interacted with a stack in the real world.

---

## 1. What is it?

A Stack is a **linear data structure** that follows a very specific order for adding and removing elements: **LIFO (Last-In, First-Out)**.

Imagine a stack of physical plates.

* You put a new plate on the **top**.
* When you need a plate, you take the one from the **top**.
* You cannot (safely) take a plate from the middle or bottom without removing everything above it first.

---

## 2. When would we use it?

Stacks are the go-to choice whenever you need to "remember" where you were or reverse an order of operations. Common use cases include:

* **Function Calls (The Call Stack):** How your computer knows which function to return to after a nested function finishes.
* **Undo/Redo Mechanisms:** Storing the last action so it can be reversed first.
* **Expression Evaluation:** Converting math like `(1 + 2) * 3` into something a computer can calculate.
* **Backtracking:** In a maze or a game, if you hit a dead end, you "pop" your last move to go back one step.

---

## 3. Important Properties for Interviews

If you are in a technical interview, these are the "must-know" concepts:

* **LIFO:** Always mention "Last-In, First-Out."
* **Limited Access:** You only ever care about the **Top**. Accessing the bottom element is not what a stack is designed for (that would be O(n) time).
* **Overflow vs. Underflow:** * **Overflow:** Trying to push into a full stack (mostly relevant in languages with fixed memory).
* **Underflow:** Trying to pop from an empty stack.


* **Pointer-based:** In a low-level sense, a stack is often just an array with a "pointer" (an index variable) that tracks the top.

---

## 4. Sample Usage Walkthrough

Let's trace a stack as we perform a few operations: `Push(10)`, `Push(20)`, `Pop()`, `Push(30)`.

**Step 1: Push(10)**
The stack is empty. 10 goes to the bottom (which is also the top).

```
|    |
| 10 | <-- Top
+----+

```

**Step 2: Push(20)**
20 sits on top of 10.

```
| 20 | <-- Top
| 10 |
+----+

```

**Step 3: Pop()**
We remove the top element (20).

```
|    |
| 10 | <-- Top
+----+

```

**Step 4: Push(30)**
30 sits on top of 10.

```
| 30 | <-- Top
| 10 |
+----+

```

---

## 5. Code Sample (JavaScript)

In JavaScript, the built-in `Array` already has `.push()` and `.pop()` methods that behave exactly like a stack. However, for an interview, showing you understand the class structure is better.

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  // Add an element to the top
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow: Stack is empty";
    }
    return this.items.pop();
  }

  // Look at the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  // Helper to check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the size of the stack
  size() {
    return this.items.length;
  }
}

// Usage:
const myStack = new Stack();
myStack.push(5);
myStack.push(15);
console.log(myStack.peek()); // Output: 15
console.log(myStack.pop());  // Output: 15
console.log(myStack.peek()); // Output: 5

```

---

## 6. ADT and Complexity

The **Abstract Data Type (ADT)** defines what operations we can do, regardless of how they are coded.

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Push** | Add item to top | O(1) | O(1) |
| **Pop** | Remove item from top | O(1) | O(1) |
| **Peek/Top** | View item at top | O(1) | O(1) |
| **isEmpty** | Check if empty | O(1) | O(1) |

### Why O(1)? (ASCII Derivation)

In an array-based stack, we keep track of the index of the "Top."

```
Index:  0    1    2    3    4
Array: [10, 20, 30, null, null]
                ^
               Top = Index 2

```

To **Push(40)**, we don't move any old elements. We just go to `index 3` (Top + 1) and put 40 there. This takes one single step, regardless of whether the stack has 5 items or 5 million items. Hence, **O(1) Constant Time**.

To **Pop()**, we just decrease the "Top" pointer to Index 2. We don't have to erase the data; we just "forget" it exists. This is also **O(1)**.

---

## 7. Common Variations and Tweaks

Interviews rarely ask you to "just build a stack." They ask for variations.

### Variation A: The "Min-Stack"

**The Problem:** Build a stack where you can get the minimum value in the entire stack in O(1) time.
**The Tweak:** Use a **second "auxiliary" stack** to keep track of the minimums at every level.

```javascript
// Inside Push(val)
if (val <= minStack.peek()) {
    minStack.push(val);
}

// Inside Pop()
if (poppedValue === minStack.peek()) {
    minStack.pop();
}

```

### Variation B: Balanced Parentheses

**The Problem:** Given `({[]})`, is it valid?
**The Tweak:** Push opening brackets onto the stack. When you see a closing bracket, Pop from the stack and check if it matches. If the stack is empty at the end, it's valid.

### Variation C: Monotonic Stack

**The Problem:** Find the "Next Greater Element" for every item in an array.
**The Tweak:** Maintain a stack where elements are always in sorted order (decreasing or increasing). If a new element breaks the order, start Popping until the order is restored.

```javascript
// Logic for Next Greater Element
while (stack.length > 0 && currentElement > stack.peek()) {
    let index = stack.pop();
    result[index] = currentElement;
}
stack.push(currentIndex);

```

# Queue

If the **Stack** is a pile of plates, the **Queue** is a line at a grocery store. It is the most "polite" data structure because it follows a strict rule: whoever gets there first, gets served first.

---

## 1. What is it?

A Queue is a **linear data structure** that follows the **FIFO (First-In, First-Out)** principle.

Think of a physical tunnel:

* You enter from one end (the **Rear** or **Back**).
* You leave from the other end (the **Front**).
* The first person to enter the tunnel is the first person to come out the other side.

---

## 2. When would we use it?

Queues are essential whenever things need to happen in order, but the system can't process them all at once.

* **Breadth-First Search (BFS):** This is the most common interview use case. You explore all neighbors of a node before moving to the next level.
* **Printer Tasks:** If five people send a document to a printer, the printer processes the first one received first.
* **Web Server Requests:** Handling incoming traffic so no request is ignored.
* **Task Scheduling:** Your CPU uses queues to decide which background process to run next.

---

## 3. Important Properties for Interviews

* **FIFO:** First-In, First-Out.
* **Two Ends:** Unlike a stack (which only has a "Top"), a queue has a **Front** (where you remove) and a **Rear** (where you add).
* **Enqueue vs. Dequeue:** These are the fancy names for "Add" and "Remove."
* **The Array Trap:** In interviews, be careful! Using `array.shift()` in JavaScript to remove the first element is actually slow (O(n)) because every other element has to slide over one spot. A "True" queue uses pointers or a Linked List to stay fast (O(1)).

---

## 4. Sample Usage Walkthrough

Let's trace: `Enqueue(A)`, `Enqueue(B)`, `Dequeue()`, `Enqueue(C)`.

**Step 1: Enqueue(A)**
A is both the Front and the Rear.

```
Front --> [ A ] <-- Rear

```

**Step 2: Enqueue(B)**
B enters behind A.

```
Front --> [ A ] [ B ] <-- Rear

```

**Step 3: Dequeue()**
We remove from the Front. A leaves.

```
          [   ] [ B ] 
                  ^
            Front & Rear

```

**Step 4: Enqueue(C)**
C enters behind B.

```
Front --> [ B ] [ C ] <-- Rear

```

---

## 5. Code Sample (JavaScript)

To keep it efficient (O(1) for all operations), we will use an object and two pointers rather than just a simple array.

```javascript
class Queue {
  constructor() {
    this.items = {}; // We use an object for O(1) access
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  // Add an item to the end (Enqueue)
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }

  // Remove the item from the front (Dequeue)
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex]; // Clean up memory
    this.frontIndex++;
    return item;
  }

  // See what's at the front without removing it
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.frontIndex];
  }

  isEmpty() {
    return this.backIndex - this.frontIndex === 0;
  }
}

// Usage:
const q = new Queue();
q.enqueue("Task 1");
q.enqueue("Task 2");
console.log(q.dequeue()); // "Task 1"
console.log(q.peek());    // "Task 2"

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Enqueue** | Add to Rear | O(1) | O(1) |
| **Dequeue** | Remove from Front | O(1) | O(1) |
| **Peek** | View Front | O(1) | O(1) |
| **isEmpty** | Check if empty | O(1) | O(1) |

### Why O(1)? (ASCII Derivation)

In an efficient Queue, we don't move elements. We just move **pointers**.

```
Initial State:
Index:  0   1   2   3
Value: [A,  B,  C,  _]
        ^       ^
      Front    Back (next empty spot)

After Dequeue():
Index:  0   1   2   3
Value: [_,  B,  C,  _]
            ^   ^
          Front Back

```

The "A" isn't moved; the `Front` pointer just moves to index 1. Moving a pointer takes the same amount of time whether the queue has 10 items or 10 billion.

---

## 7. Common Variations and Tweaks

### Variation A: The Deque (Double-Ended Queue)

**The Problem:** You need to add or remove from **both** ends (Front and Back).
**The Tweak:** You add `addFront()` and `removeBack()` methods. This is often used for "Sliding Window" problems to find the max/min in a sub-section of an array.

### Variation B: Circular Queue

**The Problem:** In fixed-memory systems, once the `Back` pointer hits the end of the array, you can't add more, even if the `Front` is empty.
**The Tweak:** Use the Modulo operator `%` to wrap the pointer back to the start.

```javascript
// Moving the back index circularly
this.backIndex = (this.backIndex + 1) % this.capacity;

```

### Variation C: Priority Queue

**The Problem:** Elements aren't processed just by "first come," but by importance (e.g., an Emergency Room).
**The Tweak:** This usually involves a **Binary Heap** under the hood. Every time you `enqueue`, the element "bubbles up" to its correct position based on its priority value.

### Variation D: Queue using Stacks

**The Problem:** Implement a Queue using only two Stacks.
**The Tweak:** Use `Stack A` for enqueuing. When you need to `dequeue`, flip all elements into `Stack B`. This reverses the order, making the "bottom" of Stack A the "top" of Stack B (ready to be popped).

```javascript
// Dequeue logic
if (stackB.isEmpty()) {
    while (!stackA.isEmpty()) {
        stackB.push(stackA.pop());
    }
}
return stackB.pop();

```

# Monotonic Stack

A **Monotonic Stack** is a specialized version of the standard stack data structure. It isn’t a different "type" of object in code, but rather a specific **pattern** of using a stack to solve complex problems involving "nearest" elements.

---

## 1. What is it?

A Monotonic Stack is a stack where elements are always kept in a specific sorted order—either **strictly increasing** or **strictly decreasing**.

To maintain this order, when you want to add a new element that would break the "trend," you must first **pop** all existing elements that are in the way.

### Common Representations

* **Monotonic Increasing Stack:** Elements are ordered from smallest (at the bottom) to largest (at the top).
* *Rule:* If the new element is smaller than the top, pop until the new element is the largest.


* **Monotonic Decreasing Stack:** Elements are ordered from largest (at the bottom) to smallest (at the top).
* *Rule:* If the new element is larger than the top, pop until the new element is the smallest.



---

## 2. When would we use it?

You should think "Monotonic Stack" immediately if an interview question involves:

* **Next Greater Element:** Finding the first number to the right that is bigger than the current one.
* **Next Smaller Element:** Finding the first number to the left that is smaller.
* **Range Problems:** Problems involving boundaries, like "Largest Rectangle in a Histogram."
* **Daily Temperatures:** Any problem where you need to find the "distance" to the next day it gets warmer/colder.

---

## 3. Most Important Properties for Interviews

* **The "Pop" is the Answer:** In most problems, the moment an element is **popped** is the exact moment you've found its "Next Greater/Smaller" element.
* **Indices vs. Values:** Usually, we store the **index** of the element in the stack, not the value itself. This allows us to calculate the distance between elements.
* **Linear Time:** Even though there is a `while` loop inside a `for` loop, every element is pushed once and popped at most once. This makes it incredibly efficient.

---

## 4. Sample Usage Walkthrough

**Problem:** Find the "Next Greater Element" for each item in `[2, 1, 5]`.

**Step 1: Process 2**
Stack is empty. Push index 0 (Value 2).

```
Stack: [0] (Value: 2)
Result: [?, ?, ?]

```

**Step 2: Process 1**
Is 1 > 2? No. It doesn't break our "Decreasing" order. Push index 1 (Value 1).

```
Stack: [0, 1] (Values: 2, 1)
Result: [?, ?, ?]

```

**Step 3: Process 5**
Is 5 > 1? **Yes!** * Pop index 1 (Value 1). The Next Greater Element for 1 is 5.

* Is 5 > 2 (the new top)? **Yes!**
* Pop index 0 (Value 2). The Next Greater Element for 2 is 5.
* Push index 2 (Value 5).

```
Stack: [2] (Value: 5)
Result: [5, 5, ?]

```

---

## 5. Code Sample (JavaScript)

Here is the "Next Greater Element" logic implemented with a Monotonic Decreasing Stack.

```javascript
function nextGreaterElement(nums) {
  // Initialize result array with -1 (default if no greater element is found)
  let result = new Array(nums.length).fill(-1);
  let stack = []; // This will store indices

  for (let i = 0; i < nums.length; i++) {
    let currentVal = nums[i];

    // While stack is not empty AND current value is greater than
    // the value at the index stored at the top of the stack...
    while (stack.length > 0 && currentVal > nums[stack[stack.length - 1]]) {
      // We found the next greater element for the index on top!
      let indexToUpdate = stack.pop();
      result[indexToUpdate] = currentVal;
    }

    // Push the current index onto the stack
    stack.push(i);
  }

  return result;
}

// Example usage:
console.log(nextGreaterElement([2, 1, 2, 4, 3])); 
// Output: [4, 2, 4, -1, -1]

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Push/Process** | Iterate through the array once | O(n) | O(n) |
| **Pop** | Each element is popped at most once | O(1) avg | O(1) |
| **Total** | Entire algorithm | **O(n)** | **O(n)** |

### Complexity Derivation (ASCII)

Even though the code looks like it might be O(n^2) because of the nested loop, look at the "Life of an Element":

```
Array: [1, 2, 3, 4, 5]

Element "1": 
1. Pushed to stack  (+)
2. Popped from stack (-)
Done.

Element "2":
1. Pushed to stack  (+)
2. Popped from stack (-)
Done.

```

Total operations = **2 * N** (N pushes and N pops). In Big O, we drop the constant, leaving us with **O(n)**.

---

## 7. Variations and Tweaks

### Variation A: Next Greater Element to the LEFT

**The Change:** Simply change the direction of your `for` loop. Start from the end of the array and move to index 0, or process normally but look at the logic differently.

### Variation B: Finding the "Nearest Smaller"

**The Change:** Change the comparison operator in the `while` loop.

```javascript
// From this (Next Greater):
while (stack.length > 0 && currentVal > nums[top])

// To this (Next Smaller):
while (stack.length > 0 && currentVal < nums[top])

```

### Variation C: Circular Arrays

**The Problem:** Find the next greater element in `[5, 4, 3]`, where the next greater for 5 might be 1 if the array "wrapped around."
**The Tweak:** Run the loop twice using the modulo operator `%` to simulate a double-length array.

```javascript
for (let i = 0; i < nums.length * 2; i++) {
    let currentVal = nums[i % nums.length];
    // ... same logic ...
}

```

### Variation D: Largest Rectangle in Histogram

**The Problem:** Find the area of the largest rectangle.
**The Tweak:** Use a Monotonic Increasing stack. When you pop an element, it means you've found its right boundary (the current element) and its left boundary (the new top of the stack).

```javascript
// Calculate area on pop
let height = nums[stack.pop()];
let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
maxArea = Math.max(maxArea, height * width);

```

# Hash Set

A **Hash Set** is essentially a collection of unique items where the "math" does the work of finding things instead of you having to search through a list. Think of it like a VIP club guest list: you can't be on it twice, and the bouncer can tell instantly if you're invited without checking every name from A to Z.

---

## 1. What is it?

A Hash Set is a data structure that stores **unique** elements. It uses a **Hash Function** to turn an input (like a string or number) into a specific index in an underlying array.

### Common Representations

1. **Chaining (Hash Table with Linked Lists):** The most common "under the hood" version. If two items hash to the same index (a "collision"), they are stored in a small list at that spot.
* **When to use:** This is the standard implementation for most modern languages (like JavaScript's `Set`).


2. **Open Addressing:** If a spot is taken, the set looks for the next empty spot in the array.
* **When to use:** Used in memory-constrained systems where you want to avoid the overhead of creating linked list nodes.



---

## 2. When would we use it?

You use a Hash Set when you care about **uniqueness** and **speed**.

* **Removing Duplicates:** Given a list of 1 million emails, get only the unique ones.
* **Instant Lookups:** Checking if a username already exists in a database.
* **Finding Intersections:** Finding common friends between two social media users.
* **Graph Problems:** Keeping track of "Visited" nodes so you don't get stuck in an infinite loop.

---

## 3. Important Properties for Interviews

* **Uniqueness:** It automatically ignores duplicates. If you add "Apple" five times, the size is still 1.
* **No Order:** In its purest form, a Hash Set does **not** guarantee the order of elements. (Though some languages have "LinkedHashSets" that do).
* **O(1) average time:** This is the "magic" property. Finding an item takes the same amount of time whether there are 10 items or 10 billion.
* **Null values:** Most Hash Sets allow one `null` or `undefined` value, but check your specific language.

---

## 4. Sample Usage Walkthrough

Let's track a Hash Set as we: `Add(5)`, `Add(10)`, `Add(5)`, `Contains(10)`, `Remove(5)`.

**Step 1: Add(5)**
The Hash Function turns `5` into `Index 2`.

```
Index:  0    1    2    3
Value: [ ]  [ ]  [5]  [ ]

```

**Step 2: Add(10)**
The Hash Function turns `10` into `Index 0`.

```
Index:  0    1    2    3
Value: [10] [ ]  [5]  [ ]

```

**Step 3: Add(5)**
The set sees that `Index 2` already contains `5`. It does nothing.

```
Index:  0    1    2    3
Value: [10] [ ]  [5]  [ ]  (Size remains 2)

```

**Step 4: Contains(10)**
The set hashes `10` to `Index 0`, sees `10` is there, and returns `True` instantly.

---

## 5. Code Sample (JavaScript)

JavaScript has a built-in `Set` object that is highly optimized.

```javascript
// Initializing a new Hash Set
const myGuests = new Set();

// 1. Adding elements
myGuests.add("Alice");
myGuests.add("Bob");
myGuests.add("Alice"); // Duplicate! Will be ignored.

// 2. Checking for existence (O(1) time)
if (myGuests.has("Alice")) {
  console.log("Alice is on the list!");
}

// 3. Size of the set
console.log(myGuests.size); // Output: 2

// 4. Removing an element
myGuests.delete("Bob");

// 5. Iterating through the set
myGuests.forEach(guest => {
  console.log("Guest:", guest);
});

// 6. Clearing the set
myGuests.clear();

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Add** | Insert an item | O(1) average | O(1) |
| **Remove** | Delete an item | O(1) average | O(1) |
| **Contains** | Check if exists | O(1) average | O(1) |
| **Size** | Count of items | O(1) | O(1) |

### Why O(1)? (ASCII Derivation)

In an array, to find "X", you usually have to look at every box:
`[A, B, C, D, X] -> 5 steps`

In a Hash Set, the value "X" tells you exactly where it lives via a **Hash Function**:

```
Input "X" -> HashFunction(X) -> returns 4

Memory:
Index:  0   1   2   3   4
Data:  [ ] [ ] [ ] [ ] [X]
                        ^
            Jump directly here in 1 step!

```

The "Space Complexity" is **O(n)** because you need to store `n` items in memory, but each operation is **O(1)**.

---

## 7. Common Variations and Tweaks

### Variation A: The "Seen" Set (Two-Sum Problem)

**The Problem:** Find two numbers in an array that add up to a target.
**The Tweak:** As you walk through the array, check if the "complement" (target - current) is in your set.

```javascript
let seen = new Set();
for (let num of nums) {
    let complement = target - num;
    if (seen.has(complement)) return true;
    seen.add(num);
}

```

### Variation B: Set Intersection

**The Problem:** Find common elements between two arrays.
**The Tweak:** Convert the smaller array into a Set, then filter the second array.

```javascript
const setA = new Set(arr1);
const intersection = arr2.filter(x => setA.has(x));

```

### Variation C: Longest Consecutive Sequence

**The Problem:** Find the length of the longest sequence of numbers (e.g., 1, 2, 3, 4).
**The Tweak:** Put everything in a Set. Only start counting a sequence if `currentValue - 1` is NOT in the set (this ensures you are at the start of a potential sequence).

```javascript
if (!mySet.has(num - 1)) {
    let currentNum = num;
    while (mySet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
    }
}

```

# Hash Map

A **Hash Map** (also known as a Hash Table or Dictionary) is arguably the most powerful data structure in an interviewer's toolkit. While a Hash Set only stores unique values, a Hash Map stores **Key-Value Pairs**.

Think of it like a coat check at a theater:

* You give them your coat (**Value**).
* They give you a numbered ticket (**Key**).
* Later, you give them the ticket, and they instantly find your coat without searching every single hanger.

---

## 1. What is it?

A Hash Map is a data structure that maps keys to values. It uses a **Hash Function** to compute an index into an array of "buckets," from which the desired value can be found.

### Common Representations

1. **Chaining (Linked Lists):** The "bucket" at each index is actually a Linked List. If two keys hash to the same index (a collision), they both live in that list.
* **When to use:** This is the industry standard (used by Java, JavaScript, etc.) because it handles "crowded" maps gracefully.


2. **Open Addressing (Probing):** If a collision occurs, the map looks for the next available empty slot in the array.
* **When to use:** Good for systems with very limited memory where the overhead of Linked List pointers is too expensive.



---

## 2. When would we use it?

If you need to look something up by a name, ID, or any unique identifier in "constant time," you need a Hash Map.

* **Counting Frequencies:** Counting how many times each word appears in a book.
* **Caching/Memoization:** Storing the results of expensive calculations so you don't have to redo them.
* **Database Indexing:** Finding a user's record instantly using their email address.
* **Grouping Data:** Categorizing a list of products by their category name.

---

## 3. Important Properties for Interviews

* **Unique Keys:** You can have many different values, but keys must be unique. Adding a value to an existing key usually overwrites the old value.
* **O(1) Average Time:** Search, Insert, and Delete are all lightning-fast on average.
* **The "Collisions" Talk:** Interviewers love to ask, "What happens if two keys hash to the same spot?" Be ready to explain **Chaining**.
* **Space-Time Tradeoff:** Hash Maps are fast because they use extra memory to prevent collisions.

---

## 4. Sample Usage Walkthrough

Let's store phone numbers: `Put("Sam", "555-01")`, `Put("Alex", "555-02")`, `Get("Sam")`.

**Step 1: Put("Sam", "555-01")**

1. The Hash Function turns "Sam" into `Index 1`.
2. We store `("Sam", "555-01")` at Index 1.

```
Index:    0          1           2
Buckets: [ ] -> [Sam: 555-01] -> [ ]

```

**Step 2: Put("Alex", "555-02")**

1. The Hash Function turns "Alex" into `Index 0`.
2. We store `("Alex", "555-02")` at Index 0.

```
Index:        0               1           2
Buckets: [Alex: 555-02] -> [Sam: 555-01] -> [ ]

```

**Step 3: Get("Sam")**

1. The system hashes "Sam" again. It gets `Index 1`.
2. It jumps straight to Index 1 and sees the value "555-01". **No searching required.**

---

## 5. Code Sample (JavaScript)

In JavaScript, the `Map` object is the standard implementation. Note: Standard Objects `{}` can act as maps but `Map` is better for frequent additions/removals.

```javascript
// Create the Map
const userAges = new Map();

// 1. Adding/Updating (Put) - O(1)
userAges.set("Alice", 25);
userAges.set("Bob", 30);
userAges.set("Alice", 26); // Overwrites 25 with 26

// 2. Retrieving (Get) - O(1)
console.log(userAges.get("Alice")); // 26

// 3. Checking for a key - O(1)
if (userAges.has("Bob")) {
  console.log("Bob is in the system");
}

// 4. Deleting - O(1)
userAges.delete("Bob");

// 5. Iterating
for (let [name, age] of userAges) {
  console.log(name + " is " + age + " years old.");
}

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Put (Insert)** | Add key-value pair | O(1) average | O(1) |
| **Get (Search)** | Find value by key | O(1) average | O(1) |
| **Delete** | Remove key-value pair | O(1) average | O(1) |

### Why is it O(1)? (ASCII Derivation)

Normally, finding a name in a list requires a loop:
`[Bob, Joe, Sam, Ann] -> Loop until you hit Sam.`

In a Hash Map, the key **is** the address.

```
Key: "Sam" 
      |
[ Hash Function ] 
      |
      V
    Index 2

Array: [ (0), (1), (2), (3) ]
                    |
                    V
              Jump directly here!

```

Even if the array has a billion slots, the math calculation (the Hash Function) takes the same amount of time.

> **Note on Worst Case:** In the rare event that **every single key** hashes to the same index (a "Collision Disaster"), the time complexity drops to **O(n)** because you end up searching a long Linked List.

---

## 7. Common Variations and Tweaks

### Variation A: Frequency Map (The "Counter")

**The Problem:** Find the most frequent character in a string.
**The Tweak:** Use the character as the key and the count as the value.

```javascript
let counts = new Map();
for (let char of str) {
    counts.set(char, (counts.get(char) || 0) + 1);
}

```

### Variation B: Grouping Anagrams

**The Problem:** Group words like "eat", "tea", and "ate" together.
**The Tweak:** Sort the letters of the word to create a "normalized" key. Use that key to store an array of words.

```javascript
let groups = new Map(); // Key: "aet", Value: ["eat", "tea", "ate"]
let sorted = word.split('').sort().join('');
if (!groups.has(sorted)) groups.set(sorted, []);
groups.get(sorted).push(word);

```

### Variation C: LRU Cache (Least Recently Used)

**The Problem:** A map that "forgets" the oldest items when it gets too full.
**The Tweak:** Combine a **Hash Map** (for fast lookup) with a **Doubly Linked List** (to track the order of usage).

```javascript
// On 'get' or 'put':
// 1. Find node in Map O(1)
// 2. Move node to front of Linked List O(1)

```

### Variation D: Subarray Sum Equals K

**The Problem:** Find how many continuous parts of an array add up to a specific number.
**The Tweak:** Store "Prefix Sums" in the map. This allows you to look back in time and see if a previous sum exists that, when subtracted from the current total, equals K.

# Singly Linked List

A **Singly Linked List** is a linear data structure that looks like a chain. Unlike an array, where all items sit together in one big block of memory, a Linked List is made of separate "links" (called **Nodes**) scattered throughout memory, connected by "pointers."

---

## 1. What is it?

A Singly Linked List is a collection of **Nodes**. Each node contains two things:

1. **Data:** The value you want to store (a number, string, etc.).
2. **Next:** A pointer (reference) to the next node in the sequence.

The list starts at a pointer called the **Head** and ends when a node points to **Null**.

### Common Representations

* **Standard Singly Linked:** Each node points forward only.
* **When to use:** When you need a simple dynamic list and only need to traverse in one direction.


* **With a Tail Pointer:** You keep track of both the **Head** (start) and **Tail** (end).
* **When to use:** When you frequently need to add items to the very end of the list (makes it O(1) instead of O(n)).



---

## 2. When would we use it?

Linked Lists are preferred over arrays in specific scenarios:

* **Dynamic Size:** You don't know how many items you'll have. Arrays usually need to "resize" (which is expensive); Linked Lists just grab a new spot in memory.
* **Fast Insertions/Deletions at the Start:** Adding to the front of an array is slow (O(n)) because you have to slide everyone over. In a Linked List, you just change two pointers (O(1)).
* **Building other structures:** It is the foundation for Queues and Stacks.

---

## 3. Important Properties for Interviews

* **Non-Contiguous:** Nodes can be anywhere in memory. This is why we can't use "indices" like `list[5]` to jump to an item.
* **Sequential Access:** To find the 5th item, you **must** start at the Head and follow the "Next" pointers 5 times.
* **The "Null" Terminator:** Always check if `current.next` is null to avoid crashing your code.
* **Pointer Manipulation:** Most Linked List problems are just "pointer puzzles"—changing who points to whom.

---

## 4. Sample Usage Walkthrough

Let's trace adding elements to a list: `Insert(10)`, `Insert(20)`.

**Step 1: Initial State**
The list is empty. `Head` points to `Null`.

**Step 2: Insert(10) at Head**

1. Create a new Node with data 10.
2. Point its `next` to what `Head` was pointing to (Null).
3. Point `Head` to this new node.

```
Head --> [ 10 | Next: Null ]

```

**Step 3: Insert(20) at Head**

1. Create a new Node with data 20.
2. Point its `next` to the current `Head` (the node with 10).
3. Move `Head` to point to the new node (20).

```
Head --> [ 20 | Next ] --> [ 10 | Next: Null ]

```

---

## 5. Code Sample (JavaScript)

```javascript
// A Node represents one "link" in the chain
class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Points to nothing by default
  }
}

class LinkedList {
  constructor() {
    this.head = null; // List starts empty
  }

  // Add to the front: O(1)
  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Find a value: O(n)
  find(value) {
    let current = this.head;
    while (current !== null) {
      if (current.data === value) return current;
      current = current.next; // Move to the next link
    }
    return null;
  }

  // Remove the head: O(1)
  removeHead() {
    if (!this.head) return null;
    this.head = this.head.next;
  }
}

// Usage:
const list = new LinkedList();
list.insertAtHead(10);
list.insertAtHead(20);
// List is now: 20 -> 10 -> null

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Access/Search** | Find the i-th element | O(n) | O(1) |
| **Insert (at Head)** | Add to the start | O(1) | O(1) |
| **Insert (at End)** | Add to end (no tail pointer) | O(n) | O(1) |
| **Delete (at Head)** | Remove first item | O(1) | O(1) |

### Why Access is O(n)? (ASCII Derivation)

In an **Array**, items are in a row:
`Address: 100, 104, 108, 112`
`Value:   [A]  [B]  [C]  [D]`
To get the 4th item, the computer does math: `Start + (3 * 4) = 112`. **O(1) Jump.**

In a **Linked List**:

```
Node 1 (at addr 502): [A | next: 999]
Node 2 (at addr 999): [B | next: 120]
Node 3 (at addr 120): [C | next: 441]
Node 4 (at addr 441): [D | next: null]

```

The computer doesn't know where "D" is until it visits A, then B, then C. You must travel `n` steps. **O(n) Walk.**

---

## 7. Common Variations and Tweaks

### Variation A: The "Two-Pointer" Technique (Runner)

**The Problem:** Find the middle of the list in one pass.
**The Tweak:** Use a `slow` pointer (moves 1 step) and a `fast` pointer (moves 2 steps). When `fast` hits the end, `slow` is at the middle.

```javascript
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
}
return slow; // The middle

```

### Variation B: Reversing the List

**The Problem:** Turn `1 -> 2 -> 3` into `3 -> 2 -> 1`.
**The Tweak:** You need three pointers: `prev`, `curr`, and `nextTemp`. You flip the arrows backward as you go.

```javascript
let prev = null, curr = head;
while (curr !== null) {
    let nextTemp = curr.next; // Save the rest of the list
    curr.next = prev;         // Flip the arrow!
    prev = curr;              // Move forward
    curr = nextTemp;
}
return prev; // New head

```

### Variation C: Cycle Detection

**The Problem:** Determine if a list has a loop (a node points back to an earlier node).
**The Tweak:** Use the "Floyd’s Cycle" (Tortoise and Hare). If `fast` ever catches up to `slow`, there is a cycle.

### Variation D: Dummy Nodes

**The Problem:** Deleting a node or merging lists often requires "if/else" logic for the Head.
**The Tweak:** Create a "fake" node at the start to act as a placeholder. This simplifies your code significantly because you never have to worry about a "null" head during the process.

```javascript
let dummy = new Node(0);
let tail = dummy;
// ... logic to build list ...
return dummy.next; // The real list starts here

```

# Doubly Linked List

A **Doubly Linked List (DLL)** is the "two-way street" version of a linked list. While a Singly Linked List only lets you move forward, a Doubly Linked List allows you to move both forward and backward with ease.

---

## 1. What is it?

A Doubly Linked List is a collection of **Nodes**. Each node in this list is more "knowledgeable" than a singly linked node because it contains three parts:

1. **Data:** The value being stored.
2. **Next:** A pointer to the next node in the chain.
3. **Prev:** A pointer to the *previous* node in the chain.

The list starts at the **Head** (where `prev` is null) and usually ends at the **Tail** (where `next` is null).

### Common Representations

* **Standard DLL:** Has a `head` and `tail` pointer.
* **When to use:** Most common version; used when you need to add/remove from both ends.


* **Circular DLL:** The tail's `next` points back to the head, and the head's `prev` points to the tail.
* **When to use:** Used in applications like "Alt-Tab" window switching or music playlists where you want to loop back to the start.



---

## 2. When would we use it?

Doubly Linked Lists are the secret sauce behind many advanced systems:

* **Browser History:** You need to go "Back" to the previous page and "Forward" to the next page.
* **LRU Cache (Least Recently Used):** Perhaps the most famous interview use case. You need to move items to the "front" of the list instantly when they are used.
* **Music Players:** To skip to the next track or go back to the previous one.
* **Text Editors:** To maintain a cursor that can move left and right through a string of characters.

---

## 3. Important Properties for Interviews

* **Bidirectional:** You can traverse from tail to head just as easily as head to tail.
* **O(1) Deletion (if you have the node):** Unlike a Singly Linked List (where you'd need to search for the node *before* the one you want to delete), in a DLL, the node already knows who its neighbor is. You can "unhook" it instantly.
* **Memory Overhead:** Because every node stores an extra `prev` pointer, it uses more memory than a Singly Linked List.
* **Complexity of Updates:** When you insert or delete, you have to update **four** pointers instead of two (the neighbors' pointers and the new node's pointers).

---

## 4. Sample Usage Walkthrough

Let's trace: `Insert(10)`, `Insert(20)` at the end of the list.

**Step 1: Empty List**
`Head` = null, `Tail` = null.

**Step 2: Insert(10)**

1. Create Node A (Data: 10, Prev: null, Next: null).
2. `Head` and `Tail` both point to Node A.

```
Head/Tail --> [ null | 10 | null ]

```

**Step 3: Insert(20) at the Tail**

1. Create Node B (Data: 20).
2. Point Node B's `prev` to the current `Tail` (Node A).
3. Point the current `Tail`'s (Node A) `next` to Node B.
4. Move the `Tail` pointer to Node B.

```
      Head                        Tail
        |                           |
[ null | 10 | next ] <--> [ prev | 20 | null ]

```

---

## 5. Code Sample (JavaScript)

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add to the very end: O(1)
  insertAtTail(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  // Remove a specific node: O(1)
  // This is the "magic" of DLL
  removeNode(node) {
    if (!node) return;

    // If it's the head
    if (node === this.head) {
      this.head = node.next;
    }
    // If it's the tail
    if (node === this.tail) {
      this.tail = node.prev;
    }

    // "Unhook" the node by connecting its neighbors to each other
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
  }
}

// Usage:
const dll = new DoublyLinkedList();
dll.insertAtTail(10);
dll.insertAtTail(20);
// Result: 10 <-> 20

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Access/Search** | Find the i-th element | O(n) | O(1) |
| **Insert at Head/Tail** | Add to either end | O(1) | O(1) |
| **Delete known Node** | Remove a node you already have | O(1) | O(1) |
| **Reverse** | Flip the list | O(n) | O(1) |

### Why is Search still O(n)? (ASCII Derivation)

Even though we have more pointers, we still don't have "indices." To find "Node 4", we have to walk.

```
Start (Head)
  |
 [A] --(next)--> [B] --(next)--> [C] --(next)--> [D]
                                                  |
                                            Found in 4 steps!

```

However, a small optimization in DLL is that if we know the index is in the second half of the list, we can start from the `Tail` and walk backward using `prev` to save time! (Still O(n), but twice as fast).

---

## 7. Common Variations and Tweaks

### Variation A: The LRU Cache

**The Problem:** Keep track of the most recently used items. When the cache is full, delete the "Least Recently Used" item.
**The Tweak:** Use a **Hash Map** to find nodes in O(1) and a **Doubly Linked List** to store them.

* When an item is used: `removeNode(node)` and `insertAtHead(node)`.
* When full: `removeNode(tail)`.

### Variation B: Reverse a DLL

**The Problem:** Flip all `prev` and `next` pointers.
**The Tweak:** You iterate through the list and for every node, you just swap the `next` and `prev` values.

```javascript
let current = this.head;
let temp = null;

while (current !== null) {
    // Swap pointers
    temp = current.prev;
    current.prev = current.next;
    current.next = temp;

    // Move to next node (which is now stored in .prev)
    current = current.prev;
}
if (temp !== null) this.head = temp.prev;

```

### Variation C: Palindrome Checker

**The Problem:** Check if a list reads the same forward and backward.
**The Tweak:** Place one pointer at the `head` and one at the `tail`. Move them toward each other.

```javascript
while (left !== right && right.next !== left) {
    if (left.data !== right.data) return false;
    left = left.next;
    right = right.prev;
}

```

# Binary Tree

A **Binary Tree** is a hierarchical data structure where each parent node can have at most **two** children. Think of it as a family tree where every person is limited to having a maximum of two biological children.

---

## 1. What is it?

A Binary Tree consists of **Nodes**. Each node contains a data value and two pointers (or references) to other nodes, traditionally called **Left** and **Right**.

### Common Representations

* **Linked Nodes:** The most common way. Each node is an object with properties for `value`, `left`, and `right`.
* **When to use:** For almost every standard tree problem (BSTs, Heaps, etc.).


* **Array-Based:** Often used for **Complete Binary Trees** like Binary Heaps.
* **Formula:** If a parent is at index `i`, its left child is at `2i + 1` and the right child is at `2i + 2`.
* **When to use:** When you need a memory-efficient way to store a tree that has no "holes" (gaps between nodes).



---

## 2. When would we use it?

Binary Trees are the foundation for more specialized structures:

* **Binary Search Trees (BST):** Used for fast searching, where the left side is always smaller and the right is larger.
* **Expression Trees:** Used by compilers to parse mathematical formulas like `(3 + 5) * 2`.
* **Huffman Coding Trees:** Used in data compression (like creating ZIP files).
* **Heaps:** A specific type of binary tree used to quickly find the "priority" item in a list (Priority Queues).

---

## 3. Important Properties for Interviews

* **Root:** The top-most node.
* **Leaf:** A node with no children (both `left` and `right` are null).
* **Height:** The number of edges from the root to the deepest leaf.
* **Balance:** A tree is "balanced" if the left and right subtrees of every node differ in height by no more than 1.
* **Full vs. Complete vs. Perfect:**
* **Full:** Every node has 0 or 2 children.
* **Complete:** Every level is filled except possibly the last, and all nodes are as far left as possible.
* **Perfect:** All internal nodes have two children and all leaves are at the same level.



---

## 4. Sample Usage Walkthrough

Let's build a small tree representing a simple hierarchy: `CEO (1)` has two managers `Manager A (2)` and `Manager B (3)`. `Manager A` has one employee `Dev (4)`.

**Step 1: Create Root (1)**

```
    1

```

**Step 2: Add 2 to the left and 3 to the right**

```
      1
     / \
    2   3

```

**Step 3: Add 4 to the left of 2**

```
        1
       / \
      2   3
     /
    4

```

---

## 5. Code Sample (JavaScript)

```javascript
// Each node is an object with a value and two pointers
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Simple logic to build and traverse
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Pre-order Traversal: Root -> Left -> Right
  // This is used to clone a tree or get a prefix expression
  printPreOrder(node) {
    if (node === null) return;

    console.log(node.val);         // Visit Root
    this.printPreOrder(node.left);  // Visit Left
    this.printPreOrder(node.right); // Visit Right
  }
}

// Usage:
const tree = new BinaryTree();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);

/*
Tree Structure:
      1
     / \
    2   3
   /
  4
*/

```

---

## 6. ADT and Complexity

| Operation | Description | Average Time | Worst Case | Space (Auxiliary) |
| --- | --- | --- | --- | --- |
| **Search** | Find a node | O(n) | O(n) | O(h) |
| **Insert** | Add a leaf | O(n) | O(n) | O(h) |
| **Traversal** | Visit all nodes | O(n) | O(n) | O(h) |

*Note: In a raw Binary Tree, there is no order, so you might have to check every node. "h" is the height of the tree.*

### Why O(h) Space? (ASCII Derivation)

When you use recursion to traverse a tree, the computer uses a "Call Stack." The stack grows for every level of the tree you go down.

```
Traversal Path:
1 -> 2 -> 4 (Stack grows: [1, 2, 4])
           | 
           v
      When we hit leaf 4, we pop it and go back to 2.

```

The maximum number of items in the stack at once is equal to the **Height** of the tree.
If the tree is balanced, `h = log n`.
If the tree is a straight line, `h = n`.

---

## 7. Variations and Common Tweaks

### Variation A: Breadth-First Search (BFS / Level Order)

**The Problem:** Visit nodes level by level (1, then 2,3, then 4).
**The Tweak:** Instead of recursion, use a **Queue**.

```javascript
let queue = [root];
while (queue.length > 0) {
    let node = queue.shift();
    // process node...
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
}

```

### Variation B: Finding Max Depth

**The Problem:** Find the longest path from root to leaf.
**The Tweak:** Return `1 + max(leftHeight, rightHeight)`.

```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

```

### Variation C: Inverting a Binary Tree

**The Problem:** Mirror the tree (swap all left and right children).
**The Tweak:** At every node, swap the pointers.

```javascript
let temp = node.left;
node.left = node.right;
node.right = temp;
invert(node.left);
invert(node.right);

```

### Variation D: In-Order Traversal (Sorted order)

**The Problem:** If the tree is a Binary Search Tree, how do you get numbers in order?
**The Tweak:** Change the traversal order to: **Left -> Root -> Right**.

```javascript
function inOrder(node) {
    if (!node) return;
    inOrder(node.left);
    console.log(node.val);
    inOrder(node.right);
}

```

# Binary Search Tree

A **Binary Search Tree (BST)** is a specialized version of a Binary Tree that is kept in a very specific order. It is designed to make searching for data as fast as looking up a word in a dictionary.

---

## 1. What is it?

A BST is a tree where every node follows a strict **Ordering Rule**:

* The **Left** child (and all its descendants) must have a value **smaller** than the parent node.
* The **Right** child (and all its descendants) must have a value **larger** than the parent node.

### Common Representations

1. **Linked Nodes (Standard):** Each node is an object with a `value`, `left` pointer, and `right` pointer.
* **When to use:** This is the default for almost all coding interviews. It allows for easy insertions and deletions.


2. **Array Representation:** Occasionally used for "Complete" trees, where indices `2i + 1` and `2i + 2` find children.
* **When to use:** Mostly for heaps or when memory must be contiguous; rarely used for a standard BST.



---

## 2. When would we use it?

BSTs are ideal when you have a dynamic set of data that changes often, but you still need to find things quickly.

* **Dynamic Sets:** When you are constantly adding and removing items but need to maintain a sorted order.
* **Implementing Sets and Maps:** Many languages use a variation of a BST (like a Red-Black Tree) to power their internal `Set` or `Map` structures.
* **Range Queries:** Finding all numbers between 10 and 50. Because the tree is sorted, you don't have to look at the whole thing.

---

## 3. Important Properties for Interviews

* **In-Order Traversal:** If you perform an "In-Order" traversal (Left, Root, Right) on a BST, you will **always** get the values in perfectly sorted ascending order. This is a very common "trick" in interviews.
* **The "Half-Discard" Rule:** Every time you move down one level, you ignore roughly half of the remaining nodes.
* **Balanced vs. Skewed:** A "Balanced" tree is short and wide. A "Skewed" tree is a straight line. Interviewers will often ask how to prevent a tree from becoming a line (the answer is usually "Self-Balancing Trees" like AVL or Red-Black trees).

---

## 4. Sample Usage Walkthrough

Let's build a BST using: `15, 10, 20, 8, 12`.

**Step 1: Insert 15**
It's the first element, so it becomes the **Root**.

```
    15

```

**Step 2: Insert 10**
10 is smaller than 15. Move **Left**.

```
      15
     /
    10

```

**Step 3: Insert 20**
20 is larger than 15. Move **Right**.

```
      15
     /  \
    10   20

```

**Step 4: Insert 8**
Compare to 15: smaller (go left). Compare to 10: smaller (go left).

```
        15
       /  \
      10   20
     /
    8

```

**Step 5: Insert 12**
Compare to 15: smaller (go left). Compare to 10: larger (go right).

```
        15
       /  \
      10   20
     /  \
    8   12

```

---

## 5. Code Sample (JavaScript)

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Add a value to the tree
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertRecursive(this.root, newNode);
  }

  _insertRecursive(node, newNode) {
    if (newNode.value < node.value) {
      // Go left if the new value is smaller
      if (!node.left) node.left = newNode;
      else this._insertRecursive(node.left, newNode);
    } else {
      // Go right if the new value is larger
      if (!node.right) node.right = newNode;
      else this._insertRecursive(node.right, newNode);
    }
  }

  // Find if a value exists: O(log n) average
  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      // Binary Search logic: pick a side
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}

// Usage:
const bst = new BinarySearchTree();
bst.insert(15);
bst.insert(10);
bst.insert(20);
console.log(bst.search(10)); // true
console.log(bst.search(100)); // false

```

---

## 6. ADT and Complexity

| Operation | Average Time | Worst Case Time | Space (Stack) |
| --- | --- | --- | --- |
| **Search** | O(log n) | O(n) | O(h) |
| **Insert** | O(log n) | O(n) | O(h) |
| **Delete** | O(log n) | O(n) | O(h) |

*Note: h = height of the tree. n = number of nodes.*

### Why O(log n)? (ASCII Derivation)

In a balanced BST, each level doubles the capacity of the tree.

```
Level 0: 2^0 = 1 node
Level 1: 2^1 = 2 nodes
Level 2: 2^2 = 4 nodes
Level 3: 2^3 = 8 nodes
...
Level 20: ~1,000,000 nodes

```

If you have **1 million nodes**, you only need to look at **20 nodes** to find your target (one at each level). This is because you "cut the search area in half" with every step.

**The Worst Case (O(n)):**
If you insert sorted numbers `1, 2, 3, 4`, you get a "Skewed Tree" which is basically just a Linked List:

```
1
 \
  2
   \
    3
     \
      4

```

Here, searching for 4 takes 4 steps. That's why balance is important!

---

## 7. Variations and Common Tweaks

### Variation A: Validating a BST

**The Problem:** Given a tree, prove it follows the BST rules.
**The Tweak:** You must pass a "valid range" (min, max) down to children.

```javascript
function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;
  if (node.value <= min || node.value >= max) return false;
  // Left child must be between current min and parent value
  // Right child must be between parent value and current max
  return isValidBST(node.left, min, node.value) && 
         isValidBST(node.right, node.value, max);
}

```

### Variation B: Finding the K-th Smallest Element

**The Problem:** Find the 3rd smallest number in the BST.
**The Tweak:** Perform an **In-Order traversal** (Left-Root-Right) and keep a counter. The 3rd element you visit is your answer.

### Variation C: Convert Sorted Array to BST

**The Problem:** Given `[1, 2, 3, 4, 5]`, create a balanced BST.
**The Tweak:** Pick the **middle** element as the root, then recursively do the same for the left and right halves.

```javascript
function sortedArrayToBST(arr) {
  if (arr.length === 0) return null;
  let mid = Math.floor(arr.length / 2);
  let node = new Node(arr[mid]);
  node.left = sortedArrayToBST(arr.slice(0, mid));
  node.right = sortedArrayToBST(arr.slice(mid + 1));
  return node;
}

```

# Trie (Prefix Tree)

A **Trie** (pronounced like "try"), also known as a **Prefix Tree**, is a specialized tree-based data structure used to store a set of strings. Unlike a standard binary tree, nodes in a Trie do not store their own entire key. Instead, a node's position in the tree defines the key it is associated with.

---

## 1. What is it?

A Trie is a tree where each node represents a single character of a word. By following a path from the root down to a specific node, you "spell out" a word.

### Common Representations

1. **Array of Children:** Each node contains an array of size 26 (for English lowercase letters).
* **When to use:** When the alphabet is small and fixed. It provides the fastest access but wastes space if many nodes are empty.


2. **Hash Map of Children:** Each node contains a Hash Map where keys are characters and values are child nodes.
* **When to use:** The "interview standard." It is memory-efficient because it only stores the characters that actually exist at that level.



---

## 2. When would we use it?

Tries are the "gold standard" for problems involving **Prefixes**:

* **Auto-complete:** When you type "app", the system finds all words in the Trie starting with that prefix (apple, application, apply).
* **Spell Checkers:** To quickly check if a word exists in a dictionary.
* **IP Routing:** Finding the longest prefix match for network packets.
* **T9 Texting:** (Old school!) Predicting words based on number pad presses.

---

## 3. Important Properties for Interviews

* **The Root is Empty:** The root node never contains a character; it is just the starting point.
* **End-of-Word Marker:** A node must have a boolean flag (like `isEndOfWord`) to distinguish between a full word ("APP") and just a prefix of a longer word ("APPLE").
* **Prefix Sharing:** All words starting with the same letters share the same nodes for those letters. This is what makes Tries memory-efficient for large dictionaries with common prefixes.
* **Not for Numbers:** Tries are almost exclusively for strings or sequences.

---

## 4. Sample Usage Walkthrough

Let's insert the words: **"CAT"** and **"CAP"**.

**Step 1: Start with Root**

```
(Root)

```

**Step 2: Insert "CAT"**

1. Create 'C' under Root.
2. Create 'A' under 'C'.
3. Create 'T' under 'A'. Mark 'T' as **End of Word**.

```
(Root) -> [C] -> [A] -> [T*]

```

**Step 3: Insert "CAP"**

1. 'C' already exists. Move to it.
2. 'A' already exists. Move to it.
3. 'P' does **not** exist under 'A'. Create 'P'. Mark 'P' as **End of Word**.

```
          (Root)
            |
           [C]
            |
           [A]
          /   \
        [T*]  [P*]

```

---

## 5. Code Sample (JavaScript)

```javascript
class TrieNode {
  constructor() {
    // Map of characters to child TrieNodes
    this.children = {};
    // Flag to indicate the end of a complete word
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word: O(L) where L is length of word
  insert(word) {
    let current = this.root;
    for (let char of word) {
      // If path doesn't exist, create it
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  // Search for an exact word: O(L)
  search(word) {
    let node = this.getNode(word);
    return node !== null && node.isEndOfWord;
  }

  // Search for a prefix: O(L)
  startsWith(prefix) {
    return this.getNode(prefix) !== null;
  }

  // Helper to traverse to the end of a string
  getNode(str) {
    let current = this.root;
    for (let char of str) {
      if (!current.children[char]) return null;
      current = current.children[char];
    }
    return current;
  }
}

// Usage:
const myTrie = new Trie();
myTrie.insert("apple");
console.log(myTrie.search("apple"));   // true
console.log(myTrie.startsWith("app")); // true
console.log(myTrie.search("app"));     // false (it's only a prefix)

```

---

## 6. ADT and Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| **Insert** | O(L) | O(L * N) |
| **Search** | O(L) | O(1) |
| **StartsWith** | O(L) | O(1) |

*Note: L = Length of the word, N = Number of words.*

### Why O(L)? (ASCII Derivation)

In a Hash Map or Set, you hash the entire string, which takes O(L) time anyway. In a Trie, you just walk down the tree.

```
Search "CAT":
1. Jump to Root
2. Jump to 'C' (1 step)
3. Jump to 'A' (1 step)
4. Jump to 'T' (1 step)
Total: 3 steps (The length of the word)

```

The time complexity **does not depend on how many words are in the Trie**. Whether you have 10 words or 10 million, searching for "CAT" always takes exactly 3 steps.

---

## 7. Common Variations and Tweaks

### Variation A: Auto-complete / Find All with Prefix

**The Problem:** Given "app", return ["apple", "apply", "appetizer"].
**The Tweak:** Use `startsWith` to find the node for "app", then perform a **DFS** from that node to find all descendants marked as `isEndOfWord`.

```javascript
// From the "P" node:
// Explore "L" -> "E" (Found apple)
// Explore "L" -> "Y" (Found apply)

```

### Variation B: The "Wildcard" Search

**The Problem:** Search for "c.t" where "." can be any letter.
**The Tweak:** Use recursion. When you hit a ".", you must loop through **all** children in the current `children` map and continue the search.

```javascript
if (char === '.') {
  for (let key in node.children) {
    if (this.recursiveSearch(word.slice(1), node.children[key])) return true;
  }
}

```

### Variation C: Longest Common Prefix

**The Problem:** Find the longest prefix shared by ALL words in a set.
**The Tweak:** Insert all words. Start at the root and keep moving down as long as the current node has **exactly one child** and is **not** an `isEndOfWord`.

### Variation D: Word Search II (Matrix Boggle)

**The Problem:** Find multiple words from a dictionary inside a grid of letters.
**The Tweak:** Instead of checking every word against the grid (slow), you move through the grid and the Trie **simultaneously**. If the letter you step on in the grid isn't in the current Trie branch, you stop that path immediately.

# Graph

A **Graph** is the most versatile data structure in computer science. While Trees follow a strict parent-child hierarchy, Graphs are the "wild west"—any node can connect to any other node in any way imaginable.

---

## 1. What is it?

A Graph is a collection of **Nodes** (also called **Vertices**) and the connections between them, called **Edges**.

### Most Common Representations

There are two ways to tell a computer how nodes are connected:

1. **Adjacency List:** Every node has a list of its "neighbors."
* **Representation:** An object or map: `{ A: [B, C], B: [A], C: [A] }`.
* **When to use:** In 90% of interviews. It is memory-efficient for "sparse" graphs (where nodes only have a few connections).


2. **Adjacency Matrix:** A 2D grid of 1s and 0s. If `grid[i][j]` is 1, there is an edge between node `i` and node `j`.
* **When to use:** When the graph is "dense" (almost every node connects to every other node) or when you need to check if two specific nodes are connected instantly.



---

## 2. When would we use it?

Graphs model real-world networks where relationships are complex:

* **Social Networks:** Users are nodes; "Friendships" are edges.
* **Google Maps:** Intersections are nodes; "Roads" are edges.
* **The Internet:** Webpages are nodes; "Hyperlinks" are edges.
* **Recommendation Engines:** If you like Movie A and Movie B, a graph finds other users who also liked both.

---

## 3. Important Properties for Interviews

* **Directed vs. Undirected:** In a directed graph (like Twitter), I can follow you without you following me. In an undirected graph (like Facebook), a friendship goes both ways.
* **Weighted vs. Unweighted:** Weighted edges have a "cost" (e.g., the distance in miles between two cities on a map).
* **Cycles:** A path that starts and ends at the same node.
* **Connectivity:** Can you get from Node A to Node Z?

---

## 4. Sample Usage Walkthrough

Let's model a tiny social network: **Alice** is friends with **Bob** and **Charlie**. **Bob** is friends with **David**.

**Step 1: The Visual Representation**

```
Alice --- Bob --- David
  |
Charlie

```

**Step 2: The Adjacency List**

* Alice: [Bob, Charlie]
* Bob: [Alice, David]
* Charlie: [Alice]
* David: [Bob]

**Step 3: Traversal (BFS)**
If we want to find everyone Alice knows (direct and indirect):

1. Start at **Alice**. Add neighbors **Bob** and **Charlie** to a queue.
2. Visit **Bob**. Add his neighbor **David** to the queue. (Alice is already "visited").
3. Visit **Charlie**. No new neighbors.
4. Visit **David**. No new neighbors.
**Result:** Alice -> Bob -> Charlie -> David.

---

## 5. Code Sample (JavaScript)

We will implement a Graph using an **Adjacency List** (the most interview-friendly way).

```javascript
class Graph {
  constructor() {
    // We use a Map to store our Adjacency List
    // Key = Node, Value = Array of neighbors
    this.adjacencyList = new Map();
  }

  // Add a new node (vertex)
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Add a connection (edge) - Undirected
  addEdge(v1, v2) {
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1);
  }

  // Breadth-First Search (BFS)
  // Good for finding the SHORTEST path
  bfs(startNode) {
    const queue = [startNode];
    const visited = new Set();
    const result = [];

    visited.add(startNode);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);

      // Look at all neighbors
      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

// Usage:
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addEdge("A", "B");

```

---

## 6. ADT and Complexity

| Operation | Adjacency List | Adjacency Matrix |
| --- | --- | --- |
| **Add Vertex** | O(1) | O(V^2) |
| **Add Edge** | O(1) | O(1) |
| **Remove Vertex** | O(V + E) | O(V^2) |
| **Query (Are A & B connected?)** | O(V) | O(1) |
| **Space Complexity** | O(V + E) | O(V^2) |

*Note: V = Number of Vertices, E = Number of Edges.*

### Why O(V + E) for Search? (ASCII Derivation)

In a graph search (BFS or DFS), you visit every "room" (Vertex) and walk through every "doorway" (Edge).

```
Nodes: A, B, C (V = 3)
Edges: A-B, B-C (E = 2)

Step 1: Check A
Step 2: Walk A -> B
Step 3: Check B
Step 4: Walk B -> C
Step 5: Check C

```

You did work proportional to the number of nodes **plus** the number of connections. Hence, **O(V + E)**.

---

## 7. Variations and Common Tweaks

### Variation A: Shortest Path (Unweighted)

**The Problem:** Find the minimum number of stops between two subway stations.
**The Tweak:** Use **BFS**. Keep a `parent` map to track how you got to each node. Once you find the target, backtrack through the parents.

```javascript
// Inside BFS
if (neighbor === target) {
    parentMap.set(neighbor, current);
    return reconstructPath(parentMap, target);
}

```

### Variation B: Cycle Detection (Directed)

**The Problem:** In a build system, can we finish all tasks, or is there a circular dependency?
**The Tweak:** Use **DFS**. Keep track of the "current recursion stack." If you encounter a node that is already in your current path, you have a cycle.

```javascript
// During DFS
if (recursionStack.has(neighbor)) return "Cycle Found!";

```

### Variation C: Dijkstra's Algorithm (Weighted)

**The Problem:** Find the fastest route on a map where roads have different speeds.
**The Tweak:** Use a **Priority Queue** instead of a regular queue. Always explore the node with the lowest "total cost" first.

### Variation D: Topological Sort

**The Problem:** You have tasks that depend on each other (e.g., must wear socks before shoes).
**The Tweak:** Use DFS. Once you've visited all of a node's neighbors, "push" that node onto a stack. The final stack, when reversed, gives the correct order.

# Bipartite Graph

A **Bipartite Graph** is a special kind of graph that can be divided into two distinct "teams." It is one of the most common graph variations appearing in high-level coding interviews because it tests your ability to modify standard search algorithms like BFS and DFS.

---

## 1. What is it?

A graph is **Bipartite** if you can split its nodes into two separate sets (let's call them Set A and Set B) such that **every edge** connects a node from Set A to a node from Set B.

Crucially:

* No two nodes in Set A are connected to each other.
* No two nodes in Set B are connected to each other.

### Common Representations

1. **Adjacency List:** Just like a normal graph, we use a Map or an Array of Arrays: `{ 0: [1, 3], 1: [0, 2] ... }`.
* **When to use:** Almost always. It makes it easy to "color" neighbors as you traverse.


2. **Adjacency Matrix:** A 2D grid.
* **When to use:** Only if the graph is extremely small or dense.



---

## 2. When would we use it?

Bipartite graphs model "matching" problems between two different types of things:

* **Job Matching:** Nodes on the left are **Applicants**, nodes on the right are **Jobs**. An edge means an applicant is qualified for that job.
* **Dating Apps:** Two sets of people; edges represent potential matches.
* **Scheduling:** One set is **Students**, the other is **Classrooms**.
* **Checkboard Patterns:** A chessboard is a bipartite graph—every move from a black square lands on a white square.

---

## 3. Important Properties for Interviews

* **The "Two-Color" Test:** A graph is bipartite if and only if you can color it using only two colors (e.g., Red and Blue) such that no two neighbors have the same color.
* **The Cycle Rule:** A graph is **NOT** bipartite if it contains an **Odd-Length Cycle** (like a triangle).
* **Connectivity:** A graph doesn't have to be connected to be bipartite. You must check every "island" (connected component).

---

## 4. Sample Usage Walkthrough

Let's check if a simple square graph is bipartite. Nodes: 0, 1, 2, 3. Edges: (0-1), (1-2), (2-3), (3-0).

**Step 1: Start at Node 0**
Color Node 0 **RED**.

```
(0:RED)

```

**Step 2: Visit neighbors of 0**
Neighbors are 1 and 3. Since 0 is RED, they must be **BLUE**.

```
(0:RED) --- (1:BLUE)
   |           |
(3:BLUE) --- (2:?)

```

**Step 3: Visit neighbors of 1**
Neighbors are 0 and 2. 0 is already RED (valid). 2 must be the opposite of 1, so 2 becomes **RED**.

```
(0:RED) --- (1:BLUE)
   |           |
(3:BLUE) --- (2:RED)

```

**Step 4: Visit neighbors of 3**
Neighbors are 0 and 2. 0 is RED (valid). 2 is RED (valid).
**Conclusion:** All edges connect different colors. The graph is **Bipartite**.

---

## 5. Code Sample (JavaScript)

We use a **BFS** approach and a `colors` array to track our two sets (0 for uncolored, 1 for Red, -1 for Blue).

```javascript
function isBipartite(graph) {
  // colors array: 0 means unvisited, 1 means Red, -1 means Blue
  const colors = new Array(graph.length).fill(0);

  // We loop through every node to handle disconnected graphs
  for (let i = 0; i < graph.length; i++) {
    // If node is already colored, skip it
    if (colors[i] !== 0) continue;

    // Start a BFS
    const queue = [i];
    colors[i] = 1; // Start by coloring the first node Red

    while (queue.length > 0) {
      const current = queue.shift();

      for (let neighbor of graph[current]) {
        // If the neighbor has the SAME color as the current node,
        // it's not bipartite!
        if (colors[neighbor] === colors[current]) {
          return false;
        }

        // If the neighbor hasn't been colored, color it the OPPOSITE
        if (colors[neighbor] === 0) {
          colors[neighbor] = -colors[current]; // Flips 1 to -1 or -1 to 1
          queue.push(neighbor);
        }
      }
    }
  }

  return true;
}

// Example: graph = [[1,3], [0,2], [1,3], [0,2]] (A simple square)
// console.log(isBipartite(graph)); // true

```

---

## 6. ADT and Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| **Bipartite Check** | O(V + E) | O(V) |

### Why O(V + E)? (ASCII Derivation)

This is a standard traversal. You visit every node (V) once to color it and look at every connection (E) once to check for conflicts.

```
Nodes: [0] -- [1] -- [2]
Steps:
1. Color 0 (V)
2. Check edge 0-1 (E)
3. Color 1 (V)
4. Check edge 1-2 (E)
5. Color 2 (V)
Total = V + E

```

Space is **O(V)** because we store the color of every node in an array and use a queue/stack that can hold up to V nodes.

---

## 7. Variations and Tweaks

### Variation A: Maximum Matching (Hopcroft-Karp)

**The Problem:** You have N workers and M tasks. Each worker can only do certain tasks. What is the maximum number of tasks you can complete?
**The Tweak:** This uses a bipartite graph but requires a more advanced "flow" algorithm to find the most efficient pairing.

### Variation B: The "Possible Bipartition" Problem

**The Problem:** You have a list of people who dislike each other. Can you split them into two groups where no one in a group dislikes anyone else in that same group?
**The Tweak:** This is exactly the same as `isBipartite`. You first have to **build** the adjacency list from the "dislikes" pairs, then run the coloring algorithm.

```javascript
// Building the graph from "dislikes" pairs
for (let [personA, personB] of dislikes) {
    adj[personA].push(personB);
    adj[personB].push(personA);
}
// Then run the coloring logic...

```

### Variation C: DFS vs BFS

**The Problem:** An interviewer might ask you to solve this without a Queue.
**The Tweak:** Use recursion. The logic remains the same: pass the "expected color" to the next recursive call.

```javascript
function dfs(node, color) {
    colors[node] = color;
    for (let neighbor of graph[node]) {
        if (colors[neighbor] === color) return false;
        if (colors[neighbor] === 0 && !dfs(neighbor, -color)) return false;
    }
    return true;
}

```

# Heaps or Priority Queue

A **Heap** is a specialized tree-based data structure that satisfies the "Heap Property." While it is technically a tree, it is almost always used to implement a **Priority Queue**—a queue where the "most important" item is always at the front, regardless of when it arrived.

---

## 1. What is it?

A Heap is a **Complete Binary Tree**. This means every level of the tree is fully filled, except possibly the last level, which is filled from left to right.

### Most Common Representations

1. **Max-Heap:** The parent node is always **greater than or equal to** its children. The largest element is at the root.
2. **Min-Heap:** The parent node is always **less than or equal to** its children. The smallest element is at the root.

### The Array Representation (The "Secret" to Heaps)

In interviews, you don't build a Heap using Nodes and Pointers like a Binary Tree. Instead, you use an **Array**. Because the tree is "Complete," we can use math to find neighbors:

* If a parent is at **index i**:
* Left Child: **index (2 * i) + 1**
* Right Child: **index (2 * i) + 2**
* Parent: **index floor((i - 1) / 2)**



---

## 2. When would we use it?

Use a Heap whenever you need to frequently find the "best" (min or max) element in a collection that is constantly changing.

* **Priority Queues:** Handling emergency room patients (highest urgency first).
* **Scheduling:** A computer CPU deciding which high-priority task to run next.
* **K-Largest/Smallest Elements:** Finding the top 10 trending topics on Twitter out of millions of tweets.
* **Dijkstra's Algorithm:** Finding the shortest path in a graph.

---

## 3. Important Properties for Interviews

* **Partial Order:** Unlike a Binary Search Tree, a Heap is NOT fully sorted. The only thing you know for sure is the relationship between a parent and its direct children.
* **The Root is King:** You can only "peek" at or remove the root (the min or max). Accessing the 4th smallest element in a Min-Heap is not what it's for (that would take O(n) time).
* **Heapify:** The process of "fixing" the tree when an element is added or removed.
* **Bubble Up (Sift Up):** Used when adding a new element.
* **Bubble Down (Sift Down):** Used when removing the root.



---

## 4. Sample Usage Walkthrough (Min-Heap)

Let's add numbers `10, 20, 5` to a Min-Heap.

**Step 1: Insert 10**
Array: `[10]`

```
  10

```

**Step 2: Insert 20**
Array: `[10, 20]` (20 is the left child of 10).
20 > 10, so the Min-Heap property is fine.

```
    10
   /
  20

```

**Step 3: Insert 5**
Array: `[10, 20, 5]` (5 is the right child of 10).
**Wait!** 5 is smaller than 10. We must **Bubble Up**.

1. Swap 5 and 10.
Array: `[5, 20, 10]`

```
    5
   / \
  20  10

```

---

## 5. Code Sample (JavaScript)

JavaScript doesn't have a built-in Heap, so you often have to write a basic one in interviews.

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Add an element: O(log n)
  insert(val) {
    this.heap.push(val); // Add to the end
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      // If child is smaller than parent, swap them
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = 
        [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Remove the smallest (root): O(log n)
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); // Move last element to root
    this.bubbleDown(0);
    return min;
  }

  bubbleDown(index) {
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = 
        [this.heap[smallest], this.heap[index]];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

```

---

## 6. ADT and Complexity

| Operation | Description | Time Complexity | Space Complexity |
| --- | --- | --- | --- |
| **Peek** | View min/max | O(1) | O(1) |
| **Insert** | Add element | O(log n) | O(1) |
| **Extract** | Remove min/max | O(log n) | O(1) |
| **Heapify** | Build heap from array | O(n) | O(1) |

### Why O(log n)? (ASCII Derivation)

In a binary tree, the "Height" is roughly `log n`. When you insert an element, the worst case is that it has to "Bubble Up" from the very bottom to the very top.

```
Level 0: [Root]               (Path length 0)
Level 1: [ ] [ ]              (Path length 1)
Level 2: [ ] [ ] [ ] [ ]       (Path length 2)
...
Level 10: 1,024 nodes          (Path length 10)

```

Even if you have 1,000 nodes, a path from leaf to root is only 10 steps long. This makes Heaps incredibly efficient.

---

## 7. Common Variations and Tweaks

### Variation A: Find Kth Largest Element

**The Problem:** Find the 3rd largest number in a massive stream of data.
**The Tweak:** Use a **Min-Heap** of size K.

* If the heap has fewer than K elements, add the new one.
* If the new element is larger than `heap.peek()`, remove the min and add the new one.
* The root of your Min-Heap is your Kth largest element.

```javascript
// Keeping a heap of size 3
Heap: [10, 20, 30] 
New element 25: 25 > 10? Yes.
Remove 10, Add 25 -> Heap: [20, 25, 30]

```

### Variation B: Merging K Sorted Lists

**The Problem:** You have 5 sorted arrays. Merge them into one sorted array.
**The Tweak:** Put the **first element** of every array into a Min-Heap. Extract the min, and then add the *next* element from the array that the extracted min came from.

### Variation C: Median from Data Stream

**The Problem:** Calculate the median of numbers as they are added one by one.
**The Tweak:** Use **Two Heaps**.

* A **Max-Heap** for the smaller half of the numbers.
* A **Min-Heap** for the larger half of the numbers.
* The median is either the root of the larger heap or the average of both roots.

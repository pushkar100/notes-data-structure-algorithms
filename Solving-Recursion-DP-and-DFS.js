/*
// 

---- * HOW TO PERFORM RECURSION? * ----
Steps:
1. Define the large problem in terms of smaller problems of the same type!



--- * HOW TO SOLVE DYNAMIC PROGRAMMING QUESTIONS RECURSIVELY? * ---
--- * https://sassafras13.github.io/SolvingDPProblems/ * ---
Steps:
1. Identify if the problem can be split into smaller sub-problems?:
   If yes, then we have found an "optimal substructure" and
   can solve the problem using at least recursion (Step 1 of DP).

2. Identify the "variables" in the problem:
   One way to figure this out is to consider a couple of the subproblems 
   and compare them, and see which variables changed from one subproblem 
   to the next.

3. Define the "recurrence" relation:
   Define the problem of solving for 'n' in terms of solving for values
   smaller than 'n' (i.e sub-problems). This can be a math solution or
   it can be worded.

4. Identify the "base cases":
   A base case is one that cannot be divided into smaller sub-problems
   for a solution. It can often look like the solution to when your 
   variables are 0 or 1, for example! (A good way to think about the base 
   cases is to ask what the constraints are on the variables you 
   identified in step 2)

5. Add "memoization": 
   Memoization is a way of saving solutions to subproblems so that if 
   the answer is "needed again", you can look it up instead of repeating 
   the computation. If solutions to subproblems are needed again then it
   means that there are "overlapping subproblems" that can be cached.
   (Note: If not solving recursively, use a dp cache instead)
   Tips:
   5(a) Memoize anything you are about to return at the end of a function call
   5(b) Always check for the memoized solution before performing the computation

6. Determine the time complexity:
   Do not forget to analyze time and even space complexity!
   For reading anything that is memoized we take constant time O(1)
   For the recursive function calls, the depth of the function recursion is taken.
 


--- * HOW TO SOLVE DEPTH FIRST SEARCH RECURSIVELY? * ---
Steps:
1. Start at the initial node
2. Mark the current node as visited
3. For each unvisited neighbour, call the DFS function recursively
4. Continue until all the nodes connected to the starting node are visited

*/

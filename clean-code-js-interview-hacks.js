// 1. Repeating a string: use `.repeat(count)`
'happy '.repeat(5) // "happy happy happy happy happy "

// 2. Iterating through (A) arrays or (B) characters of a string:
// use `for..of` loop
const items = ['foo', 'bar', 'baz']
for (const item of items) {
  item // value
}

// 3. Iterating through keys of an object: use `for..in` loop
const countsMap = { a: 10, b: 20, c: 5 }
for (const countKey in countsMap) {
  countKey // key
  countsMap[countKey] // value of value
}

// 4. Get the entries/keys/values of an object as an array
const frequencyMap = { hit: 1, hot: 2, cog: 4 }
Object.entries(frequencyMap) // [['hit', 1], ['hot', 2], ['cog', 4]]
Object.keys(frequencyMap) // ['hit', 'hot', 'cog']
Object.values(frequencyMap) // [1, 2, 4]

// 5. Iterating with index and element of an array:
// Use for..of and `.entries()` method of arrays
const newItems = ['fun', 'bun', 'buzz']
for (const [index, element] of newItems.entries()) {
  // ...
}

// 6. For a 1:1 mapping with an array: use `.map`
const fancyItems = ['Gucci', 'Prada', 'LV']
fancyItems.map((item) => '| ' + item + ' |') //['| Gucci |', '| Prada |', '| LV |']

// 7. Use a Map data structure for hashmaps:
const frequencies = new Map()
frequencies.set('foo', 5) // setter
frequencies.get('foo') // 5 (getter)
frequencies.has('foo') // check if a value exists for a key
frequencies.delete('foo') // delete a particular key-value pair
frequencies.clear() // delete all the key-value pairs (reset map to size 0)
frequencies.size // size of the map
// **NOTE**: Map allows you to loop through the "entries" of the map directly in for..of!
for (const [key, value] of frequencies) {
  console.log(key, value)
}

// 8. Use a Set data structure for maintaining unique/distinct values:
// i.e removing duplicates
const withDuplicates = ['cars', 'bikes', 'cars', 'planes']
const uniqueElements = new Set(withDuplicates) // input: an iterable like an array
uniqueElements.add('trains') // setter (note: it has no getter)
uniqueElements.has('planes') // check if a unique value exists for a key
uniqueElements.delete('planes') // delete a particular value
uniqueElements.clear() // delete all values (reset set to size 0)
uniqueElements.size // size of the set
uniqueElements.add('trains') // NOTE: NO EFFECT SINCE "trains" already exists (no duplicates)
// **NOTE**: Set allows you to loop through the "keys" (items) of the set
// directly in for..of!
for (const uniqueItem of uniqueElements) {
  console.log(uniqueItem)
}

// 9. Generate a range of numbers from 0 to n - 1 for looping through:
// Use `.keys()` method on arrays to get an iterable containing the indices
// (since keys are indices for an array)
// Use this iterable in an array and loop over it with a `for..of`
const num = 5
const listFromZeroToNumMinus1 = [...new Array(num).keys()] // If we need an array
for (const n of new Array(num).keys()) {
  // If we need to iterate in a loop
  // Alternate: for (const n of listFromZeroToNumMinus1) { /* ... */ }
  // ...
}
// To get 1 to n, we can use the same logic but then `.map()` it value = currvalue + 1
const listFromOneToNum = [...new Array(num).keys()].map((value) => value + 1) // [ 1, 2, 3, 4, 5 ]
for (const n of listFromOneToNum) {
  // ...
}

// 10. Remove characters from a string:
// Use `.slice(firstIndex, [lastIndex])` where firstIndex is
// inclusive and lastIndex is exclusive. If lastIndex is not provided,
// the firstIndex to the end of the string is considered
// (Note: Does not mutate the original string)
// (Note: slice() is better than substring() since we can give -ve index
// to remove elements from the end of the string)
const hello = 'hello'
// --- Find a substring with first and last index:
hello.slice(1, 3) // 'el'
// --- Remove the first character:
hello.slice(1) // 'ello'
// --- Remove the last character (use -ve lastIndex):
hello.slice(0, -1) // 'hell'

// 11. Iterate through a Map/Set:
// ... Use `.forEach()`
const wordCountsMap = new Map()
wordCountsMap.set('hit', 1)
wordCountsMap.set('hot', 2)
wordCountsMap.set('cog', 4)
wordCountsMap.forEach((value, key) => {
  // **Note**: value comes first in the arguments to the callback
  // ...
})
// Similarly for a set

// 12. Find the index of an item in an array: use `.indexOf()`
const travelOptions = ['car', 'bike', 'train', 'plane']
travelOptions.indexOf('car') // 0
travelOptions.indexOf('train') // 2

// 13. Destructure while looping to get inner values:
const flights = [
  ['Bangalore', 'San Fransisco'],
  ['New Delhi', 'Frankfurt'],
]
for (const [source, destination] of flights) {
  // ...
}

// 14. Remove an element from an array (in-place, mutable):
// Use `.splice(startIndex, deleteCount)`
const foo = ['bar', 'baz', 'das', 'moo']
foo.splice(2, 1) // Removing the 3rd element: It returns the removed element

// 15. Insert an element in the middle of an array (in-place, mutable): Use `.splice`
const moo = ['bar', 'baz', 'das', 'foo']
moo.splice(1, 0, 'tee') // inserting an element after the first

// 16. Find the min/max element of an integer array:
// Use `Math.min` / `Math.max` and the spread operator
const nums = [3, 1, 2, 5, 4, 10, 6]
Math.max(...nums) // 10
Math.min(...nums) // 1

// 17. Find the sum of an integer array:
// Use `.reduce()`
const points = [3, 1, 2, 5, 4, 10, 6] // sum = 31
points.reduce((acc, value) => acc + value, 0) // 31

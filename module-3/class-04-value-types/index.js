const { deepStrictEqual } = require("assert")

let counter = 0
let secondCounter = counter
secondCounter++

let objCounter = { counter: 0 }
let secondObjCounter = objCounter
secondObjCounter.counter++

/**
 * The values should be different because 
 * primitive types are passed by value. 
 */
deepStrictEqual(counter, 0)
deepStrictEqual(secondCounter, 1)

/**
 * The value of counter prop should be equal because
 * arrays and objects (elements that grows along the time)
 * are passed as memory reference.
 */
deepStrictEqual(objCounter.counter, 1)
deepStrictEqual(secondObjCounter.counter, 1)

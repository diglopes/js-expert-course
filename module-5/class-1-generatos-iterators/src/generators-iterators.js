/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {Generator<number, number>}
 */
export function* calculation (a, b) {
    yield a * b
}


/**
 * @returns {Generator<number, string>}
 */
export  function* exampleGenerator() {
    yield "Hello"
    yield "World"
    yield* calculation(2, 20)
}


/**
 * @returns {Generator<number>}
 */
export  function* promisified() {
    yield Promise.resolve(1)
    yield Promise.resolve(2)
}
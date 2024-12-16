class Fibonacci {
    *execute(input, current = 0, next = 1) {
        if (input === 0) return

        // Yield (return) the current value
        yield current

        // Recursive call - Delegating to the same function, but do not return the result
        yield* this.execute(input - 1, next, current + next)
    }
}


module.exports = {
    Fibonacci
}
const { deepStrictEqual } = require("assert")

function People () {}
function Developer() {}

People.prototype.sayHello = () => "Hello, world!"
Developer.prototype = Object.create(People.prototype)
Developer.prototype.code = () => "|> cd /foo/bar"

const dev = new Developer()

deepStrictEqual(dev.__proto__, Developer.prototype, "Inherits Developer")
deepStrictEqual(dev.__proto__.__proto__, People.prototype, "Inherits People")
deepStrictEqual(dev.__proto__.__proto__.__proto__, Object.prototype, "Inherits Object")
deepStrictEqual(dev.__proto__.__proto__.__proto__.__proto__, null, "Inherits null")
deepStrictEqual(dev.sayHello(), "Hello, world!", "People.sayHello()")
deepStrictEqual(dev.code(), "|> cd /foo/bar", "Developer.code()")

/**
 * "Class" Syntax suggar inheritance
 */

class Animal {
    bite() {
        return "Nhac!"
    }
}

class Dog extends Animal {
    bark() {
        return "Whooof!"
    }
}


const poddle = new Dog()

deepStrictEqual(poddle.__proto__, Dog.prototype, "Inherits Dog")
deepStrictEqual(poddle.__proto__.__proto__, Animal.prototype, "Inherits Animal")
deepStrictEqual(poddle.__proto__.__proto__.__proto__, Object.prototype, "Inherits Object")
deepStrictEqual(poddle.__proto__.__proto__.__proto__.__proto__, null, "Inherits null")
deepStrictEqual(poddle.bite(), "Nhac!", "People.sayHello()")
deepStrictEqual(poddle.bark(), "Whooof!", "Developer.code()")
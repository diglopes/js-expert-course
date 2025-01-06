const { deepStrictEqual } = require("assert")

class File {
    watch(path) {
        return this.message(path)
    }

    message(path) {
        return `File has been watched on ${path}!`
    }
}

function watcher(callback) {
    return callback('/foo/bar')
}

const file = new File()


deepStrictEqual(watcher(file.watch.bind(file)), "File has been watched on /foo/bar!", "Binding the context")
deepStrictEqual(watcher((path) => file.watch(path)), "File has been watched on /foo/bar!", "Isolating the context")

deepStrictEqual(file.watch.call({ message: () => "Hello Moto!"}, "/foo/bar"), "Hello Moto!")
deepStrictEqual(file.watch.apply({ message: () => "Hello Moto!"}, ["/foo/bar"]), "Hello Moto!")
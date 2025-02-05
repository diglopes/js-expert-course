import { expect } from "chai";
import mocha from "mocha";
import { csvReader, exampleGenerator, getUsers, promisified } from "../src/generators-iterators.js";
const { describe, it } = mocha

describe("Generators & Iterators", () => {
    it("should return all data", () => {
        const generator = exampleGenerator()
        expect(generator.next()).to.deep.equal({ done: false, value: "Hello" })
        expect(generator.next()).to.deep.equal({ done: false, value: "World" })
        expect(generator.next()).to.deep.equal({ done: false, value: 40 })
        expect(generator.next()).to.deep.equal({ done: true, value: undefined })
    })

    it("should return an array using iterators", () => {
        expect(Array.from(exampleGenerator()))
            .to.deep.equal(["Hello", "World", 40])

        expect([...exampleGenerator()])
            .to.deep.equal(["Hello", "World", 40])
    })

    it("should return promises result using iterators", async () => {
        for await (const result of promisified()) {
            expect(typeof result).to.deep.equal("number")
        }
    }) 

    it("should return object from csv file", async () => {
        const { pathname } = new URL('./file.csv', import.meta.url)
        for await (let line of csvReader(pathname)) {
            expect(line).to.have.all.keys(['name', 'age'])
        }
    })

    it("should return the database records one by one", async () => {
        let counter = 0
        for await (let user of getUsers(2)) {
            counter += user.length
            user.forEach(u => expect(u).to.have.keys(['id', 'name', 'age', 'createdAt', 'updatedAt']))
        }
        expect(counter).to.eq(10)
    })
})
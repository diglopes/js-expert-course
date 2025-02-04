import chai from 'chai'
import mocha from 'mocha'
import Person from '../src/person.js'

const { it, describe } = mocha
const { expect } = chai


describe("Person", () => {
    it("should return a person instance from string", () => {
        const result = Person.generatePersonFromText("1 Bike,Car 2000 2020-01-01 2020-03-01")
        const expected = {
            id: '1',
            from: '2020-01-01',
            to: '2020-03-01',
            vehicles: ["Bike", "Car"],
            kmTraveled: "2000",
        }
        
        expect(result).to.be.deep.equal(expected)
        expect(result).to.be.instanceOf(Person)
    })

    it("should format values", () => {
        const person = Person.generatePersonFromText("1 Bike,Car 2000 2020-01-01 2020-03-01")
        const expected = {
            id: 1,
            from: '01 de janeiro de 2020',
            to: '01 de março de 2020',
            vehicles: "Bike e Car",
            kmTraveled: "2.000 km",
        }

        expect(person.format("pt-BR")).to.be.deep.equal(expected)
    })
})
import { expect } from 'chai';
import mocha from "mocha";
import { createIterator, MyDates, uniqueKeySymbol, user } from "../src/index.js";
const { describe, it } = mocha

describe("Symbols", () => {
    describe("Custom symbols", () => {
        it("should return value for simple key", () => {
            expect(user.userName).to.be.a("string")
        })

        it("should not get a value from a symbol property using new created symbol", () => {
            const uniqueKeySymbol = Symbol("userName")
            expect(user[uniqueKeySymbol]).to.be.undefined
        })

        it("should recover a private value created with a symbol property", () => {
            expect(user[uniqueKeySymbol]).to.be.a("string")
            expect(Object.getOwnPropertySymbols(user)).to.deep.equal([uniqueKeySymbol, Symbol.for("pass"), Symbol.toStringTag])
        })

        it("should make a byPass for Symbol property (bad practice)", () => {
            expect(user[Symbol.for("pass")]).to.be.a("number")
        })
    })

    describe("Well known symbols", () => {
        it("should return an iterator ", () => {
            expect([...createIterator()]).to.deep.equal([3,2,1])
        })

        it("should replace the to string tag", () => {
            expect(String(user)).to.equal("[object Changed!]")
        })

        it("should change the primitive convertion", () => {
            const dates = new MyDates(
                [2020, 3, 1],
                [2024, 5, 14]
            )
            expect(String(dates))
                .to.equal("01 de abril de 2020 e 14 de junho de 2024")
        })

        it("should return an iterator from dates", () => {
            const dates = new MyDates(
                [2020, 3, 1],
                [2024, 5, 14]
            )

            expect([...dates]).to.deep.equal([
                new Date(2020, 3, 1),
                new Date(2024, 5, 14)
            ])
        })

        it("should return an async iterator from dates", async () => {
            const dates = new MyDates(
                [2020, 3, 1],
                [2024, 5, 14]
            )

            for await(const item of dates) {
                expect(item).to.be.a('Date')
            }
        })
    })
})
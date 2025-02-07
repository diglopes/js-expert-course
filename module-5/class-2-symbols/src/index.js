export const uniqueKeySymbol = Symbol("userName")

export const user = {}

user['userName'] = "value for normal objects"
user[uniqueKeySymbol] = "value for symbol"
user[Symbol.for("pass")] = 123
user[Symbol.toStringTag] = "Changed!"


export const createIterator = () => {
    return {
        [Symbol.iterator]: () => ({
            items: [1, 2, 3],
            next() {
                return { 
                    done: this.items.length === 0,
                    value: this.items.pop()
                }
            }
        })
    }
}

const kDates = Symbol("kDates")

export class MyDates {
    /**
     * @param  {...Array} args 
     */
    constructor(...args) {
        this[kDates] = args.map(date => 
            new Date(...date)
        )
    }

    [Symbol.toPrimitive](coertionType) {
        const dates = this[kDates].map(d => new Intl.DateTimeFormat('pt-BR', {
            month: "long",
            day: "2-digit",
            year: "numeric"
        }).format(d))

        return new Intl.ListFormat('pt-BR', {
            style: 'long',
            type:"conjunction"
        }).format(dates)
    }

    *[Symbol.iterator]() {
        for(const date of this[kDates]) {
            yield date
        }
    }

    async *[Symbol.asyncIterator]() {
        for(const date of this[kDates]) {
            yield Promise.resolve(date)
        }
    }
}
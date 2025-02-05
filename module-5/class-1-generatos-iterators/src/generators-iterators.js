import fs from 'fs'
import readline from 'readline'
import { sequelize } from './db/database.js'

// User.create({
//     name: 'Dony',
//     age: 25
// })

// sequelize.sync({ force: true })
// sequelize.sync({ alter: true })


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
export function* promisified() {
    yield Promise.resolve(1)
    yield Promise.resolve(2)
}

/**
 * 
 * @param {Array<string>} arr 
 * @returns {Iterable<string>}
 */
export function manualInterator(arr) {
    let index = 0

    return {
        next: function() {
            if(index < arr.length) {
                return { value: arr[index++], done: false}
            } else  {
                return { done: true }
            }
        }
    }
}

export async function* csvReader(file) {
    const fileStream = fs.createReadStream(file)
    const rl = readline.createInterface({ input: fileStream })
    let headers 

    for await (const line of rl) {
        if(!headers) 
            headers = line.split(',')
        else {
            const values = line.split(',')
            yield headers.reduce((acc, cur, index) => {
                acc[cur] = values[index]
                return acc
            }, {})
        }
             
    }
}


/**
 * 
 * @param {number} chunk 
 * @returns {Generator<Array>}
 */
export async function* getUsers(chunk = 1) {
    let offset = 0
    
    while(true) {
        const [user] = await sequelize.query(`
            SELECT * FROM USERS LIMIT ${chunk} OFFSET ${offset}
        `)

        if(user.length) {
            yield user
            offset += chunk
        } else {
            break
        }
    }
}
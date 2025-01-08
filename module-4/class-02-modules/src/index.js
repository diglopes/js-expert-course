import chalk from 'chalk'
import chalkTable from 'chalk-table'
import Draftlog from 'draftlog'
import db from './db.json'
import Person from './person.js'

Draftlog(console).addLineListener(process.stdin)

const DEFAULT_LANG = 'pt-br'

const opts = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.red("Veículos") },
        { field: "kmTraveled", name: chalk.cyan("Kilometragem") },
        { field: "from", name: chalk.cyan("Desde") },
        { field: "to", name: chalk.cyan("Até") },
    ]
}

const table = chalkTable(opts, db.map(item => new Person(item).format(DEFAULT_LANG)))
const print = console.draft(table)

// setInterval(() => {
//     db.push({ 
//         id: Date.now()
//     })
//     const table = chalkTable(opts, db)
//     print()
// }, 500);
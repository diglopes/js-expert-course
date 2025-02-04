import chalk from 'chalk'
import chalkTable from 'chalk-table'
import Draftlog from 'draftlog'
import readline from 'readline'
import Person from './person.js'

export class TerminalController {
    /**
     * @type {readline.Interface}
     */
    terminal

    /**
     * @type {any}
     */
    print

    /**
     * @type {Array<Person>}
     */
    data

    /**
     * @param {array} database 
     * @param {string} lang 
     */
    initialize(database, lang) {
        Draftlog(console).addLineListener(process.stdin)

        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, lang)
    }

    /**
     * @param {array} database 
     * @param {string} lang 
     */
    initializeTable(database, lang) {
        const data = database.map(item => new Person(item).format(lang))
        const table = chalkTable(this.generateTableOpts(), data)

        this.data = data
        this.print = console.draft(table)
    }

    /**
     * @param {string} msg 
     * @returns {string}
     */
    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close()
    }

    /**
     * 
     * @param {object} item 
     */
    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.generateTableOpts(), this.data))
    }

    generateTableOpts() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.red("Veículos") },
                { field: "kmTraveled", name: chalk.cyan("Kilometragem") },
                { field: "from", name: chalk.cyan("Desde") },
                { field: "to", name: chalk.cyan("Até") },
            ]
        }
    }
}
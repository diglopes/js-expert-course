import db from './db.json'
import Person from './person.js'
import { save } from './repository.js'
import { TerminalController } from './terminalController.js'

const DEFAULT_LANG = 'pt-br'
const CLOSE_COMMAND = ":q"

const terminalController = new TerminalController()

terminalController.initialize(db, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question('WUT??\n')
        if(answer === CLOSE_COMMAND) {
            terminalController.closeTerminal()
            return
        }
        const person = Person.generatePersonFromText(answer)
        terminalController.updateTable(person.format(DEFAULT_LANG))
        await save(person)
        return mainLoop()
    } catch (error) {
        console.error("Deu ruim, mané!", error)
        return mainLoop()
    }
}

await mainLoop()
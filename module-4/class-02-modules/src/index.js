
import db from './db.json'
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
        console.log(TerminalController.generatePersonFromText(answer).format())
        return mainLoop()
    } catch (error) {
        console.error("Deu ruim, mané!", error)
        return mainLoop()
    }
}

await mainLoop()
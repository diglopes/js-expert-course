import { readFile, writeFile } from "fs/promises";
import { URL } from "url";
import Person from "./person.js";

/**
 * @param {Person} person
 */
export const save = async (person) => {
    const { pathname } = new URL('./db.json', import.meta.url)
    console.log(pathname)
    const dataString = await readFile(pathname, 'utf8')
    const data = JSON.parse(dataString)
    data.push(person)
    await writeFile(pathname, JSON.stringify(data))    
}
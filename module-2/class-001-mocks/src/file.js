const { readFile } = require("fs/promises")
const { EmptyFileError } = require("./errors/empty-file-error")
const { MissingHeaderError } = require("./errors/missing-header-error")
const { LongerFileError } = require("./errors/longer-file-error")

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    /**
     * Convert CSV to JSON
     * @param {string} filePath - File path
     */
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, 'utf8')
        File.isValid(content, DEFAULT_OPTIONS)

        return File.parseCSVtoJSON(content)
    }

    /**
     * Validate if the content is valid
     * @param {*} content - File content
     * @param {DEFAULT_OPTIONS} opts - Options
     * @returns Throws an error if the content is invalid
     */
    static isValid(content, opts) {
        const [headersString, ...lines] = content.split(/\r?\n/)
        const headers = headersString?.split(',')
        const allHeadersIncluded = opts.fields.every(field => headers.includes(field))

        if (!headers || !allHeadersIncluded) throw new MissingHeaderError()

        if (lines.length === 0) throw new EmptyFileError()

        if (lines.length > opts.maxLines) throw new LongerFileError()
    }

    /**
     * 
     * @param {string} content - File content
     * @returns {Array} JSON array
     */
    static parseCSVtoJSON(content) {
        const [headersString, ...lines] = content.split(/\r?\n/)
        const headers = headersString.split(',')
        return lines.map(line => {
            const values = line.split(',')
            return headers.reduce((acc, header, index) => {
                acc[header] = values[index]
                return acc
            }, {})
        })
    }
}


module.exports = {
    File
}
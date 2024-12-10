const assert = require("assert");
const { File } = require("./src/file");
const { EmptyFileError } = require("./src/errors/empty-file-error");
const { MissingHeaderError } = require("./src/errors/missing-header-error");
const { LongerFileError } = require("./src/errors/longer-file-error");

// IIFE - Immediately Invoked Function Expression
(async () => {
    /***
     * The brackets are used to create a block scope 
     * and avoid variable conflicts.
     */
    {
        const filePath = './mocks/empty-file-invalid.csv'
        const result = File.csvToJSON(filePath)
        const expected = new EmptyFileError()

       await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/missing-header-invalid.csv'
        const result = File.csvToJSON(filePath)
        const expected = new MissingHeaderError()

        await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/exceeding-lines-invalid.csv'
        const result = File.csvToJSON(filePath)
        const expected = new LongerFileError()

        await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/valid-file.csv'
        const result = await File.csvToJSON(filePath)
        const expected = [
            { id: '1', name: 'John Doe', profession: 'Software Engineer', age: '35' },
            { id: '2', name: 'Jane Doe', profession: 'Data Scientist', age: '28' },
            { id: '3', name: 'Jim Doe', profession: 'Product Manager', age: '42' }
        ]

        assert.deepEqual(result, expected)
    }
})()
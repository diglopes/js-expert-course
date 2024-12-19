const { readFile } = require("fs/promises");

class BaseRepository {
    constructor({ file }) {
        this.file = file;
    }

    async find(id) {
        const content = await this.getContent();
        if(!id) return content;
        return content.find(item => item.id === id);
    }

    async getContent() {
        const textContent = await readFile(this.file);
        return JSON.parse(textContent);
    }
}

module.exports = { BaseRepository };
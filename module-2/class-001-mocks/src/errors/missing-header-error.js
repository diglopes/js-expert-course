class MissingHeaderError extends Error {
  constructor() {
    super('The file must have the headers: id, name, profession and age');
    this.name = 'MissingHeaderError';
  }
}

module.exports = {
  MissingHeaderError,
}
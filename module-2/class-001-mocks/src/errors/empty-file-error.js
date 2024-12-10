class EmptyFileError extends Error {
  constructor() {
    super('The file should not be empty');
    this.name = 'EmptyFileError';
  }
}

module.exports = {
  EmptyFileError,
};
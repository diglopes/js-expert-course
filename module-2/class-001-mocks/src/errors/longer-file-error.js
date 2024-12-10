class LongerFileError extends Error {
  constructor() {
    super('The file should not exceed 4 lines');
    this.name = 'LongerFileError';
  }
}

module.exports = {
  LongerFileError,
}
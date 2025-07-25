export default class UnprocessableEntityError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnprocessableEntityError";
    }
  }
  
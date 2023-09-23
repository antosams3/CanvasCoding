class Error {
    constructor(message) {
        this.message = message;
        this.name = "Error";
    }
}

class InterpreterError extends Error {
    constructor(message) {
        super(message);
        this.name = "Interpeter Error"
    }
}

export class PropertyRequiredError extends InterpreterError {
    constructor(property) {
      super("No property: " + property);
      this.name = "PropertyRequiredError";
      this.property = property;
    }
}



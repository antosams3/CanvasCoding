import { PropertyRequiredError } from "./Errors";

export class Variable {
    constructor(name, type, value){
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

/* Validate variable structure */
export function validateVariable(variable){
    if (!variable[1]) {
        throw new PropertyRequiredError("type");
    }
    
    if (!variable[2]) {
        throw new PropertyRequiredError("name");
    }

    if (!variable[3]) {
        throw new PropertyRequiredError("value");
    }

}

export class Object {
    constructor(id, type){
        this.id = id;
        this.type = type;
    }
}

/* Validate variable structure */
export function validateObject(object){
    if (!object[2]) {
        throw new PropertyRequiredError("id");
    }

    if (!object[3]) {
        throw new PropertyRequiredError("type");
    }

}
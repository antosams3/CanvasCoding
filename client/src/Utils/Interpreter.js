import { variableType, variableDefinition } from "./TypeConversion";

export function GUIInterpreter(objects) {
    let instances = '';
    let variables = '';
    let methods = '';
    let classes = '';

    variables = objects.map(element => {
        return objectToVariables(element)
    }).join('\n')

    instances = objects.map(element => {
        return objectToInstance(element)
    }).join('\n')

    classes = removeClassesDuplicates(objects).map(element => {
        return objectToClass(element)
    }).join('\n')

    const code = `public class Main{
    public static void main (String[] args) {
    ${variables}
    ${instances}
    ${methods}
    }
}\n
${classes}`;

    return code;
}

/* Ex. double[] b1_position = {-2.5, 0.5, 12.5};  */
function objectToVariables(object) {
    let vars = '';
    for (const field in object) {
        if (field !== "id" && field !== "type") {
            vars = vars + `${variableType[field]} ${object.type[0].toLowerCase()}${object.id}_${field} = ${getValue(field,object[field])};\n`;
        }
    } 
    return vars;
}

/* Ex. Box b1 = new Box(b1_position, b1_size) */
function objectToInstance(object) {
    return `${capitalize(object.type)} ${object.type[0].toLowerCase()}${object.id} = new ${capitalize(object.type)}(${objectToInstanceParams(object, object.type)});`;
}

/* Ex. b1_position, b1_size */
function objectToInstanceParams(object, type) {
    let params = '';
    let cont = 0;
    for (const field in object) {
        if (field !== "id" && field !== "type") {
            if (cont > 0) {
                params = params + `, ${type[0].toLowerCase()}${object.id}_${field}`
            } else {
                params = params + `${type[0].toLowerCase()}${object.id}_${field}`
            }
            cont++;
        }
    }
    return params;
}

/* Class definition */
function objectToClass(object) {
    return `class ${capitalize(object.type)}{
 /* Properties */
${objectToProperties(object)}
 /* Constructor */
${objectToConstructor(object)} 
}\n`
}

/* Ex. double[] position = new double[3];  */
function objectToProperties(object) {
    let vars = '';
    for (const field in object) {
        if (field !== "id" && field !== "type") {
            vars = vars + `${variableType[field]} ${field} = new ${variableDefinition[field]};\n`;
        }
    } 
    return vars;
}

/* Ex. public class Box(...){ this... } */
function objectToConstructor(object) {
    return `public ${capitalize(object.type)}(${objectToConstructorParams(object)}) {
${objectToConstructorParamsAssignment(object)} }`
}

/* Ex. double[] position, double[] size */
function objectToConstructorParams(object) {
    let params = '';
    let cont = 0;
    for (const field in object) {
        if (field !== "id" && field !== "type") {
            if (cont > 0) {
                params = params + `, ${variableType[field]} ${field}`
            } else {
                params = params + `${variableType[field]} ${field}`
            }
            cont++;
        }
    }
    return params;
}

/* Ex. this.position = position; */
function objectToConstructorParamsAssignment(object) {
    let vars = '';
    for (const field in object) {
        if (field !== "id" && field !== "type") {
            vars = vars + `this.${field} = ${field};\n`;
        }
    } 
    return vars;
}

function getValue(field, value){
    switch(field){
        case "size": return `{${toArray(value)}}`;
        case "position": return `{${toArray(value)}}`;
        case "color": return `"${value}"`;
        default: return "null";
    }
}

function toArray(vec) {
    return `${vec.x}, ${vec.y}, ${vec.z}`
}

function capitalize(type){
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(); 
}

function removeClassesDuplicates(array) {
    const classes = new Set();
    return array.filter(obj => {
        if (!classes.has(obj.type)) {
            classes.add(obj.type)
            return true
        }
        return false
    })
}

export function CodeInterpreter(code){
    
}
import { variableType, variableDefinition } from "./TypeConversion";
import * as THREE from 'three';

/* Canvas Interpreter */
export function CanvasInterpreter(objects) {
    console.log(objects);
    let instances = '';                 // Objects declaration
    let variables = '';                 // Variables declaration
    let methods = '';                   // Methods calls
    let classes = '';                   // Classes definition

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
            vars = vars + `${variableType[field]} ${object.type[0].toLowerCase()}${object.id}_${field} = ${getValue(field, object[field])};\n`;
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

function getValue(field, value) {
    switch (field) {
        case "size": return `{${toArray(value)}}`;
        case "position": return `{${toArray(value)}}`;
        case "color": return `"${value}"`;
        default: return "null";
    }
}

function toArray(vec) {
    return `${vec.x}, ${vec.y}, ${vec.z}`
}

function capitalize(type) {
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

/* Code interpreter  */
export function CodeInterpreter(javaCode) {

    const objectDeclarations = javaCode.match(/(\w+)\s+(\w+)\s+=\s+new\s+(\w+)\(([^)]+)\);/g);              // RegEx -> (word) 1..Nspace (word) 1..space = 1..Nspace "new" 1..Nspace (word)(word removing())
    const variableDeclarations = javaCode.match(/(\w+(?:\[\])?)\s+(\w+)\s*=\s*((?!new\s+)[^;]+);/g);        // RegEx -> (word with parentesis) 1..Nspace (word) 0..Nspace = 0..Nspace (word without "new" and with any carhacter, excluding;)

    const variables = variablesFromDeclaration(variableDeclarations);                                       // Exports variables from code
    const objectsArray = objectsFromDeclaration(objectDeclarations, variables);                             // Exports objects declaration from code
    console.log(objectsArray);
    return objectsArray;

}

function variablesFromDeclaration(variableDeclarations){
    let variables = [];
    if(variableDeclarations){
        variableDeclarations.forEach( declaration => {
            const clear = declaration.match(/^(?!.*\bnew\b).*$/);                                           // RegEx -> remove instances containing "new"
            if(clear){
                clear.forEach(variable =>{
                    const split = variable.match(/(\w+(?:\[\])?)\s+(\w+)\s*=\s*([^;]+);/);
                    if(split){
                        variables.push({
                            name: split[2],
                            //objectId: split[2].match(/^[^_]+/)[0],                                          // RegEx -> remove anything after _ (included) Ex. b1_position -> b1
                            type: split[1],
                            value: valueFromVariable(split[1],split[3])                                     // Casts values 
                        })
                    }
                });
            }
        })
    }
    return variables;
}

function valueFromVariable(type,value){
    switch(type){
        case "String": return value.replace(/"/g, '');
        case "double[]": 
            const split = value.replace(/{/g, '').replace(/}/g, '').replace(/\s/g, '').split(',');
            if(split){
                return new THREE.Vector3(split[0], split[1], split[2]);
            }else{
                return value.replace(/{/g, '[').replace(/}/g, ']');
            }
        case "char": return value.replace(/'/g, '');
        default : return value;
    }
}

function objectsFromDeclaration(objectDeclarations, variables){
    let objectArray = []

    if (objectDeclarations) {
        objectDeclarations.forEach(declaration => {
            const matches = declaration.match(/(\w+)\s+(\w+)\s+=\s+new\s+(\w+)\(([^)]+)\);/);               // RegEx -> (word) 1..Nspace (word) 1..space = 1..Nspace "new" 1..Nspace (word)(word removing())
            if (matches) {                                                                                  // Ex. Matches = ['Box b1 = new Box(b1_position, b1_size, b1_color);', 'Box', 'b1', 'Box', 'b1_position, b1_size, b1_color']
                let newObj = {
                    id: matches[2].replace(/\D/g, ''),                                                      // Remove digits from id (Ex. b1->1)
                    type: matches[3].toUpperCase(),                                                         // Object type (Ex. Box -> BOX)
                }

                matches[4].split(',').forEach( param => {                                                       // Split 'b1_position, b1_size, b1_color' into array of 3 elements                                               
                    const key = param.trim().match(/_(.+)/)[1];
                    const value = variables.find( value => value.name === param.trim()).value
                    newObj[key] = value
                })
                                
                objectArray.push(newObj)
            }
        });
    }
    return objectArray;
}
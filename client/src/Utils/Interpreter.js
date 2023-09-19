export function Interpreter(objects){
    console.log("Sono qui");
    let variables = '';
    let classes = '';
    objects.forEach(element => {
        variables = variables + objectToVar(element) + "\n";
        classes = classes + objectToClass(element) + "\n";
    });
    const code = `public static void main (String[] args) {
        ${variables}
        }
        ${classes}`;
    console.log(code);
    return code;
}

export function objectToVar(object){
    switch(object.type){
        case "BOX": return `Box b${object.id} = new Object();`;
        case "SPHERE": return `Sphere b${object.id} = new Object();`;
        default : return ''
    }
}

export function objectToClass(object){
    switch(object.type){
        case "BOX": return `public class Box{...}`;
        case "SPHERE": return `public class Sphere{...}`;
        default : return ''
    }
}

// export function codeToObject(code){
//     switch(object){
        
//     }
// }

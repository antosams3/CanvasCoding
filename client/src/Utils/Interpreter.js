export function Interpreter(objects) {
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
}
${classes}`;

    return code;
}

function objectToInstance(object) {
    switch (object.type) {
        case "BOX": return `Box b${object.id} = new Box(b${object.id}_position, b${object.id}_size);`;
        case "SPHERE": return `Sphere b${object.id} = new Sphere(s${object.id}_position, s${object.id}_size);`;
        default: return ''
    }
}

function objectToVariables(object) {
    let vars = '';
    switch (object.type) {
        case "BOX":
            for (const field in object) {
                if (field === 'size' || field === 'position') {
                    vars = vars + `double[] b${object.id}_${field} = {${toArray(object[field])}};\n`;
                }
            } return vars;
        case "SPHERE":
            for (const field in object) {
                if (field === 'size' || field === 'position') {
                    vars = vars + `double[] s${object.id}_${field} = {${toArray(object[field])}};\n`;
                }
            } return vars;
        default: return '';
    }

}

function objectToClass(object) {
    switch (object.type) {
        case "BOX":
            return `class Box{
    /* Properties */
    double position[] = new double[3];
    double size[] = new double[3];

    /* Constructor */
    public Box(double[] position, double[] size){
        this.position = position;
        this.size = size;
        }
    }`;
        case "SPHERE":
            return `class Sphere{
    /* Properties */
    double position[] = new double[3];
    double size[] = new double[3];

    /* Constructor */
    public Sphere(double[] position, double[] size){
        this.position = position;
        this.size = size;
    }
}`;
        default: return ''
    }
}

function toArray(vec) {
    return `${vec.x}, ${vec.y}, ${vec.z}`
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


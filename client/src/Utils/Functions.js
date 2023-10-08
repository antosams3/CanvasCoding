export function findMaxId(arr) {
    let maxId = 0;

    arr.forEach((obj) => {
        if (obj.id > maxId) {
            maxId = obj.id;
        }
    });

    return parseInt(maxId);
}
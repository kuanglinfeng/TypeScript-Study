Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const key = Symbol.for('descriptor');
function descriptor(description) {
    return Reflect.metadata(key, description);
}
exports.descriptor = descriptor;
function printObj(obj) {
    const proto = Object.getPrototypeOf(obj);
    if (Reflect.hasMetadata(key, proto)) {
        console.log(Reflect.getMetadata(key, proto));
    }
    else {
        console.log(proto.constructor.name);
    }
    for (const prop in obj) {
        if (Reflect.hasMetadata(key, obj, prop)) {
            console.log(`\t${Reflect.getMetadata(key, obj, prop)}:${obj[prop]}`);
        }
        else {
            console.log(`\t${prop}:${obj[prop]}`);
        }
    }
}
exports.printObj = printObj;

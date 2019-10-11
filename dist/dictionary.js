Object.defineProperty(exports, "__esModule", { value: true });
class Dictionary {
    constructor() {
        this.keys = [];
        this.vals = [];
    }
    get size() {
        return this.keys.length;
    }
    set(key, val) {
        const i = this.keys.indexOf(key);
        if (i < 0) {
            this.keys.push(key);
            this.vals.push(val);
        }
        else {
            this.vals[i] = val;
        }
    }
    forEach(callback) {
        this.keys.forEach((k, i) => {
            const v = this.vals[i];
            callback(k, v);
        });
    }
    has(key) {
        return this.keys.includes(key);
    }
    delete(key) {
        const i = this.keys.indexOf(key);
        if (i === -1) {
            return;
        }
        this.keys.splice(i, 1);
        this.vals.splice(i, 1);
    }
}
exports.Dictionary = Dictionary;

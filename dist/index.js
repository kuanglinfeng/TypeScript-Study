var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const A = class Test {
    constructor(a, b) {
    }
};
class User {
}
const lodash_1 = __importDefault(require("lodash"));
const newArr = lodash_1.default.chunk([1, 2, 3, 4], 2);
console.log(newArr);

Object.defineProperty(exports, "__esModule", { value: true });
class Animals {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`各位观众大家好，我是${this.type}，我叫${this.name}，今年${this.age}岁`);
    }
}
exports.Animals = Animals;
class Lion extends Animals {
    constructor() {
        super(...arguments);
        this.type = '狮子';
    }
    singleFire() {
        console.log(`${this.name}穿越了单火圈`);
    }
    doubleFire() {
        console.log(`${this.name}穿越了双火圈`);
    }
}
exports.Lion = Lion;
class Tiger extends Animals {
    constructor() {
        super(...arguments);
        this.type = '老虎';
    }
    singleFire() {
        console.log(`${this.name}穿越了单火圈`);
    }
    doubleFire() {
        console.log(`${this.name}穿越了双火圈`);
    }
}
exports.Tiger = Tiger;
class Monkey extends Animals {
    constructor() {
        super(...arguments);
        this.type = '猴子';
    }
    dumuqiao() {
        console.log(`${this.name}表演走钢丝`);
    }
    zougangsi() {
    }
}
exports.Monkey = Monkey;
class Dog extends Animals {
    constructor() {
        super(...arguments);
        this.type = '狗';
    }
    sushuti() {
        console.log(`${this.name}做算术题`);
    }
}
exports.Dog = Dog;

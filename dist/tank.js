Object.defineProperty(exports, "__esModule", { value: true });
class Tank {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    firstName() {
        console.log('发射子弹');
    }
}
exports.Tank = Tank;
class PlayerTank extends Tank {
    constructor() {
        super(...arguments);
        this.name = 'Flinn';
    }
    s() {
        console.log(this.name + ' ' + super.firstName());
    }
}
exports.PlayerTank = PlayerTank;
const t = new PlayerTank();
if (t instanceof PlayerTank) {
}

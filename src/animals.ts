import {IBalanceShow, IFireShow} from "./interfaces"

export abstract class Animals {
	abstract type: string

	constructor(
		public name: string,
		public age: number
	) {

	}

	sayHello() {
		console.log(`各位观众大家好，我是${this.type}，我叫${this.name}，今年${this.age}岁`)
	}
}

export class Lion extends Animals implements IFireShow {
	type: string = '狮子'

	singleFire() {
		console.log(`${this.name}穿越了单火圈`)
	}

	doubleFire() {
		console.log(`${this.name}穿越了双火圈`)
	}
}

export class Tiger extends Animals implements IFireShow{
	type: string = '老虎'

	singleFire() {
		console.log(`${this.name}穿越了单火圈`)
	}

	doubleFire() {
		console.log(`${this.name}穿越了双火圈`)
	}
}

export class Monkey extends Animals implements IBalanceShow{
	type: string = '猴子'

	dumuqiao() {
		console.log(`${this.name}表演走钢丝`)
	}

	zougangsi(): void {
	}
}

export class Dog extends Animals {
	type: string = '狗'

	sushuti() {
		console.log(`${this.name}做算术题`)
	}


}
export class Tank {
	x:number = 0
	y:number = 0

	firstName() {
		console.log('发射子弹')
	}
}


export class  PlayerTank extends Tank{
	name:string = 'Flinn'

	s() {
		console.log(this.name + ' ' + super.firstName())
	}

}


const t:Tank = new PlayerTank()

// shoot是PlayTank中的方法
// t.shoot() // 报错

if (t instanceof PlayerTank) {
	// t.shoot()
}






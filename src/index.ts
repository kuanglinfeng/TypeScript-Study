// import 'reflect-metadata'
// import { IsNotEmpty, validate, MinLength, MaxLength, Min, Max } from 'class-validator'

// class RegUser {

// 	@IsNotEmpty({message: '账号不能为空'})
// 	@MinLength(5, {message: '账号必须至少有5个字符'})
// 	@MaxLength(5, {message: '账号最多12个字符'})
// 	loginId: string

// 	@IsNotEmpty({message: '密码不能为空'})
// 	loginPwd: string

	
// 	@Min(0, {message: '年龄最小值不能小于0'})
// 	@Max(100, {message: '年龄最大值不能大于100'})
// 	age: number

// 	gender: '男' | '女'
// }

// const post = new RegUser()
// post.loginId = 'flinnn kuangggggggg'
// post.age = -1

// validate(post).then((error) => {
// 	console.log(error)
// })

// import 'reflect-metadata'
// import { plainToClass, Type } from 'class-transformer'
// import axios from 'axios'

// class User {
// 	id: number
// 	firstName: string
// 	lastName: string

// 	@Type(() => Number)
// 	age: number

// 	getName() {
// 		return this.firstName + ' ' + this.lastName
// 	}

// 	isAdult() {
// 		return this.age > 36 && this.age < 60
// 	}


// }


// axios.get('https://api.myjson.com/bins/sczya').then(res => {
// 	return res.data
// }).then((users: User[]) => {
// 	for (const u of users) {
// 		// 将一个平面对象转换为一个用户对象
// 		const user = plainToClass(User, u)
// 		console.log(user.getName(), user.isAdult())
// 	}
// })

// const a: string = 'aaa'

// let b: typeof a = 'flinn'

// class User {
// 	loginId: string
// 	loginPwd: string
// }

// // 注意：如果cls后直接限定为User表示的是User的一个实例对象而不是构造函数
// // 因此这里可以用到typeof，此外，用 new () => User 也可以限定为一个构造函数
// function createUser(cls: typeof User): User {
// 	return new cls()
// }




// interface User {
// 	loginId: string
// 	loginPwd: string
// }

// type Obj = {
// 	// [p in 'loginId' | 'loginPwd']: string
// 	[p in keyof User]: string
// }

// const u:Obj = {
// 	loginId: 'flinn',
// 	loginPwd: '123'
// }

// u 的类型变为 'a' | 'b' 相当于取交集
// let u: Extract<'a' | 'b' | 'c', 'a' | 'b'>



const A:twoParamsConstructor = class Test {
	constructor(a: any, b: any) {

	}
}

type twoParamsConstructor = new (arg1: any, arg2: any) => User

class User {

}

// Inst的类型变为 User (实例)
type Inst = InstanceType<twoParamsConstructor>















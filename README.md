# 在node中搭建TS开发环境

# 安装TypeScript

默认情况下，TS会做出下面几种假设：

1. 假设当前的执行环境是dom
2. 如果代码中没有使用模块化语句（import, export），就认为是全局执行
3. 编译的目标代码是ES3

有两种方式更改以上假设：

1. 使用命令行的时候，加上选项参数
2. 使用ts配置文件，更改编译选项

# TS的配置文件

使用了配置文件后，使用tsc进行编译时，不能跟上文件名，如果跟上文件名，会忽略配置文件

@types/node node环境的类型描述 在使用node环境需要安装

@types是一个ts官方的类型库，其中包含了很多对js代码的类型检查。

> JQuery: 用js写的，没有类型检查
> 安装@types:jquery，为jquery库添加类型定义

# 使用第三方库简化流程

ts-node: 将ts代码在内存中完成编译，同时完成运行

nodemon: 用于监测文件的变化

文件一改变，就执行ts-node: nodemon --watch src -e ts --exec ts-node src/index.ts 
(--watch src 表示只监控src目录下的文件 -e ts 表示只监控扩展名为ts的文件)

# 基本类型约束

> TS是一个可选的静态的类型系统

# 如何进行类型约束

仅需要在 变量、函数的参数、函数的返回值位置上加上``` :类型  ```

ts在很多场景中可以完成类型推导

any: 表示任意类型，ts不进行类型检查

> 小技巧，如何区分数字字符串和数字，关键看怎么读
> 如果按照数字的方式朗读，则为数字；否则，为字符串。

# 源代码和编译结果的差异

编译结果中没有类型约束信息

# 基本类型

- number: 数字
- string: 字符串
- boolean: 布尔
- 数组
- object: 对象
- null 和 undefined

null和undefined是所有类型的子类型。他们可以赋值給其它类型

通过添加```strictNullChecks:true```，可以获得更严格的类型
检查，null和undefined只能赋值給自身。

# 其它常用类型

- 联合类型：多种类型任选其一

配合类型保护进行判断

类型保护：当对某个变量进行类型判断之后，在判断的语句块中便可以确定他的确切类型，typeof可以出发基本类型的类型保护。

- void类型：通常用于约束函数的返回值，表示该函数没有任何返回

- never类型: 通常用于约束函数的返回值，表示该函数永远不可能结束
```javascript
function throwError(msg: string):never {
  throw new Error(msg);
  console.log(1111); // 不会执行
}

function alwaysDoSomething():never {
  while(true) {

  }
}
```

- 字面量类型: 使用一个值进行约束

- 元组类型（Tuple）: 一个固定长度的数组，并且数组中每一项的类型确定

- any类型: any类型可以绕过类型检查，因此any类型可以赋值給任意类型

# 类型别名

对已知的一些类型定义名称

```javascript
// 语法： type 类型名 = ...

type Gender = 'male' | 'female';

type User = {
  name: string
  age: number
  gender: Gender
}

let u: User;
u = {
  name: 'Flinn',
  age: 17,
  gender: 'male'
}
```

# 函数的相关约束

函数重载：在函数实现之前，对函数调用的多种情况进行声明。
```javascript
/**
 * 得到a*b的结果
 * @param a 
 * @param b 
 */
function combine(a: number, b: number):number;

/**
 * 得到a+b的结果
 * @param a 
 * @param b 
 */
function combine(a: string, b: string):string;

function combine(a:number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error('a和b必须是相同的类型');
}

const result = combine(1, 2);
```

可选参数：可以再某些参数后加上问号，表示该参数可以不用传递。可选参数必须在参数列表的末尾。
```javascript
function sum(a: number, b: number, c?: number) {
  if (c !== undefined) {
    return a + b + c;
  }  else {
    return a + b;
  }
}
```

# 扩展类型-枚举

> 扩展类型：类型别名、枚举、接口、类

枚举通常用于约束某个变量的取值范围。

字面量和联合类型配合使用，也可以达到同样的目标。

# 字面量类型的问题

- 在类型约束位置，会产生重复代码。可以使用类型别名解决该问题。
- 逻辑名称和真实的值产生了混淆，会导致当修改真实值的时候，产生大量的修改。
- 字面量类型不会进入到编译结果。

# 枚举

如何定义一个枚举：

```javascript
enum 枚举名{
  枚举字段1 = 值1,
  枚举字段2 = 值2,
  ...
}

enum Gender {
  male = '男',
  female = '女'
}
let gender: Gender;
gender = Gender.male;
```

枚举出出现在编译结果中，编译结果中表现为对象。

枚举的规则：

- 枚举的字段值可以是字符串或数字（数字枚举）
- 数字枚举的值会自动自增
- 被数字枚举约束的变量，可以直接赋值为数字
- 数字枚举的编译结果 和 字符串枚举有差异

最佳实践：

- 尽量不要在一个枚举中既出现字符串字段，又出现数字字段
- 使用枚举时，尽量使用枚举字段的名称，而不要使用真实的值

## 扩展知识：位枚举（枚举的位运算）

针对数字枚举

```javascript
enum Permission {
  Read = 1,   // 0001
  Write = 2,  // 0010
  Create = 4, // 0100
  Delete = 8  // 1000
}
// 可以通过基本权限来组合新的权限
// 例如：3 -> 0011 (具有可读可写的权限)

// 1. 如何组合权限
// 使用或运算
let p: Permission = Permission.Read | Permission.Write; // p具有可读可写的权限

// 2. 如何判断是否拥有某个权限
// 0011
// &（全为1，则为1，否则为0）
// 0010
// ----
// 0010
function hasPermission(target: Permission, per: Permission) {
  return (target & per) === per;
}
// 判断变量p是否拥有可读权限
console.log(hasPermission(p, Permission.Read));

// 3. 如何删除某个权限
// 0011
// ^ （相同取0，不同取1）
// 0010
// ----
// 0001 
p = p ^ Permission.Write; // 删除p中的可写权限
```

# 模块化

相关配置：
|       配置名称        |             含义             |
|----------------------|-----------------------------|
|       module         | 设置编译结果中使用的模块化标准   |
|  moduleResolution    | 设置解析模块的策略             |
|  noImplicitUseStrict | 编译结果中不包含 "use strict"  |
|  removeComments      | 编译结果移除注释               |
|  noEmitOnError       | 错误时不生成编译结果            |
|  esModuleInterop     | 启用es模块化交互非es模块导出     |
-------------------------------------------------------

> 前端领域中的模块化标准：ES6、commonjs、amd、umd、system

> TS中如何书写模块化语句
> 编译结果？

# TS中如何书写模块化语句

TS中，导入和导出模块，统一使用ES6的模块化标准。路径不要加后缀名。

# 编译结果中的模块化

可配置

TS中的模块化在编译的结果中：

- 如果编译结果的模块化标准是ES6: 没有区别
- 如果编译结果的模块化标准是commonjs：导出的声明会变成exports的属性，默认的导出会变成exports的default属性，导入就在导入的对象中取相应的属性。

# 如何在TS中书写commonjs模块化代码

导出：export = xxx

导入：import xxx = require("xxx")

# 模块解析

模块解析：应该从什么位置寻找模块

TS中，有两种模块解析策略

- classic: 经典
- node: node解析策略（唯一的变化，是将js替换为ts）
  - 相对路径```require("./xxx")```
  - 非相对模块```require("xxx")```

# 接口和类型兼容性

# 扩展类型-接口

接口：interface

> 扩展类型：类型别名、枚举、接口、类

TypeScript: 用于约束类、对象、函数的契约（标准）

契约（标准）的形式：
- API文档，弱标准
- 代码约束，强标准

和类型别名一样，接口不出现在编译结果中

1. 接口约束对象
```javascript
interface User {
  name: string
  age: number
  sayHello: () => void
  sayBye():void
}

let u:User = {
  name: "Flinn",
  age: 33,
  sayHello() {},
  sayBye() {}
}
```

2. 接口约束函数
```javascript
// type Condition = (value:number) => boolean;

interface Condition { // 定界符 仅仅为了界定这个函数
  (value:number):boolean
}

function sum(numbers:number[], callback: Condition) {
  let s = 0;
  numbers.forEach(value => {
    if (callback(value)) {
      s += value;
    }
  })
  return s;
}

console.log( sum([1, 2, 3, 4, 5], value => value % 2 === 0) )
```

**接口可以继承**

```javascript
interface A {
  T1 : string 
}

interface B extends A {
  T2: number
}

interface C extends A, B {
  T3: boolean
}

let u:C = {
  T2: 33,
  T1: "asdf",
  T3: true
}

```

使用类型别名可以实现类似的组合效果，需要通过```&```,它叫做交叉类型
```javascript
type A = {
  T1 : string 
}

type B = {
  T2: number
}

type C = {
  T3: boolean
} & A & B

let u:C = {
  T2: 33,
  T1: "asdf",
  T3: true
}
```

它们的区别：
- 子接口不能覆盖父接口的成员类型
- 交叉类型会把相同成员的类型进行交叉

**readonly**

只读修饰符，修饰的目标是只读的

只读修饰符不在编译结果中

```javascript
// 1. 修饰对象的属性(相当于const，但是const在对象属性用不了) 只读属性
interface User {
  readonly id: string,
  name: string,
  age: number
}

let u: User = {
  id: '123',
  name: 'asdf',
  age: 33
}

u.id = '1'; // 报错

// 2. 修饰数组 只读数组
let arr: readonly number[] = [1, 2, 3];

arr.push();  // 不具备push方法
arr.pop();  // 不具有pop方法

```

# 类型兼容性

B->A, 如果能完成赋值，则B和A类型兼容

鸭子辨型法（子结构辨型法）: 目标类型需要某一些特征，赋值的类型只要能满足该特征即可

- 基本类型：完全匹配
- 对象类型：鸭子辨型法

类型断言
```javascript
interface Duck {
  sound: '嘎嘎嘎',
  swin():void
}

let person = {
  name: '伪装成鸭子的人',
  age: 11,
  sound: '嘎嘎嘎' as '嘎嘎嘎', // 前面是数据后面是类型 
  swin() {
    console.log(this.name + '正在游泳，并发出了' + this.sound + '的声音');
  }
}

let duck: Duck = person;

duck.swin()

// 应用场景，假设有个函数，用于得到服务器的某个接口的返回结果，是一个用户对象

let u = getUserInfo() // 获得用户很多信息 其中包括了loginId nickName gender

// 但是我们只需要上面三个属性 
interface ResponseUser {
  loginId: string
  nickName: string
  gender: '男' | '女'
}

let user:ResponseUser = u;
```

当直接使用对象字面量赋值的时候，会进行更严格的判断

- 函数类型

一切无比的自然

**参数**: 传递给目标函数的参数可以少，不可以多

**返回值**: 要求返回必须返回；不要求返回，你随意；

# TS中的类

**属性**

使用属性列表来描述类中的属性

**属性的初始化检查**

```strictPropertyInitialization```

属性的初始化位置：

1. 构造函数中
2. 属性默认值

**属性可以用```?```修饰为可选的**

**属性可以用```readonly```修饰为只读的

**使用访问修饰符**

访问修饰符可以控制类中的某个成员的访问权限

- public: 默认的访问修饰符。公开的，所有代码均可访问
- private: 私有的，只有在类中可以访问
- protected: 

Symble

**属性简写**

如果某个属性，通过构造函数的参数传递，并且不做任何处理的赋值給该属性，可以简写。

```javascript
constructor(private name:string, private age:number) {
  
}
```

**访问器**

作用：控制属性的读取和赋值
```javascript
set age(value:number) {
  if (value < 0) {
    this._age = 0;
  }
  this._age = value;
}

get age() {
  return this._age;
}

// u._age = 1;  调用set age
// console.log(u._age) 调用get age
```

# 泛型

有时，书写某个函数时，会丢失一些类型信息（多个位置的类型应该保持一致或有关联的信息）

泛型：是指附属于函数、类、接口、类型别名之上的类型。

泛型相当于是一个类型变量，在定义时，无法预先知道具体的类型，可以用该变量来代替，只有到调用时，才能确定它的类型。

很多时候，TS会智能的根据传递的参数，推导出泛型的具体类型。

如果无法完成推导，并且又没有传递具体的类型，默认为空对象。

泛型可以设置默认值

# 在函数中使用泛型

在函数名之后写上```<泛型名称>```

```javascript
function take<T>(arr:T[], n:number) {
  if (n >= arr.length) {
    return arr;
  }
  const newArr: T[] = [];
  for (let i = 0; i < n; i ++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

// ['a', 'b', 'c']
console.log( take<string>(['a', 'b', 'c', 'd'], 3) );

// 可以使用类型推导
// take(['a', 'b', 'c', 'd'], 3))
```

# 如何在类型别名、接口、类中使用泛型

直接在名称后写上```<泛型名称>```

```javascript
// 回调函数：判断数组中的某一项是否满足条件
type callback = (n:number, i:number) => boolean;

// 使用泛型
type _callback<T> = (n: T, i: number) => boolean;

// 接口也一样
// interface __callback<T> {
//   (n: T, i: number): boolean
// }

function filter<T>(arr: T[], callback:_callback<T>):T[] {
  const newArr:T[] = [];
  arr.forEach((n, i) => {
    if (callback(n, i)) {
      newArr.push(n);
    }
  })
  return newArr;
}

const arr = [1, 2, 3, 4];
// [2, 4]
console.log(filter(arr, n => n%2 === 0))
```

# 泛型约束

用于限制泛型的取值

```javascript
interface hasNameProperty {
  name:string
}

/**
 * 将某个对象的name属性的每个单词的首字母大写，然后返回该对象
 * @param obj 
 */
function nameToUpperCase<T extends hasNameProperty>(obj:T): T {
  obj.name = obj.name
    .split(' ')
    .map(s => s[0].toUpperCase() + s.substr(1))
    .join(' ');
  return obj;
}

const o = {
  name: 'flinn kuang',
  age: 21,
  gender: 'male'
}

const newO = nameToUpperCase(o);

console.log(newO.name); // Flinn Kuang
```

# 多泛型

```javascript
// 将两个数组进行混合
// [1, 2] ['a', 'b'] => [1, 'a', 2, 'b']
function mixinArray<T1, T2>(arr1:T1[], arr2:T2[]): (T1 | T2)[] {
  if (arr1.length !== arr2.length) {
    throw new Error('两个数组长度不等');
  }
  let result: (T1| T2)[] = [];
  for (let i = 0; i < arr1.length; i ++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  return result;
}

// [1, 'a', 2, 'b']
console.log( mixinArray([1, 2], ['a', 'b']) )

```

# 深入理解类和接口

1. JS语言没有类型检查，如果使用面向对象的方式开发，会产生大量接口，而大量的接口会导致调用复杂度剧增，
这种复杂度必须通过严格的类型检查来减少错误，尽管可以用文档或注释来增强记忆，但是它们并没有强约束力。

2. 面向对象中有许多非常成熟的模式，能处理复杂问题。

## 什么事面向对象

面向对象：Oriented(基于) Object(对象) ，简称OO

- 是一种编程思想，它提出一切以对象为切入点思考问题

其它编程思想：面向过程、函数式编程

面向过程：以功能流程为思考切入点，不适合大型项目

函数式编程：以数学运算为思考切入点

面向对象：以划分类为思考切入点，类是最小功能单元

> 学开发最重要最难的什么？ 思维

## 如何学习面向对象编程

1. TS中的OOP（Oriented Object Programing）

2. 小游戏练习

# 类的继承

## 继承的作用

如果A继承自B，则A中自动拥有B中的所有成员

## 成员的重写

子类中覆盖父类的成员

子类成员不能改变父类成员的类型 

无论是属性还是方法，子类对父类的相应成员进行重写时，需要保证类型的匹配

注意this关键字：在继承关系中，this的指向是动态的，调用方法时，根据具体的调用者确定this指向

super关键字：在子类的方法中，可以使用super关键字读取父类成员

```typescript
class Son extends People{
	name:string = 'Flinn'
	
	sayMyName() {
		console.log(this.name + ' ' + super.firstName())
	}
}
```

## 类型匹配

鸭子辨型法

子类的对象，始终可以赋值給父类```const t:Tank = new PlayerTank()```

如果需要判断一个数据具体子类类型，可以使用```instanceof```
```typescript
const t:Tank = new PlayerTank()

// shoot是PlayTank中的方法
t.shoot() // 报错

if (t instanceof PlayerTank) {
	t.shoot()
}
```

## protected修饰符

readonly: 只读修饰符

访问权限修饰符：private、public、protected

protected：受保护的成员，只能在自身或子类中访问，外部不可访问

## 单根性和传递性

单根性：每个类最多只有一个父类

传递性：如果A是B的父类，并且B是C的父类，那么认为A也是C的父类


# 抽象类

## 为什么需要抽象类

有时某个类只表示抽象概念，主要用于提取子类共有的成员，而不能直接创建它的对象。该类可以作为抽象类。

给类前面加上关键字```abstract```，表示该类是一个抽象类，不可以创建一个抽象类的对象。

## 抽象成员

父类中，可能知道有些成员是必须存在的，但是不知道这个成员的值或实现是什么，因此需要有一种强约束，让继承该类的子类，必须要实现该成员。

抽象类中可以有抽象成员，抽象成员只能出现在抽象类中，这些抽象成员必须在子类中实现

```typescript
  abstract readonly name: string

  abstract move(targetX: number, targetY: number): boolean
```

## 设计模式 - 模板模式

设计模式：面对一些常见的功能场景，有一些固定的，经过多年实践的成熟方法，这些方法称之为设计模式。

模板模式：有些方法，所有的子类实现的流程完全一致，只是流程中的某个步骤的具体实现不一致，可以将该方法提到父类，在父类中
完成整个流程的实现，遇到实现不一致的方法时，将该方法做成抽象方法。


# 静态成员

## 什么是静态成员

静态成员是指，附着在类上的成员（js中就是属于某个构造函数的成员）

## 静态方法中的this

静态方法中的this指向的当前类

## 设计模式 - 单例模式

单例模式：某些类的对象，在系统中只有一个，为了避免开发者随意创建多个对象的错误，可以使用单例模式进行强约束。

```typescript
class Board {
	private static _board?: Board

	static createBoard(): Board {
		if (this._board) {
			return this._board
		}
		this._board = new Board()
		return this._board
	}

}
```


# 再谈接口

接口用于约束类、对象、函数，是一个类型契约。

> 有一个马戏团，马戏团里面有很多动物。包括：狮子、老虎、猴子、狗，这些动物都具有共同的特征：
名字、年龄、种类名称，还包含一个共同的方法：打招呼，他们各自有各自的技能，技能是可以通过训练改变的。
狮子和老虎都能进行火圈表演，猴子能进行平衡表演，狗能进行智慧表演

> 马戏团中有以下常见的技能：

> - 火圈表演：单火圈、双火圈

> - 平衡表演：独木桥、走钢丝

> - 智慧表演：算术题、跳舞

不使用接口实现时：

- 对能力（成员函数）没有强约束力

- 容易将类型和能力耦合在一起

系统中缺少对能力的定义 -- 接口

面向对象中的接口的语义：表达了某个类是否拥有某项能力

某个类具有某种能力，其实就是实现了某种能力

类型保护函数：通过调用该函数，会调用TS的类型保护，该函数必须返回boolean

```typescript
// 判断某个对象是否拥有IFireShow接口
function hasFireShow(ani: object): ani is IFireShow {
	if ((ani as IFireShow).singleFire && (ani as IFireShow).doubleFire) {
		return true
	}
	return faslse
}

animals.forEach(ani => {
	if (hasFireShow(ani)) {
		ani.singleFire()
		ani.doubleFire()
	}
})
```

接口和类型别名的最大区别：接口可以被类实现，而类型别名不可以

> 接口可以继承类，表示该类的所有成员都在接口中，接口可以实现多继承，这也是类型别名没法做到的。

```typescript
class A {
	a1: string = ''
	a2: string = ''
	a3: string = ''
}

class B {
	b1: number = 0
	b2: number = 0
	b3: number = 0
}

interface C extends A, B{

}

const c: C = {
	a1: '',
	a2: '',
	a3: 'heihei',
	b1: 1,
	b2: 2,
	b3: 4
}
```


# 索引器

```对象[值]```

在TS，默认情况下，不对索引器（成员表达式）做严格的类型检查

使用配置```noImplicitAny```开启对隐式any的检查。

隐式any：TS根据实际情况推导出的any类型

在索引器中键的类型可以是字符串也可以是数字

在类中索引器书写的位置是所有的成员之前

TS中索引器的作用：

- 在严格的检查下，可以实现为类动态增加成员

- 可以实现动态的操作类成员

在js中所有的成员名都是字符串，如果使用数字作为成员名，会自动转换为字符串，如arr[0]和arr["0"]本质是一样的

在TS中，如果某个类中，使用了两种类型的索引器，要求两种索引器的值类型必须一致。


```typescript

const methodName = "sayHello"

class User {
	
	// 索引器 
	// [props: string]: string | {(): void} | number 
	[methodName]() {
		console.log('hello')
	}
}

const u = new User()
u[methodName]()

u["hehe"]() // 没有严格类型检查 
u.hehe() // 立马爆红 提示有错误

```


# this指向约束

## 在js中this指向的几种情况

明确：大部分时候，this取决于函数的调用方式

- 如果直接调用函数（全局调用），this指向全局对象或undefined（启用严格模式）

- 如果使用对象.方法调用，this指向对象本身

- 如果是dom事件的处理函数，this指向事件处理对象 

特殊情况：

- 箭头函数，this在函数声明时确定指向，指向函数位置的指向

- 使用bind、apply、call手动绑定this对象

## TS中的this

配置noImplicitThis为true，表示不允许this隐式的（推断出）指向any

在TS中，允许在书写函数时，手动声明该函数中this的指向，将this作为函数第一个参数，例如```this: IUser```

该参数只用于约束this，并不是真正的参数，也不会出现在编译结果中

# 装饰器（decorator）

## 概述

> 面向对象的概念（Java: 注解，C#: 特征）

> Angular大量使用，React中也会用到

> 目前JS支持装饰器，目前处于建议收集的第二阶段

## 解决的问题

装饰器，能够带来额外的信息量，可以分离关注点 

- 信息书写位置的问题

- 重复代码的问题

上面两个问题的根源是某些信息在定义时，能够附加的信息量有限

装饰器伪代码

```ts
@xxx
class User {
	// 必须是3-5个字符
	@require
	@range(3, 5)
	@description('账号')
	loginid: string
	// 必须是6-12个字符
	@require
	@range(6, 12)
	@description('密码')
	loginpwd: string
}
```

语法：```@这里接的一定要是一个函数```

装饰器的作用：为某些属性、类、参数、方法提供元数据（metadata）信息

元数据：就是描述数据的数据，就是给一些数据额外信息


### 装饰器的本质

在JS中，装饰器是一个函数。（装饰器是要参与运行的，TS中的装饰器实际上也是JS里的）

装饰器可以修饰

- 类

- 成员（属性、方法）

- 参数

## 类装饰器

类装饰器的本质是一个函数，该函数接收一个参数，表示类本身（构造函数本身）

问题：在TS中如何约束一个参数为类

- 使用Function

- ```new (参数) => object```

约束构造函数的时候，如果要参数比较随意可以这样写：

```ts
function test(target: new (...args: any[]) => object) {
	
}

@test
class A{
	constructor(public name: string, 这里随便怎么写参数都可以，上面的any[]都可以满足) {

	}
}
```

如果要限定参数，则装饰器函数的参数必须按照类里面的构造函数的参数来写

在TS中使用装饰器，需要在tsconfig.json中启用```"experimentalDecorators": true```

装饰器函数的运行时间点：在类定义后会直接运行

类装饰器可以具有的返回值：

- void: 仅运行函数

- 返回一个新的类：会将新的类替换掉装饰目标

多装饰器情况下: 会按照先加入，后调用的顺序进行调用

一道面试题：

```ts
type constructor = new (...args: any[]) => object

function d1() {
	console.log("d1")
	return function (target: constructor) {
		console.log('d1 decorator')
	}
}

function d2() {
	console.log("d2")
	return function (target: constructor) {
		console.log('d2 decorator')
	}
}

@d1()
@d2()
class A{
	constructor(public name: string) {

	}
}
// 运行结果
// d1
// d2
// d2 decorator
// d1 decorator
```

## 成员装饰器

- 属性

属性装饰器也是一个函数，该函数需要两个参数：

1. 如果是静态属性，则为类本身；如果是实例属性，则为类的原型

2. 固定为一个字符串，表示属性名

```ts
function d(target: any, key: string) {
	// console.log(target === A.prototype, key)
	if(!target.__props) {
		target.__props = []
	}
	target.__props.push(key)
}

class A {

	@d
	prop1: string

	@d
	prop2: string

}

// [ 'prop1', 'prop2' ]
console.log((A.prototype as any).__props)

const a = new A()

// [ 'prop1', 'prop2' ]
console.log((a as any).__props)

```

- 方法

方法装饰器也是一个函数，该函数需要三个参数

1. 如果是静态方法，则为类本身；如果是实例方法，则为类的原型

2. 固定为一个字符串，值为方法名

3. 描述符对象

```ts
function d() {
	return function (target: any, key: string, descriptor: PropertyDescriptor) {
		descriptor.enumerable = true
		
		// A {} 'method1' { value: [Function: method1],
		// 	writable: true,
		// 	enumerable: true,
		// 	configurable: true }
		console.log(target, key, descriptor)
	}
}

function useless(target: any, key: string, descriptor: PropertyDescriptor) {
	descriptor.value = function () {
		console.warn(key + '该方法已过期')
	}
}

class A {

	@d()
	method1() {

	}

	@useless
	method2() {

	}

}

const a = new A()

// method2已过期
a.method2()

// method1
for (const key in a) {
	console.log(key)
}
```

## 练习：类和属性的描述装饰器

```ts
@classDescriptor('用户')
class User {
	
	@propDescriptor('账号')
	loginId: string

	@propDescriptor('密码')
	loginPwd: string
}


const u = new User()

u.loginId = 'abc'
u.loginPwd = '123'
// 用户
// 账号: abc
// 密码: 123
printObj(u)

// 装饰器实现
export function classDescriptor(description: string) {
  return function (target: new () => object) {
    // 保存到该类的原型中
    target.prototype.$classDescription = description
  }
}


export function propDescriptor(description: string) {
  return function (target: any, propName: string) {
    if (!target.$propDescription) {
      target.$propDescription = []
    }
    target.$propDescription.push({
      propName,
      description
    })
  }
}


export function printObj(obj: any) {


  if (obj.$classDescription) {
    console.log(obj.$classDescription)
  } else {
    console.log( Object.getPrototypeOf(obj).constructor.name )
  } 

  if (!obj.$propDescription) {
    obj.$propDescription = []
  } 

  // 输出所有的属性描述和属性值
  for (const key in obj) {
    const prop = obj.$propDescription.find((p: any) => p.propName === key)
    if (prop) {
      console.log(`\t${prop.description}: ${obj[key]}`)
    } else {
      console.log(`\t${key}: ${obj[key]}`)
    }
  }

}
```


 


























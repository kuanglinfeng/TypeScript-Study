
type constructor = new (...args: any[]) => object

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




// [ 'prop1', 'prop2' ]
// console.log((A.prototype as any).__props)

// const a = new A()

// [ 'prop1', 'prop2' ]
// console.log((a as any).__props)

// console.log((A as any).__props)


import 'reflect-metadata'

const key = Symbol.for('descriptor')

export function descriptor(description: string) {
  return Reflect.metadata(key, description)
}


export function printObj(obj: any) {

  const proto = Object.getPrototypeOf(obj)
  // 输出类的描述
  if (Reflect.hasMetadata(key, proto)) {
    console.log(Reflect.getMetadata(key, proto))
  } else {
    console.log(proto.constructor.name)
  }

  // 输出所有的属性的描述和属性值
  for (const prop in obj) {
    if (Reflect.hasMetadata(key, obj, prop)) {
      console.log(`\t${Reflect.getMetadata(key, obj, prop)}:${obj[prop]}`)
    } else {
      console.log(`\t${prop}:${obj[prop]}`)
    }
  }


}










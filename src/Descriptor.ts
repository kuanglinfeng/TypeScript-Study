

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










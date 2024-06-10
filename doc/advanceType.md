* 交叉类型
* 联合类型
* 字面量类型
* null
* 多态的 this 类型
* 索引类型
* 映射类型

* 类型别名
* 类型守卫和类型区分
* null和undefined

## 类型守卫
* 使用类型判定，类型谓词
* 使用in操作符：属性
* typeof类型守卫：基本数据类型
* instanceof类型守卫

## null

* null 和 undefined
* 可选参数和可选属性
* 类型守卫和类型断言


## 可辨识联合类型
``` ts
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

`Shape` 称为可辨识联合类型。
完整性检查：当 `area` 没有涵盖所有可辨识联合的变化时，ts 编译器会发出通知

``` ts
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
``` 


## 映射类型
从旧类型中创建新类型的一种方式


## 索引类型
索引是指用于访问数组或对象中特定元素的数字或字符串，即为 key

1. **索引类型查询 (`keyof`)**：
    - `keyof` 操作符用于获取某个类型的所有键名，返回这些键名的联合类型。例如，对于对象类型 `Person`，`keyof Person` 会返回 `"name" | "age"`，表示 `Person` 类型的所有属性名称。
    - `<T, K extends keyof T>` T 类型为数组或对象，K 类型为 T 类型的 key 

2. **索引访问操作符 (`T[K]`)**：
    - 索引访问操作符用于通过键名来访问某个类型中的属性类型。语法是 `T[K]`，其中 `T` 是对象类型，`K` 是对象的键。例如，对于 `type Person = { name: string; age: number }`，`Person["name"]` 会返回 `string` 类型。

## 字符串索引签名
索引签名
用于描述对象或类可以通过索引（键）访问的成员类型。索引签名允许使用动态的属性名称来访问对象的属性。



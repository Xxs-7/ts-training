// 索引类型
// 索引类型（Index Types）允许我们通过索引访问对象的属性，并且还可以使用索引签名来定义对象属性的类型。
// 包含：索引签名（Index Signatures）、索引访问操作符 (T[K])、索引类型查询操作符 (keyof)。

// 索引签名
// 如下面的 [index: number]: string;
// 表示 number类型的索引可以访问 string类型的值;

// 用数字类型的索引来访问字符串类型的值;
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
// 如果一个类型带有数字索引签名，那么keyof T为number。

// 用字符串类型的索引来访问字符串类型的值;
interface StringObject {
  [index: string]: string;
}
let myObject: StringObject;
myObject = { name: "Bob", age: "30" };
let myStr2: string = myObject["name"];
// 如果一个带有字符串索引签名的类型，那么keyof T会是string | number。

// 索引访问操作符 (T[K]) 和索引类型查询操作符 (keyof)。
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};

let makeAndModel = pluck(taxi, ["manufacturer", "model"]);

let modelYear = pluck(taxi, ["model", "year"]);

// K extends keyof T：意味着 K 必须是 T 类型的一个属性。
// 从 makeAndModel 可见 pluck 右侧参数 manufacturer,model（K 类型），均为 taxi（Car 类型，T）的属性。
// T[K]：意味着 T 类型的索引 K 所对应的类型。
// 即 makeAndModel 为 string[]，modelYear 为 number[]。

// 映射类型
// 将一个类型映射成另一个类型
// 常见于工具类型 Pick，Omit，Partial 等。

// 条件类型
// T extends U ? X : Y ：若T能够赋值给U，那么类型是X，否则为Y。

// 分布式有条件类型
// 联合类型 + 条件类型 =

// infer

// 工具函数
// Partial<Type>

// 基础数据类型
let isDone: boolean = false;

let dexLiteral: number = 0;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let bigLiteral: bigint = 100n;

let name: string = "hello";

let list: number[] = [1, 2, 3];
// let list: Array<number> = [1, 2, 3];

let x: [string, number] = ["hello", 10];

enum Color {
  Red,
  Green,
  Blue,
}
let color: Color = Color.Green;

let notSure: unknown;
notSure = "maybe a string";
notSure = 123;
notSure = false;

// any

function warnUser(): void {
  console.log("This is my warning message");
}

declare function create(o: object | null): void;

create({ props: 0 });
create(null);
// create("string")

// 类型断言
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 内置对象: Number, String, Boolean, Symbol 和 Object
// 存储在堆中, 其引用存储在栈中。而原始类型存储在栈中
// 通常比原始类型慢，需要更多的内存和处理时间
// 多数情况下原始类型是更好的选择

// interface

interface LabelValue {
  label: string;
}

function printLabel(labelObj: LabelValue): void {
  console.log(labelObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

// 额外的属性检查
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = (source, subString) => {
  return source.search(subString) !== -1;
};

// 索引类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

interface NumberOrDictionary {
  readonly [index: string]: number | string;
  length: number;
  name: string;
}

// 类类型
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {
    this.currentTime = new Date();
  }
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// class Clock2 implements ClockConstructor {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(hour: number, minute: number) {
//     this.currentTime = new Date(hour, minute);
//   }
// }

// 接口继承
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

// 混合类型

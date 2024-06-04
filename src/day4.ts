// class
class Greeter {
  greeting!: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter: Greeter = new Greeter("world");
greeter.greet();

// 继承
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

class Animal2 {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal2 {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal2 {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// 公共，私有与受保护的修饰符
class Animal3 {
  public name: string;
  private age: number;
  protected type: string;
  readonly count: number = 4;

  public constructor(theName: string, age: number, type: string) {
    this.name = theName;
    this.age = age;
    this.type = type;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// new Animal4("Cat").name; // 错误: 'name' 是私有的.

// 参数属性
class Animal4 {
  constructor(private name: string) {}
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 存取器
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}

// 静态属性
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    const xDist = point.x - Grid.origin.x;
    const yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

// 抽象类：略

// 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let dir: Direction = Direction.Up;

enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 联合枚举与枚举成员的类型
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Circle, // ok
  // kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  radius: 100,
};

// 运行时的枚举
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

f(E); // 没有错误，因为 'E' 只是个命名空间，而不是一个值。

// 反向映射
// 正向映射（name -> value）和反向映射（value -> name）。
enum Enum {
  A,
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"

// const 枚举
const enum Enum2 {
  A = 1,
  B = A * 2,
}

// 外部枚举
declare enum Enum3 {
  A = 1,
  B,
  C = 2,
}

// 泛型
function identity<T>(arg: T): T {
  return arg;
}

const identity2 = <T>(arg: T): T => {
  return arg;
};

let output = identity<string>("myString"); // type of output will be 'string'
// let output = identity("myString");  // type of output will be 'string'

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// 泛型类型
// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity3<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity3;

// 泛型参数
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
function identity4<T>(arg: T): T {
  return arg;
}

let myIdentity2: GenericIdentityFn2<number> = identity4;

// 泛型类
class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// 在泛型里使用类类型
function create<T>(c: { new (): T }): T {
  return new c();
}

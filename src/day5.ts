// 交叉类型（Intersection Types）
function extend<First extends {}, Second extends {}>(
  first: First,
  second: Second
): First & Second {
  const result: Partial<First & Second> = {};

  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(name: string): void;
}

class ConsoleLogger implements Loggable {
  log(name: string) {
    console.log(`Hello, I'm ${name}`);
  }
}
const Jim = extend(new Person("Jim"), new ConsoleLogger());
Jim.log(Jim.name);

// 联合类型（Union Types）
// 只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
  let pet: Fish = {} as Fish;
  return pet;
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim(); // errors

// 类型守卫

// 可辨识联合（Discriminated Unions）
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

// 函数
function add(x: number, y: number): number {
  return x + y;
}

// 如果函数没有返回任何值，也必须指定返回值类型为void而不能留空。
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// 可选参数
// 可选参数必须跟在必须参数后面。
function buildName(firstName: string, lastName?: string) {
  return firstName + " " + lastName;
}

// 默认参数
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

// 剩余参数
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// this 指针
// --noImplicitThis：如果一个函数没有声明this参数，那么它会被自动地加上this参数，并指定为any。
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

interface Event {
  message: string;
}

class Handler {
  info!: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}

// 重载
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickedCard2(x: { suit: string; card: number }[]): number;
function pickedCard2(x: number): { suit: string; card: number };
function pickedCard2(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

// 对象字面量
// 字面量类型集合：字符串、数字和布尔值
// 一个字面量是一个集体类型中更为具体的一种子类型。意思是："Hello World" 是一个 string，但是一个 string 不是类型系统中的 "Hello World"。

// 字面量收窄
// 从无穷多种可能的例子（string 变量的值有无穷多种）到一个更小、确定数量的例子（在上述例子中，"Hello Wrold" 的可能值只有一种）的过程就叫收窄。
// We're making a guarantee that this variable
// helloWorld will never change, by using const.

// helloWorld 的值永远不会改变
const helloWorld = "Hello World";

// let 和 var 变量的值有无限可能
let hiWorld = "Hi World";

// 字符串字面量类型
// 字面量类型可以通过联合联系、类型守卫、类型别名来结合实际字符串值。通过这些特性，我们可以获取一种字符串并使其有类似枚举（enum）的行为。
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    switch (easing) {
      case "ease-in":
        break;
      case "ease-out":
        break;
      case "ease-in-out":
        break;
      default:
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");

// 数字字面量
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}
function setupMap(config: MapConfig) {
  // ...
}
setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
// 布尔字面量
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
const validationResult: ValidationResult = {
  isValid: true,
  reason: null,
};

// 联合类型 union type
function padLeft(value: string, padding: string | number) {}

// padLeft("Hello world", true); error

// 具有公共字段的联合类型
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;
let pet = getSmallPet();
// pet.swim();

// 可区分联合
type NetworkLoadingStatus = {
  state: "loading";
};

type NetworkFailedStatus = {
  state: "failed";
  code: number;
};

type NetworkSuccessStatus = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkStatus =
  | NetworkLoadingStatus
  | NetworkFailedStatus
  | NetworkSuccessStatus;

function logger(state: NetworkStatus): string {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      return `error ${state.code} failed...`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

// 联合的穷尽性检查
// 增加联合类型新的成员时，而logger 没有处理到，自动报错：strictNullChecks
// 或使用检查穷进行的 never 类型
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function logger2(state: NetworkStatus): string {
  switch (state.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${state.code}`;
    case "success":
      return "got response";
    default:
      return assertNever(state);
  }
}

// 交叉类型
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;
const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
  }

  console.log(response.artists);
};

类型推论
就算仅在等式的一侧带有类型，TypeScript编译器仍可正确识别类型：尝试这个例子的时候，你会注意到，即使只是在等式的爱尔兰自带类型，TypeScript 编译器仍然可以正确识别类型：

```tsx

// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

```

这叫做“按上下文归类”，是类型推论的一种。
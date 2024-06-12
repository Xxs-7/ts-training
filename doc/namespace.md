# 命名空间
是什么？
能解决哪些问题？应用场景
用法
* 导入导出
* 命名空间嵌套

## 定义
命名空间（Namespace）是一种组织代码的方式，用于将代码分隔到不同的逻辑部分，以避免全局命名空间的污染和命名冲突。命名空间的关键字是 namespace。

内部可以包含类、接口、函数和变量

## 使用场景
- **模块化代码组织**：
    - 命名空间用于将大型代码库分割成小的、独立的部分，从而提高代码的可读性和可维护性。例如，可以将不同功能模块放入不同的命名空间。
    
    ```tsx
    namespace Utilities {
      export function log(message: string) {
        console.log(message);
      }
    }
    
    namespace Models {
      export class User {
        constructor(public name: string) {}
      }
    }
    
    ```
    
- **避免命名冲突**：
    - 命名空间可以防止不同模块中的相同名字的类、函数或变量发生命名冲突。例如，当使用第三方库时，可以将其放入命名空间以避免与现有代码冲突。
    
    ```tsx
    namespace Library1 {
      export class MyClass {
        // Implementation
      }
    }
    
    namespace Library2 {
      export class MyClass {
        // Different implementation
      }
    }
    
    ```
    
- **代码分组和逻辑分离**：
    - 命名空间可以帮助开发者根据逻辑或功能对代码进行分组。例如，可以将与用户相关的所有类和函数放入 `UserNamespace`，与订单相关的放入 `OrderNamespace`。
    
    ```tsx
    namespace UserNamespace {
      export class User {
        constructor(public name: string) {}
      }
    
      export function getUserInfo() {
        // Implementation
      }
    }
    
    namespace OrderNamespace {
      export class Order {
        constructor(public orderId: number) {}
      }
    
      export function getOrderDetails() {
        // Implementation
      }
    }
    
    ```
    
- **简化大型项目的依赖管理**：
    - 在大型项目中，可以使用命名空间来管理依赖关系，确保不同模块之间的依赖关系明确且易于管理。
    
    ```tsx
    namespace ProjectA {
      export namespace ModuleA {
        export function doSomething() {
          console.log("ModuleA doing something");
        }
      }
    
      export namespace ModuleB {
        export function doSomething() {
          ModuleA.doSomething();
          console.log("ModuleB doing something");
        }
      }
    }
    
    ```

[[toc]]

## Babel和AST（抽象语法树） {#babel-ast}

### Babel基本知识 {#babel-base}

#### Babel的处理步骤 {#babel-steps}

Babel的3个主要处理步骤：

- parse（解析）：解析步骤接收代码并输出AST。分词法分析（Lexical Analysis）和语法分析（Syntactic Analysis）两个阶段。
  词法分析阶段把字符串形式的代码转换为令牌流（tokens，可视为扁平的语法片段数组）。
  语法分析阶段会使用token中的信息把它们转换成AST的表示结构，便于后续操作。
- transform（转换）：转换步骤接收AST并对其进行遍历。在此过程中对节点进行添加、更新及移除等操作。在转换步骤中，需要进行树的递归遍历（深度遍历）。
- generate（生成）：代码生成步骤把经过一系列转换之后的最终AST转换成最终形式的代码，同时还会创建Source Maps用于映射源码。
  代码生成其实很简单：深度优先遍历整个AST树，然后构件可以表示转换后代码的字符串。

::: tip 提示
可以通过[https://astexplorer.net/](https://astexplorer.net/)在线工具将待转换的代码转换成AST抽象语法树。
:::

以下代码：

```javascript
let tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights something",

  "Shift click on an AST node to expand the whole subtree"
];

function printTips() {
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));
}
```

转换成AST后长这样：
```json
{
  "type": "Program",
  "start": 0,
  "end": 481,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 179,
      "end": 394,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 183,
          "end": 393,
          "id": {
            "type": "Identifier",
            "start": 183,
            "end": 187,
            "name": "tips"
          },
          "init": {
            "type": "ArrayExpression",
            "start": 190,
            "end": 393,
            "elements": [
              {
                "type": "Literal",
                "start": 194,
                "end": 241,
                "value": "Click on any AST node with a '+' to expand it",
                "raw": "\"Click on any AST node with a '+' to expand it\""
              },
              {
                "type": "Literal",
                "start": 246,
                "end": 330,
                "value": "Hovering over a node highlights something",
                "raw": "\"Hovering over a node highlights something\""
              },
              {
                "type": "Literal",
                "start": 335,
                "end": 391,
                "value": "Shift click on an AST node to expand the whole subtree",
                "raw": "\"Shift click on an AST node to expand the whole subtree\""
              }
            ]
          }
        }
      ],
      "kind": "let"
    },
    {
      "type": "FunctionDeclaration",
      "start": 396,
      "end": 480,
      "id": {
        "type": "Identifier",
        "start": 405,
        "end": 414,
        "name": "printTips"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 417,
        "end": 480,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 421,
            "end": 478,
            "expression": {
              "type": "CallExpression",
              "start": 421,
              "end": 477,
              "callee": {
                "type": "MemberExpression",
                "start": 421,
                "end": 433,
                "object": {
                  "type": "Identifier",
                  "start": 421,
                  "end": 425,
                  "name": "tips"
                },
                "property": {
                  "type": "Identifier",
                  "start": 426,
                  "end": 433,
                  "name": "forEach"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 434,
                  "end": 476,
                  "id": null,
                  "expression": true,
                  "generator": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 435,
                      "end": 438,
                      "name": "tip"
                    },
                    {
                      "type": "Identifier",
                      "start": 440,
                      "end": 441,
                      "name": "i"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 446,
                    "end": 476,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 446,
                      "end": 457,
                      "object": {
                        "type": "Identifier",
                        "start": 446,
                        "end": 453,
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 454,
                        "end": 457,
                        "name": "log"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "arguments": [
                      {
                        "type": "BinaryExpression",
                        "start": 458,
                        "end": 475,
                        "left": {
                          "type": "TemplateLiteral",
                          "start": 458,
                          "end": 469,
                          "expressions": [
                            {
                              "type": "Identifier",
                              "start": 465,
                              "end": 466,
                              "name": "i"
                            }
                          ],
                          "quasis": [
                            {
                              "type": "TemplateElement",
                              "start": 459,
                              "end": 463,
                              "value": {
                                "raw": "Tip ",
                                "cooked": "Tip "
                              },
                              "tail": false
                            },
                            {
                              "type": "TemplateElement",
                              "start": 467,
                              "end": 468,
                              "value": {
                                "raw": ":",
                                "cooked": ":"
                              },
                              "tail": true
                            }
                          ]
                        },
                        "operator": "+",
                        "right": {
                          "type": "Identifier",
                          "start": 472,
                          "end": 475,
                          "name": "tip"
                        }
                      }
                    ],
                    "optional": false
                  }
                }
              ],
              "optional": false
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

#### Visitors访问者 {#babel-visitors}

进入一个节点，实际上就是在访问这个节点。之所以使用这个术语，是因为有个叫做访问者模式的概念。

访问者是一个用于 AST 遍历的跨语言的模式。简单的说它们就是一个对象，定义了用于在一个树状结构中获取具体节点的方法。
比如：
```javascript
 
const Visitor = {
  Identifier() {
    console.log("Called!");
  }
};
// Identifier() { ... } 是 Identifier: { enter() { ... } } 的简写形式。.
// 也可以先创建一个访问者对象，并在稍后给它添加方法。
let visitor = {};
visitor.MemberExpression = function() {};
visitor.FunctionDeclaration = function() {}
```

以上为一个简单的访问者，用于遍历时，每遇到一个Identifier的时候都会调用Identifier()方法。

此种方法默认为在进入节点时进行操作，也可以在退出节点时进行操作：

```javascript
const Visitor = {
  Identifier: {
    enter() {
      console.log("Entered!");
    },
    exit() {
      console.log("Exited!");
    }
  }
};
```

如果对不同节点有同样的操作，可以用“｜”将方法名分隔开：

```javascript
const visitor = {
    "Idenfifier |MemberExpression"(path){}
}
```

特别的，还可以使用别名（[https://github.com/babel/babel/tree/master/packages/babel-types/src/definitions](https://github.com/babel/babel/tree/master/packages/babel-types/src/definitions)）去定义：

```javascript
//Function is an alias for FunctionDeclaration, FunctionExpression, 
//ArrowFunctionExpression, ObjectMethod and ClassMethod.
 
const Visitor = {
  Function(path) {}
}
```

#### Paths路径 {#babel-paths}

AST 通常会有许多节点，Path 是表示两个节点之间连接的对象。
在某种意义上，路径是一个节点在树中的位置以及关于该节点各种信息的响应式 Reactive 表示。
当你调用一个修改树的方法后，路径信息也会被更新。
Babel 帮你管理这一切，从而使得节点操作简单，尽可能做到无状态。

**Paths in Visitors（存在于访问者中的路径）**

当你调用一个访问者的Identifier() 成员方法时，你实际上是在访问路径而非节点。
通过这种方式，你操作的就是节点的响应式表示（即路径）而非节点本身。

```javascript
// 对表达式：a+b+c
const visitor = {
    Identifier(path){
        console.log("now: " + path.node.name);
    }
}
 
// 使用path.traverse(visitor)进行转换
path.traverse(visitor);
 
//以下是输出结果：
now: a
now: b
now: c
```

#### State状态 {#babel-state}

状态是抽象语法树AST转换的敌人，状态管理会不断牵扯你的精力。
而且几乎所有你对状态的假设，总是会有一些未考虑到的语法最终证明你的假设是错误的。

```javascript
const parser = require("@babel/parser");  // 解析，js转AST
const traverse = require("@babel/traverse").default;  // 转换
const t = require("@babel/types");
const generator = require("@babel/generator").default;  // 生成
 
const fs = require('fs');  // 文件读写
 
target_js = "function square(n) {  return n * n;}"
 
 
// 尝试将该代码中的n都变为x
const visitor = {
    FunctionDeclaration(path){
        const param = path.node.params[0]
        if (param.name === 'n'){
            paramName = param.name;
            param.name = 'x'
        }
    },
 
    Identifier(path){
        if (path.node.name === paramName){
            path.node.name = "x"
        }
    }
}
 
let ast = parser.parse(target_js);
 
traverse(ast, visitor);
 
let {code} = generator(ast);
 
// 输出：
function square(x) {
  return x * x;
}
```

以上代码可以做到将n变为x，但如果js代码变为：

```javascript
function square(n){
    return n * n;
}
 
function add(n, m){
    return n + m
}
```

输出结果就变成了：

```javascript
function square(x) {
  return x * x;
}
 
function add(x, m) {
  return x + m;
}
```

但我们本意只想变换square方法中的n。于是可以用递归的方式：

```javascript
const parser = require("@babel/parser");  // 解析，js转AST
const traverse = require("@babel/traverse").default;  // 转换
const t = require("@babel/types");
const generator = require("@babel/generator").default;  // 生成
 
const fs = require('fs');  // 文件读写


var target_js = "function square(n){\n" +
    "    return n * n;\n" +
    "}\n" +
    "\n" +
    "function add(n, m){\n" +
    "    return n + m\n" +
    "}"
 
 
// 尝试将该代码中的n都变为x
const updateParamName = {
    "Identifier"(path){
        if (path.node.name === this.paramName){
            path.node.name = "x"
        }
    }
}
 
 
const visitor = {
    "FunctionDeclaration"(path){
        if (path.node.params.length > 1){
            return;
        }
        const param = path.node.params[0]
        if (param.name === 'n'){
            paramName = param.name;
            param.name = 'x'
            path.traverse(updateParamName, { paramName });
        }
    }
}
 
let ast = parser.parse(target_js);
 
traverse(ast, visitor);
 
let {code} = generator(ast);
 
console.log(code)
 
 
//输出结果
function square(x) {
  return x * x;
}
 
function add(n, m) {
  return n + m;
}
```

此处为特殊例子，为了演示如何从访问者中消除全局状态。

#### Scopes作用域 {#babel-scope}

JavaScript支持词法作用域，在树状嵌套结构中代码块创建出新的作用域。

在JavaScript中，每创建一个引用，不管是通过变量（variable）、函数（function）、类型（class）、
参数（params）、模块导入（import）还是标签（label）等，都属于当前作用域。

更深的内部作用域代码可以使用外层作用域中的引用。

内层作用域也可以创建和外层作用域同名的引用。

当写转换时，必须小心作用域，必须要确保在改变代码的各个部分时不会破坏已经存在的代码。

在添加一个新的引用时需要确保新增加的引用名字和已有的所有引用不冲突。
或者想找出使用一个变量的所有引用，应该在给定的作用域中找出这些引用。

作用域可以表示为：

```javascript
const scope = {
    path: path,
    block: path.node,
    parentBlock: path.parent,
    parent: parentScope,
    bindings: [/** ... */]
}
```

创建一个新的作用域，需要给出它的路径和父作用域，之后在遍历过程中它会在该作用域内收集所有的引用("绑定")。

一旦引用收集完毕，就可以在作用域上使用各种方法。

#### Bindings绑定 {#babel-bindings}

所有引用属于特定的作用域，引用和作用域的这种关系被称为：绑定（binding）。

单个绑定可以表示为：

```javascript
const binding = {
    identifier: node,
    scope: scope,
    path: path,
    kind: 'var',
 
    referenced: true,
    references: 3,
    referencePaths: [path, path, path],
 
    constant: false,
    constantViolations: [path]
}
```

有以上信息就可以查找一个绑定的所有引用，并且知道这是什么类型的绑定（参数，定义等），
查找所属的作用域，或者拷贝标识符，甚至知道是不是常量，如果不是，那么哪里修改了它。

在很多情况下，知道一个绑定是否是常量非常有用，最有用的一种情形就是代码压缩。

### API {#babel-api}

Babel实际上是一组模块的集合。接下来是一些主要的模块，会解释他们是做什么的，以及如何使用。

#### babylon {#babel-babylon}

Babylon是Babel的解析器。最初是从Acorn项目fork出来的。Acorn非常快，易于使用，并且针对非标准特性（以及未来的标准特性）设计了一个基于插件的架构。

#### babel-traverse {#babel-traverse}

Babel Traverse模块维护了整棵树的状态，并且负责替换、移除和添加节点。

#### babel-types {#babel-types}

Babel Types模块是一个用于AST节点的Lodash式工具库（JavaScript函数工具库，提供了基于函数式编程风格的众多工具函数），
包含了构造、验证以及变化AST节点的方法。
该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用。

#### Definitions定义 {#babel-definitions}

Babel Types模块拥有每一个单一类型节点的定义，包括节点包含那些属性，什么是合法值，如何构建节点、遍历节点，以及节点的别名等信息。

单一节点类型的定义形式如下：

```javascript
defineType("BinaryExpression", {
    builder: ["operator", "left", "right"],
    fields: {
        operator: {
            validate: assertValueType("string")
        },
        left:{
            validate: assertNodeType("Expression")
        },
        right:{
            validate: assertNodeType("Expression")
        }
    },
    visitor: ["left", "right"],
    aliases: ["Binary", "Expression"]
});
```

#### Builders构建器 {#babel-builders}

上边的定义中有builder字段，这个字段的出现是因为每个节点类型都有构造器方法builder，使用方法：

```javascript
type.binaryExpression("*", type.identifier("a"), type.identifiier("b"));
```

可以创建的AST：

```javascript
const ast = {
    type: "BinaryExpression",
    operator: "*",
    left: {
        type: "Identifier",
        name: "a"
    },
    right: {
        type: "Identifier",
        name: "b"
    }
}
```

转为js代码后：

```javascript
a * b
```

构造器还会验证自身创建的节点，并在错误使用的情况下抛出描述性错误。于是有了验证器。

#### Validators验证器 {#babel-validators}

BinaryExpression的定义还包含了节点的字段fields信息，以及如何验证这些字段。

```javascript
const validator = {
  fields: {
    operator: {
      validate: assertValueType("string")
    },
    left: {
      validate: assertNodeType("Expression")
    },
    right: {
      validate: assertNodeType("Expression")
    }

  }
}
```

可以创建两种验证方法。第一种是isX。

```javascript
type.isBinaryExpression(maybeBinaryExpressionNode)
```

这个测试用来确保节点是一个二进制表达式，另外你也可以传入第二个参数来确保节点包含特定的属性和属性值。

```javascript
type.isBinaryExpression(maybeBinaryExpressionNode, { operator: "*" });
```

还有一些断言式版本，会抛出异常而非true或false。

```javascript
type.assertBinaryExpressiion(maybeBinaryExpressionNode);
type.assertBiinaryExpression(maybeBinaryExpressionNode, { operator: "*" });
// Error: Expected type "BinaryExpression" with option { "operator": "*" }
```

#### Converters变换器 {#babel-converters}

##### babel-generator {#babel-generator}

是Babel的代码生成器，读取AST并将其转换为代码和源码映射。

```javascript
const code = '......'
 
const ast = babylon.parse(code);
generate(ast, {}, code);
// 结果
// {
//   code: "...",
//   map: "..."
// }
 
// 也可以传递选项
generate(ast, {
    retainLines: false,
    compact: "auto",
    concise: false,
    quotes: "double",
}, code);
```

##### babel-template {#babel-template}

是另一个虽然小但非常有用的模块，能使你编写字符串形式切带有占位符的代码来代替手动编码，尤其生成大规模AST时。
在计算机科学中，这种能力被称为准引用（quasiquotes）。

```javascript
import template from "babel-template";
import generate from "babel-generator";
import * as type from "babel-types";
 
const buildRequire = template(' var IMPORT_NAME = require(SOURCE); ');
 
const ast = buildRequire({
    IMPORT_NAME: type.identifier("myModule"),
    SOURCE: type.stringLiteral("my-module")
});
 
console.log(generate(ast).code);
 
// 结果：
var myModule = require("my-module");
```

### 转换 {#babel-transfer}

#### 访问 {#babel-transfer-visit}

##### 获取子节点的Path {#babel-child-node-path}

为了得到一个AST节点的属性值，我们一般先访问到该节点，然后利用path.node.property方法即可。

```text
// BinaryExpression AST node 的属性： 'left', 'right', 'operator'
BinaryExpression(path) {
    path.node.left;
    path.node.right;
    path.node.operator;
}
```

访问该属性内部的path，使用path对象的get方法，传递属性的字符串形式作为参数：

```text
BinaryExpression(path){
    path.get('left');
}
 
Program(path){
    path.get('body.0');
}
```

##### 检查节点的类型 {#babel-check-node-type}

如果想检查节点的类型，最好的方式是：

```text
BinaryExpression(path){
    if (t.isIdentifier(path.node.left)){
        // ...
    }
}
```

或者可以对节点的属性做浅层检查：

```text
BinaryExpression(path){
    if (t.isIdentifier(path.node.left, { name: "n" })) {
        // ...
    }
}
```

功能上等价于：

```text
BinaryExpression(path){
    if (path.node.left != null && 
        path.node.left.type === "Identiifiier" &&
        path.node.left.name === "n"
    ){
        // ...
    }
}
```

##### 检查路径（Path）类型 {#babel-check-path-type}

```text
BinaryExpression(path) {
    if (path.get('left').isIdentifier({ name: "n" })){
        // ...
    }
}
 
 
// 等价于
 
BinaryExpression(path) {
    if (t.isIdentifier(path.node.left, { name: "n" })) {
        // ...
    }
}
```

##### 检查标识符（Identifier）是否被引用 {#babel-check-reference}

```text
Identifier(path) {
    if (path.isReferencedIdentifier()) {
        // ...
    }
}
 
 
// 或者
 
Identifier(path) {
    if (t.isReferenced(path.node, path.parent)) {
        // ...
    }
}
```

##### 找到特定的父路径 {#babel-find-path-to-parent}

有时需要从一个路径向上遍历语法树，直到满足相应的条件。

```javascript
/**
 * 对于每一个父路径调用callback并将其NodePath当作参数，
 * 当callback返回真值时，则将其NodePath返回。
 */
path.findParent((path) => path.isObjcetExpression());
 
// 如果也需要遍历当前节点：
path.find((path) => path.isObjectExpression());
 
// 查找最接近的父函数或程序：
path.getFunctionParent();
 
// 向上遍历语法树，直到找到在列表中的父节点路径
path.getStatementParent();
```

##### 获取同级路径 {#babel-find-same-level-path}

如果一个路径是在一个Function/Program中的列表里面，他就有同级节点。

- 使用path.inList来判断路径是否有同级节点
- 使用path.getSibling(index)来获取同级路径
- 使用path.key获取路径所在容器的索引
- 使用path.container获取路径的容器（包含所有同级节点的数组）
- 使用path.listKey获取容器的key

```javascript
target_js = `
var a = 1; // pathA, path.key = 0
var b = 2; // pathB, path.key = 1
var c = 3; // pathC, path.key = 2
`

export default function({ types: t }) {
    return {
        visitor: {
            VariableDeclaration(path) {
                // if the current path is pathA
                path.inList // true
                path.listKey // "body"
                paht.key // 0
                path.getSibling(0) // pathA
                path.getSibling(path.key + 1) //pathB
                path.container // [pathA, pathB, pathC]
            }
        }
    };
}
```

##### 停止遍历 {#babel-stop-traverse}

如果插件需要在某种情况下不运行，最简单的做法是尽早返回：

```text
BinaryExpression(path){
    if (path.node.operator !== '**') return;
}
```

如果在顶级路径中进行子遍历，则可以使用2个提供的API方法：

path.skip() 会跳过当前路径之后的子节点遍历；path.stop() 完全停止遍历。

#### 处理 {#babel-transfer-handle}

##### 替换一个节点 {#babel-replace-node}

```text {2}
BinaryExpression(path) {
    // 将当前BinaryExpression替换为：binaryExpression节点，该节点值为"**", left为path.node.left, right为t.numberLiteral(2)，即2。
    path.replaceWith(
        t.binaryExpression("**", path.node.left, t.numberLiteral(2))
    );
}
```

##### 用多个节点替换单个节点 {#babel-replace-node-with-many}

```javascript {2}
ReturnStatement(path) {
    path.replaceWithMultiple([
        t.expressionStatement(t.stringLiteral("Is this the real life?")),
        t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
        t.expressionStatement(
            t.stringLiteral(
                "(Enjoy singing the rest of the song in you head)"
            )
        ),
    ]);
}
```

::: tip 提示
注意，当多个节点替换一个表达式时，他们必须是声明。
因为Babel在更换节点时广泛使用启发式算法，这意味着您可以做一些疯狂的转换，否则将会非常冗长。
:::

##### 用字符串源码替换节点

```text
FunctionDeclaration(path){
    path.replaceWithSourceString(function add(a, b) {
        return a + b;
    });
}
 
// 结果：
- function square(n) {
-     return n * n
- }
+ function add(a, b) {
+     return a + b
+ }
```

::: warning 注意
不建议使用这个API，除非正在处理动态的源码字符串，否则在访问者外部解析代码更有效率
:::

##### 插入兄弟节点 {#babel-insert-sibling}

```javascript
FunctionDeclaration(path) {
    path.insertBefore(
        t.expressionStatement(
            t.stringLiteral("Because I'm easy come, easy go.")
        )
    );
    path.insertAfter(
        t.expressionStatement(
            t.stringLiteral("A little high, little low.")
        )
    );
}
 
 
// 结果
+     "Because I'm easy come, easy go.";
    function square(n) {
        return n * n;
    }
+     "A little high, little low.";
```

::: tip 提示
这里同样应该使用声明或者一个声明数组。这个使用了在用多个节点替换一个节点中提到的相同的启发式算法。
:::

##### 插入到容器（container）中 {#babel-insert-container}

如果要在AST节点属性中插入一个类似body那样的数组，其方法与insertBefore/insertAfter类似，但必须指定listKey。

```text {2,6}
ClassMethod(path) {
    path.get('body').unshiftContainer(
        'body',
        t.expressionStatement(t.stringLiteral('before'))
    );
    path.get('body').pushContainer(
        'body',
        t.expressionStatement(t.stringLiteral('after'))
    );
}
 
 
// 结果
class A{
+     "before"
    var a = 'middle';
+     "after"
}
```

##### 删除一个节点 {#babel-delete-node}

```text
FunctionDeclaration(path) {
    path.remove();
}


//结果
- function square(n) {
-     return n * n;
- }
```

##### 替换父节点 {#babel-replace-parent-node}

只需要用parentPath: path.parentPath.replaceWith即可：

```text
BinaryExpression(path) {
    path.parentPath.replaceWith(
        t.expressionStatement(
            t.stringLiteral(
                "Anyway the wind blows, doesn't really matter to me, to me."
            )
        )
    );
}

// 结果
function square(n) {
-     return n * n
+     "Anyway the wind blows, doesn't really matter to me, to me.";
}
```

##### 删除父节点 {#babel-delete-parent-node}

```text {2}
BinaryExpression(path) {
    path.parentPath.remove();
}
 
 
// 结果
function square(n) {
-     return n * n
}
```

#### 基于scope作用域的操作 {#babel-scope-operation}

##### 检查本地变量是否被绑定 {#babel-check-variable-binding}

```text
FunctionDeclaration(path) {
    if (path.scope.hasBinding("n")) {
        // ...
    }
}


// 以上操作将遍历范围树，并检查特定的绑定
FunctionDeclaration(path) {
    if (path.scope.hasOwnBinding("n")) {
        // ...
    }
}

// 这步是检查一个作用域是否有自己的绑定。
```

##### 创建一个UID {#babel-create-uid}

生成一个标识符，不会与任何本地定义的变量冲突：

```text {2,4}
FunctionDeclaration(path){
    path.scope.generateUidIdentifier("uid");
    // Node { type: "Identifier", name: "_uid" }
    path.scpoe.generateUidIdentifier("uid");
    // Node { type: "Identifier", name: "_uid2" }
}
```

##### 提升变量声明至父级作用域 {#babel-hoist-variable-declaration}

```text
FunctionDeclaration(path) {
    const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
    path.remove();
    path.scope.parent.push({ id, init: path.node });
}
 
 
// 结果
- function square(n) {
+ var _square = function square(n) {
    return n * n
- }
+ }
```

##### 重命名绑定及其引用 {#babel-rename-binding-and-reference}

```text
FunctionDeclaration(path) {
    path.scope.rename("n", "x");
}
 
 
// 结果
- function square(n) {
-     return n * n;
+ function square(x) {
+     return x * x;
}
 
 
// 或者将绑定重命名为生成的唯一标识符
FunctionDeclaration(path) {
    path.scope.rename("n");
}
 
 
// 结果
- function square(n) {
-     return n * n;
+ function square(_n) {
+     return _n * _n;
}
```

### 编写第一个babel插件 {#first-babel-plugin}

```javascript
// 源代码：
target_js = 'foo === bar'
 
// AST：
//{
//  type: "BinaryExpression",
//  operator: "===",
//  left: {
//    type: "Identifier",
//    name: "foo"
//  },
//  right: {
//    type: "Identifier",
//    name: "bar"
//  }
//}
 
// 目标是将 === 运算符左右变量名替换
export default function({ types: t}) {
    return {
        visitor: {
            BinaryExpression(path){
                if (path.node.operator !== "==="){
                    return;
                }
                path.node.left = t.identifier("x");
                path.node.rigth = t.identifier("y");
            }
        }
    }
}
 
 
// 运行结果：
x === y
```

#### 插件选项 {#babel-plugin-options}

如果想自定义Babel插件的行为，可以指定插件特定选项：

```text
{
    plugins: [
        ["my-plugin", {
            "option1": true,
            "option2": false
        }]
    ]
}
```

这些选项会通过state对象传递给插件访问者：

```text {4}
export default function({ types: t}) {
    return {
        visitor: {
            FunctionDeclaration(path, state){
                console.log(state.opts);
                //输出：
                // { option1: true, option2: false}
            }
        }
    }
}
```

这些选项特定于插件，不能访问其他插件中的选项。

##### 插件的准备和收尾工作 {#babel-plugin-pre-post}

插件可以具有在插件之前或之后运行的函数。可以用于设置或清理/分析：

```text
export default function({ types: t }) {
    return {
        pre(state) {
            this.cache = new Map();
        },
        visitor: {
            StringLiteral(path) {
                this.cache.set(path.node.value, 1);
            }
        },
        post(state) {
            console.log(this.cache);
        }
    }
}
```

##### 在插件中启用其他语法 {#babel-plugin-enable-other-grammar}

插件可以启用babylon plugins，以便用户不需要安装/启用他们。这可以防止解析错误，而不会继承语法插件。

```text
export default function({ types: t }) {
    return {
        inherits: require("babel-plugin-syntax-jsx")
    };
}
```


### babel如何编译const和let {#babel-compile-const-let}

::: tip 在线babel编译
在[Babeljs.io Try it out](https://babeljs.io/repl)可以在线查看babel转换结果（左侧TARGETS里可以输入`IE 9`）。
:::

```javascript
let value = 'a'
// babel编译后：
var value = 'a'
```

可以看到 Babel是将let编译成了var，那再来一个例子：

```javascript
if (false) {
    let value = 'a';
}
console.log(value); // value is not defined
```

如果babel将let编译为var应该打印 undefined,为何会报错呢，babel是这样编译的：

```javascript
if (false) {
    var _value = 'a';
}
console.log(value);
```

babel是改变量名，使内外层的变量名称不一样。

const修改值时报错，以及重复声明报错怎么实现的呢？其实在编译时就报错了。

**重点来了：for循环中的 let 声明呢？**

```javascript
var functions = [];
for (let i = 0; i < 3; i++) {
    functions[i] = function () {
        console.log(i);
    };
}
functions[0](); // 0
```

babel编译成了：

```javascript
var functions = [];
var _loop = function _loop(i) {
    functions[i] = function () {
        console.log(i);
    };
};
for (var i = 0; i < 3; i++) {
    _loop(i);
}
functions[0](); // 0
```

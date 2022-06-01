// import $ from 'expose-loader?$!jquery' 内联expose-loader写法
import $ from "jquery"; // externals引用后，不会重复引用导致包体积过大

const a = require("./a");
import "./index.css"
require("./a.less");
console.log("hello world");
console.log("goodbye world");
console.log($);
@log
class A {}

new A();

function log() {
  console.log("logger");
}

function* test_gen() {
  yield "生成器函数";
}

console.log(test_gen().next());

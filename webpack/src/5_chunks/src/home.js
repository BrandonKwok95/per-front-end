import './add'
import './minus'
import $ from 'jquery'
console.log('this is home')
console.log($)

let button = document.createElement('button')

button.addEventListener('click', function () {
  import('./other').then(data => {  // 异步家在文件 通过jsonp异步加载资源
    console.log(data)
  })
})

document.body.append(button)


if (module.hot) {
  module.hot.accept('./add', function() {
    console.log('文件更新成功')
  })
}

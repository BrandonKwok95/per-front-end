// i. 客户端正常发送请求
let xhr = new XMLHttpRequest()

xhr.open('GET', '/api/test', true)

xhr.onload = () => {
  console.log('ajax请求回调', xhr.response)
}

xhr.send()


// 2. 利用webpack进行MOCK数据
let xhr2 = new XMLHttpRequest()

xhr2.open('GET', '/api/mock', true)

xhr2.onload = () => {
  console.log('ajax请求回调', xhr2.response)
}

xhr2.send()

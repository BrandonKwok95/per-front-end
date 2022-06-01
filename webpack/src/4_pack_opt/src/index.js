import React from 'react'
import { render } from 'react-dom'

// resolve相关配置
import 'bootstrap'
import './style'
render(<div>hello world</div>, document.getElementById('app'))


// 环境变量
console.log('打印当前环境', ENV)

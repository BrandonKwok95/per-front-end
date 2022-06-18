import { Component } from 'react'
import logo from './logo.svg';
import axios from 'axios'

import './App.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      inputMsg: '',
      operator: ''
    }
  }

  onInputVal = (event) => {
    const { target: { value = '' } } = event
    const { inputVal } = this.state
    this.setState({
      inputVal: value,
    })
  }

  onSubmit = async () => {
    const { inputVal = '' } = this.state
    await axios.get('http://localhost:4000/tiwen/submit', {
      params: {
        name: inputVal
      }
    }).then((response) => {
      const { data: { msg = '', operator = '' } } = response
      this.setState({
        inputMsg: msg,
        operator
      })
    })
  }

  render() {
    const { inputMsg = '', operator } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <input onInput={(e) => this.onInputVal(e)}/>
          <button onClick={this.onSubmit}>提交</button>
          <p>{inputMsg}</p>
          <p>{`管理员（数据库）：${operator}`}</p>
        </header>
      </div>
    );
  }
}


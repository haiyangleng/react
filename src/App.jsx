import React, { Component } from 'react'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import {Button, message} from 'antd'
import Login from './containers/login/login'
import Admin from './containers/admin/admin'

export default class App extends Component {
  handleClick = ()=>{
    message.success('成功啦...');
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/admin' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

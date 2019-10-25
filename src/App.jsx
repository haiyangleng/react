import React, { Component } from 'react'
import {Switch,Route,Router} from 'react-router-dom'
import {Button, message} from 'antd'

import Login from './containers/login'
import Admin from './containers/admin'
import history from './history'

export default class App extends Component {
  handleClick = ()=>{
    message.success('成功啦...');
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
        <Route path='/login' component={Login} exact/>
        <Route path='/admin' component={Admin}/>
        </Switch>
      </Router>
    )
  }
}

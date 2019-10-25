import React, { Component } from 'react'
import { Layout } from 'antd'
import {Route, Switch,Redirect} from 'react-router-dom'

import WithCheckLogin from '../with-check-login'
import LeftNav from './left-nav'
import AdminHeader from './header'

import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
const { Header, Footer, Sider, Content } = Layout

@WithCheckLogin
class Admin extends Component {

  render() {
    
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <AdminHeader/>
          <Content style={{backgroundColor: 'white', margin: '30px 15px 0 15px'}}>
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/category" component={Category}/>
              <Route path="/admin/product" component={Product}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/charts/line" component={Line}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/pie" component={Pie}/>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin
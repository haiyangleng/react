import React, { Component } from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'

import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

export default class LeftNav extends Component {

  getMenuNodes_reduce = (menuList)=>{
    return menuList.reduce((pre,item)=>{
      if(!item.childen){
        pre.push((
          <Item key={item.key}>
          <Link to={`/admin${item.key}`}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Item>
        ))
      }else{
        pre.push(<SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
        </SubMenu>)
      }
      return pre
    },[])
  }

  render() {
    return (
      <div className="left-nav">
       <div className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes_reduce(menuList)}
        </Menu>
      </div>
    )
  }
}
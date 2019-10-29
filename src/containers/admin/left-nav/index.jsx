import React, { Component } from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import {setHeaderTitle} from '../../../redux/action-creators/header-title'
import './index.less'

const { SubMenu, Item } = Menu
@connect(state=>({headerTitle:state.headerTitle}),{setHeaderTitle})
@withRouter
class LeftNav extends Component {

  getMenuNodes_reduce = (menuList) => {
    
    return menuList.reduce((pre,item)=>{
      
      const path = this.props.location.pathname.substring(6)
      

      if(!item.children){
        
        if(path.indexOf(item.key)===0 && item.title !== this.props.headerTitle){
          this.props.setHeaderTitle(item.title)
        }

        pre.push((
          <Item key={`/admin${item.key}`}>
          <Link to={`/admin${item.key}`} onClick={() =>this.props.setHeaderTitle(item.title)}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
          </Item>
        ))
      }else{
        
        if(item.children.some(item=>path.indexOf(item.key)===0)){
          this.openKey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
          {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
      }
      return pre
    },[])
  }
  
  render() {
    const menuNodes = this.getMenuNodes_reduce(menuList)
    const selectedKey = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div className="left-nav">
       <div className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys = {[selectedKey]}
          defaultOpenKeys = {[openKey]}
        >
          {menuNodes}
        </Menu>
      </div>
    )
  }
}
export default LeftNav
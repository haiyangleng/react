import React, { Component } from 'react'
import {Form,Icon,Button,Input} from 'antd'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {loginAsync} from '../../redux/action-creators/user'
import logo from './images/logo.png'
import "./login.less";
//import ajax from '../../api/ajax'

const {Item} = Form
class Login extends Component {
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {username,password} = values
        this.props.loginAsync(username,password)
      }
    });
  }
  validatePwd = (rule, value, callback)=>{
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码不能小于4位')
    } else if (value.length>12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }
  render() {
    const {hasLogin} = this.props
    if(hasLogin){
      return <Redirect to='/admin'/>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                initialValue:'',
                rules: [{ required: true, message: '用户名是必须' },
                {min: 4, message: '用户名不能小于4位'},
                {max: 12, message: '用户名不能大于12位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
              ],
              })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
                )}
              </Item>
              <Form.Item>
                 {getFieldDecorator('password', {
                   initialValue: '',
                   rules: [
                      {validator:this.validatePwd}],
                })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"    className="login-form-button">登陆</  Button>
              </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
// const WrapperForm = Form.create()(Login)
// export default WrapperForm
export default connect(
  state => ({hasLogin:state.user.hasLogin}),
  {loginAsync}
)(Form.create()(Login))
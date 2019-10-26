import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import {Modal,Button,Icon} from 'antd'
import screenfull from 'screenfull'

import LinkButton from '../../../components/link-button'
import {removeUserToken} from '../../../redux/action-creators/user'
import './index.less'
import {reqWheather} from '../../../api'

@connect(
  state =>({username:state.user.user.username,headerTitle:state.headerTitle}),
  {removeUserToken}
)
@withRouter
class Header extends Component{
  state = {
    currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  logout = () => {
    Modal.confirm({
      title:'确认退出吗?',
      onOk:()=>{
        this.props.removeUserToken()
      },
      onCancel(){
        console.log('cancel')
      }
    })
  }
  showWeather = async ()=>{
    const {dayPictureUrl, weather} = await reqWheather('北京')
    this.setState({
      dayPictureUrl, 
      weather
    })
  }
  handleFullScreen = ()=>{
    if(screenfull.isEnabled){
      screenfull.toggle()
    }
  }
  
  componentDidMount(){
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
    this.showWeather();
    screenfull.onchange(()=>{
      this.setState({
        isFullScreen:!this.state.isFullScreen
      })
    })
  }
  componentWillUnmount () {
    clearInterval(this.intervalId)
  }
  render(){
    const path = this.props.location.pathname
    const {currentTime,isFullScreen} = this.state
    const {username,headerTitle} = this.props
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button> &nbsp;
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={this.state.dayPictureUrl} alt="weather"/>
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header

import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd'
import {reqCategorys} from '../../api'
import LinkButton from '../../components/link-button'
const columns = [
  {
    title:'分类名称',
    dataIndex:'name'
  },
  {
    width:300,
    title:'操作',
    render:()=>{return <LinkButton>修改分类</LinkButton>}
  }
]
/* 
Admin的用户管理子路由组件
*/
export default class Category extends Component {
  state = {
    categorys:[],
    loading:false
  }
  getCategorys = async ()=>{
    const result = await reqCategorys()
    console.log(result)
    this.setState({
      loading:false
    })
    if(result.status === 0){
      const categorys = result.data
      this.setState({
        categorys
      })
    }else{
      message.error(result.msg)
    }
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {categorys,loading} = this.state
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table 
          bordered
          loading={loading}
          dataSource={categorys} 
          columns={columns} 
          rowKey="_id"
          pagination={{pageSize: 5, showQuickJumper: true}}
        />
      </Card>
    )
  }
}
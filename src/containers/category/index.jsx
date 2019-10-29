import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd'
import {connect} from 'react-redux'
import {
  getCategorysAsync, 
  addCategoryAsync, 
  updateCategoryAsync
} from '../../redux/action-creators/categorys'

import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'

/* 
Admin的用户管理子路由组件
*/
@connect (
  state => ({categorys: state.categorys}),
  {getCategorysAsync, addCategoryAsync,updateCategoryAsync}
)
class Category extends Component {
  state = {
    isShowUpdate: false,
    isShowAdd: false,
    loading:false
  }

  columns = [
    {
      title:'分类名称',
      dataIndex:'name'
    },
    {
      width:300,
      title:'操作',
      // 如果没有指定dataIndex, 接收数据对象参数, 如果指定了dataIndex, 接收对应值的参数
      render:(category)=>{return <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton>}
    }
  ]
  
  getCategorys = async ()=>{
    this.setState({
      loading:true
    })
    const msg = await this.props.getCategorysAsync()
    
    this.setState({
      loading:false
    })
    if(msg){
      message.error(msg)
    }
  }

  addCategory = ()=>{
    this.form.validateFields(async(error,values)=>{
      if(!error){
        const {categoryName} = values
        const msg = await this.props.addCategoryAsync(categoryName)
        if(msg){
          message.error(msg)
        }else{
          this.setState({
            isShowAdd:false
          })
          message.success('添加分类成功')
        }
      }
    })
  }
  hideAdd =() =>{
    this.form.resetFields()
    this.setState({
      isShowAdd:false
    })
  }
  updateCategory = () =>{
    this.form.validateFields(async(error,values)=>{
      if(!error){
        const {categoryName} = values
        
        const categoryId = this.category._id
        const msg = await this.props.updateCategoryAsync({categoryId,categoryName})
        if(msg){
          message.error(msg)
        }else{
          this.setState({
            isShowUpdate:false
          })
          message.success('更新分类成功')
        }
      }
    })
  }
  showUpdate = (category) =>{
    this.category = category
    this.setState({
      isShowUpdate:true
    })
  }

  hideUpdate = () =>{
    delete this.category
    this.form.resetFields()
    this.setState({
      isShowUpdate:false
    })
  }

  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {loading, isShowAdd, isShowUpdate} = this.state
    const {categorys} = this.props
    const category = this.category || {}
    const extra = (
      <Button type="primary" onClick={()=>{this.setState({
        isShowAdd:true
      })}}>
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
          columns={this.columns} 
          rowKey="_id"
          pagination={{pageSize: 5, showQuickJumper: true}}
        />
        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd}
        >
          <AddUpdateForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
        >
          <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name}/>
        </Modal>
      </Card>
    )
  }
}
export default Category
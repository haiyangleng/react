import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

export const reqLogin = ({username,password}) =>ajax({
  url:'/login',
  method:'POST',
  data:{username,password}
})

export const reqUsers = ()=> ajax({
  url:'/manage/user/list',
  method:'GET'
})

export const reqWheather = (city)=>{
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url,{},(err,data)=>{
      if(!err){
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else{
        message.error('获取天气失败!')
        return new Promise(()=>{})
      }
    })
  })
}
/* 
获取所有分类的列表
*/
export const reqCategorys = () => ajax('/manage/category/list')
/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',{categoryName})
/* 
更新分类
*/
export const reqUpdateCategory = ({categoryId, categoryName})=>ajax({
  url:'/manage/category/update',
  method:'POST',
  data:{categoryId, categoryName}
})
/* 
获取商品分页列表
*/
export const reqProducts = (pageNum,pageSize) => ajax({
  url:'/manage/product/list',
  params:{
    pageNum,
    pageSize
  }
})
/* 
根据分类ID获取分类
*/
export const reqCategory = (id)=>ajax({
  url: '/manage/category/info',
  params:{
    categoryId:id
  }
})
/* 
搜索获取商品分页列表
*/
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType,
  searchName
})=>ajax({
  url:'/manage/product/search',
  params:{
    pageNum,
    pageSize,
    [searchType]:searchName
  }
})
/* 
更新商品状态
*/
export const reqUpdateProductStatus = (productId,status) =>ajax({
  url:'/manage/product/updateStatus',
  method:'POST',
  data:{
    productId,
    status
  }
})
/* 
根据商品ID获取商品
*/
export const reqProductById = (id) => ajax({
  url:'/manage/product/info',
  params:{productId: id}
})
/* 
添加或更新商品
*/
export const reqAddUpdateProduct = (product) => ajax.post('/manage/product/' + (product._id ? 'update' : 'add'),product)
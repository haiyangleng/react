import React from 'react'
import {connect} from 'react-redux'
import Counter from '../components/counter'
import {increment,decrement,incrementAsync} from '../redux/action-creators/count'

// const mapStateToprops = state => ({count:state})
// const mapDispatchToprops = (dispatch) =>({
//   increment:number => dispatch(increment(number)),
//   decrement:number => dispatch(decrement(number))
// })
export default connect(
  state => ({count:state.count}),
  {increment,decrement,incrementAsync}
)(Counter)
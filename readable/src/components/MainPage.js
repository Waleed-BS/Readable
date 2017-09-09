import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories } from '../actions/Categories_Action'
import Categories from './Categories'

class MainPage extends Component {


  render() {

    return (

      <div className='container'>
        <Categories/>

      </div>

    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

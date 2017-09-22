import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { withRouter } from 'react-router'

/*
imported actions:
*/
import { getCategories } from '../actions/Categories_Action'

/*
imported components:
*/
import React, { Component } from 'react';

class Categories extends Component {

  state = {

  }

  componentDidMount() {
    const { getCategoriesDispatch } = this.props
    ReadableAPI.getAllCategories().then((data) => {
      // dispatch action to get categories from backend server
      getCategoriesDispatch(data)
    })
  }

  render() {

    const { categories } = this.props
    console.log("Categories is rendering..")

    return (

      <div className="Categories">

        <Breadcrumb>

          <BreadcrumbItem>
            <Link to='/'> All Categories </Link>
          </BreadcrumbItem>
          {
            categories.display &&
            categories.display.map( (category) => (
              <BreadcrumbItem key={category.path}>
                <Link key={category.path} to={'/'+category.path}>
                <span >{category.name}</span>
              </Link>
            </BreadcrumbItem>))
          }

        </Breadcrumb>

      </div>
    );

  }
}


function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategoriesDispatch: (data) => dispatch(getCategories({categories: data}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))

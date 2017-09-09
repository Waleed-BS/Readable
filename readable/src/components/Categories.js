import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions/Categories_Action'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class Categories extends Component {

  /*
  what i did:
  - set up ReadableAPI to interect with the backend data
  - got all categories from the backend
  todo:
  - display the categories
  */

  componentDidMount() {
    const { getCategories } = this.props
    ReadableAPI.getAllCategories().then((data) => {
      getCategories(data)
    })
  }

  render() {

    let { selectedCode, onSelect } = this.props;

    const { categories } = this.props

    return (

      <div className="Categories">

        <Link to="/create_post">Create a post</Link>

        {console.log("categories", categories)}
        {console.log("categories.display", categories.display)}

        <Breadcrumb >
          <BreadcrumbItem active>All Categories</BreadcrumbItem>
          { categories.display &&
            categories.display.map( (category) => (
              <BreadcrumbItem>
                <Link key={category.path} to={'/'+category.path} >{category.name}</Link>

              </BreadcrumbItem>
            ))
          }
        </Breadcrumb>


        {/* <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem active>Library</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb> */}

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
    getCategories: (data) => dispatch(getCategories({categories: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)


// import '../App.css'
import { } from "reactstrap";
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
// import * as ReadableAPI from '../utils/ReadableAPI'

/*
imported actions:
*/
import { getCategories } from '../actions/Categories_Action'

/*
imported components:
*/
import React, { Component } from 'react';
import Categories from './Categories'
import ListPosts from './ListPosts'

class Readable extends Component {

  /*
  what i did:
  - set up ReadableAPI to interect with the backend data
  - fetched all categories from the backend in new Categories component
  - used reactstrap to style the displayed categories
  - set up a router, each category has a path: /<category path>

  todo:
  - List all posts from every categories in the root path: /
  - List posts from specific categories
  - Sort posts by (VOTE) and (TIME)
  */

  // componentDidMount() {
  //   const { getCategories } = this.props
  //   ReadableAPI.getAllCategories().then((data) => {
  //     getCategories(data)
  //   })
  // }

  render() {
    return (

      <div className="App">

        <Route exact path='/' render={() => (
          <Categories/>

        )}/>
        {/* <ListPosts/> */}
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

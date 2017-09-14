import '../App.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap'


/*
imported components:
*/
import React, { Component } from 'react';
import Categories from './Categories'
import ListPosts from './ListPosts'

class Main extends Component {

  directToCreatePage = () => {
    this.props.history.push("/createpost")
  }

  render() {
    console.log("Main is rendering..")

    return (

      <div>
        <Button onClick={this.directToCreatePage} className="CreateButton" color="info">
          Create Post
        </Button>

        <Categories/>
        <ListPosts/>

      </div>

    );
  }

}



export default withRouter(connect()(Main))

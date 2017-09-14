import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'
import { Jumbotron, Button } from 'reactstrap'
/*
imported actions:
*/
import { editPost, deletePost } from '../actions/Posts_Actions'

/*
imported components:
*/
import React, { Component } from 'react';
import Categories from './Categories'
import ListComments from './ListComments'

class PostInfo extends Component {

  state = {

  }

  componentDidMount() {

    const { match } = this.props
    ReadableAPI.getPost(match.params.postId).then((data) => {
      this.setState(data)
    })

  }

  voteClickedOnPost = (option) => {
    const { post } = this.props
    ReadableAPI.voteOnPost(post.id, option).then((data) => {
      editPost(data)
    })

  }

  deletePost = () => {

    const { post } = this.props

    ReadableAPI.deletePost(post.id).then((data) => {

      deletePost(post.id)

      this.props.history.push("/")

    })

  }

  editPost = () => {

    const { post, title, body } = this.props

    ReadableAPI.editPost(post.id, title, body).then((data) => {

      editPost(post.id)

    })

  }

  directToUpdatePage = () => {
    this.props.history.push("/updatepost/"+this.props.match.params.postId)
  }

  render() {

    console.log("PostInfo is rendering..")
    const { body, timestamp, author } = this.state

    return (

      <div className="PostInfo">

        <Categories/>

        <p>posted {timeago().format(timestamp)} by {author}</p>
        <Jumbotron>
          <h3 className="display-3">{this.state.title}</h3>
          <hr className="my-2" />
          <p>{body}</p>
          <p className="lead">
            <Button onClick={this.directToUpdatePage} color="success">Edit Post</Button>
            <Button color="danger">Delete Post</Button>
          </p>
        </Jumbotron>

        <ListComments/>

      </div>

    );
  }

}


export default withRouter(connect()(PostInfo))

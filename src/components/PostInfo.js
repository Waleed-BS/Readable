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
    votes: 0
  }

  componentDidMount() {

    const { match } = this.props
    ReadableAPI.getPost(match.params.postId).then((data) => {
      this.setState(data)
      this.setState({
        votes: data.voteScore
      })
    })

  }

  voteClickedOnPost = (option) => {
    const { match } = this.props
    ReadableAPI.voteOnPost(match.params.postId, option).then((data) => {
      this.setState({
        votes: data.voteScore
      })
    })

  }

  deletePost = () => {

    const { match, deletePostDispatch, post } = this.props

    ReadableAPI.deletePost(match.params.postId).then((data) => {

      deletePostDispatch(post)

      this.props.history.push("/")

    })

  }

  editPost = () => {

    const { post, title, body, editPostDispatch } = this.props

    ReadableAPI.editPost(post.id, title, body).then((data) => {

      editPostDispatch(post.id)

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

        <div className="voteScore">
          <button className="social-like" onClick={() => this.voteClickedOnPost('upVote')}>
            <span className="like"><i className="glyphicon glyphicon-thumbs-up"></i></span>
          </button>

          {" "+ this.state.votes + " "}

          <button className="social-dislike" onClick={() => this.voteClickedOnPost('downVote')}>
            <span className="like"><i className="glyphicon glyphicon-thumbs-down"></i></span>
            {/* <span className="dislike" >0</span> */}
          </button>

        </div>

        <p>posted {timeago().format(timestamp)} by {author}</p>
        <Jumbotron>
          <h3 className="display-3">{this.state.title}</h3>
          <hr className="my-2" />
          <p>{body}</p>
          <p className="lead">
            <Button onClick={this.directToUpdatePage} color="success">Edit Post</Button>
            <Button onClick={this.deletePost} color="danger">Delete Post</Button>
          </p>
        </Jumbotron>

        <ListComments/>

      </div>

    );
  }

}


function mapDispatchToProps (dispatch) {
  return {
    editPostDispatch: (data) => dispatch(editPost({post: data})),
    deletePostDispatch: (data) => dispatch(deletePost({postId: data}))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PostInfo))

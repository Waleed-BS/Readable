import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'

/* icons: */
import clock_icon from '../assets/icons/clock.png'
import like_icon from '../assets/icons/like_button.png'
/* actions: */
import { editPost, deletePost } from '../actions/Posts_Actions'

/* components: */
import React, { Component } from 'react';
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
        <div className="container">
          <div className="post-detail">
            <div className="edit-delete-wrapper">
              <button onClick={this.directToUpdatePage} color="success">Edit</button>
              <button onClick={this.deletePost} color="danger">Delete</button>
            </div>
            <br/>
            <br/>
            <div className="post-title">
              <h1>{this.state.title}</h1>
            </div>
            <hr/>
            <div className="post-author-time">
              <p>posted by <span>{author}</span></p>
              <p>
                {timeago().format(timestamp) + " "}
                <img alt="Time of the post" height="15" width="15" src={clock_icon}></img>
              </p>
              <p>
                <img className="like" src={like_icon} alt="Like post" width="15" height="15" onClick={() => this.voteClickedOnPost('upVote')}></img>
                <span>{"  " + this.state.votes + "  "}</span>
                <img className="dislike" src={like_icon} alt="Dislike post" width="15" height="15" style={{transform: "rotate(180deg)"}} onClick={() => this.voteClickedOnPost('downVote')}></img>
              </p>
            </div>
            <div className="post-body">
              <p>{body}</p>
            </div>
          </div>
          <ListComments/>
        </div>

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

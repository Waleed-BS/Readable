import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Link } from 'react-router-dom'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'

/* icons: */
import like_icon from '../assets/icons/like_button.png'
import comment_icon from '../assets/icons/comment.png'
/* actions: */
import { editPost, deletePost } from '../actions/Posts_Actions'
import { getComments } from '../actions/Comments_Actions'

/* components: */
import React, { Component } from 'react';

class Post extends Component {

  state = {
    numberOfComments: 0
  }

  componentDidMount() {

    const { getCommentsDispatch, passedPost } = this.props

    ReadableAPI.getComments(passedPost.id).then((data) => {
      const filteredComments = data.filter( (comment) => comment.deleted !== true )

      // dispatch action to get all comments from backend server
      getCommentsDispatch(filteredComments)
      // console.log("filteredComments", filteredComments)
      this.setState({
        numberOfComments: filteredComments.length
      })
    })

  }

  voteClickedOnPost = (option) => {
    const { passedPost, editPostDispatch } = this.props
    ReadableAPI.voteOnPost(passedPost.id, option).then((data) => {
      editPostDispatch(data)
    })


  }

  deletePost = () => {

    const { passedPost, deletePostDispatch } = this.props

    ReadableAPI.deletePost(passedPost.id).then((data) => {

      deletePostDispatch(passedPost.id)

    })

    this.props.history.push('/');

  }

  directToUpdatePage = () => {
    this.props.history.push("/updatepost/"+this.props.passedPost.id)
  }

  render() {

    const { passedPost } = this.props;

    console.log("Post is rendering..")

    return (
      <div className="post">

        <div className="vote-container">
          <img src={like_icon} alt="Like post" width="15" height="15" onClick={() => this.voteClickedOnPost('upVote')}></img>
          {" "+ passedPost.voteScore + " "}
          <img src={like_icon} alt="Dislike post" width="15" height="15" style={{transform: "rotate(180deg)"}} onClick={() => this.voteClickedOnPost('downVote')}></img>
        </div>
        <div className="post-content-container">
          <Link to={'/'+passedPost.category+'/'+passedPost.id}>
          <h4>{passedPost.title}</h4>
          </Link>
          <p>posted by {passedPost.author + " | " + timeago().format(passedPost.timestamp) } </p>
        </div>
        <div className="message-wrapper">
          <img src={comment_icon} alt="Number of comments" width={20} height={20}/>
          <span className="comment-count"> {this.state.numberOfComments} </span>
        </div>
        <div className="edit-delete-wrapper">
          <button size="sm" onClick={this.directToUpdatePage}>Edit </button>
          <button size="sm" onClick={this.deletePost}>Delete </button>
        </div>
        <br></br>

      </div>
    );
  }
}

function mapStateToProps({ comments, posts }) {
  return {
    comments,
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPostDispatch: (data) => dispatch(editPost({post: data})),
    deletePostDispatch: (data) => dispatch(deletePost({postId: data})),
    getCommentsDispatch: (data) => dispatch(getComments({comments: data})),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))

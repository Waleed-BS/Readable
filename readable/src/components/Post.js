import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Link } from 'react-router-dom'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap'
/*
imported actions:
*/
import { editPost, deletePost } from '../actions/Posts_Actions'

/*
imported components:
*/
import React, { Component } from 'react';

class Post extends Component {

  voteClickedOnPost = (option) => {
    const { passedPost, editPostDispatch } = this.props
    ReadableAPI.voteOnPost(passedPost.id, option).then((data) => {
      editPostDispatch(data)
      // this.setState({
      //   votes: data.voteScore
      // })
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

    const { passedPost } = this.props
    console.log("Post is rendering..")
    return (

      <div>

        <div className="postView">

          <h4>
            <br></br>
            <p className="lead">
              <Button onClick={this.directToUpdatePage} color="success">Edit Post</Button>
              <Button onClick={this.deletePost} color="danger">Delete Post</Button>
            </p>

            <p className="postTime"> <span className="author"> by {passedPost.author} </span> { timeago().format(passedPost.timestamp) } </p>

            <Link className="postTitle" to={'/'+passedPost.category+'/'+passedPost.id}>
            {passedPost.title}</Link>
            {/*
              todo:
              if post is recent, display:
              <Badge>New</Badge>
              */
            }
            {"  "}
            <br></br>
            <br></br>
            <div className="voteScore">
              <button className="social-like" onClick={() => this.voteClickedOnPost('upVote')}>
                <span className="like"><i className="glyphicon glyphicon-thumbs-up"></i></span>
              </button>

              {" "+ passedPost.voteScore + " "}

              <button className="social-dislike" onClick={() => this.voteClickedOnPost('downVote')}>
                <span className="like"><i className="glyphicon glyphicon-thumbs-down"></i></span>
                {/* <span className="dislike" >0</span> */}
              </button>

            </div>

            <br></br>

          </h4>
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

export default withRouter(connect(null, mapDispatchToProps)(Post))
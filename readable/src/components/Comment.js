import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'
import { Button, Input } from 'reactstrap'

/*
imported actions:
*/
import { deleteComment, editComment, addComment } from '../actions/Comments_Actions'

/*
imported components:
*/
import React, { Component } from 'react';

class Comment extends Component {

  state = {
    body: this.props.passedComment.body,
    isEditClicked: false,
  }

  voteClickedOnComment = (option) => {
    const { passedComment } = this.props
    ReadableAPI.voteOnComment(passedComment.id, option).then((data) => {
      editComment(data)
    })

  }

  deleteComment = () => {

    const { passedComment } = this.props

    ReadableAPI.deleteComment(passedComment.id).then((data) => {

      deleteComment(passedComment.id)

    })

  }


  setIsEditClickedToTrue = () => {
    this.setState({
      isEditClicked: true
    })
  }

  // if isEditClicked == true
  editComment = () => {

    const { passedComment } = this.props
    const { body, isEditClicked } = this.state

    const bodyAndTime = {
      body: body,
      timestamp: Date.now()
    }

    ReadableAPI.editComment(passedComment.id, bodyAndTime).then((data) => {
      editComment(data)
    })

    this.setState({
      isEditClicked: false
    })

    console.log("isEditClicked is set to", isEditClicked)

  }

  handleBodyChange = (event) => {
    this.setState({
      body: event.target.value
    })
  }

  render() {

    const { passedComment } = this.props
    const { isEditClicked, body } = this.state

    console.log("Comment is rendering..")
    return (

      <div>

        <div className="commentView">

          <h7>
            <br></br>


            <p className="lead">
              <Button onClick={this.setIsEditClickedToTrue} color="success">Edit Comment</Button>
              <Button onClick={this.deleteComment} color="danger">Delete Comment</Button>
            </p>


            {
              isEditClicked ? (
                <div>
                  <Input value={body} onChange={this.handleBodyChange}/>
                  <Button onClick={this.editComment} color="primary">Submit</Button>
                </div>
              ) : (
                <div>
                  <p className="commentTime"> <span className="commentAuthor"> by {passedComment.author}
                  </span> {timeago().format(passedComment.timestamp)} </p>
                  <p className="commentTime"> <span className="commentBody"> {passedComment.body} </span></p>
                </div>
              )
            }

            {"  "}


            <div className="voteScore">
              <button className="social-like" onClick={() => this.voteClickedOnComment('upVote')}>
                <span className="like"><i className="glyphicon glyphicon-thumbs-up"></i></span>
              </button>

              {" "+ passedComment.voteScore + " "}

              <button className="social-dislike" onClick={() => this.voteClickedOnComment('downVote')}>
                <span className="like"><i className="glyphicon glyphicon-thumbs-down"></i></span>
                {/* <span className="dislike" >0</span> */}
              </button>

            </div>

            <br></br>

          </h7>

        </div>




      </div>

    );
  }

}

function mapStateToProps ({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (data) => dispatch(editComment({ comment: data})),
    deleteComment: (data) => dispatch(deleteComment({ commentId: data})),
    addComment: (data) => dispatch(addComment({comment: data}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))

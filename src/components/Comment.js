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
    const { passedComment, editCommentDispatch } = this.props
    ReadableAPI.voteOnComment(passedComment.id, option).then((data) => {
      editCommentDispatch(data)
    })

  }

  deleteComment = () => {

    const { passedComment, deleteCommentDispatch } = this.props

    ReadableAPI.deleteComment(passedComment.id).then((data) => {

      deleteCommentDispatch(passedComment.id)

    })

  }


  setIsEditClickedToTrue = () => {
    this.setState({
      isEditClicked: true
    })
  }

  // if isEditClicked == true
  editComment = () => {

    const { passedComment, editCommentDispatch } = this.props
    const { body, isEditClicked } = this.state

    const bodyAndTime = {
      body: body,
      timestamp: Date.now()
    }

    if(!body) {
      this.setState({
        inputError: 'Please enter a text for the body'
      })
      return;
    }

    ReadableAPI.editComment(passedComment.id, bodyAndTime).then((data) => {
      editCommentDispatch(data)
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

            {
              this.state.inputError &&
              (
                <div style={{ fontSize: 15, marginTop: 40, marginBottom: 40, color: 'red' }}>ERROR!: {this.state.inputError}</div>
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
    editCommentDispatch: (data) => dispatch(editComment({ comment: data})),
    deleteCommentDispatch: (data) => dispatch(deleteComment({ commentId: data})),
    addCommentDispatch: (data) => dispatch(addComment({comment: data}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import timeago from 'timeago.js'
import { withRouter } from 'react-router'
import { Button, Input } from 'reactstrap'

/* icons: */
import like_icon from '../assets/icons/like_button.png'
import clock_icon from '../assets/icons/clock.png'
/* actions: */
import { deleteComment, editComment, addComment } from '../actions/Comments_Actions'

/* components: */
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
      <div className="comment">

        <br></br>
        {isEditClicked ? (<div>
          <Input value={body} onChange={this.handleBodyChange}/>
          <Button style={{margin: "15px"}} onClick={this.editComment} color="primary">Submit</Button>
        </div>) : (<div className="comment-content-container">
          <div className="flex">
            <p className="comment-author">{passedComment.author}</p>
            <p className="comment-time">{timeago().format(passedComment.timestamp)}</p>
            <img alt="Time of comment" height="15" width="15" src={clock_icon}></img>
          </div>
          <p className="comment-body">{passedComment.body}</p>
        </div>)}

        {this.state.inputError && ( <div style={{ fontSize: 15, marginTop: 40, marginBottom: 40, color: 'red' }}>
          ERROR!: {this.state.inputError}
        </div>)}

        <div className="edit-delete-wrapper">
          <img className="like" alt="Like comment" src={like_icon} width="15" height="15" onClick={() => this.voteClickedOnComment('upVote')}></img>
          <span>{" " + passedComment.voteScore + " "}</span>
          <img className="dislike" alt="Dislike comment" src={like_icon} width="15" height="15" style={{transform: "rotate(180deg)"}} onClick={() => this.voteClickedOnComment('downVote')}></img>
          <button style={{fontSize: 10, marginLeft: "20px"}} onClick={this.setIsEditClickedToTrue}>Edit</button>
          <button style={{fontSize: 10}} onClick={this.deleteComment}>Delete</button>
        </div>

        <br/>

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

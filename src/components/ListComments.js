import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { ButtonGroup, Button, Form, FormGroup, Label, Input  } from 'reactstrap'
import { withRouter } from 'react-router'
import uuidv4 from 'uuid/v4'

/* icons */
import comment_icon from '../assets/icons/comment.png'

/* actions: */
import { getComments, deleteComment, editComment, addComment } from '../actions/Comments_Actions'

/* components: */
import React, { Component } from 'react';
import Comment from './Comment'

class ListComments extends Component {

  state = {
    sortMethod: 'vote',
    voteIsClicked: 'primary',
    timeIsClicked: 'secondary',
    newBody: '',
    newAuthor: '',
    inputError: null,
  }

  componentDidMount() {

    const { getCommentsDispatch, match } = this.props

    ReadableAPI.getComments(match.params.postId).then((data) => {
      const filteredComments = data.filter( (comment) => comment.deleted !== true )

      // dispatch action to get all comments from backend server
      getCommentsDispatch(filteredComments)

    })

  }

  setSortByTime = () => {
    this.setState({
      sortMethod: 'time',
      timeIsClicked: 'primary',
      voteIsClicked: 'secondary',
    })
  }

  setSortByVotes = () => {
    this.setState({
      sortMethod: 'vote',
      timeIsClicked: 'secondary',
      voteIsClicked: 'primary',
    })
  }

  handleNewBodyChange = (event) => {
    this.setState({
      newBody: event.target.value,
      inputError: null,
    })

  }

  handleNewAuthorChange = (event) => {
    this.setState({
      newAuthor: event.target.value,
      inputError: null,
    })
  }

  addComment = () => {

    const { newBody, newAuthor } = this.state
    const { match, addCommentDispatch } = this.props

    if(!this.state.newAuthor) {
      this.setState({
        inputError: 'Please enter a text for the author'
      })
      return;
    }

    if(!this.state.newBody) {
      this.setState({
        inputError: 'Please enter a text for the body'
      })
      return;
    }

    const newComment = {
      id: uuidv4(),
      timestamp: Date.now(),
      body: newBody,
      author: newAuthor,
      parentId: match.params.postId
    }

    ReadableAPI.createComment(newComment).then((data) => {
      addCommentDispatch(data)
    })

    this.setState({
      newAuthor: '',
      newBody: ''
    })

  }

  render() {

    const { comments } = this.props
    const { newBody, newAuthor } = this.state
    console.log("ListComments is rendering..")

    // if ( !comments.display ){
    //   return(<div>Displaying Comments..</div>)
    // }


    let listComments = []


    if (this.state.sortMethod === 'time') {
      listComments = listComments.concat(comments.display)
      .sort((a, b) => a.timestamp < b.timestamp)
    } else if (this.state.sortMethod === 'vote') {
      listComments = listComments.concat(comments.display)
      .sort((a, b) => a.voteScore < b.voteScore)
    } else {
      listComments = listComments.concat(comments.display)
    }

    return (
      <div className="listcomments">

        <Form>
          <FormGroup>
            <Label size="sm" for="exampleText">Add a new comment...</Label>
            <span
              style={{
                padding: 5,
                marginLeft: 30,
                color: "rgb(2, 123, 254)"
              }}>
              {comments.display && comments.display.length}
            </span>
            <img alt="Number of comments" width="15" height="15" src={comment_icon}/>
            <Input value={newAuthor} onChange={this.handleNewAuthorChange} type="text" name="text" bsSize="sm" placeholder="Nickname" />
            <br/>
            <Input value={newBody} onChange={this.handleNewBodyChange} type="textarea" name="text" placeholder="Write your comment here" />
          </FormGroup>
          <Button onClick={this.addComment} color='primary'>Submit</Button>
        </Form>
        {
          this.state.inputError &&
          (
            <div style={{ fontSize: 15, marginTop: 40, marginBottom: 40, color: 'red' }}>ERROR!: {this.state.inputError}</div>
          )
        }
        <br></br>
        <br></br>
        <ButtonGroup className="sortbutton" size="sm">
          <Button
            // active={true}
            color={`${this.state.timeIsClicked}`}
            onClick={this.setSortByTime}>
            Time
          </Button>
          <Button
            color={`${this.state.voteIsClicked}`}
            onClick={this.setSortByVotes}>
            Vote
          </Button>
        </ButtonGroup>
        <ol className="comments-grid">
        {comments.display && listComments.map( (comment, index) =>
          <li key={index}>
            <Comment key={comment.id} passedComment={comment}/>
          </li>
        )}
        </ol>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editCommentDispatch: (data) => dispatch(editComment({ comment: data})),
    deleteCommentDispatch: (data) => dispatch(deleteComment({ commentId: data})),
    addCommentDispatch: (data) => dispatch(addComment({comment: data})),
    getCommentsDispatch: (data) => dispatch(getComments({comments: data})),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))

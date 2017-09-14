import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { ButtonGroup, Button, Form, FormGroup, Label, Input  } from 'reactstrap'
import { withRouter } from 'react-router'
import uuidv4 from 'uuid/v4'

/*
imported actions:
*/
import { getComments, deleteComment, editComment, addComment } from '../actions/Comments_Actions'

/*
imported components:
*/
import React, { Component } from 'react';
import Comment from './Comment'

class ListComments extends Component {

  state = {
    sortMethod: 'vote',
    voteIsClicked: 'primary',
    timeIsClicked: 'secondary',
    newBody: '',
    newAuthor: ''
  }

  componentDidMount() {

    const { getComments, match } = this.props

    ReadableAPI.getComments(match.params.postId).then((data) => {
      const filteredComments = data.filter( (comment) => comment.deleted !== true )
      // dispatch action to get all comments from backend server
      getComments(filteredComments)
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
      newBody: event.target.value
    })
  }

  handleNewAuthorChange = (event) => {
    this.setState({
      newAuthor: event.target.value
    })
  }

  addComment = () => {

    const { newBody, newAuthor } = this.state
    const { match } = this.props

    const newComment = {
      id: uuidv4(),
      timestamp: Date.now(),
      body: newBody,
      author: newAuthor,
      parentId: match.params.postId
    }

    ReadableAPI.createComment(newComment).then((data) => {
      addComment(data)
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

      <div className="ListComments">

        <ButtonGroup size="sm">
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

        {
          comments.display &&
          listComments.map( (comment) =>
          <Comment passedComment={comment}/>)
        }

        <Form>

          <FormGroup>
            <Label for="exampleText">Post New Comment</Label>
            <Input value={newAuthor} onChange={this.handleNewAuthorChange} type="text" name="text" placeholder="Username" />

            <Input value={newBody} onChange={this.handleNewBodyChange} type="text" name="text" placeholder="Write your comment here" />
          </FormGroup>

          <Button onClick={this.addComment} color='primary'>Submit</Button>

        </Form>

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
    editComment: (data) => dispatch(editComment({ comment: data})),
    deleteComment: (data) => dispatch(deleteComment({ commentId: data})),
    addComment: (data) => dispatch(addComment({comment: data})),
    getComments: (data) => dispatch(getComments({comments: data})),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))

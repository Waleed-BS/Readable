import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router'
import uuidv4 from 'uuid/v4'


/*
imported components:
*/
import React, { Component } from 'react';
import Categories from './Categories'

class CreatePost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: '',
  }

  componentDidMount() {
    this.checkIfEdit()
  }

  checkIfCreateOrEdit = () => {

    if (this.postId) {
      this.updatePost()
      console.log("updatePost() is called")
    } else {
      console.log("createPost() is called")
      this.createPost()
    }

  }

  checkIfEdit = () => {

    const { match } = this.props

    if (match.params.postId) {
      this.postId = match.params.postId;
    }
    console.log("this.match.params", match.params.postId)

    if (this.postId) {
      ReadableAPI.getPost(match.params.postId).then((data) => {
        this.setState(data)
      })
    }
  }

  updatePost = () => {

    const { title, body } = this.state

    ReadableAPI.editPost( this.postId, title, body).then((data) => {
      this.props.history.push("/")
    })
  }

  createPost = () => {

    const newPost = {
      id: uuidv4(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    ReadableAPI.createPost(newPost).then((data) => {
      this.props.history.push("/")
    })

  }

  authorUpdate = (event) => {
    this.setState({
      author: event.target.value
    })
  }

  titleUpdate = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  bodyUpdate = (event) => {
    this.setState({
      body: event.target.value
    })
  }

  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value
    })
  }

  render() {
    console.log("CreatePost is rendering..")
    const{ categories } = this.props

    return (

      <div className="CreatePost">

        <Categories/>

        <br>
        </br>

        <Form>
          {!this.postId ? (
            <FormGroup>
              <Label>Author</Label>
              <Input value={this.state.author} onChange={this.authorUpdate} type="text" name="text" placeholder="Author" />
            </FormGroup>
          ) : (
            <FormGroup>
              <Label>Author</Label>
              <Input disabled value={this.state.author} onChange={this.authorUpdate} type="text" name="text" placeholder="Author" />
            </FormGroup>
          )}
          <FormGroup>
            <Label>Title</Label>
            <Input value={this.state.title} onChange={this.titleUpdate} type="text" name="text" placeholder="Title" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Body</Label>
            <Input value={this.state.body} onChange={this.bodyUpdate} type="text" name="text" id="exampleText" />
          </FormGroup>

          <legend>Choose Category</legend>

          {
            categories.display &&
            categories.display.map((category) => (
              <div className="just so that jsx works">
                {!this.postId ? (
                  <FormGroup check>
                    <Label check>
                      <Input onChange={this.handleCategoryChange} value={category.path} type="radio" name="radio1" />{' '}
                      {category.name}
                    </Label>
                  </FormGroup>
                ) : (
                  <FormGroup check>
                    <Label check>
                      <Input disabled onChange={this.handleCategoryChange} value={category.path} type="radio" name="radio1" />{' '}
                      {category.name}
                    </Label>
                  </FormGroup>
                )}
              </div>
            ))
          }

          <Button color='primary' onClick={this.checkIfCreateOrEdit}>Submit</Button>

        </Form>

      </div>

    );
  }

}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}


export default withRouter(connect(mapStateToProps)(CreatePost))

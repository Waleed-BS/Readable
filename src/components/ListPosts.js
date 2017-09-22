import '../App.css'
import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { ButtonGroup, Button } from 'reactstrap'
import { withRouter } from 'react-router'

/*
imported actions:
*/
import { getPosts } from '../actions/Posts_Actions'
import { getComments } from '../actions/Comments_Actions'

/*
imported components:
*/
import React, { Component } from 'react';
import Post from './Post'

class ListPosts extends Component {

  state = {
    sortMethod: 'vote',
    voteIsClicked: 'primary',
    timeIsClicked: 'secondary',
  }

  componentDidMount() {

    const { getPostsDispatch } = this.props

    ReadableAPI.getPosts().then((data) => {
      const filteredPosts = data.filter( (post) => post.deleted !== true )
      // dispatch action to get all posts from backend server
      getPostsDispatch(filteredPosts)

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

  render() {

    const { posts, match } = this.props
    console.log("ListPosts is rendering..")

    if ( !posts.display ){
      return(<div>Displaying Posts..</div>)
    }

    let currentCategory = null;
    /*
    if category changed, currentCategory is assigned to
    the current path
    */
    if (match.params.category) {
      currentCategory = match.params.category;
    }

    let listPosts = []
    /*
    if currentCategory hasn't changed (root),
    list all posts and and sort them by time or vote
    */
    if (currentCategory === null){
      if (this.state.sortMethod === 'time') {
        listPosts = listPosts.concat(posts.display)
        .sort((a, b) => a.timestamp < b.timestamp)
      } else if (this.state.sortMethod === 'vote') {
        listPosts = listPosts.concat(posts.display)
        .sort((a, b) => a.voteScore < b.voteScore)
      } else {
        listPosts = listPosts.concat(posts.display)
      }
    }
    /*
    if currentCategory has changed to (category.path)
    1- list all posts from the currentCategory
    2- sort them by time or vote
    */
    else {
      if (this.state.sortMethod === 'time') {
        listPosts = listPosts.concat(posts.display)
        .filter( (item) => item.category === currentCategory )
        .sort((a, b) => a.timestamp < b.timestamp)
      } else if (this.state.sortMethod === 'vote') {
        listPosts = listPosts.concat(posts.display)
        .filter( (item) => item.category === currentCategory )
        .sort((a, b) => a.voteScore < b.voteScore)
      } else {
        listPosts = listPosts.concat(posts.display)
        .filter( (item) => item.category === currentCategory )
      }
    }

    return (

      <div className="ListPosts">

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
          posts.display &&
          listPosts.map( (post) =>
            <Post key={post.id} passedPost={post}/>
          )
        }

      </div>
    );
  }

}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsDispatch: (data) => dispatch(getPosts({posts: data})),
    getCommentsDispatch: (data) => dispatch(getComments({comments: data})),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))

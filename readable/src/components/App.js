
import '../App.css'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

/*
imported components:
*/
import React, { Component } from 'react';
import CreatePost from './CreatePost'
import PostInfo from './PostInfo'
import Main from './Main'

class Readable extends Component {

  render() {
    console.log("App is rendering..")

    return (

      <div className="App">

        {/* removing path renders this always*/}

        <Switch>

          <Route exact path='/' component={Main}/>

          <Route exact path='/createpost' component={CreatePost}/>

          <Route path='/updatepost/:postId' component={CreatePost}/>

          <Route path='/:category/:postId' component={PostInfo}/>

          <Route path='/:category' component={Main}/>

        </Switch>

      </div>
    );
  }

}

export default withRouter(connect()(Readable))

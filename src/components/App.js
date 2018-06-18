
import '../App.css'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

/*
imported components:
*/
import React, { Component } from 'react'
import CreatePost from './CreatePost'
import PostInfo from './PostInfo'
import Categories from './Categories'
import ListPosts from './ListPosts'

var NotFound = ({location}) => (
	<div>
		<h3>No match for <code>{location.pathname}</code></h3>
		<h3>404 page not found</h3>
		<p>We are sorry but the page you are looking for does not exist.</p>
	</div>
)

class Readable extends Component {

	render() {

		console.log('App is rendering..')

		return (

			<div className="App">

				{/* a root with no path always matches*/}

				<Route component={Categories}/>

				<Switch>

					<Route exact path='/' component={ListPosts}/>

					<Route exact path='/createpost' component={CreatePost}/>

					<Route exact path='/:category' component={ListPosts}/>

					<Route exact path='/updatepost/:postId' component={CreatePost}/>

					<Route path='/:category/:postId' component={PostInfo}/>

					{/* not working yet */}
					<Route component={NotFound}/>

				</Switch>



			</div>
		)
	}

}



export default withRouter(connect()(Readable))

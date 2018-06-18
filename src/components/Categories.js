import { connect } from 'react-redux'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router'

/*
imported actions:
*/
import { getCategories } from '../actions/Categories_Action'

/*
imported components:
*/
import React, { Component } from 'react'

class Categories extends Component {


	componentDidMount() {
		const { getCategoriesDispatch } = this.props
		ReadableAPI.getAllCategories().then((data) => {
			// dispatch action to get categories from backend server
			getCategoriesDispatch(data)
		})
	}

	render() {

		const { categories } = this.props
		console.log('Categories is rendering..')
		console.log("this.props.history.location ", this.props.history.location.pathname);

		return (

			<div className="categories">

				<ul className="breadcrumb">
					<li style={{textAlign: 'center'}}>
						<Link to='/'> All </Link>
					</li>
					{categories.display && categories.display.map( (category) => (
        		<li key={category.path}>
        			<Link key={category.path} to={'/'+category.path}>
          			<span >{category.name}</span>
      				</Link>
						</li>
					))}
				</ul>

				{this.props.history.location.pathname !== "/createpost" &&
					<Button className="newpost" onClick={() => this.props.history.push("/createpost")} color="primary">
						Submit a new post
					</Button>
				}
			</div>
		)

	}
}


function mapStateToProps({ categories }) {
	return {
		categories,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCategoriesDispatch: (data) => dispatch(getCategories({categories: data}))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))

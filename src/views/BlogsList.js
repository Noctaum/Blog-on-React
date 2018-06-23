import React, {Component} from 'react';
import BlogTemplate from './BlogTemplate';
import * as api from './api';

export default class BlogsList extends Component {
  	constructor(props){
		super(props);
		this.state = {
			posts:[],
		}
  	}
  	componentWillMount(){
    	this.loadPosts();
  	}

  	async loadPosts(){
    	let posts = await api.getPosts();
    	this.setState({posts});
  	}

  	render() {
  		const BlogsListRender = this.state.posts.map((post, index)=>(
  			<BlogTemplate key={post._id} blog={post} />
  		));
  		return (
  			<div className="blogsList">
  				{BlogsListRender}
  			</div>
  		);
	}
}

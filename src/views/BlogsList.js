import React, {Component} from 'react';
import BlogTemplate from './BlogTemplate';
import * as api from './api';

export default class BlogsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			posts:[],
		}
		this.deletePost = this.deletePost.bind(this);
	}

	async deletePost(id){
		let posts = await api.removePost(id);
		console.log(posts);
		if (posts.answ){
			let newPostsList = this.state.posts;
			let posts = newPostsList.filter((item)=>(item._id !== id)); 
			this.setState({posts});
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
			<BlogTemplate key={post._id} blog={post} deletePost={this.deletePost} />
		));
		return (
			<div className="blogsList">
				{BlogsListRender}
			</div>
		);
	}
}

import React, {Component} from 'react';
import BlogTemplate from './BlogTemplate';
import SearchPosts from './SearchPosts';
import * as apiBlog from './apiBlog';

export default class BlogsList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			posts:[],
			allPosts:[],
		}
		this.deletePost = this.deletePost.bind(this);
		this.changeLikes = this.changeLikes.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentWillMount(){
		this.loadPosts();
	}

	handleSearch(posts){
		this.setState({posts});
	}

	async deletePost(id){
		let posts = await apiBlog.removePost(id);
		if (posts.answ){
			let newPostsList = this.state.posts;
			let posts = newPostsList.filter((item)=>(item._id !== id)); 
			this.setState({posts:posts, allPosts:posts});
		}
	}

	async loadPosts(){
		let posts = await apiBlog.getPosts();
		this.setState({posts:posts, allPosts:posts});
	}

	async changeLikes(post){
		await apiBlog.updatePost(post);
	}

	render() {
		const {posts} = this.state;
		const BlogsListRender = posts.map((post, index)=>(
			<BlogTemplate 
				key={post._id} 
				blog={post} 
				deletePost={this.deletePost} 
				changeLikes={this.changeLikes}
			/>
		));
		return (
			<div>
				<SearchPosts 
					posts={this.state.allPosts}
					handleSearch={this.handleSearch}
				/>
				<section className="blogsList">
					{BlogsListRender}
				</section>
			</div>
		);
	}
}

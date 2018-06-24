import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class BlogTemplate extends Component {
	static defaultPost = {
		deletePost(){},
		changeLikes(){}	
	};

	constructor(props){
		super(props);
		this.state = {
			likes: this.props.blog.likes,
		}
	
		this.deletePost = this.deletePost.bind(this);
		this.changeLikes = this.changeLikes.bind(this);
	}

	deletePost(){
		this.props.deletePost(this.props.blog._id);
	}

	changeLikes(e){
		let likes = this.state.likes;
		let post = this.props.blog;
		if(e.target.checked){
			likes++;
			post.likes++;
		} else {
			likes--;
			post.likes--;
		}
		this.setState({likes:likes});
		this.props.changeLikes(post);
	}

	render(){
		const {blog} = this.props;
		return (
			<article className="blogTemplate">
				<div className="topBlogContainer">
					<h3>{blog.title}</h3>
					<div className="imageContainer">
						<img src={blog.img} alt={blog.title} />
					</div>
					<p>{blog.text}</p>
				</div>
				<div className="bottomBlogContainer">
					<div>
						<div>Date: {blog.date.slice(0,10)}</div>
						<div>Author: {blog.author}</div>
						<div className="likeBox">
							<label>
								Likes {this.state.likes} 
								<input type="checkbox"
									onChange={this.changeLikes}
								/>
							</label>
						</div>
					</div>
					<Link className='postBtn editBtn' to={`/editPost/${blog._id}`}>
                        Edit
                    </Link>
                    <button className='postBtn delBtn' onClick={this.deletePost}>
                        Delete
                    </button>
                    <Link className='postBtn infoBtn' to={`/post/${blog._id}`}>
                        More info
                    </Link>
				</div>
			</article>
		);
	}
}
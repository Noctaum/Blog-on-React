import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class BlogTemplate extends Component {
	static defaultPost = {
		deletePost(){}	
	};

	constructor(props){
		super(props);
	
		this.deletePost = this.deletePost.bind(this);
	}

	deletePost(){
		this.props.deletePost(this.props.blog._id);
	}

	render(){
		const {blog} = this.props;

		return (
			<div className="blogTemplate">
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
								Likes {blog.likes} 
								<input type="checkbox"/>
							</label>
						</div>
					</div>
					<Link className='editBtn' to={`/editPost/${blog._id}`}>
                        Edit
                    </Link>
                    <button className='delBtn' onClick={this.deletePost}>
                        Delete
                    </button>
				</div>
			</div>
		);
	}
}
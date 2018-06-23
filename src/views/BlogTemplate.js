import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class BlogTemplate extends Component {
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
                    <Link className='delBtn' to="/">
                        Delete
                    </Link>
				</div>
			</div>
		);
	}
}
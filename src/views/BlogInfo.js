import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import * as apiBlog from './apiBlog';
import * as apiComment from './apiComment';
import Comment from './Comment';

class BlogInput extends Component {
	
	static defaultProps = {
    	id: ""
  	}

	constructor(props){
		super(props);
		this.state = {
			post:{},
			newComment: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.addComment = this.addComment.bind(this);
		this.changeLikes = this.changeLikes.bind(this);
	}

	componentWillMount(){
		if(this.props.id !== ""){
    		this.loadPost(this.props.id);
    	}
  	}

  	async loadPost(id){
    	let post = await apiBlog.getPost(id);
    	this.setState({post});
  	}

  	async changeLikes(e){
  		let post = this.state.post;
  		if(e.target.checked){
			post.likes++;
		} else {
			post.likes--;
		}
		this.setState({post});
		await apiBlog.updatePost(post);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	async addComment(){
		let resp = await apiComment.createComment(this.state);
		if(resp.answ){
			let post = this.state.post;
			let comment = this.state.newComment;
			post.comments.unshift(comment);
			this.loadPost(this.props.id);
		}
	}

	render(){
		const {post, newComment} = this.state;
		let BlogsListRender;
		if(post.comments){
			BlogsListRender = post.comments.map((commentId, index)=>(
				<Comment 
					key={commentId} 
					commentId={commentId} 
				/>
			));
		} else {
			BlogsListRender = "";
		}
		return (
			<article className="blogInfo">
				<div className="blogInfo_topBlogContainer">
					<h2>{post.title}</h2>
					<div className="blogInfo_imageContainer">
						<img src={post.img} alt={post.title} />
					</div>
					<p>{post.text}</p>
				</div>
				<div className="blogInfo_bottomBlogContainer">
					<div>
						<div>Date: {post.date ? post.date.slice(0,10) : ""}</div>
						<div>Author: {post.author}</div>
						<div className="blogInfo_likeBox">
							<label>
								Likes {post.likes} 
								<input type="checkbox"
									onChange={this.changeLikes}
								/>
							</label>
						</div>
					</div>
					<hr/>
				</div>
				<div className="blogInfo_comment">
					<div>
						<h3>Comments</h3>
						<textarea
							type='text'
							key='newComment'
							name='newComment'
							value={newComment}  
							onChange={this.handleChange}
						>
						</textarea>
						<button 
						className="submitBtn"
						onClick={this.addComment}
						>
			            Add comment
			        	</button>
			        </div>
			        {BlogsListRender}
				</div>
			</article>
		)
	}
}

export default withRouter(BlogInput);
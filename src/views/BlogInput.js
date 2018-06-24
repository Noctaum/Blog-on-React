import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import * as apiBlog from './apiBlog';

class BlogInput extends Component {
	
	static defaultProps = {
    	id: ""
  	}

	constructor(props){
		super(props);
		this.state = {
			title: "",
			img: "",
			text: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.addPost = this.addPost.bind(this);
		this.editPost = this.editPost.bind(this);
	}

	componentWillMount(){
		if(this.props.id !== ""){
    		this.loadPost(this.props.id);
    	}
  	}

  	async loadPost(id){
    	let post = await apiBlog.getPost(id);
    	this.setState(post);
  	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	async addPost(){
		let resp = await apiBlog.createPost(this.state);
		if(resp.answ){
			this.props.history.push('/');
		}
	}

	async editPost(){
		let resp = await apiBlog.updatePost(this.state);
		if(resp.answ){
			this.props.history.push('/');
		}
	}

	render(){
		const {title, img, text} = this.state;
		return (
			<div className="blogInput">
				<h3>{this.props.id === "" ? "Add new post" : "Edit post"}</h3>
				<div>
					<label>
						Name of post:
					</label>	
					<input 
						type='text'
						key='title'
						name='title'
						value={title}
						autoComplete="off"
						onChange={this.handleChange}
					/>
				</div>
				<div>
					<label>
						Img for post (put link):
					</label>
					<input 
						type='text'
						key='img'
						name='img'
						value={img}
						autoComplete="off"
						onChange={this.handleChange}
					/>
				</div>
				<div>
					<label>Describe text</label>
					<textarea
						type='text'
						key='text'
						name='text'
						value={text}  
						onChange={this.handleChange}
					>
					</textarea>
				</div>
				<button 
					className="submitBtn"
					onClick={this.props.id === "" ? this.addPost : this.editPost}
				>
		            SAVE
		        </button>
			</div>
		)
	}
}

export default withRouter(BlogInput);
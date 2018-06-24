import React, {Component} from 'react';
import * as apiComment from './apiComment';

export default class Comment extends Component {
	static defaultProps = {
    	commentId:"",
    	deleteComment(){},
  	}
  	constructor(props){
		super(props);	
		this.state = {
			comment:{},
		}

		this.deleteComment = this.deleteComment.bind(this);
		this.changeLikes = this.changeLikes.bind(this);
	};

  	componentWillMount(){
		if(this.props.commentId !== ""){
    		this.loadComment(this.props.commentId);
    	}
  	}

  	async deleteComment(){
  		this.props.deleteComment(this.props.commentId);
	}

  	async loadComment(id){
    	let comment = await apiComment.getComment(id);
    	this.setState({comment});
  	}

  	async changeLikes(e){
  		let comment = this.state.comment;
  		if(e.target.checked){
			comment.likes++;
		} else {
			comment.likes--;
		}
		this.setState({comment});
		await apiComment.updateComment(comment);
	}

	render(){
		const {comment} = this.state;
		return (
			<article className="comment">
				<p>{comment.text}</p>
				<div>
					<div>Date: {comment.date ? comment.date.slice(0,10) : ""}</div>
					<div>Author: {comment.author}</div>
					<div className="blogInfo_likeBox">
						<button className='Btn delBtn' onClick={this.deleteComment}>
	                        Delete
	                    </button>
						<label>
							Likes {comment.likes} 
							<input type="checkbox"
								onChange={this.changeLikes}
							/>
						</label>
					</div>
				</div>
			</article>
		);
	}
}
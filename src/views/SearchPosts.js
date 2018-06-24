import React, {Component} from 'react';

export default class SearchPosts extends Component {
	static defaultPost = {
		posts: [],
		handleSearch(){},	
	};

	constructor(props){
		super(props);
		this.state = {
			search: "",
			date: "",
		}

		this.handleDate = this.handleDate.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.filterByName = this.filterByName.bind(this);
		this.filterByDate = this.filterByDate.bind(this);
	}

	handleDate(e) {
		let date = e.target.value;
		this.setState({[e.target.name]: e.target.value});
		let posts = this.props.posts;
		let newListOfPosts = posts.filter((item)=>(item.date.slice(0,10).indexOf(date) === 0));
		this.props.handleSearch(newListOfPosts);
	}

	handleSearch(e) {
		let search = e.target.value.toLowerCase();
		this.setState({[e.target.name]: search});
		let posts = this.props.posts;
		let newListOfPosts = posts.filter((item)=>{
			let title = item.title.toLowerCase();
			let author = item.author.toLowerCase();

			return title.indexOf(search) === 0 || author.indexOf(search) === 0;
		}); 
		this.props.handleSearch(newListOfPosts);
	}

	filterByName(e){
		let posts = this.props.posts;
		let filter = e.target.value;
		if(filter === "down"){
			posts.sort((item1, item2)=>(item1.title <= item2.title ? -1 : 1));
		} else {
		posts.sort((item1, item2)=>(item1.title >= item2.title ? -1 : 1));
		}
		this.props.handleSearch(posts);
	}

	filterByDate(e){
		let posts = this.props.posts;
		let filter = e.target.value;
		if(filter === "down"){
			posts.sort((item1, item2)=>(item1.date <= item2.date ? -1 : 1));
		} else {
		posts.sort((item1, item2)=>(item1.date >= item2.date ? -1 : 1));
		}
		this.props.handleSearch(posts);
	}

	render(){
		const {search, date} = this.state;
		return (
			<div className="searchPosts">
				<div>
					<label>
						Search by title/author 
						<input 
							type='text'
							name='search'
							key='search'
							value={search}
							onChange={this.handleSearch}
						/>
					</label>
				</div>
				<div>
					<label>
						Search by date 
						<input 
							type='date'
							name='date'
							key='date'
							value={date}
							onChange={this.handleDate}
						/>
					</label>
				</div>
				<div>
					<label>
						Filter by name
					</label>
					<button value="up" onClick={this.filterByName}>&#9650;</button>
					<button value="down" onClick={this.filterByName}>&#9660;</button>
				</div>
				<div>
					<label>
						Filter by date
					</label>
					<button value="up" onClick={this.filterByDate}>&#9650;</button>
					<button value="down" onClick={this.filterByDate}>&#9660;</button>
				</div>
			</div>
		);
	}
}
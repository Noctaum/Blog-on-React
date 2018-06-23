import React from 'react';
import {Switch, Route} from 'react-router-dom';
import BlogsList from './BlogsList';
import BlogInput from './BlogInput';

const Home = () => (
  	<BlogsList />
);
const NewPost = () => (
 	<BlogInput />
);

const editPost = (params) => (
 	<BlogInput id={params.match.params.id}/>
);

 const Switcher = () => (
  	<Switch>
    	<Route exact path="/" component={Home}/>
   	 	<Route path="/newPost" component={NewPost}/>
   	 	<Route path="/editPost/:id" component={editPost}/>
  	</Switch>
);

export default Switcher;



	  		
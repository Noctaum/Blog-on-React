import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './styles.css';

import Header from './views/partials/header';
import Switcher from './views/switcher';

class App extends Component {
  render() {
    return (
    	<Router>
     	 <div>
	  		<Header />
	  		<Switcher />
      	</div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

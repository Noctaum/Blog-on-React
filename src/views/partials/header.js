import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {
    render() {
        const active = {
            opacity:1,
        }
            
        const defaultStyle = {
            textDecoration: 'none', 
            cursor: 'default', 
            color: 'white',
            opacity: 0.5,
        };

        return (
        <header>
            <h2><a>Task App</a></h2>
            <nav>
                <li>
                    <NavLink exact style={defaultStyle} activeStyle={active} to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact style={defaultStyle} activeStyle={active} to="/newPost">
                        New post
                    </NavLink>
                </li>
        </nav>
      </header>
    );
  }
}


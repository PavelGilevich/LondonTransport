import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import logo from './../../images/logo.jpg';
import './Header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [
                {url: '/buses', name: 'Buses'},
                {url: '/car-parkings', name: 'Car Parkings'}
            ]
        }
    }
    render() {
        const linkItems = this.state.links.map(link => {
            return <li className="nav-item" key={link.url}><NavLink className="nav-link" to = {link.url}>{link.name}</NavLink></li>;
        })
        return (
            <div className="Header">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="/buses">
                        <img src={logo} alt="Logo"/>
                    </a>
                    <ul className="navbar-nav">
                        {linkItems}
                    </ul>
                </nav>
            </div>
        )
    }
}
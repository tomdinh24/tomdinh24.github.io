import React from 'react';
import './style.scss';
import Socials from '../Socials/Socials.jsx';



export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();

    this.headers = [
      {
        name: 'Home',
        url: '#home',
      },
      {
        name: 'About Me',
        url: '#about-me',
      },
      {
        name: 'Work',
        url: '#work',
      },
      {
        name: 'Projects',
        url: '#projects',
      }
    ];
  }

  generateHeaders() {
    return this.headers.map((header) => {
      return (
        <a
          key={header.name + '-header'}
          className='nav-header'
          href={header.url}
          onClick={() => this.handleMenuClick()}
        >
          <span>{header.name}</span>
        </a>
      );
    });
  }

  handleMenuClick() {
    const menu = this.menu.current;

    menu.classList.toggle('is-open');
  }

  render() {
    return (
      <nav className='nav-bar block' ref={this.menu} aria-label='menu'>
        <button
          id='burger'
          onClick={() => this.handleMenuClick()}
          aria-label='open/close menu'
        >
          &#8801;
        </button>
        <span id='headers'>
          <hr />
          {this.generateHeaders()}
        </span>
        <Socials>{this.props.children}</Socials>
      </nav>
    );
  }
}

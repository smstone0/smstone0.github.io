import React from 'react';
import {ReactComponent as GithubIcon} from '../../assets/github-mark-white.svg';
import {ReactComponent as LinkedInIcon} from '../../assets/linkedin.svg';
import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
    return <div id="Header">
      <Link id="name-link" to="/">
        <h1 id="name">Sophie Stone</h1>
      </Link>
      <div id="icons">
        <a href="https://github.com/smstone0" aria-label='Visit Github'><GithubIcon/></a>
        <a href="https://www.linkedin.com/in/sophie-stone-/" aria-label='Visit LinkedIn'><LinkedInIcon/></a>
      </div>
    </div>
  }

export default Header;
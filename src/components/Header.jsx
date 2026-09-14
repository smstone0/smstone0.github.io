import GithubIcon from "../assets/icons/github-mark-white.svg?react";
import LinkedInIcon from "../assets/icons/linkedin.svg?react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div id="Header">
      <Link id="name-link" to="/">
        <h1 id="name">Sophie Stone</h1>
      </Link>
      <div id="icons">
        <a
          href="https://github.com/smstone0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Github"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/sophie-stone-/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}

export default Header;

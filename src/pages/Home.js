import Projects from "../components/Projects.js";
import Header from "../components/Header.js";

function Home() {
  return (
    <div id="Home">
      <div id="Content">
        <header>
          <Header />
        </header>
        <p id="header-title">
          Software Engineer & Final Year Computer Science Student
        </p>
        <Projects />
        <footer>
          <div id="project-page-footnote">Last updated: August 2025</div>
        </footer>
      </div>
    </div>
  );
}

export default Home;

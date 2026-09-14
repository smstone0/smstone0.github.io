import Projects from "../components/Projects";
import Header from "../components/Header";

function Home() {
  return (
    <div id="Home">
      <div id="Content">
        <header>
          <Header />
        </header>
        <p id="header-title">Software Engineer</p>
        <Projects />
        <footer>
          <div id="project-page-footnote">Last updated: November 2025</div>
        </footer>
      </div>
    </div>
  );
}

export default Home;

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
        <footer></footer>
      </div>
    </div>
  );
}

export default Home;

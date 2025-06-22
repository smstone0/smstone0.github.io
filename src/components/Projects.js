import { useState } from "react";
import projects from "../data/project_data.js";
import "../styles/Projects.css";
import { ReactComponent as LinkIcon } from "../assets/link.svg";
import { ReactComponent as ArrowIcon } from "../assets/arrow-up-right.svg";
import Modal from "./Modal.js";
import languageIcons from "./language/iconMapping.js";
import Dropdown from "./Dropdown.js";

const techStackFrequency = projects
  .flatMap((project) => project.languages || [])
  .reduce((acc, language) => {
    acc[language] = (acc[language] || 0) + 1;
    return acc;
  }, {});

const allTechStacks = Object.keys(techStackFrequency).sort(
  (a, b) => techStackFrequency[b] - techStackFrequency[a],
);

function Projects() {
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  const handleTechStackChange = (techStack) => {
    setSelectedTechStacks((prevSelected) =>
      prevSelected.includes(techStack)
        ? prevSelected.filter((stack) => stack !== techStack)
        : [...prevSelected, techStack],
    );
  };

  const filteredProjects =
    selectedTechStacks.length === 0
      ? projects
      : projects.filter(
          (project) =>
            project.languages &&
            project.languages.some((language) =>
              selectedTechStacks.includes(language),
            ),
        );

  return (
    <div>
      <div id="info">
        <h2>Projects</h2>
        <Dropdown
          allTechStacks={allTechStacks}
          selectedTechStacks={selectedTechStacks}
          onTechStackChange={handleTechStackChange}
        />
      </div>
      <div id="projects">
        {filteredProjects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

function Project({ project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const sortedLinks =
    project.links?.sort((a, b) => a.text.localeCompare(b.text)) || [];

  const toggleModal = () => {
    modalOpen
      ? document.body.classList.remove("no-scroll")
      : document.body.classList.add("no-scroll");
    setModalOpen(!modalOpen);
  };

  return (
    <div className="project">
      {modalOpen && (
        <Modal
          images={project.moreImages}
          onClose={toggleModal}
          project={project}
        />
      )}
      <div id="header">
        <h3 id="title">{project.title}</h3>
        <div id="languages-date">
          <div className="languages">
            {project.languages &&
              project.languages.map((language, index) => {
                const LanguageIcon = languageIcons[language];
                return LanguageIcon ? (
                  <LanguageIcon key={index} />
                ) : (
                  <span key={index} className="language">
                    {language}
                  </span>
                );
              })}
          </div>
          {project.languages && <p id="separator">|</p>}
          <p id="date">{project.date}</p>
        </div>
      </div>
      <div id="content">
        <a className="image-container" href={project.url}>
          <img src={project.thumbnail.src} alt={project.thumbnail.alt}></img>
          <MoreImages
            images={project.moreImages}
            toggleModal={toggleModal}
          ></MoreImages>
        </a>
        <p id="description">{project.description}</p>
      </div>
      <div id="links">
        {sortedLinks.map((link, index) => (
          <Link key={index} text={link.text} url={link.url} />
        ))}
      </div>
    </div>
  );
}

function MoreImages({ images, toggleModal }) {
  return (
    images &&
    images.length > 0 && (
      <span id="more-images" onClick={toggleModal}>
        +{images.length}
        <ArrowIcon />
      </span>
    )
  );
}

function Link({ text, url }) {
  return (
    url && (
      <a id="link" target="_blank" rel="noopener noreferrer" href={url}>
        <span>
          <LinkIcon />
          {text}
        </span>
      </a>
    )
  );
}

export default Projects;

import React, {useState} from 'react';
import projects from '../../data/project_data.js';
import './Projects.css';
import {ReactComponent as LinkIcon} from '../../assets/link.svg';
import {ReactComponent as ArrowIcon} from '../../assets/arrow-up-right.svg';
import Modal from '../modal/Modal.js';
import languageIcons from '../language/iconMapping.js';

  function Projects() {
    return (
      <div>
        <h2>Projects</h2>
        <div id="projects">
        {projects.map((project, index) => (
            <Project key={index} project={project} />
          ))}
          </div>
      </div>
    )
  }

  function Project({project}) {
    const [modalOpen, setModalOpen] = useState(false);
    const sortedLinks = project.links?.sort((a, b) => a.text.localeCompare(b.text)) || [];

    const toggleModal = () => {
      modalOpen ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll');
      setModalOpen(!modalOpen);
    }

    return (
      <div class="project">
        {modalOpen && <Modal images={project.moreImages} onClose={toggleModal} project={project}/>}
        <div id="header">
          <h3 id="title">{project.title}</h3>
          <div id="languages-date">
          <div className="languages">
              {project.languages.map((language, index) => {
                const LanguageIcon = languageIcons[language];
                return (
                  LanguageIcon ? <LanguageIcon/> : <span key={index} className="language">{language}</span>
                );
            })}
          </div>
            <p id="separator">|</p>
            <p id="date">{project.date}</p>
          </div>
        </div>
        <div id="content">
          <a class="image-container" href={project.url}>
          <img src={project.thumbnail.src} alt={project.thumbnail.alt}></img>
          <MoreImages images={project.moreImages} toggleModal={toggleModal}></MoreImages>
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

  function MoreImages({images, toggleModal}) {
    return images && images.length > 0 && 
    <span id="more-images" onClick={toggleModal}>+{images.length}<ArrowIcon/></span>
  }

  function Link({text, url}) {
    return (
      url && (
        <a id="link" href={url}>
          <span><LinkIcon/>{text}</span>
        </a>
        )
    );
  }

export default Projects;
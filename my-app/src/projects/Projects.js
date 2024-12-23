import React from 'react';
import projects from './project_data.js';
import './Projects.css';

  function Projects() {
    return (
      <section>
      <h1>Projects</h1>
      <div id="projects">
      {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
        </div>
      </section>
    )
  }
  
  function Project({project}) {
    return (
      <div class="project">
        <div id="title-date">
          <h3>{project.title}</h3>
          <p id="date">{project.date}</p>
        </div>
        <div id="image-description">
          <a class="image-container" href={project.url}>
          <img src={project.thumbnail} alt={project.url}></img>
          </a>
          <p id="description">{project.description}</p>
        </div>
        <div className='languages'>
          {project.languages.map((language, index) => (
            <span key={index} className="language">{language}</span>
          ))}
        </div>
      </div>
      
    );  
  }

export default Projects;
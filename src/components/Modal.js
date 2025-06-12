import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import "../styles/Modal.css";

function Modal({ images, onClose, project }) {
  const [index, setIndex] = useState(0);

  const handleClickOutside = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };

  const indexUpdate = (e) => {
    if (e.target.id === "previous") {
      setIndex(index === 0 ? images.length - 1 : index - 1);
    } else if (e.target.id === "next") {
      setIndex(index === images.length - 1 ? 0 : index + 1);
    }
  };
  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div id="project-modal-container">
        <div className="project-modal-header">
          <h2>More images from {project.title}</h2>
          <CloseIcon id="exit" onClick={onClose} />
        </div>
        <div className="modal-content">
          <div id="modal-image-container">
            <img src={images[index]} alt={`Image ${index + 1}`}></img>
          </div>
          <div id="navigation">
            <p id="image-count">
              {index + 1} of {project.moreImages.length}
            </p>
            <div id="navigation-buttons">
              <span
                className="navigation-button"
                id="previous"
                onClick={indexUpdate}
              >
                <LeftArrow />
                Previous
              </span>
              <span
                className="navigation-button"
                id="next"
                onClick={indexUpdate}
              >
                Next
                <RightArrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React, { useState, useEffect, useRef } from "react";
import "../styles/Dropdown.css";
import Chevron from "../assets/down-arrow.svg?react";

function Dropdown({ allTechStacks, selectedTechStacks, onTechStackChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropbtn" onClick={toggleDropdown}>
        Filter Tech Stack
        <Chevron />
      </button>
      {dropdownOpen && (
        <div className="dropdown-content">
          {allTechStacks.map((techStack) => (
            <label key={techStack} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedTechStacks.includes(techStack)}
                onChange={() => onTechStackChange(techStack)}
              />
              {techStack}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

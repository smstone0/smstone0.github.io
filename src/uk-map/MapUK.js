import React, {useState} from 'react';
import {ReactComponent as Map} from '../assets/MapChart_Map.svg';

function MapUK() {
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [selectedCountyElement, setSelectedCountyElement] = useState(null);
    const [cardPosition, setCardPosition] = useState({x: 0, y: 0});
    const [countyScores, setCountyScores] = useState({});

    const getColorByLevel = (level) => {
        switch(level) {
            case 5: return '#FF7E7E'; // lived
            case 4: return '#FFB57E'; // stayed
            case 3: return '#FFE57E'; // visited
            case 2: return '#A8FFBE'; // stopped
            case 1: return '#88AEFF'; // passed
            default: return 'white'; // never been
        }
    };

    const countyClick = (e) => {
        const target = e.target;
        if(target.tagName === "path" && target.hasAttribute("name")) {
            const countyName = target.getAttribute("name");
            const {clientX: x, clientY: y} = e;
            setSelectedCounty(countyName);
            setSelectedCountyElement(target);

            const cardWidth = 225; // prevent card from going off screen
            const cardHeight = 330;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let adjustedX = x;
            let adjustedY = y;

            if (x + cardWidth > viewportWidth) {
                adjustedX = viewportWidth - cardWidth;
            }
            if (y + cardHeight > viewportHeight) {
                adjustedY = viewportHeight - cardHeight;
            }

            setCardPosition({x: adjustedX, y: adjustedY});
        } else {
            setSelectedCounty(null);
            setSelectedCountyElement(null);
        }
    }

    const levelClick = (level) => {
        selectedCountyElement.style.fill = getColorByLevel(level);

        const updatedScores = {...countyScores, [selectedCounty]: level};
        setCountyScores(updatedScores);
        const totalLevel = Object.values(updatedScores).reduce((acc, curr) => acc + curr, 0);
        const levelElement = document.getElementById('level');
        levelElement.textContent = `UK Level ${totalLevel}`;
        
        setSelectedCounty(null); //close card upon selection
    }

    return (
        <div id="MapUK">
            {selectedCounty && <CountyCard countyName={selectedCounty} position={cardPosition} levelClick={levelClick}/>}
            <div id="map-container">
                <Map id="map" onClick={countyClick}/>
            </div>
        </div>
    )
}

function CountyCard({countyName, position, levelClick}) {
    const {x, y} = position;
    return (
        <div id="county-card" onClick={(e) => e.stopPropagation()} style={{
            left: `${x}px`,
            top: `${y}px`,
        }}>
            <h3 id="county-name">{countyName}</h3>
            <div id='card-options'>
                <p id='lived' onClick={() => levelClick(5)}>Lived here</p>
                <p id='stayed' onClick={() => levelClick(4)}>Stayed here</p>
                <p id='visited' onClick={() => levelClick(3)}>Visited here</p>
                <p id='stopped' onClick={() => levelClick(2)}>Stopped here</p>
                <p id='passed' onClick={() => levelClick(1)}>Passed here</p>
                <p id='never-been' onClick={() => levelClick(0)}>Never been here</p>
            </div>
        </div>
    )
}

export default MapUK;
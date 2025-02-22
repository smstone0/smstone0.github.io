import React, {useState, useEffect} from 'react';
import {ReactComponent as Map} from '../assets/MapChart_Map.svg';
import {ReactComponent as GithubIcon} from '../assets/github-mark-white.svg';
import {ReactComponent as DownloadIcon} from '../assets/download.svg';
import {ReactComponent as ResetIcon} from '../assets/delete.svg';

function MapUK() {
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [cardPosition, setCardPosition] = useState({x: 0, y: 0});
    const [countyScores, setCountyScores] = useState(() => {
        const savedScores = localStorage.getItem('countyScores');
        return savedScores ? JSON.parse(savedScores) : {};
    });

    useEffect(() => { // Upon a state update, colour map and calculate total level
        Object.keys(countyScores).forEach(county => {
            const element = document.querySelector(`[name="${county}"]`);
            if (element) {
                element.style.fill = getColorByLevel(countyScores[county]);
            }
        });
        const totalLevel = Object.values(countyScores).reduce((acc, curr) => acc + curr, 0);
        const levelElement = document.getElementById('level');
        levelElement.textContent = `UK Level ${totalLevel}`;
    }, [countyScores]);

    const getColorByLevel = (level) => {
        switch(level) {
            case 5: return '#FF7E7E'; // Lived
            case 4: return '#FFB57E'; // Stayed
            case 3: return '#FFE57E'; // Visited
            case 2: return '#A8FFBE'; // Stopped
            case 1: return '#88AEFF'; // Passed
            default: return 'white'; // Never been
        }
    };

    const countyClick = (e) => {
        const target = e.target;
        if(target.tagName === "path" && target.hasAttribute("name")) {
            const countyName = target.getAttribute("name");
            const {clientX: x, clientY: y} = e;
            setSelectedCounty(countyName);

            const cardWidth = 225; // Prevent card from going off screen
            const cardHeight = 330;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let adjustedX = x;
            let adjustedY = y;

            if (x + cardWidth > viewportWidth) {
                adjustedX = viewportWidth - cardWidth - 10;
            }
            if (y + cardHeight > viewportHeight) {
                adjustedY = viewportHeight - cardHeight;
            }

            setCardPosition({x: adjustedX, y: adjustedY});
        } else {
            setSelectedCounty(null);
        }
    }

    const levelClick = (level) => {
        const updatedScores = {...countyScores, [selectedCounty]: level};
        setCountyScores(updatedScores);
        localStorage.setItem('countyScores', JSON.stringify(updatedScores)); // Save to localStorage
        setSelectedCounty(null); // Close card upon selection
    }

    const reset = () => {
        const resetScores = {...countyScores};
        Object.keys(resetScores).forEach(county => {
            resetScores[county] = 0;
        });
        setCountyScores(resetScores); // Trigger recolour to white
        localStorage.setItem('countyScores', JSON.stringify(resetScores)); // Save to localStorage
    }

    const download = () => {
    }

    return (
        <div id="MapUK">
            {selectedCounty && <CountyCard countyName={selectedCounty} position={cardPosition} levelClick={levelClick}/>}
            <div id="map-container">
                <span id="buttons">
                    <span className="tooltip" onClick={reset}>
                        <ResetIcon/>
                        <span className="tooltip-text">Reset</span>
                    </span>
                    <span className="tooltip" onClick={download}>
                        <DownloadIcon/>
                        <span className="tooltip-text">Download</span>
                    </span>
                    <span className="tooltip">
                        <a href="https://github.com/smstone0/smstone0.github.io"><GithubIcon/></a>
                        <span className="tooltip-text">GitHub</span>
                    </span>
                </span>
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
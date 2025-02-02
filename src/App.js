import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './projects/Home.js';
import MapUK from './uk-map/MapUK.js';
import NotFound from './NotFound.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/uk-map" element={<MapUK/>}/>
        <Route path="/not-found" element={<NotFound />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
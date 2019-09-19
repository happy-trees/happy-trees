import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// import Home from '../containers/Home/Home.js';
import Game from '../containers/Game/GamePage';
// import Landing from '../containers/LandingContainer/LandingContainer';
// import { WithSession } from './WithSession';
// import FullGame from '../containers/Game/FullGame';


import './app.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Game />
  );
}



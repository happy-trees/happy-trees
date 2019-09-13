import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Game from '../containers/Game/GamePage';
import Landing from '../containers/LandingContainer/LandingContainer';
import { WithSession } from './WithSession';
import FullGame from '../containers/Game/FullGame';

import './app.css';
import 'normalize.css';

// export default function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/game" component={WithSession(Game)}/>
//         <Route path="/" component={Landing}/>
//       </Switch>
//     </Router>
//   );
// }

export default function App() {
  return (
    <FullGame />
  );
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//         </header>
//         <Router>
//           <Switch>
//             <Route exact path="/" component={Articles} />
//           </Switch>
//         </Router>

//       </div>
//     );
//   }
// }

const App = () => (
  <Router>
    <div>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Articles} />
      </Switch>
    </div>
  </Router>
);

export default App;

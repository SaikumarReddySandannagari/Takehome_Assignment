import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Issues from './components/Users/Users';
import IssueDetails from './components/UserRepos/UserRepos';
import Followers from './components/Followers/followers';



function App() {
  
  
  return (
   
    <div className="App" id="App">
      <header className="App-header">
        <BrowserRouter>
          <Route exact path="/" component={Issues} />
          <Route exact path="/repos" component={IssueDetails} />
          <Route exact path="/followers" component={Followers} />
        </BrowserRouter>
      </header>
    </div>
    
  );
}

export default App;






// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components and Styles
import Navigation from './Components/Navigation';
import './App.css';

// Import Pages
import Homepage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';
import EditPage from './Pages/EditPage';

function App() {

  const [myExercise, changeExercise] = useState([]);

  return (
    <>
      <Router>

        <header>
          <h1>Track My Gains - One Day At A Time</h1>
          <p>
            Find it difficult to keep track of your workout schedule? 
            <br/>
            Start now at Track My Gains and embark on a new fitness adventure!
          </p>
        </header>

      <Navigation />

      <body>
        <main>

          <Route path="/" exact>
            <Homepage changeExercise={changeExercise} />
          </Route>

          <Route path="/add-exercise">
            <CreatePage />
          </Route>

          <Route path="/edit-exercise">
            <EditPage myExercise={myExercise} />
          </Route>

        </main>
      </body>

        <footer>
            <p>Last Edited 08/11/2022. <cite>&copy; James Dang</cite></p>
        </footer>
      
      </Router>
    </>
  );
}

export default App;

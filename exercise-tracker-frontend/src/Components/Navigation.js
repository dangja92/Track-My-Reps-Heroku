import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
  <div class="navbar">
    <nav><Link to="/">My Exercises</Link></nav>
    <nav><Link to="../add-exercise">Add More Exercise</Link></nav>
  </div>
  );
}

export default Navigation;
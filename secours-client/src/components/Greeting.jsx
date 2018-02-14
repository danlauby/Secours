import React from 'react';
import { Link } from 'react-router-dom';


export default () => {
  return (
    <div>
      <div className="jumbotron main">
        <h1>Welcome to Secours!</h1>
      </div>
      <div className="question">
        <h2>Feel overwhelmed when searching for the right doctor? We take the stress out of the equation with a simple, straight forward search. Try it now! <Link to="signup">-></Link></h2>
      </div>
    </div>

  )
}

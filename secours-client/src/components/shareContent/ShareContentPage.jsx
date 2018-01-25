import React from 'react';
import { Link, Route } from 'react-router-dom';


const ShareContentPage = ({ match }) => {
  return (
    <div>
      <ul>
        <li><Link to={`${match.url}/articles`}>Articles</Link></li>
        <li><Link to={`${match.url}/videos`}>Videos</Link></li>
      </ul>
      <Route path={`${match.path}/:name`} render= { ({match}) => (<div><h3>{match.params.name}</h3></div>) }/>
    </div>
  );
}

export default ShareContentPage;

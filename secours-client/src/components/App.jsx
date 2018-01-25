import React from 'react';
import { Switch, Route } from 'react-router-dom';
import requireAuth from '../utils/requireAuth';

import DoctorList from '../containers/DoctorList';
import NavigationBar from './NavigationBar';
import Greeting from './Greeting';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import ShareContentPage from './shareContent/ShareContentPage';
import FlashMessagesList from './flash/FlashMessagesList';


const App = () => {
  return (
    <div className="container">
      <NavigationBar />
      <FlashMessagesList />
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/content" component={requireAuth(ShareContentPage)} />
        <Route path="/doctors" component={requireAuth(DoctorList)} />
      </Switch>
    </div>
  );
}

export default App;

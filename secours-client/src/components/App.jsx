import React from 'react';
import { Switch, Route } from 'react-router-dom';
import requireAuth from '../utils/requireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

import Doctors from '../containers/doctors/Doctors';
import DoctorView from '../containers/doctors/DoctorView';

import NavigationBar from './NavigationBar';
import Greeting from './Greeting';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import ShareContentPage from './shareContent/ShareContentPage';
import FlashMessagesList from './flash/FlashMessagesList';



const App = () => {
  return (
    <div>
      <NavigationBar />
      <FlashMessagesList />
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/content" component={requireAuth(ShareContentPage)} />
        <Route path="/doctors" component={Doctors} />
        <Route path="/doctor/:name" component={DoctorView} />
      </Switch>
    </div>
  );
}

export default App;

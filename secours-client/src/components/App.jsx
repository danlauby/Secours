import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';

import NavigationBar from './NavigationBar';
import Greeting from './Greeting';
import FlashMessagesList from './flash/FlashMessagesList';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import ShareContentPage from './shareContent/ShareContentPage';
import DoctorsList from './doctors/DoctorsList';

import requireAuth from '../utils/requireAuth';

// const history = createHistory();

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
            <Switch>
              <Route exact path="/" component={Greeting} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/content" component={requireAuth(ShareContentPage)} />
              <Route exact path="/doctors" component={requireAuth(DoctorsList)} />
            </Switch>

      </div>
    );
  }
}


export default App;

import { Navbar } from './Components';

import AuthenticatedRouteIn from './Authenticated Routes/AuthenticatedRouteIn';
import AuthenticatedRouteOut from './Authenticated Routes/AuthenticatesRouteOut';

import { ForgotPassword, SignIn } from './Pages';
import { SignUp } from './Pages';
import { Home } from './Pages';
import { Confession } from './Pages';
import { Confess } from './Pages';
import { Contact } from './Pages';
import { Manage } from './Pages';
import { Reply } from './Pages';

// import test from './test';
import Login from './Pages/Login/Login';

import { AuthProvider } from './Auth/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>

            {/* Routes going outside the application */}
            {/* <AuthenticatedRouteOut path = "/SignIn" component = { SignIn } /> */}
            <AuthenticatedRouteOut path = "/SignUp" component = { SignUp } />
            <AuthenticatedRouteOut path = "/Forgot" component = { ForgotPassword } />
    
            {/* Authenticated routes going in the application */}
            <AuthenticatedRouteIn exact path = "/" component = { Home } />
            {/* <AuthenticatedRouteIn path = "/Confession" component = { Confession } /> */}
            <AuthenticatedRouteIn path = "/Reply" component = { Reply } />
            <AuthenticatedRouteIn path = "/Manage" component = { Manage } />

            <Route path = "/SignIn" component = { SignIn } />
            <Route path = "/Confession" component = { Confession } />
            

            {/* Public routes which can be access by anyone */}
            <Route path = "/Confess/:username" component = { Confess } />
            <Route path = "/Contact" component = { Contact } />
            <Route path = "/test" component = { Login } />

          </Switch>
        </Router>
      </AuthProvider>
  );

}

export default App;
import React from 'react';
import Layout from './core/layout';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Activation from './auth/activation';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/privateroute';
import AdminRoute from './auth/adminroute';
import Private from './core/private';
import Admin from './core/admin';
import Forgot from './auth/forgot';
import Reset from './auth/reset';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Route component={Layout} />
      <main>
        <Switch>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/auth/activate/:token' component={Activation} />
          <Route path='/auth/password/forgot' component={Forgot} />
          <Route path='/auth/password/reset/:token' component={Reset} />
          <PrivateRoute path="/protected">
            <Private />
          </PrivateRoute>
          <AdminRoute path='/admin' component={Admin} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
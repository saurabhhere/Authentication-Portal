import './App.css';
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import AccountActivate from './components/AccountActivate/AccountActivate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';

toast.configure();

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/authentication/activate/:token" exact component={AccountActivate} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/user/resetpassword/:token" exact component={ResetPassword} />
            <PrivateRoute path="/user/profile" exact component={Profile} />
            <Redirect to="/" />
          </Switch> 
        </Router>
    </div>
  );
}

export default App;

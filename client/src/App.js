import './App.css';
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import AccountActivate from './components/AccountActivate/AccountActivate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute'

toast.configure();

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/user/login" exact component={Login} />
            <Route path="/authentication/activate/:token" exact component={AccountActivate} />
            <PrivateRoute path="/user/profile" exact component={Profile} />
            <Redirect to="/" />
          </Switch> 
        </Router>
    </div>
  );
}

export default App;

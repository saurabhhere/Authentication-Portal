import './App.css';
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/user/login" exact component={Login} />
            <Redirect to="/" />
          </Switch> 
        </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import LoginPage from './pages/Login';
import NavBar from './components/nav-bar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article/:id" component={Article} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

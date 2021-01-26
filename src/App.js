import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import LoggedIn from './components/LoggedIn.js';
import Nominations from './components/Nominations.js';
import { useAuth0 } from "./react-auth0-spa";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme.js';

const App = () => {
  const [nominations, setNominations] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const { loading } = useAuth0();

  useEffect(() => {
    const fetchNominations = () => {
      if (user) {
        fetch(`http://localhost:8080/api/users/${user.email}/nominations`)
        .then(resp => resp.json())
        .then(data => {
        setNominations(data)
      })
      }
      
    }

    fetchNominations();
  }, [])
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
        <div className="App">
        {!isAuthenticated && (
          <Home />
        )}
        
        {isAuthenticated ? (
          <Router>
            <Route exact path='/' render={(routerProps) => <LoggedIn nominations={nominations} routerProps={routerProps} />} />
            <Route exact path='/nominations' render={(routerProps) => <Nominations routerProps={routerProps}/>} />
          </Router>
        ): null}
        
      </div>
    </ThemeProvider>
  );
};

export default App;
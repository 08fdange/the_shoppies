import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import logo from './../shoppies-logo.png';
import { Button } from '@material-ui/core';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Fragment>
      <div className='home-container'>
        {/* <div align='center'> */}
          <h1 className='header'>The Shoppies</h1>
          {/* <img src={logo} alt="The Shoppies" /><br/> */}
          {!isAuthenticated && (
            <Button
              className='login-button'
              variant='contained'
              color='primary'
              onClick={() => loginWithRedirect({})}
            >Sign Up | Log In
            </Button>
          )}
        </div>
      {/* </div> */}
    </Fragment>
  );
};

export default Home;
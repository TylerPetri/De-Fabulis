import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Welcome from './Pages/Welcome/welcome';
import Compose from './Pages/Compose/compose';
import Read from './Pages/Read/read';
import Tags from './Pages/Tags/tags';
import Authors from './Pages/Authors/authors';
import Login from './Pages/Login-Register/login';
import Register from './Pages/Login-Register/register';
import PasswordRecovery from './Pages/Password-Recovery/questionAuth';
import NewPassword from './Pages/Password-Recovery/newPassword';

import fetchJSON from './utils/API';
import { handleAuth } from './utils/HandleAuth';
import { useStoreContext } from './utils/GlobalStore';

function App() {
  const [{ submitted }, dispatch] = useStoreContext();
  const scrollHeightDiv = useRef();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchJSON('/api/stories');
      dispatch({ type: 'SET', data: { data: res } });
    }
    fetchData();
  }, [submitted]);

  useEffect(() => {
    async function authentication() {
      let username = sessionStorage.libraryOfStories_user;
      const res = await handleAuth();
      if (res.userLoggedIn === false && res.user === '') {
        dispatch({
          type: 'SET',
          data: { userLoggedIn: false, user: '' },
        });
      } else if (res.userLoggedIn === true && res.user === username) {
        dispatch({
          type: 'SET',
          data: { userLoggedIn: true, user: username },
        });
      } else if (res.mustBeLoggedIn === true) {
        dispatch({
          type: 'SET',
          data: { mustBeLoggedIn: true },
        });
      } else if (res === 'Authentication failed') {
        dispatch({
          type: 'SET',
          data: { mustBeLoggedIn: true },
        });
      } else {
        return 'Authentication failed';
      }
    }
    authentication();
  }, []);

  useEffect(() => {
    function handleResize() {
      let tempWindow = { width: undefined, height: undefined };
      tempWindow.width = window.innerWidth;
      tempWindow.height = window.innerHeight;

      dispatch({
        type: 'SET',
        data: {
          windowSize: tempWindow,
          scrollHeight: scrollHeightDiv.current.scrollHeight,
        },
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={scrollHeightDiv}>
      <Router>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/compose' component={Compose} />
        <Route path='/browse' component={Read} />
        {/* <Route exact path='/tags' component={Tags} /> */}
        <Route exact path='/authors' component={Authors} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/security-question' component={PasswordRecovery} />
        <Route exact path='/new-password' component={NewPassword} />
      </Router>
    </div>
  );
}

export default App;

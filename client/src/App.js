import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Welcome from './Pages/Welcome/welcome';
import Compose from './Pages/Compose/compose';
import Read from './Pages/Read/read';
import Tags from './Pages/Tags/tags';
import Authors from './Pages/Authors/authors';
import Login from './Pages/Login-Register/login';
import Register from './Pages/Login-Register/register';

import fetchJSON from './utils/API';
import { useStoreContext } from './utils/GlobalStore';

function App() {
  const [{ submitted, scrollHeight }, dispatch] = useStoreContext();
  const scrollHeightDiv = useRef();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchJSON('/api/stories');
      dispatch({ type: 'SET', data: { data: res } });
    }
    fetchData();
  }, [submitted]);

  useEffect(() => {
    async function handleAuth() {
      let username = sessionStorage.libraryOfStories_user;
      let session = sessionStorage.libraryOfStories_session;
      if (username) {
        await fetchJSON('/api/authentication', 'POST', {
          username: username,
          session: session,
          type: 'checkAuth',
        });
        const res = await fetchJSON(`/api/authentication/${username}`);
        if (res.message === true) {
          dispatch({
            type: 'SET',
            data: { userLoggedIn: true, user: username },
          });
        }
      }
    }
    handleAuth();
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
      </Router>
    </div>
  );
}

export default App;

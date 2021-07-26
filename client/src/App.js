import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Welcome from './Pages/Welcome/welcome';
import Compose from './Pages/Compose/compose';
import Read from './Pages/Read/read';
import Tags from './Pages/Tags/tags';
import Artists from './Pages/Artists/artists';

import fetchJSON from './utils/API';
import { useStoreContext } from './utils/GlobalStore';

function App() {
  const [_, dispatch] = useStoreContext();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchJSON('/api/stories');
      dispatch({ type: 'SET_DATA', data: { data: res } });
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleResize() {
      let temp = { width: undefined, height: undefined };
      temp.width = window.innerWidth;
      temp.height = window.innerHeight;

      dispatch({
        type: 'SET_WINDOW_SIZE',
        data: {
          windowSize: temp,
        },
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/compose' component={Compose} />
      <Route exact path='/stories' component={Read} />
      <Route exact path='/tags' component={Tags} />
      <Route exact path='/artists' component={Artists} />
    </Router>
  );
}

export default App;

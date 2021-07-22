import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Welcome from './Components/Welcome/welcome';
import Compose from './Components/Compose/compose';
import Read from './Components/Read/read';
import Tags from './Components/Tags/tags';
import Artists from './Components/Artists/artists';

import fetchJSON from './utils/API';
import { useStoreContext } from './utils/GlobalStore';

function App() {
  const [_, dispatch] = useStoreContext();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchJSON('/api/stories');
      dispatch({ type: 'SET_DATA', data: { data: res } });
      console.log(res);
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/compose' component={Compose} />
        <Route exact path='/stories' component={Read} />
        <Route exact path='/tags' component={Tags} />
        <Route exact path='/artists' component={Artists} />
      </Router>
    </div>
  );
}

export default App;

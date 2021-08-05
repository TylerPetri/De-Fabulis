import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';
import { useStoreContext } from '../../utils/GlobalStore';
import fetchJSON from '../../utils/API';

import './read.css';
import cameramanfast from '../../assets/cameramanfast.gif';
import loadingSVG from '../../assets/Bean Eater-1s-200px.svg';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();
  const [weWaiting, setWeWaiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'CLEAR_SELECTED_FILES' });
    setTimeout(() => setWeWaiting(true), 6000);
  }, []);

  function filteredList(query) {
    const id = location.search.replace(query, '');
    if (query === '?author=')
      return data.filter((a) => a.username === id.replace(/%20/g, ' '));
    if (query === '?search=')
      return data.filter((a) =>
        a.title.toLowerCase().includes(id.replace(/%20/g, ' '))
      );
  }

  // function getData() {
  //   async function fetchData() {
  //     const res = await fetchJSON('/api/stories');
  //     dispatch({ type: 'SET', data: { data: res } });
  //     console.log('fetched');
  //   }
  //   fetchData();
  // }

  // function logs() {
  //   console.log(data);
  // }

  return (
    <>
      <Navbar />
      <StoryPopup />
      {/* <button onClick={getData}>getData</button>
      <button onClick={logs}>logs</button> */}
      <div className='cards-container'>
        {data.length > 0 && location.search.length < 1 ? (
          data.map((item) => <Cards key={item.createdAt} item={item} />)
        ) : location.search.includes('?author=') ? (
          filteredList('?author=').map((item) => (
            <Cards key={item.createdAt} item={item} />
          ))
        ) : location.search.includes('?search=') ? (
          filteredList('?search=').map((item) => (
            <Cards key={item.createdAt} item={item} />
          ))
        ) : (
          <div className='loading-svg-container'>
            <img
              src={cameramanfast}
              alt='its been 84 years'
              style={{
                display: weWaiting ? 'block' : 'none',
                marginBottom: '20px',
              }}
            />
            <div className='loading-stories'>Loading</div>
            <img src={loadingSVG} alt='loading-animation' />
          </div>
        )}
      </div>
    </>
  );
}

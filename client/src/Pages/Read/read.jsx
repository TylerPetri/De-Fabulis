import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';
import { useStoreContext } from '../../utils/GlobalStore';

import './read.css';
import cameramanfast from '../../assets/cameramanfast.gif';
import loadingSVG from '../../assets/Bean Eater-1s-200px.svg';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();
  const [weWaiting, setWeWaiting] = useState(false);
  const [sorry, setSorry] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'CLEAR_SELECTED_FILES' });
    setTimeout(() => setWeWaiting(true), 4000);
    setTimeout(() => setSorry(true), 13000);
  }, []);

  function filteredList(query) {
    const id = location.search.replace(query, '');
    if (query === '?author=')
      return data.filter((a) => a.username === id.replace(/%20/g, ' '));
    if (query === '?search=')
      return data.filter((a) =>
        a.title.toLowerCase().includes(id.replace(/%20/g, ' '))
      );
    if (query === '?tag=')
      return data.filter((a) => a.tags.includes(id.replace(/%20/g, ' ')));
  }

  return (
    <>
      <StoryPopup />
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
        ) : location.search.includes('?tag=') ? (
          filteredList('?tag=').map((item) => (
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
            <div className='loading-stories'>
              {!sorry
                ? 'Loading'
                : 'Sorry slow server... reload works sometimes'}{' '}
            </div>
            <img src={loadingSVG} alt='loading-animation' />
          </div>
        )}
      </div>
    </>
  );
}

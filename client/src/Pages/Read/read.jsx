import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';

import './read.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'CLEAR_SELECTED_FILES' });
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

  return (
    <>
      <Navbar />
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
        ) : (
          <h2>No stories in database</h2>
        )}
      </div>
    </>
  );
}

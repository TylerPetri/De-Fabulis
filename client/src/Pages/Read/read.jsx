import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';

import './read.css';
import { useStoreContext } from '../../utils/GlobalStore';
import { useEffect } from 'react';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();
  const { author: userParam } = useParams();
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    function loadAuthor() {
      let list = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].username === userParam) {
          list.push(data[i]);
        }
      }
      setAuthorList(list);
    }
    if (userParam) loadAuthor();
    dispatch({ type: 'CLEAR_SELECTED_FILES' });
  }, []);

  return (
    <>
      <Navbar />
      <StoryPopup />
      <div className='cards-container'>
        {data.length > 0 && authorList.length < 1 ? (
          data.map((item) => <Cards key={item.createdAt} item={item} />)
        ) : authorList.length > 0 ? (
          authorList.map((item) => <Cards key={item.createdAt} item={item} />)
        ) : (
          <h2>No stories in database</h2>
        )}
      </div>
    </>
  );
}

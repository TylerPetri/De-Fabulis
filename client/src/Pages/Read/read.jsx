import Navbar from '../../Components/Navbar/navbar';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';

import './read.css';
import { useStoreContext } from '../../utils/GlobalStore';
import { useEffect } from 'react';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();

  useEffect(() => dispatch({ type: 'CLEAR_SELECTED_FILES' }), []);

  return (
    <>
      <Navbar />
      <StoryPopup />
      <div className='cards-container'>
        {data.length > 0 ? (
          data.map((item) => {
            return <Cards key={item.createdAt} item={item} />;
          })
        ) : (
          <h2>No stories in database</h2>
        )}
      </div>
    </>
  );
}

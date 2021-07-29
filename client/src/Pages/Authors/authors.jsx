import { useHistory } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalStore';
import Navbar from '../../Components/Navbar/navbar';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import './authors.css';

export default function Authors() {
  const [{ data }] = useStoreContext();
  const history = useHistory();

  function setAuthor(username) {
    history.push(`/browse?author=${username}`);
  }

  return (
    <>
      <Navbar />
      <div className='authors-wrapper'>
        <AlphabeticalPagenation />
        <div className='authors-cont'>
          {data.map((item) => (
            <button
              className='authors-btn'
              key={item.username}
              onClick={() => setAuthor(item.username)}
            >
              {item.username}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

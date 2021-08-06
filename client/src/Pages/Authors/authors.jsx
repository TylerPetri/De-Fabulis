import { useHistory, useLocation } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalStore';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import noOneHere from '../../assets/where_is_everyone.gif';
import './authors.css';

export default function Authors() {
  const [{ data }] = useStoreContext();
  const history = useHistory();
  const location = useLocation();

  function setAuthor(username) {
    history.push(`/browse?author=${username}`);
  }

  function filteredList() {
    if (location.search.includes('?filter=')) {
      const id = location.search.replace('?filter=', '');
      return data.filter((a) => a.username[0] === id);
    } else {
      return data;
    }
  }

  return (
    <>
      <div className='authors-wrapper'>
        <AlphabeticalPagenation page={'/authors'} />
        <div className='authors-cont'>
          {filteredList().length < 1 ? (
            <img src={noOneHere} alt='no authors' className='no-authors-img' />
          ) : (
            filteredList().map((item) => (
              <button
                className='authors-btn'
                key={item.username}
                onClick={() => setAuthor(item.username)}
              >
                {item.username}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}

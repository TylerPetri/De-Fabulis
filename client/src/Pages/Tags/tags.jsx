import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalStore';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import noOneHere from '../../assets/where_is_everyone.gif';
import './tags.css';
import fetchJSON from '../../utils/API';

export default function Tags() {
  const [_, dispatch] = useStoreContext();
  const [tags, setTags] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function fetchTags() {
      const res = await fetchJSON('/api/tags');
      const sorted = res.sort((a, b) => {
        if (b.tag > a.tag) return -1;
        if (a.tag > b.tag) return 1;
        return 0;
      });
      setTags(sorted);
    }
    fetchTags();
    dispatch({ type: 'CLEAR_SELECTED_FILES' });
  }, []);

  function sendTag(tag) {
    history.push(`/browse?tag=${tag}`);
  }

  function filteredList() {
    if (location.search.includes('?filter=')) {
      const id = location.search.replace('?filter=', '');
      return tags.filter((a) => a.tag[0] === id.toLowerCase());
    } else {
      return tags;
    }
  }

  return (
    <>
      <div className='tags-wrapper'>
        <AlphabeticalPagenation page={'/tags'} />
        <div className='tags-cont'>
          {filteredList().length < 1 ? (
            <img src={noOneHere} alt='no tags' className='no-tags-img' />
          ) : (
            filteredList().map((item) => {
              return (
                <button
                  className='tags-btn'
                  key={item.tag}
                  onClick={() => sendTag(item.tag)}
                >
                  <div className='tag-list-name'>
                    {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                  </div>
                  <div className='tag-list-quantity'>{item.quantity}</div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

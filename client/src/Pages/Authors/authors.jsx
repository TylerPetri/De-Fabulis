import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalStore';
import Navbar from '../../Components/Navbar/navbar';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import './authors.css';

export default function Authors() {
  const [{ data }, dispatch] = useStoreContext();
  const history = useHistory();

  return (
    <>
      <Navbar />
      <div className='authors-wrapper'>
        <AlphabeticalPagenation />
        <div className='authors-cont'>
          {data.map((item) => {
            return (
              <Link to={`/browse/${item.username}`} key={item.username}>
                <button
                  className='authors-btn'
                  // onClick={selectAuthor}
                >
                  {item.username}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

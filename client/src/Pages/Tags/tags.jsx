import Navbar from '../../Components/Navbar/navbar';
import { useStoreContext } from '../../utils/GlobalStore';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import './tags.css';

export default function Tags() {
  const [{ data }] = useStoreContext();

  return (
    <>
      <Navbar />
      <div className='tags-wrapper'>
        <AlphabeticalPagenation />
        <div className='tags-cont'>
          {data.map((item) => {
            return (
              <button className='tags-btn' key={item.username}>
                {item.tags}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

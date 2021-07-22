import { useStoreContext } from '../../utils/GlobalStore';
import Navbar from '../../Components/Navbar/navbar';
import AlphabeticalPagenation from '../../Components/Alphabetical-Pagenation/alphabetical-pagenation';

import './artists.css';

export default function Artists() {
  const [{ data }] = useStoreContext();

  return (
    <>
      <Navbar />
      <div className='artists-wrapper'>
        <AlphabeticalPagenation />
        <div className='artists-cont'>
          {data.map((item) => {
            return (
              <button className='artists-btn' key={item.username}>
                {item.username}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

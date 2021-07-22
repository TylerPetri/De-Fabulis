import Navbar from '../Navbar/navbar';
import Cards from '../Cards/cards';

import './read.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function Read() {
  const [{ data }] = useStoreContext();

  return (
    <>
      <Navbar />
      <div className='cards-container'>
        {data.map((item) => {
          return <Cards key={item.createdAt} item={item} />;
        })}
      </div>
    </>
  );
}

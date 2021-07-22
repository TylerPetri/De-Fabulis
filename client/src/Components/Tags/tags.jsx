import Navbar from '../Navbar/navbar';
import { useStoreContext } from '../../utils/GlobalStore';

import './tags.css';

export default function Tags() {
  const [{ data }] = useStoreContext();

  return (
    <>
      <Navbar />
      <div className='tags-wrapper'>
        <ul className='tags-alphabetical-pagenation'>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
          <li>F</li>
          <li>G</li>
          <li>H</li>
          <li>I</li>
          <li>J</li>
          <li>K</li>
          <li>L</li>
          <li>M</li>
          <li>N</li>
          <li>O</li>
          <li>P</li>
          <li>Q</li>
          <li>R</li>
          <li>S</li>
          <li>T</li>
          <li>U</li>
          <li>V</li>
          <li>W</li>
          <li>X</li>
          <li>Y</li>
          <li>Z</li>
        </ul>
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

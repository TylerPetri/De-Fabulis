import { useStoreContext } from '../../utils/GlobalStore';
import Navbar from '../Navbar/navbar';
import './artists.css';

export default function Artists() {
  const [{ data }] = useStoreContext();

  return (
    <>
      <Navbar />
      <div className='artists-wrapper'>
        <ul className='artists-alphabetical-pagenation'>
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

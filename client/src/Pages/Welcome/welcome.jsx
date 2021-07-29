import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import write from '../../assets/animated-book.gif';
import read from '../../assets/read-animated.gif';

import { useStoreContext } from '../../utils/GlobalStore';

import './welcome.css';

export default function Welcome() {
  const [_, dispatch] = useStoreContext();

  useEffect(() => dispatch({ type: 'CLEAR_SELECTED_FILES' }), []);

  return (
    <div className='welcome-wrapper'>
      <div className='welcome-title'>De Fabulis</div>
      <div className='welcome-card'>
        <div className='wBooksCont'>
          {' '}
          <Link to='/compose'>
            <img src={write} alt='link-write-page' className='welcome-img' />
          </Link>
        </div>
        <div className='wBooksCont'>
          {' '}
          <Link to='/stories'>
            <img
              src={read}
              alt='link-read-page'
              className='welcome-img-books'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

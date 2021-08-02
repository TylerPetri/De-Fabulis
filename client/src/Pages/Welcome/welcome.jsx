import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import write from '../../assets/animated-book.gif';
import read from '../../assets/read-animated.gif';

import { useStoreContext } from '../../utils/GlobalStore';

import './welcome.css';

export default function Welcome() {
  const [_, dispatch] = useStoreContext();

  useEffect(() => dispatch({ type: 'CLEAR_SELECTED_FILES' }), []);

  useEffect(() => {
    gsap.to('.welcome-to-span', {
      duration: 1.5,
      ease: 'elastic.out(.4,.2)',
      fontSize: '3em',
    });
    gsap.to('.library-of-stories-span', {
      duration: 2.5,
      ease: 'elastic.out(.4,.2)',
      fontSize: '7em',
    });
    gsap.to('.welcome-img', { delay: 2, opacity: 1, ease: 'power1.out' });
    gsap.to('.welcome-img-books', { delay: 2, opacity: 1, ease: 'power1.out' });
  }, []);

  function skipGSAP() {
    gsap.to('.welcome-img', { opacity: 1 });
    gsap.to('.welcome-img-books', { opacity: 1 });
  }

  return (
    <div className='welcome-wrapper' onClick={skipGSAP}>
      <div className='welcome-title'>
        <span className='welcome-to-span'>Welcome to</span>
        <span className='library-of-stories-span'>Library of Stories</span>
      </div>
      <div className='welcome-card'>
        <div className='wBooksCont'>
          {' '}
          <Link to='/compose'>
            <img src={write} alt='link-write-page' className='welcome-img' />
          </Link>
        </div>
        <div className='wBooksCont'>
          {' '}
          <Link to='/browse'>
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

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';

import './navbar.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function Taskbar() {
  const [{ data }] = useStoreContext();
  const searchAllInput = useRef();

  function search() {
    console.log('searching');
  }

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      search();
    }
  }

  function findRandom() {
    const index = Math.floor(Math.random() * data.length);
    console.log(index);
  }

  return (
    <div className='navbar'>
      <div className='nav-cont'>
        <div className='nav-item'>
          <Link to='/' className='link'>
            <div className='nav-title'>F</div>
          </Link>
          <Link to='/compose' className='link'>
            <div className='nav-link'>Compose</div>
          </Link>
          <input
            placeholder='Search'
            className='search-taskbar-input'
            ref={searchAllInput}
            onKeyPress={handleKeyPress}
          />
          <button className='search-taskbar-btn' onClick={search}>
            <BiSearchAlt />
          </button>
          <Link to='/browse' className='link'>
            <div className='nav-link'>Browse</div>
          </Link>
          <div className='link'>
            <div className='nav-link' onClick={findRandom}>
              Random
            </div>
          </div>
          <Link to='/tags' className='link'>
            <div className='nav-link'>Tags</div>
          </Link>
          <Link to='/artists' className='link'>
            <div className='nav-link'>Artists</div>
          </Link>
        </div>
      </div>
      <div className='nav-cont'>
        <div className='nav-item'>
          <button className='login-nav'>Login</button>
          <button className='register-nav'>Register</button>
        </div>
      </div>
    </div>
  );
}

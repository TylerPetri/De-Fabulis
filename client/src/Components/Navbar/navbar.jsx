import { Link } from 'react-router-dom';
import wand from '../../assets/wand.png';

import './navbar.css';

export default function Taskbar() {
  return (
    <div className='navbar'>
      <div className='nav-cont'>
        <Link to='/'>
          <img src={wand} alt='home-link-wand' className='wand-pic' />
        </Link>
        <div className='nav-item'>
          <Link to='/compose' className='link'>
            <div className='nav-link'>Compose</div>
          </Link>
          <Link to='/stories' className='link'>
            <div className='nav-link'>Stories</div>
          </Link>
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
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

import './navbar.css';

export default function Taskbar() {
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
          <Link to='/browse' className='link'>
            <div className='nav-link'>Browse</div>
          </Link>
          <Link to='/random' className='link'>
            <div className='nav-link'>Random</div>
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
          <button className='login-nav'>Login</button>
          <button className='register-nav'>Register</button>
        </div>
      </div>
    </div>
  );
}

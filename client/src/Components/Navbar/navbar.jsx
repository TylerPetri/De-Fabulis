import { useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmAlert from './confirmAlert';
import Sidenav from './sidenav';
import { ImPencil } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiSearchAlt } from 'react-icons/bi';
import { useStoreContext } from '../../utils/GlobalStore';

import fetchJSON from '../../utils/API';

import './navbar.css';

export default function Taskbar() {
  const [
    { data, userLoggedIn, windowSize, mainSidenav, mustBeLoggedIn },
    dispatch,
  ] = useStoreContext();
  const [alert, setAlert] = useState(false);
  const [option, setOption] = useState('');

  const searchAllInput = useRef();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (
      !sessionStorage.libraryOfStories_user ||
      sessionStorage.libraryOfStories_user === ''
    ) {
      dispatch({ type: 'SET', data: { userLoggedIn: false } });
    }
    dispatch({ type: 'SET', data: { mustBeLoggedIn: false } });
  }, []);

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      pushAlert('search');
      dispatch({ type: 'SET', data: { mainSidenav: false } });
    }
  }

  function toggleSidenav() {
    dispatch({ type: 'SET', data: { mainSidenav: !mainSidenav } });
  }

  function pushAlert(option) {
    if (location.pathname === '/compose' && !mustBeLoggedIn) {
      setAlert(true);
      setOption(option);
    } else {
      if (option === 'search') {
        search();
      } else if (option === 'random') {
        findRandom();
      } else {
        history.push(option);
      }
    }
  }

  function search() {
    history.push(
      `/browse?search=${searchAllInput.current.value.toLowerCase().trim()}`
    );
    searchAllInput.current.value = '';
  }

  function findRandom() {
    pushAlert();
    const idx = Math.floor(Math.random() * data.length);
    history.push('/browse');
    dispatch({
      type: 'SET',
      data: {
        username: data[idx].username,
        createdAt: data[idx].createdAt,
        tags: data[idx].tags,
        title: data[idx].title,
        textCover: data[idx].textCover,
        story: data[idx].story,
        storySettings: data[idx].storySettings,
        coverSettings: data[idx].coverSettings,
        openStory: true,
      },
    });
  }

  function handleAlert(choice) {
    if (choice === 'back') setAlert(false);
    if (choice === 'forward') {
      if (option === '/') {
        history.push('/');
      } else if (option === 'search') {
        search();
      } else if (option === '/browse') {
        history.push('/browse');
      } else if (option === 'random') {
        findRandom();
      } else if (option === '/tags') {
        history.push('/tags');
      } else if (option === '/authors') {
        history.push('/authors');
      } else if (option === '/login') {
        history.push('/login');
      } else if (option === '/register') {
        history.push('/register');
      } else if (option === '/compose') {
        history.push('/compose');
      }
    }
    setAlert(false);
  }

  async function logout() {
    let username = sessionStorage.libraryOfStories_user;
    let session = sessionStorage.libraryOfStories_session;
    await fetchJSON('/api/authentication', 'POST', {
      username: username,
      session: session,
      type: 'logout',
    });
    sessionStorage.clear();
    dispatch({ type: 'SET', data: { userLoggedIn: false, user: '' } });
  }

  return (
    <>
      <div className='navbar' style={{ zIndex: '999999' }}>
        <div className='nav-cont'>
          <div className='nav-item'>
            {windowSize.width < 800 ? (
              <>
                <div className='nav-link' onClick={toggleSidenav}>
                  <GiHamburgerMenu />
                </div>
                <Sidenav
                  searchAllInput={searchAllInput}
                  handleKeyPress={handleKeyPress}
                  pushAlert={pushAlert}
                  BiSearchAlt={BiSearchAlt}
                  toggleSidenav={toggleSidenav}
                  mainSidenav={mainSidenav}
                />
              </>
            ) : (
              <>
                <div className='nav-title' onClick={() => pushAlert('/')}>
                  F
                </div>
                <input
                  placeholder='Search title'
                  className='search-taskbar-input'
                  ref={searchAllInput}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className='search-taskbar-btn'
                  onClick={() => pushAlert('search')}
                >
                  <BiSearchAlt />
                </button>
                <div className='nav-link' onClick={() => pushAlert('/browse')}>
                  Browse
                </div>
                <div className='nav-link' onClick={() => pushAlert('random')}>
                  Random
                </div>
                {/* <div className='nav-link' onClick={() => pushAlert('/tags')}>
              Tags
            </div> */}
                <div className='nav-link' onClick={() => pushAlert('/authors')}>
                  Authors
                </div>
              </>
            )}
          </div>
        </div>
        <div className='nav-cont'>
          <div className='nav-item'>
            {userLoggedIn ? (
              <>
                <button
                  className='compose-nav'
                  onClick={() => pushAlert('/compose')}
                >
                  Compose
                  <ImPencil />
                </button>
                <button className='login-nav' onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className='login-nav'
                  onClick={() => pushAlert('/login')}
                >
                  Login
                </button>
                <button
                  className='register-nav '
                  onClick={() => pushAlert('/register')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmAlert alert={alert} handleAlert={handleAlert} />
    </>
  );
}

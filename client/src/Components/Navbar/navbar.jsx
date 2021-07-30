import { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmAlert from './confirmAlert';
import { BiSearchAlt } from 'react-icons/bi';
import { useStoreContext } from '../../utils/GlobalStore';

import './navbar.css';

export default function Taskbar() {
  const [{ data }, dispatch] = useStoreContext();
  const [alert, setAlert] = useState(false);
  const [option, setOption] = useState('');

  const searchAllInput = useRef();
  const history = useHistory();
  const location = useLocation();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      pushAlert();
    }
  }

  function pushAlert(option) {
    if (location.pathname === '/compose') {
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
      }
    }
    setAlert(false);
  }

  return (
    <>
      <div className='navbar'>
        <div className='nav-cont'>
          <div className='nav-item'>
            <div className='link'>
              <div className='nav-title' onClick={() => pushAlert('/')}>
                F
              </div>
            </div>
            <input
              placeholder='Search'
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
            <div className='link'>
              <div className='nav-link' onClick={() => pushAlert('/browse')}>
                Browse
              </div>
            </div>
            <div className='link'>
              <div className='nav-link' onClick={() => pushAlert('random')}>
                Random
              </div>
            </div>
            <div className='link'>
              <div className='nav-link' onClick={() => pushAlert('/tags')}>
                Tags
              </div>
            </div>
            <div className='link'>
              <div className='nav-link' onClick={() => pushAlert('/authors')}>
                Authors
              </div>
            </div>
          </div>
        </div>
        <div className='nav-cont'>
          <div className='nav-item'>
            <button className='login-nav' onClick={() => pushAlert('/login')}>
              Login
            </button>
            <button
              className='register-nav '
              onClick={() => pushAlert('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <ConfirmAlert alert={alert} handleAlert={handleAlert} />
    </>
  );
}

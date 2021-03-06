import { BiSearchAlt } from 'react-icons/bi';
import { FiChevronLeft } from 'react-icons/fi';
import { useStoreContext } from '../../utils/GlobalStore';

export default function Sidenav(props) {
  const [{ scrollHeight, mainSidenav }] = useStoreContext();

  return (
    <>
      <div
        className='sidenav-window-close'
        style={{
          minHeight: window.innerHeight,
          height: scrollHeight + 100,
          transform: mainSidenav ? 'translateX(0%)' : 'translateX(-100%)',
        }}
        onClick={props.toggleSidenav}
      ></div>
      <div
        className='main-sidenav'
        style={{
          minHeight: window.innerHeight,
          height: scrollHeight + 100,
          transform: mainSidenav ? 'translateX(0%)' : 'translateX(-100%)',
        }}
      >
        <ul>
          <li>
            <div className='nav-title' onClick={() => props.pushAlert('/')}>
              F
            </div>
            <FiChevronLeft
              className='sidenav-close-btn'
              onClick={props.toggleSidenav}
            />
          </li>
          <li>
            <input
              placeholder='Search title'
              className='search-taskbar-input'
              ref={props.searchAllInput}
              onKeyPress={props.handleKeyPress}
            />

            <button
              className='search-taskbar-btn'
              onClick={() => props.pushAlert('search')}
            >
              <BiSearchAlt />
            </button>
          </li>
          <li>
            <div
              className='nav-link'
              onClick={() => props.pushAlert('/browse')}
            >
              Browse
            </div>
          </li>
          <li>
            <div className='nav-link' onClick={() => props.pushAlert('random')}>
              Random
            </div>
          </li>
          <li>
            <div className='nav-link' onClick={() => props.pushAlert('/tags')}>
              Tags
            </div>
          </li>
          <li>
            <div
              className='nav-link'
              onClick={() => props.pushAlert('/authors')}
            >
              Authors
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

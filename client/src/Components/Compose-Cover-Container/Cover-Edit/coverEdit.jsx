import { useState, useRef } from 'react';
import { IoIosOptions } from 'react-icons/io';
import ColorOptions from '../../Compose-Color-Options/colorOptions';
import { useStoreContext } from '../../../utils/GlobalStore';

import './coverEdit.css';

export default function CoverEdit(props) {
  const [{ title, openCoverEdit, windowSize }, dispatch] = useStoreContext();
  const [sidenav, setSidenav] = useState(false);

  const titleInput = useRef();
  const textCover = useRef();

  function toggleSidenav() {
    !sidenav ? setSidenav(true) : setSidenav(false);
  }

  function closeEdit() {
    dispatch({ type: 'SET_ONE', data: { openCoverEdit: false } });
  }

  function handleChange(e) {
    e.target.className === 'edit-title-area'
      ? dispatch({ type: 'SET_ONE', data: { title: titleInput.current.value } })
      : dispatch({
          type: 'SET_ONE',
          data: { textCover: textCover.current.value },
        });
  }

  return (
    <>
      <div
        className='edit-compose-container'
        style={{
          opacity: openCoverEdit ? '1' : '0',
          zIndex: openCoverEdit ? '10' : '-1',
        }}
      >
        <div className='edit-compose-card'>
          {windowSize.width < 942 && (
            <div
              className='color-options-sidenav'
              style={{ marginLeft: sidenav ? '0' : '-205px' }}
            >
              <ColorOptions
                sidenav={sidenav}
                settings={props.settings}
                setSettings={props.setSettings}
              />
            </div>
          )}
          <div className='edit-options-cont'>
            {windowSize.width > 942 ? (
              <ColorOptions
                settings={props.settings}
                setSettings={props.setSettings}
              />
            ) : (
              <>
                <IoIosOptions
                  className='color-options-nav-btn'
                  onClick={toggleSidenav}
                />
              </>
            )}
            <div className='edit-compose-saveExit-cont'>
              <div className='edit-compose-save'>Save</div>
              <span className='vertical-line-span'>|</span>
              <div className='edit-compose-exit' onClick={closeEdit}>
                Exit
              </div>
            </div>
          </div>
          <textarea
            placeholder='Title here'
            className='edit-title-area'
            style={{
              color: props.settings[0].color,
              backgroundColor: props.settings[1].color,
            }}
            ref={titleInput}
            value={title}
            onChange={handleChange}
          />
          <textarea
            placeholder='Story here'
            className='edit-compose-area'
            style={{
              color: props.settings[0].color,
              backgroundColor: props.settings[1].color,
            }}
            ref={textCover}
            value={textCover}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

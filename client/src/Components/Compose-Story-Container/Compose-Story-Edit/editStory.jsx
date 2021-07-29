import { useState, useRef } from 'react';
import ColorOptions from '../../Compose-Color-Options/colorOptions';
import { IoColorPalette } from 'react-icons/io5';
import { CgCloseR } from 'react-icons/cg';

import { useStoreContext } from '../../../utils/GlobalStore';

import './editStory.css';

export default function CompTextArea(props) {
  const [{ openStoryEdit, title, story, windowSize }, dispatch] =
    useStoreContext();
  const [sidenav, setSidenav] = useState(false);

  const storyInput = useRef();
  const titleInput = useRef();

  function closeEdit() {
    dispatch({ type: 'SET', data: { openStoryEdit: false } });
  }

  function handleChange(e) {
    e.target.className === 'edit-title-area'
      ? dispatch({ type: 'SET', data: { title: titleInput.current.value } })
      : dispatch({ type: 'SET', data: { story: storyInput.current.value } });
  }

  function toggleSidenav() {
    !sidenav ? setSidenav(true) : setSidenav(false);
  }

  return (
    <>
      <div
        className='edit-compose-container'
        style={{
          opacity: openStoryEdit ? '1' : '0',
          zIndex: openStoryEdit ? '10' : '-1',
          backgroundColor: props.settings[2].color,
        }}
      >
        <div className='edit-compose-card'>
          {windowSize.width < 942 && (
            <div
              className='color-options-sidenav'
              style={{
                transform: sidenav ? 'translateX(0%)' : 'translateX(-100%)',
                backgroundColor: props.settings[1].color,
              }}
            >
              <ColorOptions
                sidenav={sidenav}
                settings={props.settings}
                setSettings={props.setSettings}
                style={{ display: openStoryEdit ? 'block' : 'none' }}
              />
            </div>
          )}
          <div
            className='edit-options-cont'
            style={{ backgroundColor: props.settings[1].color }}
          >
            {windowSize.width > 942 && <div style={{ width: '30px' }}></div>}
            <div className='edit-options'>
              {windowSize.width > 942 ? (
                <ColorOptions
                  settings={props.settings}
                  setSettings={props.setSettings}
                  style={{ display: openStoryEdit ? 'block' : 'none' }}
                />
              ) : (
                <>
                  <IoColorPalette
                    className='color-options-nav-btn'
                    onClick={toggleSidenav}
                  />
                </>
              )}
            </div>
            <div className='story-edit-close-button'>
              <CgCloseR onClick={closeEdit} />
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
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder='Story here'
            className='edit-compose-area'
            style={{
              color: props.settings[0].color,
              backgroundColor: props.settings[1].color,
            }}
            ref={storyInput}
            value={story}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </>
  );
}

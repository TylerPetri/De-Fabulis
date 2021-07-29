import { useState, useRef } from 'react';
import ColorOptions from '../../Compose-Color-Options/colorOptions';
import { IoIosOptions } from 'react-icons/io';

import { useStoreContext } from '../../../utils/GlobalStore';

import './editStory.css';

export default function CompTextArea(props) {
  const [
    {
      openStoryEdit,
      currentStory,
      title,
      story,
      windowSize,
      storySettings,
      username,
    },
    dispatch,
  ] = useStoreContext();
  const [sidenav, setSidenav] = useState(false);
  const [temp, setTemp] = useState([currentStory]);

  const storyInput = useRef();
  const titleInput = useRef();

  function closeEdit() {
    dispatch({ type: 'SET', data: { openStoryEdit: false } });
  }

  function handleChange(e) {
    e.target.className === 'edit-title-area'
      ? setTemp([...temp, (temp[0].title = titleInput.current.value)])
      : setTemp([...temp, (temp[0].story = storyInput.current.value)]);
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
        <div
          className='edit-compose-card'
          style={{
            transform: openStoryEdit ? 'translateY(0)' : 'translateY(-30%)',
          }}
        >
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
            className='edit-popup-authors'
            readOnly={true}
            style={{
              color: props.settings[0].color,
              backgroundColor: props.settings[1].color,
            }}
            value={username}
          />
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

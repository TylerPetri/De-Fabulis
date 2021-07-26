import { useState, useRef } from 'react';
import ColorOptions from '../Compose-Color-Options/colorOptions';
import { IoIosOptions } from 'react-icons/io';

import { useStoreContext } from '../../utils/GlobalStore';

import './editStory.css';

export default function CompTextArea(props) {
  const [{ openEdit, currentStory, windowSize }, dispatch] = useStoreContext();
  const [sidenav, setSidenav] = useState(false);
  const [temp, setTemp] = useState([currentStory]);

  const storyInput = useRef();
  const titleInput = useRef();

  function closeEdit() {
    dispatch({ type: 'CLOSE_EDIT' });
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
          opacity: openEdit ? '1' : '0',
          zIndex: openEdit ? '10' : '-1',
          backgroundColor: props.settings[2].color,
        }}
      >
        <div className='edit-compose-card'>
          <div
            className='color-options-sidenav'
            style={{ marginLeft: sidenav ? '0' : '-205px' }}
          >
            <ColorOptions
              settings={props.settings}
              setSettings={props.setSettings}
            />
          </div>
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
            value={currentStory.title}
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
            value={currentStory.story}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </>
  );
}

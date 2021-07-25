import { useState, useRef } from 'react';
import ColorOptions from '../Compose-Color-Options/colorOptions';

import { useStoreContext } from '../../utils/GlobalStore';

import './editStory.css';

export default function CompTextArea() {
  const [{ openEdit, currentStorySettings, currentStory }, dispatch] =
    useStoreContext();
  const [settings, setSettings] = useState(currentStorySettings);
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

  return (
    <>
      <div
        className='edit-compose-container'
        style={{
          opacity: openEdit ? '1' : '0',
          zIndex: openEdit ? '10' : '-1',
          backgroundColor: settings[2].color,
        }}
      >
        <div className='edit-compose-card'>
          <div className='edit-options-cont'>
            <ColorOptions settings={settings} setSettings={setSettings} />
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
              color: settings[0].color,
              backgroundColor: settings[1].color,
            }}
            ref={titleInput}
            value={currentStory.title}
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder='Story here'
            className='edit-compose-area'
            style={{
              color: settings[0].color,
              backgroundColor: settings[1].color,
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

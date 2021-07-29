import { useState, useRef } from 'react';
import ColorOptions from '../../Compose-Color-Options/colorOptions';
import { IoIosOptions } from 'react-icons/io';

import { useStoreContext } from '../../../utils/GlobalStore';

import './coverEdit.css';

export default function CompCoverEdit(props) {
  const [
    {
      openCoverEdit,
      currentStory,
      title,
      story,
      windowSize,
      storySettings,
      coverSettings,
      imageCover,
      textCover,
    },
    dispatch,
  ] = useStoreContext();
  const [sidenav, setSidenav] = useState(false);
  const [temp, setTemp] = useState([currentStory]);

  const storyInput = useRef();
  const titleInput = useRef();

  function closeEdit() {
    dispatch({ type: 'SET', data: { openCoverEdit: false } });
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
          opacity: openCoverEdit ? '1' : '0',
          zIndex: openCoverEdit ? '10' : '-1',
          backgroundColor: props.settings[2].color,
        }}
      >
        <div className='cover-edit-tabs'>
          <h3>Cover</h3>
          <h3>Story</h3>
        </div>
        <div
          className='card'
          style={{
            transform: openCoverEdit ? 'translateY(-20%)' : 'translateY(-80%)',
          }}
        >
          <div
            className='story'
            style={{
              color: `${storySettings.font}`,
              backgroundColor: `${storySettings.textBackground}`,
            }}
          >
            "{story}"
          </div>
          <div
            className='cover'
            style={{
              color: `${coverSettings.font}`,
              backgroundColor: `${coverSettings.textBackground}`,
            }}
          >
            {imageCover.length > 0
              ? `${imageCover}`
              : `"${textCover.slice(0, 150)}"`}
          </div>
          <div className='title'>{title}</div>
        </div>
      </div>
    </>
  );
}

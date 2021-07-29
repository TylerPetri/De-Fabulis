import { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';

import { useStoreContext } from '../../utils/GlobalStore';

export default function PreviewStory(props) {
  const [
    { username, title, story, openStoryPreview, currentStorySettings },
    dispatch,
  ] = useStoreContext();
  const [settings] = useState(currentStorySettings);

  function closePreview() {
    dispatch({ type: 'SET', data: { openStoryPreview: false } });
  }

  return (
    <div
      className='story-popup-container'
      style={{
        opacity: openStoryPreview ? '1' : '0',
        zIndex: openStoryPreview ? '10' : '-1',
        backgroundColor: settings[2].color,
      }}
    >
      <div className='story-popup-card'>
        <div className='story-popup-close-button'>
          <CgCloseR onClick={closePreview} />
        </div>
        <textarea
          className='popup-authors'
          readOnly={true}
          style={{
            color: settings[0].color,
            backgroundColor: settings[1].color,
          }}
          value={username}
        />
        <textarea
          placeholder='Title'
          className='story-popup-title'
          readOnly={true}
          style={{
            color: settings[0].color,
            backgroundColor: settings[1].color,
          }}
          value={title.length > 0 ? title : ''}
        />
        <textarea
          placeholder='Story'
          className='story-popup-area'
          readOnly={true}
          style={{
            color: settings[0].color,
            backgroundColor: settings[1].color,
          }}
          value={story}
        />
      </div>
    </div>
  );
}

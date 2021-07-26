import { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';

import { useStoreContext } from '../../utils/GlobalStore';

export default function PreviewStory(props) {
  const [{ openPreview, currentStorySettings }, dispatch] = useStoreContext();
  const [settings] = useState(currentStorySettings);

  function closePreview() {
    dispatch({ type: 'CLOSE_PREVIEW' });
  }

  return (
    <div
      className='story-popup-container'
      style={{
        opacity: openPreview ? '1' : '0',
        zIndex: openPreview ? '10' : '-1',
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
          value={props.username}
        />
        <textarea
          placeholder='Title'
          className='story-popup-title'
          readOnly={true}
          style={{
            color: settings[0].color,
            backgroundColor: settings[1].color,
          }}
          value={props.title.length > 0 ? props.title : ''}
        />
        <textarea
          placeholder='Story'
          className='story-popup-area'
          readOnly={true}
          style={{
            color: settings[0].color,
            backgroundColor: settings[1].color,
          }}
          value={props.story}
        />
      </div>
    </div>
  );
}

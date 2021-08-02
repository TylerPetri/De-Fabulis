import { useStoreContext } from '../../utils/GlobalStore';
import { CgCloseR } from 'react-icons/cg';

import './storyPopup.css';

export default function StoryPopup() {
  const [
    { openStory, storySettings, username, title, story, scrollHeight },
    dispatch,
  ] = useStoreContext();

  function closeStoryPopup() {
    dispatch({ type: 'SET', data: { openStory: false } });
  }

  return (
    <>
      <div
        className='fill-background-color'
        style={{
          height: scrollHeight,
          opacity: openStory ? '1' : '0',
          zIndex: openStory ? '10' : '-1',
          backgroundColor: storySettings.background,
        }}
      ></div>
      <div
        className='fill-background'
        style={{
          opacity: openStory ? '1' : '0',
          zIndex: openStory ? '10' : '-1',
        }}
      ></div>
      <div
        className='story-popup-container'
        style={{
          opacity: openStory ? '1' : '0',
          zIndex: openStory ? '10' : '-1',
        }}
      >
        <div className='story-popup-card'>
          <div className='story-popup-close-button'>
            <CgCloseR onClick={closeStoryPopup} />
          </div>
          <textarea
            className='popup-authors'
            readOnly={true}
            style={{
              color: storySettings.font,
              backgroundColor: storySettings.textBackground,
            }}
            value={username}
          />
          <textarea
            className='story-popup-title'
            readOnly={true}
            style={{
              color: storySettings.font,
              backgroundColor: storySettings.textBackground,
            }}
            value={title}
          />
          <textarea
            className='story-popup-area'
            readOnly={true}
            style={{
              color: storySettings.font,
              backgroundColor: storySettings.textBackground,
            }}
            value={story}
          />
        </div>
      </div>
    </>
  );
}

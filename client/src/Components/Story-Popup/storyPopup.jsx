import { useStoreContext } from '../../utils/GlobalStore';
import { CgCloseR } from 'react-icons/cg';

import './storyPopup.css';

export default function StoryPopup() {
  const [{ openStory, currentStory }, dispatch] = useStoreContext();

  function closeStoryPopup() {
    dispatch({ type: 'CLOSE_STORY' });
  }

  return (
    <>
      <div
        className='story-popup-container'
        style={{
          opacity: openStory ? '1' : '0',
          zIndex: openStory ? '10' : '-1',
          backgroundColor: currentStory.storySettings.background,
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
              color: currentStory.storySettings.font,
              backgroundColor: currentStory.storySettings.textBackground,
            }}
            value={currentStory.username}
          />
          <textarea
            className='story-popup-title'
            readOnly={true}
            style={{
              color: currentStory.storySettings.font,
              backgroundColor: currentStory.storySettings.textBackground,
            }}
            value={currentStory.title}
          />
          <textarea
            className='story-popup-area'
            readOnly={true}
            style={{
              color: currentStory.storySettings.font,
              backgroundColor: currentStory.storySettings.textBackground,
            }}
            value={currentStory.story}
          />
        </div>
      </div>
    </>
  );
}

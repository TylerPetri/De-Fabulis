import { FaWindowClose } from 'react-icons/fa';
import { useStoreContext } from '../../../utils/GlobalStore';

import './previewCover.css';

export default function PreviewCover() {
  const [
    {
      openCoverPreview,
      title,
      story,
      imageCover,
      textCover,
      currentCoverSettings,
      currentStorySettings,
    },
    dispatch,
  ] = useStoreContext();

  function closePreview() {
    dispatch({ type: 'SET', data: { openCoverPreview: false } });
  }

  return (
    <>
      <div
        className='edit-compose-container'
        style={{
          opacity: openCoverPreview ? '1' : '0',
          zIndex: openCoverPreview ? '10' : '-1',
          backgroundColor: 'rgb(0,0,0,0.9)',
        }}
      >
        <div className='card'>
          <textarea
            placeholder='Story here'
            className='story'
            readOnly={true}
            style={{
              color: currentStorySettings[0].color,
              backgroundColor: currentStorySettings[1].color,
            }}
            value={story}
          />

          <textarea
            placeholder='Cover here'
            className='cover'
            style={{
              color: currentCoverSettings[0].color,
              backgroundColor: currentCoverSettings[1].color,
            }}
            readOnly={true}
            value={
              imageCover.length > 0
                ? `${imageCover}`
                : `${textCover.slice(0, 150)}`
            }
          />

          <textarea
            placeholder='Title here'
            className='title'
            value={title}
            readOnly={true}
            style={{
              color: currentCoverSettings[2].color,
              backgroundColor: currentCoverSettings[3].color,
            }}
          />
        </div>
        <FaWindowClose
          className='cover-preview-close-btn'
          onClick={closePreview}
        />
      </div>
    </>
  );
}

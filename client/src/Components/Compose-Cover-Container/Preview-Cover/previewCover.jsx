import { FaWindowClose } from 'react-icons/fa';
import { useStoreContext } from '../../../utils/GlobalStore';

import './previewCover.css';

export default function PreviewCover(props) {
  const [
    { openCoverPreview, title, story, imageCover, textCover, scrollHeight },
    dispatch,
  ] = useStoreContext();

  function closePreview() {
    dispatch({ type: 'SET', data: { openCoverPreview: false } });
  }

  return (
    <>
      <div
        className='fill-background-color'
        style={{
          minHeight: window.innerHeight,
          height: scrollHeight,
          opacity: openCoverPreview ? '1' : '0',
          zIndex: openCoverPreview ? '10' : '-1',
          backgroundColor: 'rgb(0,0,0,0.9)',
        }}
      ></div>
      <div
        className='edit-compose-container'
        style={{
          transform:
            window.innerWidth < 600 ? 'translateY(30%)' : 'translateY(0%)',
          opacity: openCoverPreview ? '1' : '0',
          zIndex: openCoverPreview ? '10' : '-1',
        }}
      >
        <div className='card'>
          <textarea
            placeholder='Story here'
            className='story'
            readOnly={true}
            style={{
              color: props.storySettings[0].color,
              backgroundColor: props.storySettings[1].color,
            }}
            value={story}
          />

          <textarea
            placeholder='Cover here'
            className='cover'
            style={{
              color: props.coverSettings[0].color,
              backgroundColor: props.coverSettings[1].color,
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
              color: props.coverSettings[2].color,
              backgroundColor: props.coverSettings[3].color,
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

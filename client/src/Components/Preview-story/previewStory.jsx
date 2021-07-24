import { CgCloseR } from 'react-icons/cg';

import { useStoreContext } from '../../utils/GlobalStore';

import './previewStory.css';

export default function PreviewStory() {
  const [{ openPreview, currentStory }, dispatch] = useStoreContext();

  function closePreview() {
    dispatch({ type: 'CLOSE_PREVIEW' });
  }

  return (
    <div
      className='preview-compose-container'
      style={{
        opacity: openPreview ? '1' : '0',
        zIndex: openPreview ? '10' : '-1',
        backgroundColor: currentStory.settings[2].color,
      }}
    >
      <div className='preview-compose-card'>
        <div>
          <CgCloseR className='preview-close-button' onClick={closePreview} />
        </div>
        <textarea
          name='preview-compose-area'
          className='preview-compose-area'
          readOnly={true}
        />
      </div>
    </div>
  );
}

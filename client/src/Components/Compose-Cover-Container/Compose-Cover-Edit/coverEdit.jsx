import { useStoreContext } from '../../../utils/GlobalStore';

import './coverEdit.css';

export default function CoverEdit() {
  const [
    { title, imageCover, textCover, story, coverSettings, storySettings },
    dispatch,
  ] = useStoreContext();

  return (
    <>
      <div className='edit-card'>
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
          {imageCover.length > 0 ? `${imageCover}` : `"${textCover}"`}
        </div>
        <div className='title'>"{title}"</div>
      </div>
    </>
  );
}

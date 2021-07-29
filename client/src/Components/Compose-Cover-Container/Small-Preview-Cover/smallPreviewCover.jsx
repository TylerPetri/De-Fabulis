import { useStoreContext } from '../../../utils/GlobalStore';

import './smallPreviewCover.css';

export default function CoverEdit() {
  const [
    { title, imageCover, textCover, story, coverSettings, storySettings },
    dispatch,
  ] = useStoreContext();

  return (
    <>
      <div className='preview-card'>
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
    </>
  );
}

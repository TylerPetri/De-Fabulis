import { useStoreContext } from '../../../utils/GlobalStore';

import './smallPreviewCover.css';

export default function CoverEdit(props) {
  const [{ title, imageCover, textCover, story }] = useStoreContext();

  return (
    <>
      <div className='preview-card'>
        <div
          className='story'
          style={{
            color: props.storySettings[0].color,
            backgroundColor: props.storySettings[1].color,
          }}
        >
          {story}
        </div>
        <div
          className={imageCover.length > 0 ? 'img-cover-settings' : 'cover'}
          style={{
            color: !imageCover && `${props.coverSettings[0].color}`,
            backgroundColor: !imageCover && `${props.coverSettings[1].color}`,
          }}
        >
          {imageCover.length > 0 ? (
            <img src={imageCover} alt='cover' className='small-cover-img' />
          ) : (
            textCover.length > 0 && `"${textCover.slice(0, 150)}"`
          )}
        </div>
        <div
          className='title'
          style={{
            color: props.coverSettings[2].color,
            backgroundColor: props.coverSettings[3].color,
          }}
        >
          {title}
        </div>
      </div>
    </>
  );
}

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
          {story.length > 0 && `"${story}"`}
        </div>
        <div
          className='cover'
          style={{
            color: props.coverSettings[0].color,
            backgroundColor: props.coverSettings[1].color,
          }}
        >
          {imageCover.length > 0
            ? `${imageCover}`
            : textCover.length > 0 && `"${textCover.slice(0, 150)}"`}
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

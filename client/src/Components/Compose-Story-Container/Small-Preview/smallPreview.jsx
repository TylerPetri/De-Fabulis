import { useStoreContext } from '../../../utils/GlobalStore';

import './smallPreview.css';

export default function PreviewStory(props) {
  const [{ username, title, story }] = useStoreContext();

  return (
    <div
      className='small-preview-container'
      style={{ backgroundColor: props.settings[2].color }}
    >
      <div className='small-preview-card'>
        <textarea
          className='small-preview-authors'
          readOnly={true}
          style={{
            color: props.settings[0].color,
            backgroundColor: props.settings[1].color,
          }}
          value={username}
        />
        <textarea
          placeholder='Title'
          className='small-preview-title'
          readOnly={true}
          style={{
            color: props.settings[0].color,
            backgroundColor: props.settings[1].color,
          }}
          value={title.length > 0 ? title : ''}
        />
        <textarea
          placeholder='Story'
          className='small-preview-area'
          readOnly={true}
          style={{
            color: props.settings[0].color,
            backgroundColor: props.settings[1].color,
          }}
          value={story}
        />
      </div>
    </div>
  );
}

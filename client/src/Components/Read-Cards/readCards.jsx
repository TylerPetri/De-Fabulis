import { useStoreContext } from '../../utils/GlobalStore';

import './readCards.css';

export default function Cards(props) {
  const [_, dispatch] = useStoreContext();

  function openStoryPopup() {
    dispatch({
      type: 'SET',
      data: {
        username: props.item.username,
        createdAt: props.item.createdAt,
        tags: props.item.tags,
        title: props.item.title,
        textCover: props.item.cover,
        story: props.item.story,
        storySettings: props.item.storySettings,
        coverSettings: props.item.coverSettings,
        openStory: true,
      },
    });
  }

  return (
    <>
      <div className='card' onClick={openStoryPopup}>
        <textarea
          placeholder='Story here'
          className='story'
          readOnly={true}
          style={{
            color: `${props.item.storySettings.font}`,
            backgroundColor: `${props.item.storySettings.textBackground}`,
          }}
          value={props.item.story}
        />

        <textarea
          placeholder='Cover here'
          className='cover'
          style={{
            color: `${props.item.coverSettings.font}`,
            backgroundColor: `${props.item.coverSettings.background}`,
          }}
          readOnly={true}
          value={props.item.textCover}
        />

        <textarea
          placeholder='Title here'
          className='title'
          value={props.item.title}
          readOnly={true}
        />
      </div>
    </>
  );
}

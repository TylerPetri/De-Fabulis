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
      },
    });
    dispatch({ type: 'OPEN_STORY' });
  }

  return (
    <>
      <div className='card' onClick={openStoryPopup}>
        <div
          className='story'
          style={{
            color: `${props.item.storySettings.font}`,
            backgroundColor: `${props.item.storySettings.textBackground}`,
          }}
        >
          "{props.item.story}"
        </div>
        <div
          className='cover'
          style={{
            color: `${props.item.coverSettings.font}`,
            backgroundColor: `${props.item.coverSettings.background}`,
          }}
        >
          "{props.item.cover}"
        </div>
        <div className='title'>"{props.item.title}"</div>
      </div>
    </>
  );
}

import { useStoreContext } from '../../utils/GlobalStore';

import './readCards.css';

export default function Cards(props) {
  const [_, dispatch] = useStoreContext();

  function openStoryPopup() {
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: props.item } });
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

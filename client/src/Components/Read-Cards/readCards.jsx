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
        textCover: props.item.textCover,
        imageCover: props.item.imageCover,
        story: props.item.story,
        storySettings: props.item.storySettings,
        coverSettings: props.item.coverSettings,
        openStory: true,
      },
    });
    window.scrollTo(0, 0);
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

        {props.item.imageCover ? (
          <div className='img-cover-settings'>
            <img
              src={props.item.imageCover}
              alt='cover'
              className='cover-image'
            />
          </div>
        ) : (
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
        )}

        <textarea
          placeholder='Title here'
          className='title'
          style={{
            color: `${props.item.coverSettings.titleFont}`,
            backgroundColor: `${props.item.coverSettings.titleBackground}`,
          }}
          value={props.item.title}
          readOnly={true}
        />
      </div>
    </>
  );
}

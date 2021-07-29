import './readCards.css';

export default function Cards(props) {
  return (
    <>
      <div
        className='card'
        onClick={() =>
          props.openStoryPopup(
            props.item.username,
            props.item.createdAt,
            props.item.tags,
            props.item.title,
            props.item.textCover,
            props.item.imgCover,
            props.item.story,
            props.item.storySettings,
            props.item.coverSettings
          )
        }
      >
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
          value={props.item.cover}
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

import { useRef } from 'react';

export default function AddTitle(props) {
  const titleInput = useRef();

  function handleChange() {
    props.setTemp([
      ...props.temp,
      (props.temp[0].title = titleInput.current.value),
    ]);
    props.dispatch({
      type: 'SET_CURRENT_STORY',
      data: { currentStory: props.temp[0] },
    });
  }

  return (
    <>
      <div className='compose-title-tags-container'>
        <h3>Title: </h3>
        <div className='compose-title-tags-display'>
          <input
            className='add-title-input'
            spellCheck='false'
            ref={titleInput}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
